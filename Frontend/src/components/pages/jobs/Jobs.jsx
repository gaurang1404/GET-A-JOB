import React from 'react'
import { Navbar } from '../../shared/Navbar'
import { FilterCard } from './FilterCard';
import { JobCard } from '@/components/shared/JobCard';

const jobsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Jobs = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex items-start gap-5'>
                    <div className='w-[20%] mt-5'>
                        <FilterCard />
                    </div>

                    {/* // jobsArr.length <= 0 ? <span>No jobs found</span> :  */}
                    <div className='flex-1 h-[88vh] pb-5'>
                        <div className='grid grid-cols-2 gap-4 my-5'>
                            {
                                jobsArr.map((job, i) => (
                                    <JobCard key={i} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
