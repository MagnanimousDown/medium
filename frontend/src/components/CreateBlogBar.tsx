import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"

export const CreateBlogBar = ({ email, name, title, content, publishBlog }: { email: string, name: string, title: string, content: string, publishBlog: () => void }) => {

    return <div className="flex justify-between items-center border-b border-slate-200 py-2">
        <div className='flex items-center'>
            <Link to={"/blogs"}>
            <div className="font-bold font-[--font-sohne] text-3xl mx-4 hover: cursor-pointer">
                Medium
            </div>
            </Link>
            <div className="mx-1 text-sm text-slate-700 font-medium">
                Draft in {name}
            </div>
            <div className="text-slate-500 text-sm font-medium ml-4">
                Saved
            </div>
        </div>
        <div className='flex items-center'>
            <div>
                <button disabled={title.trim() === "" || content.trim() === ""}
                onClick={publishBlog}
                 className="rounded-4xl bg-green-600 py-1 px-3 border border-transparent text-center text-xs font-semibold text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:hover:cursor-not-allowed hover:cursor-pointer disabled:opacity-50 disabled:shadow-none ml-2 mr-5" type="button">
                    Publish
                </button>
            </div>
            <div className="hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </div>
            <div className='hidden md:block mx-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-6 hover: cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </div>
            <div className='hidden md:block hover: cursor-pointer mx-4'>
                <Avatar sx={{width: 32, height: 32, fontSize: 16}}>{email.toUpperCase()[0]}</Avatar>
            </div>
        </div>
    </div>
}