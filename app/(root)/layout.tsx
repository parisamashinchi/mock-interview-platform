import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const RootLayout = async ({children}:{children: ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();
  if(!isUserAuthenticated){
    redirect("/sign-in ");
  }
  
  return (
    <div className='root-layout'>
      <nav>
        <Link href={"/"} className='flex gap-2 justify-center '>
          <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
          <h1 className='text-2xl font-bold'>Mock Interview</h1>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default RootLayout