"use client"
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import { useState } from 'react'
// import { UserButton } from '@clerk/nextjs'




function Dashboard() {
  return (
    <div className='p-5 m-auto justify-around align-middle'>
      <h2 className='font-bold text-2xl py-4'>DashBoard</h2>
      <h2 className='py-3 font-sans text-gray-800'>Create your own Customized Mock Interview</h2>
      <AddNewInterview/>
      
      



      
    </div>
  )
}

export default Dashboard
