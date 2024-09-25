import React from 'react'
import { Badge } from '../ui/badge'
import { Bookmark, MapPin, Pin } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const JobCard = () => {
    const applied = false;

    return (
        <div className='flex flex-col justify-between gap-2 bg-white p-6 rounded-md shadow-lg hover:shadow-xl border border-gray-100'>
            <div className='flex justify-between'>
                <div className='flex w-[100%] justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <Button className="border-none" variant="outline" size="icon">
                            <Avatar>
                                <AvatarImage src="https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png" />
                            </Avatar>
                        </Button>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-lg -mb-1'>Amazon</h1>
                            <div className='flex gap-1 items-center'>
                                <MapPin className='text-[gray] h-5 w-4 -ml-1' /><p className='text-sm font-gray-500 '> Bangalore</p>
                            </div>
                        </div>
                    </div>
                    <Bookmark />
                    
                </div>
            </div>

            <div className='mt-2'>
                <h1 className='font-medium text-base'>Graphics Designer</h1>
                <p className='text-sm font-gray-500'>Want a full time Graphics Designer with 5 years of experience or more</p>
            </div>
            <div className='flex justify-between items-center mt-4 gap-2'>
                <div className='flex gap-2 justify-start w-[70%]'>
                    <Badge className={'bg-[#004445] font-bold text-[#faf5e4] border-none'} variant={'ghost'}>24LPA</Badge>
                    <Badge className={'bg-[#f8b400] font-bold text-[#faf5e4] border-none'} variant={'ghost'}>Photoshop</Badge>
                    <Badge className={'bg-[#f8b400] font-bold text-[#faf5e4] border-none'} variant={'ghost'}>Premier Pro</Badge>
                </div>
                <div>
                    <Link to="/job/applynow">
                        <Button className={`${applied ? "text-[white] bg-[#16a34a] cursor-not-allowed hover:bg-[#16a34a]" : "text-[#f8b400] bg-[#faf5e4] hover:bg-[#004445]"}  `}>
                            {applied ? "Already applied!": "Apply Now"}
                        </Button>                    
                    </Link>
                </div>
            </div>
        </div>
    )
}
