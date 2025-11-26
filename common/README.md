# @omkar_dev/medium

A lightweight Zod-based schema package for validating authentication and blog-related inputs in the Medium-like applications.

## 🚀 Installation

```bash
npm install @omkar_dev/medium
```

## 📦 What’s Included?

This package provides ready‑to‑use Zod schemas and TypeScript types for:

- User Signup  
- User Signin  
- Creating a blog  
- Updating a blog  
- Getting a specific blog by ID  

---

## 📚 Schemas & Types

### **Signup Schema**

```ts
import { signupInput, SignupInput } from "@omkar_dev/medium";

signupInput.parse({
  name: "John",
  email: "john@example.com",
  password: "password123"
});
```

### **Signin Schema**

```ts
import { signinInput, SigninInput } from "@omkar_dev/medium";

signinInput.parse({
  email: "john@example.com",
  password: "password123"
});
```

### **Create Blog Schema**

```ts
import { createBlog, CreateBlog } from "@omkar_dev/medium";

createBlog.parse({
  title: "My Blog",
  content: "This is my content",
  published: true
});
```

### **Update Blog Schema**

```ts
import { updateBlog, UpdateBlog } from "@omkar_dev/medium";

updateBlog.parse({
  blogId: "uuid-here",
  title: "Updated title"
});
```

### **Get Specific Blog ID Schema**

```ts
import { getSpecificBlogId, GetSpecificBlogId } from "@omkar_dev/medium";

getSpecificBlogId.parse("some-uuid-here");
```

---

## 📁 Project Structure (src/index.ts)

The package exports:

- `signupInput`, `SignupInput`
- `signinInput`, `SigninInput`
- `createBlog`, `CreateBlog`
- `updateBlog`, `UpdateBlog`
- `getSpecificBlogId`, `GetSpecificBlogId`

All schemas are built using **Zod**.

---

## 🤝 Contributing

Feel free to open issues or submit pull requests for improvements.

---

## 📦 Version

Current package version: **1.0.1**
