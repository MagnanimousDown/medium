import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ email }: { email: string }) => {

    return <div className="flex justify-between items-center border-b border-slate-200 py-2">
        <div className='flex items-center'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-2 ml-4 hover: cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <Link to={"/blogs"}>
            <div className="font-bold font-[--font-sohne] text-3xl ml-1 hover: cursor-pointer">
                Medium
            </div>
            </Link>
        </div>
        <div className='flex items-center'>
            <Link to={"/new-blog"} className='flex items-center'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-5.5 hover: cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </div>
            <div className='font-light hover: cursor-pointer mr-3 ml-1'>
                Write
            </div>
            </Link>
            <div className='hidden md:block mx-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-6 hover: cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </div>
            <div className='hover: cursor-pointer mx-4'>
                <Avatar sx={{width: 32, height: 32, fontSize: 16}}>{email.toUpperCase()[0]}</Avatar>
            </div>
        </div>
    </div>
}