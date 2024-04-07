import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupType } from "serverless-common-app"
import axios from 'axios';
import { BACKEND_URL } from "../config";

const Auth = ({type}: {type: "signin" | "signup"}) => {

    const [postInputs , setPostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    async function sendRequest (){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem('token', jwt);
            navigate('/blogs');

        } catch (error) {
            console.log(error)
            alert('Failed to Signup')
        }
    }

  return (
    <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-center pt-1">
                        {type === "signin" ? "Don't have an account" :"Already have an account?"}
                        <Link className="pl-2 underline" to={type == "signin" ? "/signup" :"/signin"}>{ type == "signin" ? "Sign up" : "Sign in"}</Link>
                    </div>
                </div>
                <div className="pt-5">
                   {type === "signup" && <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
                        setPostInputs((c)=>({
                        ...c, 
                        name: e.target.value
                        }))
                    }}/>} 
                    <LabelledInput label="Username" placeholder="a@b.com" onChange={(e) => {
                        setPostInputs((c)=>({
                        ...c, 
                        email: e.target.value
                        }))
                    }}/>
                    <LabelledInput label="Password" type={"password"} placeholder="Enter your name" onChange={(e) => {
                        setPostInputs((c)=>({
                        ...c, 
                        password: e.target.value
                        }))
                    }}/>

                </div>
                    <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type == "signin" ? "Sign in" :"Sign up" }</button>
            </div>
        </div>
    </div>
  )
}

interface LabelledInputType {
    label: string
    placeholder: string
    type?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}  

function LabelledInput ({ label, placeholder, type, onChange }: LabelledInputType){

    return <div>
        <div>
            <label  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black pt-4" >{label}</label>
            <input onChange={onChange} type={type ||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}


export default Auth