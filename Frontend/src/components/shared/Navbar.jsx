import { Button, buttonVariants } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import React from 'react'
import { LogOut, User2 } from 'lucide-react'
import { Outlet, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
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

export const Navbar = () => {
    const { user } = useSelector(store => store.auth);

    return (
        <div className='bg-[#faf5e4]'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='font-extrabold text-4xl text-[#004445] '>GET A <span className='text-[#f8b400]'>JOB</span></h1>
                </div>
                <div className='flex items-center gap-5'>
                    <ul className='flex items-center font-medium gap-5'>
                        <NavLink to={"/"}><li><Button variant="link">Home</Button> </li></NavLink>
                        <NavLink to={"/jobs"}><li><Button variant="link">Jobs</Button> </li></NavLink>
                        <NavLink to={"/applications"}><li><Button variant="link">My Applications</Button> </li> </NavLink>
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
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex  justify-between items-center'>
                                                <Avatar className='cursor-pointer'>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div className='flex flex-col justify-between'>
                                                    <h1 className='font-medium'>Gaurang Shirodkar</h1>
                                                    <p>Lorem ipsum dolor sit amet.</p>
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
                                                        <AlertDialogAction className="bg-[#004445]" >Continue</AlertDialogAction>
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
