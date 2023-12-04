import React from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head'
import appConfig from '../../app.json'
import TitlePage from '@/components/TitlePage'
import ChartComponent, { ChartData } from '@/components/Chart'
import { Text } from '@mantine/core'

export default function ChartPage() {

    const sampleChartData: ChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Data',
            data: [14, 59, 80, 81, 56, 55, 40, 81, 56, 55, 40],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
    }

    return (
        <>
            <Head>
            <title>Chart Statistic | {appConfig.name}</title>
            </Head>
            <Layout>
                <TitlePage label='Chart Statistic' />
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4">
                        <Text c={'dark'}>Bar Type</Text>
                        <ChartComponent data={sampleChartData} type='bar' />
                    </div>

                    <div className="bg-white rounded-xl p-4">
                        <Text c={'dark'}>Line Type</Text>
                        <ChartComponent data={sampleChartData} type='line' />
                    </div>

                    <div className="bg-white rounded-xl p-4">
                        <Text c={'dark'}>Pie Type</Text>
                        <ChartComponent data={sampleChartData} type='pie' />
                    </div>

                    <div className="bg-white rounded-xl p-4">
                        <Text c={'dark'}>PolarArea Type</Text>
                        <ChartComponent data={sampleChartData} type='polarArea' />
                    </div>

                    <div className="bg-white rounded-xl p-4">
                        <Text c={'dark'}>Radar Type</Text>
                        <ChartComponent data={sampleChartData} type='radar' />
                    </div>

                    <div className="bg-white rounded-xl p-4">
                        <Text c={'dark'}>Doughnut Type</Text>
                        <ChartComponent data={sampleChartData} type='doughnut' />
                    </div>
                </div>
            </Layout>
        </>
    )
}
