import React from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export const Hero = () => {
  return (
    <div className='text-center pt-5'>
        <div className='flex flex-col gap-5'>
            <span className='mx-auto px-4 py-2 rounded-full bg-[#faf5e4] font-medium'>Tired of being <span className='text-[red] '>unemployed?</span>  </span>
            <h1 className='text-5xl text-[#004445] font-bold'>Find & Get <br /> Your <span className='text-[#f8b400]'>DREAM JOB!</span></h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur odio eius vel</p>
            <div className='flex w-[40%] items-center mx-auto shadow-md hover:shadow-lg border border-gray-200 rounded-full pl-4'>
                <input 
                    type="text" 
                    placeholder='Find your dream job'
                    className='outline-none border-none w-full '
                />
                <Button className="rounded-r-full bg-[#f8b400] hover:bg-[#d8a005]">
                    <Search className='h-5 w-5 ' />
                </Button>
            </div>
        </div>
    </div>
  )
}
