import { Dot } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardType {
    id: string;
    name: string;
    date: string;
    title: string;
    content: string;
}

export const BlogCard = ({ id, name, date, title, content }: BlogCardType) => {
    
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })

    return <Link to={`/blog/${id}`}>
    <div className='w-full bg-slate-50 border-b border-slate-200 p-4'>
        <div className="flex items-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
            <div className='text-xs'>{name}</div>
            <Dot className='text-slate-700' size={12}/>
            <div className='text-xs text-slate-600'>{formattedDate}</div>
        </div>
        <div>
            <div className='font-bold text-xl '>{title}</div>
        </div>
        <div className='m-1'>
            <div className='font-serif text-sm font-medium line-clamp-2'>{content}</div>
        </div>
        <div>
            <div className='text-xs font-serif my-6'>{calculateReadingTime(content)} min read</div>
        </div>
    </div>
    </Link>
}

export function countWords(text: string){
    return text.trim().split(/\s+/).length;
}

export function calculateReadingTime(text: string){
    const words = countWords(text);
    const minutes = Math.ceil(words / 200);
    return minutes;
}