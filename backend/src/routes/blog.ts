import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlog, getSpecificBlogId, updateBlog } from "@omkar_dev/medium";

export const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string
  },
  Variables: {
    userId: string
  }
}>();

blog.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const userId = c.get("userId");
  const { title, content, published = false } = await c.req.json();

  // Zod validation
  const { success } = createBlog.safeParse({ title, content, published })

  if (!success) {
    return c.json({
      message: "Invalid input"
    }, 400)
  }

  // Db call
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId: userId
    }
  })

  return c.json({
    id: post.id
  }, 201)
  
})

blog.put("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const userId = c.get("userId")
  const { title, content, published, blogId } = await c.req.json();

  // zod validation
  const { success } = updateBlog.safeParse({ title, content, published, blogId })

  if (!success) {
    return c.json({
      message: "Invalid input"
    }, 400)
  }

  // update the blog
  const updatePost = await prisma.post.update({
  where: {
    id: blogId,
    authorId: userId
  },
  data: {
    ...(title !== undefined && { title }),
    ...(content !== undefined && { content }),
    ...(published !== undefined && { published })
  },
})

  return c.json({
    id: updatePost.id
  }, 200)

})

blog.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  })

  return c.json({
    blogs: posts
  }, 200)
})

blog.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const id = c.req.param("id");

  // Zod validation
  const { success } = getSpecificBlogId.safeParse(id);
  if (!success) {
    return c.json({
      message: "Invalid Id"
    }, 400)
  }

  // Db call
  const response = await prisma.post.findUnique({
    where: {
      id
    },
    include: {
      author: {
        select: {
          name: true,
          email: true
        }
      }
    }
  })

  return c.json({
    blog: response
  }, 200)
})
