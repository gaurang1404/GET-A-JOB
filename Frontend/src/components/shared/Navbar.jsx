import { Button, buttonVariants } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import React from 'react'
import { LogOut, User2 } from 'lucide-react'
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  }  from "../ui/alert-dialog";
import axios from "axios"
import { USER_API_ENDPOINT } from "@/utils/const"
import { toast } from "sonner"
import { setUser } from "@/redux/authSlice"

export const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try{
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`);

            if(res.data.success){
                navigate('/');
                dispatch(setUser(null));
                toast.success(res.data.message);    
            }
        }catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred while updating.');
          }

        
    }

    return (
        <div className='bg-[#faf5e4] mb-10'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='font-extrabold text-4xl text-[#004445] '>GET A <span className='text-[#f8b400]'>JOB</span></h1>
                </div>
                <div className='flex items-center gap-5'>
                    <ul className='flex items-center font-medium gap-5'>
                        <NavLink to={"/"}><li><Button variant="link">Home</Button> </li></NavLink>
                        <NavLink to={"/jobs"}><li><Button variant="link">Jobs</Button> </li></NavLink>
                        {
                            user && <NavLink to={"/applications"}><li><Button variant="link">My Applications</Button> </li> </NavLink>
                        }
                    </ul>

                    {
                        !user ?
                            <div className="flex items-center gap-2">
                                <NavLink to={"/login"}><Button variant="outline">Log in</Button></NavLink>
                                <NavLink to={"/signup"}><Button className="bg-[#f8b400] text-[#faf5e4] hover:bg-[#d8a005] hover:text-[#f5f5f5]">Sign up</Button></NavLink>
                            </div> :
                            <>
                                <Popover>
                                    <PopoverTrigger>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>{user.firstName}</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex  justify-start gap-4 items-center'>
                                                <Avatar className='cursor-pointer'>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div className='flex flex-col justify-between items-start'>
                                                    <h1 className='font-medium'>{user.firstName + " " + user.lastName}</h1>
                                                    <p>{user.email}</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-start gap-2'>
                                                <User2 />
                                                <NavLink to={"/profile"}><Button variant='link' className='p-0 h-6 cursor-pointer'>Profile</Button></NavLink>
                                            </div>
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    
                                                        <div className='flex justify-start gap-2'>
                                                            <LogOut />
                                                            <Button variant='link' className='p-0 h-6 cursor-pointer'>Log out</Button>
                                                        </div>                                                
                                                    
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            You will be returned to the login screen.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <Link onClick={handleLogOut}><AlertDialogAction className="bg-[#004445]" >Continue</AlertDialogAction></Link>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>

                                    </PopoverContent>
                                </Popover>
                            </>
                    }





                </div>
            </div>
            <Outlet />
        </div>
    )
}
