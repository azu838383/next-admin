import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import { SideNavbar } from './SideNavbar'
import TopNavbar from './TopNavbar'

const inter = Inter({ subsets: ['latin'] })

const Layout = ({
    children,
    onlyWrapper
}: {
    children: React.ReactNode
    onlyWrapper?: boolean
}): JSX.Element => {

    const [hamburger, setHamburger] = useState(true)
    const [delayState, setDelayState] = useState(false)

	const delayedToggle = () => {
        if(!delayState){
            setTimeout(() => {
                setDelayState(!delayState);
            }, 300)
        } else {
            setDelayState(!delayState);
        }
	};

    return (
        <main className={`relative min-h-screen ${inter.className}`}>
            {onlyWrapper ? (
                children
            ):(
                <div className="flex">
                    <SideNavbar opened={hamburger} delayed={delayState} />
                    <div className="flex flex-col w-full">
                        <TopNavbar opened={hamburger} toggle={setHamburger} delayState={delayedToggle}/>
                        <div className="w-full p-4">
                            <div className="bg-gray-100 dark:bg-slate-800 drop-shadow rounded-md p-4">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Layout