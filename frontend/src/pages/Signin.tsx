import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export function Signin(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <Auth type="signin"></Auth>
            </div>
            <div className="hidden md:block">
                <Quote></Quote>
            </div>
        </div>
    )
}