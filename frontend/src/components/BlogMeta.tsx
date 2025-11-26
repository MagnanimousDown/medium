import { Avatar } from "@mui/material";
import { calculateReadingTime } from "./BlogCard";
import { Dot } from "lucide-react";

interface BlogMetaType {
    content: string;
    email: string;
    name: string;
    date: string;
}

export const BlogMeta = ({ name, email, content, date }: BlogMetaType) => {

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
    })

    return <div className="flex w-2xl items-center">
        <div className='hover: cursor-pointer mx-2'>
            <Avatar sx={{width: 30, height: 30, fontSize: 14, bgcolor: "grey.900", color: "white"}}>{email.toUpperCase()[0]}</Avatar>
        </div>
        <div className="mx-2 font-medium text-sm hover:cursor-pointer">
            {name}
        </div>
        <div className="ml-2 text-slate-600 text-sm font-medium">
            {calculateReadingTime(content)} min read
        </div>
        <div className="mx-1">
            <Dot className='text-slate-700' size={12}/>
        </div>
        <div className="text-slate-600 text-sm font-medium">
            {formattedDate}
        </div>
    </div>
}