import {Button, buttonVariants} from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import React from 'react'
import { LogOut, User2 } from 'lucide-react'
import { Link, Outlet } from "react-router-dom"

export const Navbar = () => {
  const user = false;

  return (
    <div className='bg-[#faf5e4]'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
            <div>
                <h1 className='font-extrabold text-4xl text-[#2c786c] '>GET A <span className='text-[#f8b400]'>JOB</span></h1>
            </div>
            <div className='flex items-center gap-5'>
                <ul className='flex items-center font-medium gap-5'>
                    <li>Home</li>
                    <li>Jobs</li>
                    <li>Browse</li>
                </ul>

                {
                    !user ? 
                    <div className="flex items-center gap-2">
                        <Link to={"/login"}><Button variant="outline">Log in</Button></Link>
                        <Link to={"/signup"}><Button className="bg-[#f8b400] text-[#faf5e4] hover:bg-[#d8a005] hover:text-[#f5f5f5]">Sign up</Button></Link>
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
                                        <User2/>
                                        <Button variant='link' className='p-0 h-6 cursor-pointer'>Profile</Button>
                                    </div>
                                    <div className='flex justify-start gap-2'>
                                        <LogOut/>
                                        <Button variant='link' className='p-0 h-6 cursor-pointer'>Log out</Button>
                                    </div>
                                </div>
                                
                            </PopoverContent>
                        </Popover>
                    </>
                }

                
                

                
            </div>
        </div>
        <Outlet/>
    </div>
  )
}
