import { useParams } from "react-router-dom";
import { BlogContent } from "../components/BlogContent";
import { BlogMeta } from "../components/BlogMeta";
import { BlogTitle } from "../components/BlogTitle";
import { NavigationBar } from "../components/NavigationBar";
import { PostActions } from "../components/PostActions";
import { useBlog } from "../hooks";
import { BlogTitleSkeleton } from "../components/BlogTitleSkeleton";
import { BlogMetaSkeleton } from "../components/BlogMetaSkeleton";
import { PostActionsSkeleton } from "../components/PostActionsSkeleton";
import { BlogContentSkeleton } from "../components/BlogContentSkeleton";

export function Blog(){
    const { id } = useParams();
    if (!id) {
        return <div>
            Blog Not Found
            The blog you’re looking for doesn’t exist or may have been removed.
        </div>
    }

    const {loading, blog} = useBlog({id})

    if (loading || !blog) {
        return <div>
            <NavigationBar email="loading..."></NavigationBar>
            <div className="flex justify-center mt-8">
                <BlogTitleSkeleton />
            </div>
            <div className="flex justify-center my-6">
                <BlogMetaSkeleton />
            </div>
            <div className="flex justify-center">
                <PostActionsSkeleton />
            </div>
            <div className="flex justify-center mt-4">
                <BlogContentSkeleton />
            </div>
        </div>
    }

    return (
        <div>
            <NavigationBar email={blog.author.email}></NavigationBar>
            <div className="">
                <div className="flex justify-center mt-8">
                    <BlogTitle title={blog.title}></BlogTitle>
                </div>
                <div className="flex justify-center my-8">
                    <BlogMeta email={blog.author.email} name={blog.author.name} content={blog.content} date={blog.publishedAt}></BlogMeta>
                </div>
                <div className="flex justify-center ">
                    <PostActions></PostActions>
                </div>
                <div className="flex justify-center mt-8">
                    <BlogContent content={blog.content}></BlogContent>
                </div>
            </div>
        </div>
    )
}