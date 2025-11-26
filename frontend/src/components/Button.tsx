export const Button = ({ children, onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button className="bg-black text-white w-full p-2 border-2 rounded-md cursor-pointer my-4" onClick={onClick}>{children}</button>
}