import React from 'react'
import Layout from '@/components/layout'
import Head from 'next/head'
import appConfig from '../../app.json'
import TitlePage from '@/components/TitlePage'
import { Text, Title } from '@mantine/core'
import CardLayout from '@/components/layout/CardLayout'

export default function Dashboard() {

  return (
    <>
    <Head>
      <title>Dashboard | {appConfig.name}</title>
    </Head>
    <Layout>
      <CardLayout>
        Welcome to Admin Panel
      </CardLayout>
    </Layout>
    </>
  )
}
