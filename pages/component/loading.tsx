import React, { useState } from 'react'
import Layout from '@/components/layout'
import Head from 'next/head'
import appConfig from '../../app.json'
import TitlePage from '@/components/TitlePage'
import { Button } from '@mantine/core'
import { useLoading } from '@/components/Loading'
import { ToastContainer, toast } from 'react-toastify'
import CardLayout from '@/components/layout/CardLayout'

export default function LoadingPage() {
    const { addNotification, handleError, showLoadingSpinner, hideLoadingSpinner }: any = useLoading()

    const handleLoading = (): void => {
        showLoadingSpinner()
        setTimeout(() => {
            hideLoadingSpinner()
        }, 3000)
    }

    return (
        <>
            <Head>
                <title>Notification & Loading | {appConfig.name}</title>
            </Head>
            <Layout>
                <div className="grid grid-cols-2">
                    <CardLayout>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                            onClick={()=>{
                                addNotification({
                                    position: 'top-right',
                                    title: 'Notification Default',
                                    message: 'This default notification',
                                    type: 'info',
                                })
                            }}
                            >
                                Notification Default
                            </Button>
                            <Button
                            bg={'green'}
                            onClick={()=>{
                                addNotification({
                                    position: 'top-right',
                                    title: 'Notification Success',
                                    message: 'This success notification',
                                    type: 'success',
                                    className: '!text-white',
                                })
                            }}
                            >
                                Notification Success
                            </Button> 
                            <Button
                            bg={'red'}
                            onClick={()=>{
                                addNotification({
                                    position: 'top-right',
                                    title: 'Notification Error',
                                    message: 'This error notification',
                                    type: 'error',
                                })
                            }}
                            >
                                Notification Error
                            </Button> 
                            <Button
                            onClick={()=>{
                                handleLoading()
                            }}
                            >
                                Loading Overlay
                            </Button>
                            <Button
                            bg={'red'}
                            onClick={(error)=>{
                                handleError(error)
                            }}
                            >
                                Error Catching, can be use on trycatch function
                            </Button>
                        </div>
                    </CardLayout>
                </div>
            </Layout>
        </>
    )
}
