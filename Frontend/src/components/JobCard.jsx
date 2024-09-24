import React from 'react'
import { Badge } from './ui/badge'
import { LocateIcon, MapPin, Pin } from 'lucide-react'

export const JobCard = () => {
  return (
    <div className='p-5 rounded-md shadow-lg hover:shadow-xl border border-gray-100'>
        <div>
            <h1 className='font-bold text-lg mb-1'>Amazon</h1>
            <div className='flex gap-2 items-center'>
                <MapPin className='text-[#f8b400] h-5 w-4'/><p className='text-sm font-gray-500 '> Bengaluru</p>
            </div>
        </div>
        <div className='mt-2'>
            <h1 className='font-medium text-base'>Graphics Designer</h1>
            <p className='text-sm font-gray-500'>Want a full time Graphics Designer with 5 years of experience or more</p>            
        </div>
        <div className='flex items-center mt-4 gap-2'>
            <Badge className={'bg-[#004445] font-bold text-[#faf5e4] border-none'} variant={'ghost'}>Figma</Badge>
            <Badge className={'bg-[#faf5e4] font-bold text-[#f8b400] border-none'} variant={'ghost'}>Premier Pro</Badge>
            <Badge className={'bg-[#f8b400] font-bold text-[#faf5e4] border-none'} variant={'ghost'}>Photoshop</Badge>
        </div>
    </div>
  )
}
