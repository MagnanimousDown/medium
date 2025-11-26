import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type SignupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type SigninInput = z.infer<typeof signinInput>;
export declare const createBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodBoolean;
}, z.core.$strip>;
export type CreateBlog = z.infer<typeof createBlog>;
export declare const updateBlog: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
    blogId: z.ZodUUID;
}, z.core.$strip>;
export type UpdateBlog = z.infer<typeof updateBlog>;
export declare const getSpecificBlogId: z.ZodUUID;
export type GetSpecificBlogId = z.infer<typeof getSpecificBlogId>;
