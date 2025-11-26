import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@omkar_dev/medium";

export const user = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
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
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (existingUser) {
    return c.json({ 
      message: "A user with this email already exists."
    }, 409)

  }

  // Hash and salt the password
  const salt = crypto.randomUUID()
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hexString = [...new Uint8Array(hashBuffer)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")
  
  // Add the user to db
  const res = await prisma.user.create({
    data: {
      name,
      email,
      password: hexString,
      salt
    }
  })

  // Generate a jwt token for the user
  const token = await sign({ userId: res.id }, c.env.JWT_SECRET)

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
  const existingUser = await prisma.user.findUnique({
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
      token: token
    }, 200)

})

