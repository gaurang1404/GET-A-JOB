import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "../shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/const";

export const LogIn = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "Job Seeker",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    const changeFormHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            
            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
                dispatch(setUser(res.data.user));
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <Card className="max-w-2xl mx-auto mb-10">
                <CardHeader>
                    <CardTitle className="text-xl">Log In</CardTitle>
                    <CardDescription>
                        Enter your information to log into your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">                        
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                value={input.email}
                                onChange={changeFormHandler}
                                type="email"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                name="password"
                                value={input.password}
                                onChange={changeFormHandler}
                                type="password"
                                placeholder="Enter password"
                                required
                            />
                        </div>                                                
                        <div className="flex justify-start items-center gap-5">
                            <div className="flex space-x-2">
                                <Label className="flex gap-2  cursor-pointer">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="Job Seeker"
                                        checked={input.role === "Job Seeker"}
                                        onChange={changeFormHandler}
                                        className="h-4 w-4 accent-black  cursor-pointer "
                                    />
                                    Job Seeker
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label className="flex gap-2 cursor-pointer">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="Job Recruiter"
                                        checked={input.role === "Job Recruiter"}
                                        onChange={changeFormHandler}
                                        className="h-4 w-4 accent-black cursor-pointer "
                                    />
                                    Job Recruiter
                                </Label>
                            </div>
                        </div>
                        {
                            loading ?
                                <Button className="bg-[#f8b400] hover:bg-[#d8a005] w-full cursor-default"> <Loader2 className="animate-spin mr-4" /> Please wait </Button> :
                                <Button type="submit" onClick={submitHandler} className="hover:bg-[#d8a005] bg-[#f8b400] w-full">
                                    Log in
                                </Button>
                        }

                        <Button  variant="outline" className="w-full">
                            Log in with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
