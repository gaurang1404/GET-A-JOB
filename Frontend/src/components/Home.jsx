import React from 'react'
import { Navbar } from './shared/Navbar'
import { Hero } from './Hero'
import { CategoryCarousel } from './CategoryCarousel'
import { LatestJobs } from './LatestJobs'
import Footer from './Footer'

export const Home = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </>
  )
}
