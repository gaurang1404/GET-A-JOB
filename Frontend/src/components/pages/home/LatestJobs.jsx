import React from 'react'
import { JobCard } from '@/components/shared/JobCard';

const jobs = [1,2,3,4,5,6,7,8];

export const LatestJobs = () => {
  return (
    <div className='bg-[#faf5e4] my-20 pt-5 pb-5 '>
        <div className='max-w-7xl mx-auto'>
            <h1 className='text-4xl font-extrabold text-[#004445]'><span >Top</span> Job Openings!</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    jobs.slice(0, 6).map((job, i) => (
                        <JobCard key={i} />
                    ))
                }
            </div>
        </div>
    </div>
  )
}
