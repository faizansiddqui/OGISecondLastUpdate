import Hero from '@/components/Hero'
import Main from '@/components/Main'
import Navbar from '@/components/Navbar'
import PopulerCourses from '@/components/PopulerCourses'
import Question from '@/components/Question'
import React from 'react'
import '../styles/globals.css'
import OurRecordData from '@/components/OurRecordData'

const page = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Main />
        <PopulerCourses />
        <OurRecordData />
        <Question />
    </div>
  )
}

export default page