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
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/const";

const statesInIndia = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
];

export const SignUp = () => {
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: "Job Seeker",
        location: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    const changeFormHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Update location when selecting from the dropdown
    const handleLocationChange = (selectedOption) => {
        setInput({ ...input, location: selectedOption.value });
    };

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            dispatch(setLoading(true));
            console.log(input);
            const res = await axios.post(`${USER_API_ENDPOINT}/signup`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }

        } catch (error) { 
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
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    name="firstName"
                                    value={input.firstName}
                                    onChange={changeFormHandler}
                                    type="text"
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    name="lastName"
                                    value={input.lastName}
                                    onChange={changeFormHandler}
                                    type="text"
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                        </div>
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
                        <div className="grid gap-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input
                                name="phone"
                                value={input.phone}
                                onChange={changeFormHandler}
                                type="tel"
                                placeholder="Enter mobile number"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Select
                                id="location"
                                options={statesInIndia}
                                placeholder="Select State"
                                isSearchable
                                onChange={handleLocationChange}  // Pass the change handler
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
                                    Create an account
                                </Button>
                        }

                        <Button  variant="outline" className="w-full">
                            Sign up with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline">
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
