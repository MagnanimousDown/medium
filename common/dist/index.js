import { z } from "zod";
export const signupInput = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(8)
});
export const signinInput = z.object({
    email: z.email(),
    password: z.string().min(8)
});
export const createBlog = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean()
});
export const updateBlog = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
    blogId: z.uuid()
});
export const getSpecificBlogId = z.uuid();
