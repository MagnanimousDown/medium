import { useParams } from "react-router-dom"
import { useSignup } from "../hooks"
import { toast } from "sonner"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"

export const EmailVerificationHandler = () => {
    const { token } = useParams();

    if (!token) {
        toast.error("No token found")
            return <div className="flex justify-center items-center h-screen bg-gray-50">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <p className="text-gray-700 font-medium">Invalid verification link.</p>
                        <Link to="/signup" className="block mt-3 text-blue-600 underline underline-offset-2">Go to Signup</Link>
                    </div>
                </div>
    }
    
    const { loading, success, errorMessage } = useSignup({ token })

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-gray-50">
            <Loader></Loader>
        </div>
    }

    const messages: Record<string, string> = {
        "Invalid token": "The token is invalid, Continue by Signing Up!",
        "Already verified": "You are already verified, Please Sign in!",
        "Token expired": "The token has expired, Please Sign Up again!"
    }

    return <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">{success ? "Email Verified Successfully" : "Verification Failed"}</h1>
                <p className="text-gray-600">{success ? "Your email has been verified. Please continue to sign in!" : messages[errorMessage] || "Something went wrong. Please try again."}</p>
                <p className="text-sm text-gray-500 mt-4 text-center">
                <Link to={success ? "/signin" : "/signup"} className="underline underline-offset-2 pl-2 cursor-pointer" >{success ? "Sign In" : "Sign Up"}</Link>
                </p>
            </div>
        </div>
}