import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";
import { Button } from "./Button";
import { useState } from "react";
import type { SigninInput, SignupInput } from "@omkar_dev/medium";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from 'sonner';

type AuthInputs = SignupInput | SigninInput

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<AuthInputs>(
        type === "signup"
        ? { name: "", email: "", password: "" }
        :{ email: "", password: "" }
    )

    const sendSignInRequest = async (type : string) => {
        toast.promise(
            axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs),
            {
                loading: 'Loading...',
                success: (response) => {
                    // axios response is available here
                    localStorage.setItem("token", `Bearer ${response.data.token}`);
                    navigate("/blogs");
                    return type === "signup" ? `Signed up successfully!` : `Signed in successfully!`;
                },

                error: type === "signup" ? `Error Signing Up!` : `Error Signing In!`,
                style: {
                    background: "black",
                    color: "white"
                }
            }
        );
    }

    const sendSignUpRequest = async(type: string) => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs)
            navigate("/verify")
        } catch (error) {
            toast.error("Error while signing up!", {
                style: {
                    background: "black",
                    color: "white"
                }
            })
        }
    }

    return <div className="h-screen flex flex-col justify-center">
        <div className="mx-auto px-6">
            <div className="font-bold text-3xl">
                {type === "signup" ? "Create an account" : "Open your account"}
            </div>
            <div className="flex justify-center my-4 text-slate-400">
                <div>
                    {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                </div>
                <Link to={type === "signup" ? "/signin" : "/signup"} className="underline underline-offset-2 pl-2 cursor-pointer">{type === "signup" ? "Sign In" : "Sign up"}</Link>
            </div>
            
            {type === "signup" && (
                <LabelledInput id="name" label="Username" type="text" placeholder="Enter your name" onChange={(e) => {
                setPostInputs(currValues => ({
                    ...currValues,
                    name: e.target.value
                }))
            }}></LabelledInput>)}
            

            <LabelledInput id="email" label="Email" type="email" placeholder="m@example.com" onChange={(e) => {
                setPostInputs(currValues => ({
                    ...currValues,
                    email: e.target.value
                }))
            }}></LabelledInput>

            <LabelledInput id="password" label="Password" type="password" placeholder="Your password" onChange={(e) => {
                setPostInputs(currValues => {
                    return {
                        ...currValues,
                        password: e.target.value
                    }
                })
            }}></LabelledInput>

            <p className="text-black bg-slate-300 font-light text-sm px-2 py-1 border border-slate-300 rounded-md">Password must be at least 8 characters</p>
            <Button onClick={() => type === "signup" ? sendSignUpRequest("signup") : sendSignInRequest("signin")}>{type === "signup" ? "Sign Up" : "Sign In"}</Button>
        </div>
    </div>
}