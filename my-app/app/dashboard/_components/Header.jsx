"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'


function Header() {
    const path=usePathname();
    
  return (
    <div  className='flex p-4 item-center gap-2 justify-between bg-secondary shadow-sm'>
     
      <Image className="rounded-full w-16 mx-6 h-16" src={'/image.png'} width={150} height={60} alt='logo' />

      <ul className='flex gap-6 p-4'>
        <li className='hover:text-primary hover:colo hover:font-bold transition-all '>DashBoard</li>
        <li className='hover:text-primary hover:colo hover:font-bold transition-all'>Questions</li>
        <li className='hover:text-primary hover:colo hover:font-bold transition-all'>Upgrade</li>
        <li className='hover:text-primary hover:colo hover:font-bold transition-all'>HowItWorks</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
