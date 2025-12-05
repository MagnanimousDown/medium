import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { toast } from "sonner";

interface BlogsType {
    id: string;
    title: string;
    content: string;
    published: boolean;
    publishedAt: string;
    authorId: string;
    author: {
        name: string;
    };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogsType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
                setBlogs(response.data.blogs)
            } catch (error) {
                toast.error('Something went wrong!', {
                    style: {
                        background: 'black',
                        color: 'white',
                    }
                })
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    return {
        loading,
        blogs
    }

}

interface Blog {
    id: string;
    title: string;
    content: string;
    published: boolean;
    publishedAt: string;
    author: {
        name: string;
        email: string;
    }
}

export const useBlog = ({ id }: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setBlog(response.data.blog);       
            } catch (error) {
                toast.error('Something went wrong!', {
                    style: {
                        background: 'black',
                        color: 'white',
                    }
                })
            }
            setLoading(false)
        }

        fetchData()

    }, [id])
    
    return {
        loading,
        blog
    }
}

export const useSignup = ({ token }: { token: string }) => {
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    useEffect(() => {
        
        const sendRequest = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/user/verify/${token}`)
            setSuccess(true)
            setLoading(false)
            
        } catch (error: any) {
            toast.error("Verification failed!", {
                style: {
                    background: 'black',
                    color: 'white',
                }
            })
            setErrorMessage(error.response?.data?.message)
            setLoading(false)
        }
    }
    sendRequest()

    }, [token])
    
    return {
        loading,
        success,
        errorMessage
    }
}