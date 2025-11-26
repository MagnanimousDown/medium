import { Next, Context } from "hono"
import { verify } from "hono/jwt"

export const authMiddleware = async (c: Context, next: Next) => {  
  if (c.req.path === "/api/v1/blog/bulk") {
    return next()    
  }

  const authHeader = c.req.header("Authorization")
  const token = authHeader?.split(" ")[1]

  if (!token) {
    return c.json({
      message: "Invalid token"
    }, 401)
    
  }

  try {
    const decodedPayload = await verify(token, c.env.JWT_SECRET)
    c.set("userId", decodedPayload.userId)
  
    await next();
  } catch (error) {
    return c.json({
      message: "Invalid token"
    }, 403)
  }
}