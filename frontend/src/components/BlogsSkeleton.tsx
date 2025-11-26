import { BlogMetaSkeleton } from "./BlogMetaSkeleton"

export const BlogsSkeleton = () => {
    return <div className="my-4">
            <div className="grid justify-center place-items-center">
                <BlogMetaSkeleton />
                <div className="w-full h-8 rounded-full bg-gray-300 animate-pulse my-4"></div>
                <div className="w-full h-4 rounded-full bg-gray-300 animate-pulse my-2"></div>
                <div className="w-full h-4 rounded-full bg-gray-300 animate-pulse my-2"></div>
            </div>
        </div>
}