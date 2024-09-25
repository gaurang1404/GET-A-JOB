import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

const filter = [
  {
    type: "Location",
    data: ["Delhi", "Bangalore", "Mumbai", "Hyderabad", "Chennai", "Kolkata", "Pune", "Gurugram",]
  },
  {
    type: "Industry",
    data: ["Backend Developer", "Data Aanalytic", "Frontend Developer", "Graphics Designer", "Project Manager"]
  },
  {
    type: "Salary",
    data: ["1-4 LPA", "5-12 LPA", "12-25 LPA", "25-50 LPA", "50+ LPA"]
  },
]

export const FilterCard = () => {
  return (
    <div className='border border-gray rounded-md shadow-lg p-3 pl-5'>
      <div className='flex w-full items-center mx-auto border border-gray-200 rounded-md pl-4 mb-2 -ml-1 hover:shadow-md'>
        <input
          type="text"
          placeholder='Find your dream job'
          className='outline-none border-none w-full'
        />
        <Button className="rounded-r-md rounded-l-none bg-[#f8b400] hover:bg-[#d8a005]">
          <Search className='h-5 w-5 ' />
        </Button>
      </div>
      <div className=''>
        <h1 className='font-bold text-xl mb-3 mt-3'>Filter Jobs</h1>
        <hr className='font-bold' />
        <RadioGroup>
          {
            filter.map((item, i) => {
              return (
                <div>
                  <h1 className='font-bold text-lg'>{item.type}</h1>
                  {
                    item.data.map((data, i) => (
                      <div className='flex space-x-4 my-3 items-center'>
                        <RadioGroupItem value={data} />
                        <Label>{data}</Label>
                      </div>
                    ))
                  }

                </div>
              )
            })
          }
        </RadioGroup>

      </div>
    </div>

  )
}
