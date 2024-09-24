import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const categories = [
    "src/assets/backend.png",
    "src/assets/data-scientist.png",
    "src/assets/frontend.png",
    "src/assets/backend.png",
    "src/assets/data-scientist.png",
    "src/assets/frontend.png",
]

export const CategoryCarousel = () => {
    return (
        <div className='mt-14'>
            <Carousel className="w-full max-w-xl mx-auto my-2">
                <CarouselContent className="-ml-1">
                    {
                        categories.map((cat, i) => (
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <Card className="h-15">
                                    <img
                                        className='w-full h-full zoom-in-50 rounded-sm'                                    
                                        src={cat} alt="" />
                                </Card>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
