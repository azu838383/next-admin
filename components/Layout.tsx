import { Inter } from 'next/font/google'
import React from 'react'
import { Image } from '@mantine/core'
import Link from 'next/link'
import { SideNavbar } from './SideNavbar'

const inter = Inter({ subsets: ['latin'] })

const Layout = ({
    children,
    onlyWrapper
}: {
    children: React.ReactNode
    onlyWrapper?: boolean
}): JSX.Element => {

    return (
        <main className={`relative min-h-screen ${inter.className}`}>
            {onlyWrapper ? (
                children
            ):(
                <div className="flex">
                    <SideNavbar />
                    
                </div>
            )}
        </main>
    )
}

export default Layout