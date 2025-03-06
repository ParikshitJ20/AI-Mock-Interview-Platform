import React from 'react'
import Header from './_components/Header'



const DashLayout = ({children})          => {
  return (
    <div>
      <Header/>
      <div className='mx-auto justify-center w-100 px-52  h-auto '>
   
      {children }
      </div>
      
    </div>
  )
}

export default DashLayout
