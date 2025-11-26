import { z } from "zod";

export const signupInput = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(8)
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export type SigninInput = z.infer<typeof signinInput>

export const createBlog = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean()
})

export type CreateBlog = z.infer<typeof createBlog>

export const updateBlog = z.object({
    title: z.string().optional(),
    content: z.string().optional(), 
    published: z.boolean().optional(),
    blogId: z.uuid()
})

export type UpdateBlog = z.infer<typeof updateBlog>

export const getSpecificBlogId = z.uuid();

export type GetSpecificBlogId = z.infer<typeof getSpecificBlogId>