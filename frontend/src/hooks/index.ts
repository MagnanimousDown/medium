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