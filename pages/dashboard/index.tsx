import React from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head'
import appConfig from '../../app.json'

export default function Home() {

  return (
    <>
    <Head>
      <title>Dashboard | {appConfig.name}</title>
    </Head>
    <Layout>
      <>Dashboard</>
    </Layout>
    </>
  )
}
