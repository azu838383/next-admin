import { Inter } from 'next/font/google'
import React, { useEffect } from 'react'
import { SideNavbar } from './sideNavbar'
import TopNavbar from './TopNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/reducers'
import Router from 'next/router'
import { GENERAL, HISTORY } from '@/store/actions/actionTypes'
import { MdClose } from 'react-icons/md'
import { Drawer, ScrollArea, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBell } from '@tabler/icons-react'
import ModalQR from './modal/ModalQR'
import { useModal } from './context/ModalsContextProvider'

const inter = Inter({ subsets: ['latin'] })

const Layout = ({
    children,
}: {
    children: React.ReactNode
}): JSX.Element => {

    const { modalStates, showModal, hideModal } = useModal()
    const { lists } = useSelector((state: RootState) => state.historyTab)
    const { hamburger } = useSelector((state: RootState) => state.general)
    const { hamburgDelay } = useSelector((state: RootState) => state.general)
    const [opened, { open, close }] = useDisclosure(false)
    const dispatch = useDispatch()

	const delayedToggle = () => {
        if(!hamburgDelay){
            setTimeout(() => {
                dispatch({
                    type: GENERAL.SET_SIDEBAR_DSTATE,
                    payload: true
                })
            }, 300)
        } else {
            dispatch({
                type: GENERAL.SET_SIDEBAR_DSTATE,
                payload: false
            })
        }
	};

    useEffect(()=> {
        const countList = lists.length
        const newRoute = {label: document.title.replace(' | Next Admin Panel', ''), route: Router.pathname}
        if(!Router.pathname.includes('/[')){
          if(countList<9){
            dispatch({
              type: HISTORY.ADD_PAGE_TO_HISTORY,
              payload: newRoute
            })
          } else {
            if (lists.length > 9) {
              lists.splice(1, 1)
            }
            dispatch({
              type: HISTORY.ADD_PAGE_TO_HISTORY,
              payload: newRoute,
            })
          }
        }
    },[Router.isReady, lists])

    return (
        <main className={`relative min-h-screen ${inter.className}`}>
            <div className="flex">
                <SideNavbar opened={hamburger} delayed={hamburgDelay} />
                <div className="flex flex-col w-full">
                    <TopNavbar opened={hamburger} delayState={delayedToggle} notificationOpen={open}/>
                    <div className="w-full p-4">
                        <div className={`absolute bg-black min-h-[calc(100vh-60px)] top-[60px] pb-[75px] right-0 p-4 pt-0 ${hamburger ? 'w-[calc(100%-250px)]' : 'w-full'}`}>
                            <div className="flex fixed z-10 bg-black w-full pt-4">
                                {lists.map((e, index)=>(
                                    <div
                                    key={index}
                                    className={`relative flex flex-row truncate items-center gap-2 transition-all rounded-t-lg hover:bg-slate-800/60
                                    pr-8 ${lists.length >= 9? '!flex-grow':''}
                                    ${index===0?'!pr-4':''}
                                    ${Router.pathname === e.route?'bg-slate-800 hover:!bg-slate-800 !cursor-default ':''}`}>
                                        <div
                                        onClick={()=>{Router.push(e.route)}} 
                                        className={`py-2 pl-4 whitespace-nowrap truncate cursor-pointer `}>
                                            <Text size="md">{e.label==='Dashboard'?'Dashboard':e.label}</Text>
                                        </div>
                                        {index!==0&&(
                                        <MdClose
                                        size={16}
                                        className='absolute right-2 cursor-pointer'
                                        onClick={()=>{
                                            dispatch({
                                            type:HISTORY.REMOVE_PAGE_FROM_HISTORY,
                                            payload:e
                                            })
                                            if(Router.pathname===e.route)
                                            {
                                                Router.push(lists[lists.indexOf(e)-1].route)
                                            } 
                                        }}
                                        />
                                        )}
                                    </div>
                                    ))}
                                    {
                                    lists.length > 8 &&
                                    <div
                                    onClick={()=>{
                                        dispatch({
                                        type:HISTORY.REMOVE_ALL_FROM_HISTORY
                                        })
                                        Router.push('/dashboard')
                                    }}
                                    className='relative w-[60px] justify-center flex flex-row truncate shadow-none drop-shadow-md bg-white items-center gap-2 border-[1px] mx-1 border-black border-opacity-20 rounded-lg'>
                                        <MdClose
                                        size={16}
                                        className='cursor-pointer'
                                        />
                                    </div>
                                }
                            </div>
                            <div className={`relative top-[57px] bg-slate-800 p-4 ${Router.pathname === '/dashboard' ? 'rounded-b-md rounded-tr-md' : 'rounded-md'}`}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                opened={opened}
                onClose={close}
                position='right'
                title={
                    <div className='flex'>
                        <IconBell className='mr-2'/>
                        <Text>Notification</Text>
                    </div>
                }
                scrollAreaComponent={ScrollArea.Autosize}
            >
                <Text>Put your notification here</Text>
                <Text>You can make it with your style</Text>
            </Drawer>
            <ModalQR
                setVisible={(visible: boolean) => {
                    if (visible) {
                    showModal('showQR')
                    } else {
                    hideModal('showQR')
                    }
                }}
                visibled={modalStates.showQR}
            />
        </main>
    )
}

export default Layout