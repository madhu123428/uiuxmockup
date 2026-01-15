"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';



function Header() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center shadow-md border-b p-4">
      
      <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h2 className="text-2xl font-bold">
          <span className="text-primary">UI/UX </span> MOCKUP
        </h2>
      </Link>

      

      {!user ? (
        <SignInButton mode="modal">
          <Button className="m-1">Get Started</Button>
        </SignInButton>
      ) : (
        <UserButton />
      )}
    </div>
  );
}

export default Header;
