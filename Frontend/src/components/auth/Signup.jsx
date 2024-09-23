import React from 'react'
import { Navbar } from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const Signup = () => {
  return (
    <>
        <Navbar/>
        <div className='flex justify-center items-center mx-auto max-w-7xl'>
            <form action='' className='w-1/2 border border-gray-200 rounded-md my-10 p-6'>
                <h1 className='font-bold text-3xl mb-5 text-[#2c786c]'>Sign up</h1>
                <div>                    
                    <Label className="text-l ml-1 font-bold">First Name
                        <Input
                            type="text" placeholder="Enter first name"
                            className="mt-1 mb-3 font-semibold"
                        />  
                    </Label>
                    <Label className="text-l ml-1 font-bold">Last Name
                        <Input
                            type="text" placeholder="Enter last name"
                            className="mt-1 mb-3 font-semibold"
                        />  
                    </Label>
                    <Label className="text-l ml-1 font-bold">Email
                        <Input
                            type="email" placeholder="Enter email"
                            className="mt-1 mb-3 font-semibold"
                        />  
                    </Label>
                    <Label className="text-l ml-1 font-bold">Password
                        <Input
                            type="password" placeholder="Enter password"
                            className="mt-1 mb-3 font-semibold"
                        />  
                    </Label>
                    <Label className="text-l ml-1 font-bold">Mobile Number
                        <Input
                            type="tel" placeholder="Enter mobile number"
                            className="mt-1 mb-4 font-semibold"
                        />  
                    </Label>
                    <div className='flex justify-between'>
                        <div className='flex justify-start items-center gap-5'>
                            <div className="flex space-x-2">                            
                                <Label className="flex gap-2 font-bold cursor-pointer">
                                <Input 
                                    type="radio" 
                                    name="role" 
                                    value="Job Seeker"                                     
                                    className="h-4 w-4 accent-black  cursor-pointer font-semibold"
                                    defaultChecked
                                />Job Seeker
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">                            
                                <Label className="flex gap-2 font-bold cursor-pointer">
                                <Input 
                                    type="radio" 
                                    name="role" 
                                    value="Job Recruiter" 
                                    className="h-4 w-4 accent-black cursor-pointer font-semibold"
                                />Job Recruiter</Label>
                            </div>
                        </div>                        
                        <div>
                            <Label className="flex justify-end items-center gap-1 text-l ml-1 font-bold">Profile
                                <Input
                                    accept="image/*"
                                    type="file" placeholder="Upload profile picture" className="w-3/5 font-semibold"                                  
                                />  
                            </Label>
                        </div>
                    </div>                    
                </div>
                <Button type="submit" className="bg-[#f8b400] w-full my-4">SIGN UP</Button>
                <div className='flex justify-end'>
                    <span className='text-sm mr-2'>Already have an account?</span><Link className='text-sm font-bold text-[#2c786c]' to={"/login"}>Log in</Link>
                </div>

            </form>
        </div>
    </>
  )
}
