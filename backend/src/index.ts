import { Hono } from 'hono'
import { blog } from './routes/blog'
import { user } from './routes/user'
import { authMiddleware } from './middlewares/middleware'
import { cors } from 'hono/cors'

const app = new Hono<{ 
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()

app.use("/*", cors())

app.use("/api/v1/blog", authMiddleware)
app.use("/api/v1/blog/*", authMiddleware)

app.route("/api/v1/user", user)
app.route("/api/v1/blog", blog)

export default app
