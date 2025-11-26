import { BlogCard } from "../components/BlogCard"
import { BlogsSkeleton } from "../components/BlogsSkeleton"
import { NavigationBar } from "../components/NavigationBar"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs()

    if (loading) {
        return <div>
            <NavigationBar email="loading..."></NavigationBar>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
        </div>
    }

    return <div>
    <NavigationBar email="omkaraiya@gmail.com"></NavigationBar>
    <div className="grid justify-center place-items-center mt-1">
        {blogs.map(blog => {
            return <div key={blog.id} className="w-full max-w-2xl">
            <BlogCard id={blog.id} name={blog.author.name} date={blog.publishedAt} title={blog.title} content={blog.content}></BlogCard>
        </div>
        })}
    </div>
</div>
}