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
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',  // Blue color
                'rgba(255, 205, 86, 0.5)',  // Yellow color
                'rgba(75, 192, 192, 0.5)',  // Green color
                'rgba(153, 102, 255, 0.5)', // Purple color
                'rgba(255, 159, 64, 0.5)',  // Orange color
                'rgba(255, 99, 132, 0.5)',   // Red color
                'rgba(201, 203, 207, 0.5)', // Gray color
                'rgba(238, 99, 99, 0.5)',   // Softer Red
                'rgba(99, 238, 99, 0.5)',   // Softer Green
                'rgba(99, 99, 238, 0.5)',   // Softer Blue
                'rgba(220, 100, 150, 0.5)', // Soft Pink (October)
                'rgba(170, 220, 130, 0.5)', // Soft Green (November)
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',   // Blue color
                'rgba(255, 205, 86, 1)',   // Yellow color
                'rgba(75, 192, 192, 1)',   // Green color
                'rgba(153, 102, 255, 1)',  // Purple color
                'rgba(255, 159, 64, 1)',   // Orange color
                'rgba(255, 99, 132, 1)',    // Red color
                'rgba(201, 203, 207, 1)',  // Gray color
                'rgba(238, 99, 99, 1)',    // Softer Red
                'rgba(99, 238, 99, 1)',    // Softer Green
                'rgba(99, 99, 238, 1)',    // Softer Blue
                'rgba(220, 100, 150, 1)',  // Soft Pink (October)
                'rgba(170, 220, 130, 1)',  // Soft Green (November)
            ],
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
