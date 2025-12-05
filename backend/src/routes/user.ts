import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@omkar_dev/medium";
import { Resend } from "resend";

export const user = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    RESEND_API_KEY: string
  },
  Variables: {
    userData: {
      name: string,
      email: string,
      password: string,
      salt: string
    }
  }
}>()

user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const { name, email, password } = await c.req.json();

  // Zod validation
  const { success } = signupInput.safeParse({ name, email, password })

  if (!success) {
    return c.json({
      message: "Invalid Input"
    }, 400)
  }

  // Check if the user exists
  const verifiedUser = await prisma.user.findFirst({
    where: {
      email: email,
      isVerified: true
    }
  })

  if (verifiedUser) {
    return c.json({ 
      message: "A user with this email already exists."
    }, 409)
  }
  
  const existingUnverified = await prisma.user.findFirst({
    where: {
      email: email,
      isVerified: false,
    },
  })

  // Hash and salt the password
  const salt = crypto.randomUUID()
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password + salt)
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordData);
  const hexString = [...new Uint8Array(hashBuffer)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")

  const verificationToken = crypto.randomUUID();
  const tokenExpires = new Date(Date.now() + 1000 * 60 * 15) // 15 min

  // If unverified exists → update them
  if (existingUnverified) {
    await prisma.user.update({
      where: { id: existingUnverified.id },
      data: {
        name,
        password: hexString,
        salt,
        verificationToken,
        tokenExpires,
      },
    })
  } else {
    // Add the user to db
    const res = await prisma.user.create({
      data: {
        name,
        email,
        password: hexString,
        salt,
        verificationToken,
        tokenExpires
      }
    })
  }
  
  const VERIFICATION_LINK = `https://medium.omkaraiya.me/verify-email/${verificationToken}`
  const resend = new Resend(c.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
      from: "medium <noreply@noreply.omkaraiya.me>",
      to: email,
      subject: "Verify Your Email for Medium-Like Platform",
      html: `<p>Hi there,</p>
      
      <p>Thank you for signing up on our platform! Please verify your email address by clicking the link below:</p>
      
      <p><a href="${VERIFICATION_LINK}" style="color: #1a73e8;">Verify My Email</a></p>
      
      <p>If you did not sign up, you can safely ignore this email.</p>
      
      <p>Happy writing,<br/>The Medium-Like Team</p>`,
    });
  
  if (error) {
    return c.json(error, 400);
  }

  return c.json({
    message: "Check your email to verify your account"
  }, 200)
  
})

user.post("/verify/:token", async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const verificationToken = c.req.param("token")

  const res = await prisma.user.findFirst({
    where: {
      verificationToken
    }
  })

  if (!res) {
    return c.json({
      message: "Invalid token"
    }, 401)
  }

  if (res.isVerified) {
     return c.json({ message: "Already verified" }, 400)
  }

  if (!res.tokenExpires || res.tokenExpires < new Date()) {
    return c.json({
      message: "Token expired"
    }, 400)
  }

  await prisma.user.update({
    where: {
      id: res.id
    },
    data: {
      isVerified: true,
      verificationToken: null,
      tokenExpires: null
    }
  })
  
  // Generate a jwt token for the user
  const token = await sign({ userId: res.id }, c.env.JWT_SECRET)

  // return the token
  return c.json({
    token: token
  }, 201)
})

user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const { email, password } = await c.req.json();

  // Zod validation
  const { success } = signinInput.safeParse({ email, password })

  if (!success) {
    return c.json({
      message: "Invalid input"
    }, 400)
  }

  // Check if the user does not exist
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email
    }
  })

  if (!existingUser) {
    return c.json({
      message: "User not found"
    }, 404)
  }

  // Generate the hash
  const encoder = new TextEncoder();
  const data = encoder.encode(password + existingUser.salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hexString = [... new Uint8Array(hashBuffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")

  
  if (existingUser.password !== hexString) {
    return c.json({
      message: "Incorrect credentials"
    }, 401)
  }
  

  // Generate the token
  const token = await sign({ userId: existingUser.id }, c.env.JWT_SECRET)
  
  return c.json({
      token: token,
      message: "Verified successfully"
    }, 200)

})

