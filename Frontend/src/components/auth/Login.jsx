import React, { useState } from "react";
import { Navbar } from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { USER_API_ENDPOINT } from "@/utils/const";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

export const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "Job Seeker",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store => store.auth);

    const changeFormHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        try {
            dispatch(setLoading(true));
            e.preventDefault();
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/");
                toast.success(`Logged in successfully,\nWelcome back, ${res.data.user.firstName}`);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center mx-auto max-w-7xl">
                <form
                    onSubmit={submitHandler}
                    className="w-1/2 border border-gray-200 rounded-md my-10 p-6"
                >
                    <h1 className="font-bold text-3xl mb-5 text-[#2c786c]">Log in</h1>
                    <div>
                        <Label className="text-l ml-1 font-bold">
                            Email
                            <Input
                                name="email"
                                value={input.email}
                                onChange={changeFormHandler}
                                type="email"
                                placeholder="Enter email"
                                className="mt-1 mb-3 font-semibold"
                                required
                            />
                        </Label>
                        <Label className="text-l ml-1 font-bold">
                            Password
                            <Input
                                name="password"
                                value={input.password}
                                onChange={changeFormHandler}
                                type="password"
                                placeholder="Enter password"
                                className="mt-1 mb-6 font-semibold"
                                required
                            />
                        </Label>
                        <div className="flex justify-between mb-2">
                            <div className="flex justify-start items-center gap-5">
                                <div className="flex space-x-2">
                                    <Label className="flex gap-2 font-bold cursor-pointer">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="Job Seeker"
                                            checked={input.role === "Job Seeker"}
                                            onChange={changeFormHandler}
                                            className="h-4 w-4 accent-black  cursor-pointer font-semibold"
                                            required

                                        />
                                        Job Seeker
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Label className="flex gap-2 font-bold cursor-pointer">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="Job Recruiter"
                                            checked={input.role === "Job Recruiter"}
                                            onChange={changeFormHandler}
                                            className="h-4 w-4 accent-black cursor-pointer font-semibold"
                                        />
                                        Job Recruiter
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        loading ? 
                        <Button className="bg-[#d8a005] w-full my-4 hover:bg-[#d8a005] cursor-default"> <Loader2 className="animate-spin mr-4"/> Please wait </Button> :
                        <Button type="submit" className="bg-[#f8b400] w-full my-4 hover:bg-[#d8a005]">LOG IN</Button>
                    }
                    <div className="flex justify-end">
                        <span className="text-sm mr-2">Don't have an account?</span>
                        <Link className="text-sm font-bold text-[#2c786c]" to={"/signup"}>
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};
