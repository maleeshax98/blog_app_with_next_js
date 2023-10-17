"use client"
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react"
import { useState } from "react"
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
    const { data: session, status } = useSession()
    const pathname = usePathname()
    const [showNav, setShowNav] = useState(false)
    return (
        <div>
            <nav className='flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-2xl text-green-500'>Blog X</h1>
                </div>
                <div>
                    <ul className='hidden md:flex text-black gap-4 font-semibold '>
                        <Link className={`link ${pathname === '/' ? 'text-green-500' : ''}`} href="/">
                            <li>Home</li>
                        </Link>
                        <Link  href="/">
                            <li>Recent</li>
                        </Link>
                        <Link className={`link ${pathname === '/posts/popular' ? 'text-green-500' : ''}`} href="/posts/popular">
                            <li>Popular</li>
                        </Link>
                        <Link className={`link ${pathname === '/posts' ? 'text-green-500' : ''}`} href="/posts">
                            <li>All Posts</li>
                        </Link>
                        <Link className={`link ${pathname === '/about-us' ? 'text-green-500' : ''}`} href="/">
                            <li>About us</li>
                        </Link>
                        <Link className={`link ${pathname === '/contact' ? 'text-green-500' : ''}`} href="/">
                            <li>Contact</li>
                        </Link>

                    </ul>
                    
                </div>
                <div className='flex'>
                { showNav ? (
                    <></>
                ) : (
                    <Image src="/icons/menu.svg" className="flex md:hidden " width={30} height={30} onClick={ () => { setShowNav((prev) => !prev) } } />
                )}
                    { status === "unauthenticated" ? (
                        <>
                            <button className='flex gap-2 items-center rounded-lg border-2 p-2' onClick={ () => { signIn("google") }}>
                                <Image src="/icons/google.svg" width={20} height={20} alt=''/>
                                <p>Sign in with google</p>
                            </button>
                        </>
                    ) : status === "authenticated" ? (
                        <div className='flex gap-2 items-center'>
                            <Link href={'/posts/add'} >
                                <Image src="/icons/add.svg" width={50} height={50} alt=''/>
                            </Link>
                            <Link  href="/posts/my-posts">
                            <Image src={session?.user?.image} width={50} height={50} className=' rounded-full' alt=''/>
                            </Link>
                            
                        </div>
                    ) : status === "loading" ? (
                        <></>
                    ) : ( <></>) }
                    
                </div>
                
            </nav>
            {
                showNav && (
                    <ul className='flex flex-col text-md md:hidden text-black gap-4 mt-[-70px] font-semibold bg-white fixed h-[100vh] w-[100vw] z-[100] p-[20px] rounded-lg'>
                        <Image src="/icons/close.svg" className="flex md:hidden" width={30} height={30} onClick={ () => { setShowNav((prev) => !prev) } } />
                    
                    <Link className={`link ${pathname === '/' ? 'text-green-500' : ''}`} href="/">
                        <li>Home</li>
                    </Link>
                    <Link  href="/">
                        <li>Recent</li>
                    </Link>
                    <Link className={`link ${pathname === '/posts/popular' ? 'text-green-500' : ''}`} href="/posts/popular">
                        <li>Popular</li>
                    </Link>
                    <Link className={`link ${pathname === '/posts' ? 'text-green-500' : ''}`} href="/posts">
                        <li>All Posts</li>
                    </Link>
                    <Link className={`link ${pathname === '/about-us' ? 'text-green-500' : ''}`} href="/">
                        <li>About us</li>
                    </Link>
                    <Link className={`link ${pathname === '/contact' ? 'text-green-500' : ''}`} href="/">
                        <li>Contact</li>
                    </Link>
                </ul>
                )
            }
        </div>
    )
}
