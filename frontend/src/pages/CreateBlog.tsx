import { useRef, useState } from "react"
import { CreateBlogBar } from "../components/CreateBlogBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { toast } from 'sonner';
import Tiptap from "../features/editor/components/Tiptap"

// We need to pass email and name to CreateBlogBar component
export const CreateBlog = () => {
    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    const handleInput = (ref: any) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = ref.current.scrollHeight + "px";
        }
    }

    const publishBlog = async () => {
        toast.promise(
            axios.post(`${BACKEND_URL}/api/v1/blog/create`, {
                title: title,
                content: content,
                published: true
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }), {
                loading: 'Publishing...',
                success: (response) => {
                    navigate(`/blog/${response.data.id}`);
                    return 'Blog has been published!';
                },
                error: 'Something went wrong, Could not publish!',
                style: {
                    background: 'black',
                    color: 'white'
                }
            }
        )

    }

    return <div>
        <CreateBlogBar publishBlog={publishBlog} email={"anonymous"} name={"anonymous"} title={title} content={content}></CreateBlogBar>
        <div className="flex justify-center mt-10">
            <div className="w-2xl h-auto">
            <div>

                <textarea onChange={(e) => {
                    const title = e.target.value;
                    setTitle(title);
                }} ref={titleRef} onInput={ () => handleInput(titleRef) } name="title" id="title" placeholder="Title" className="text-4xl text-slate-900 font-serif focus:outline-none resize-none w-full h-auto border-l border-slate-300 pl-4"/>

            </div>
            <div className="mt-2">

                <textarea onChange={(e) => {
                    const content = e.target.value;
                    setContent(content);
                }} ref={contentRef} onInput={ () => handleInput(contentRef) } name="content" id="content" placeholder="Tell your story..." className="text-xl font-serif text-slate-600 focus:outline-none resize-none w-full h-auto pl-4"/>

            </div>
            <div>
                <Tiptap />
            </div>
        </div>
        </div>
    </div>
}