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

export const Signup = () => {
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: "Job Seeker",
        file: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store => store.auth);

    const changeFormHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        try {
            e.preventDefault(); 
            dispatch(setLoading(true));                       
            const formData = new FormData();
            formData.append("firstName", input.firstName);
            formData.append("lastName", input.lastName);
            formData.append("email", input.email);
            formData.append("password", input.password);
            formData.append("phone", input.phone);
            formData.append("role", input.role);
            if (input.file) {
                formData.append("file", input.file);
            }

            const res = await axios.post(`${USER_API_ENDPOINT}/signup`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
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
                    className="w-1/2 border border-gray-200 rounded-md my-10 p-6 shadow-lg"
                >
                    <h1 className="font-bold text-3xl mb-5 text-[#2c786c]">Sign up</h1>
                    <div>
                        <Label className="text-l ml-1 font-bold">
                            First Name
                            <Input
                                name="firstName"
                                value={input.firstName}
                                onChange={changeFormHandler}
                                type="text"
                                placeholder="Enter first name"
                                className="mt-1 mb-3 font-semibold"
                                required
                            />
                        </Label>
                        <Label className="text-l ml-1 font-bold">
                            Last Name
                            <Input
                                name="lastName"
                                value={input.lastName}
                                onChange={changeFormHandler}
                                type="text"
                                placeholder="Enter last name"
                                className="mt-1 mb-3 font-semibold"
                            />
                        </Label>
                        <Label className="text-l ml-1 font-bold">
                            Email
                            <Input
                                name="email"
                                value={input.email}
                                onChange={changeFormHandler}
                                type="email"
                                placeholder="Enter email"
                                className="mt-1 mb-3 font-semibold"
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
                                className="mt-1 mb-3 font-semibold"
                            />
                        </Label>
                        <Label className="text-l ml-1 font-bold">
                            Mobile Number
                            <Input
                                name="phone"
                                value={input.phone}
                                onChange={changeFormHandler}
                                type="tel"
                                placeholder="Enter mobile number"
                                className="mt-1 mb-4 font-semibold"
                            />
                        </Label>
                        <div className="flex justify-between">
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
                            <div>
                                <Label className="flex justify-end items-center gap-1 text-l ml-1 font-bold">
                                    Profile
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        placeholder="Upload profile picture"
                                        className="w-3/5 font-semibold"
                                    />
                                </Label>
                            </div>
                        </div>
                    </div>
                    {
                        loading ? 
                        <Button className="bg-[#d8a005] w-full my-4 hover:bg-[#d8a005] cursor-default"> <Loader2 className="animate-spin mr-4"/> Please wait </Button> :
                        <Button type="submit" className="bg-[#f8b400] w-full my-4 hover:bg-[#d8a005]">SIGN UP</Button>
                    }
                    <div className="flex justify-end">
                        <span className="text-sm mr-2">Already have an account?</span>
                        <Link className="text-sm font-bold text-[#2c786c]" to={"/login"}>
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};
