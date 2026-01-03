"use client"
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { User } from 'lucide-react';
function Header() {
  const {user}=useUser();
  return (
    <div className='flex justify-between items-center shadow-md'>
      <div className='flex items-center gap-4 p-4 border-b'>
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h2 className='text-2xl font-bold'><span className='text-primary'>UI/UX </span> MOCKUP</h2>
      </div>
      <ul className='flex gap-10 items-center p-4'>
        <li className='hover:text-primary cursor-pointer'>Home</li>
        <li className='hover:text-primary cursor-pointer'>Pricing</li>
        <li className='hover:text-primary cursor-pointer'>Contact</li>
      </ul>
      {!user ? 
      <SignInButton mode='modal'>
       <Button className='m-1'>Get Started</Button>
      </SignInButton>
      :<UserButton/>}
    </div>
  )
}

export default Header
