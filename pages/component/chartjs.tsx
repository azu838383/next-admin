import React, { useEffect, useMemo, useState } from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head'
import appConfig from '../../app.json'
import TitlePage from '@/components/TitlePage'
import ChartComponent, { ChartData } from '@/components/Chart'
import { Button, Code, Select, Text } from '@mantine/core'
import { ChartTypeRegistry } from 'chart.js'

export default function ChartPage() {

    interface TChart {
        label: string
        value: number
    }

    const [typeChart, setTypeChart] = useState<keyof ChartTypeRegistry>('bar')
    const [dataChart, setDataChart] = useState<TChart[]|undefined>(undefined)

    const startingData = (() => {
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                label: `Data ${i + 1}`, // Labels like "Data 1", "Data 2", ...
                value: Math.floor(Math.random() * 1000) + 1, // Random value between 1 and 1000
            });
        }
        return data;
    })();
    
    const handleAdd = (): void => {
        if (dataChart) {
            const lastLabelNumber = Number(dataChart[dataChart.length - 1].label.replace('Data ', ''));
            const newLabel = `Data ${lastLabelNumber + 1}`;
            const newDataChart = [
                ...dataChart,
                {
                label: newLabel,
                value: Math.floor(Math.random() * 1000) + 1, // Random value between 1 and 1000
                },
            ];
            setDataChart(newDataChart);
        }
    }

    const handleRemove = (): void => {
        if (dataChart) {
            const newDataChart = [...dataChart.slice(1)]
            if(dataChart.length>1){
                setDataChart(newDataChart);
            }
        }
    }

    const labelsArray = dataChart?.map((e) => e.label);
    const valuesArray = dataChart?.map((e) => e.value);
    const useChartData: ChartData = {
        labels: labelsArray as string[],
        datasets: [
          {
            label: 'Data',
            data: valuesArray as number[],
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

    useEffect(() => {
        setDataChart(startingData)
    }, [])

    return (
        <>
            <Head>
            <title>Chart Statistic | {appConfig.name}</title>
            </Head>
            <Layout>
                <TitlePage label='Chart Statistic' />
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-end gap-4">
                            <Select
                                label="Select type chart"
                                placeholder="Pick one"
                                value={typeChart}
                                data={[
                                    { value: 'bar', label: 'Bar' },
                                    { value: 'line', label: 'Line' },
                                    { value: 'doughnut', label: 'Doughnut' },
                                    { value: 'pie', label: 'Pie' },
                                    { value: 'polarArea', label: 'Polar Area' },
                                    { value: 'radar', label: 'Radar' },
                                ]}
                                onChange={(e)=>{
                                    setTypeChart(e as keyof ChartTypeRegistry)
                                }}
                            />
                            <div className="flex gap-4">
                                <Button
                                onClick={handleAdd}
                                >
                                    Add Data
                                </Button>
                                <Button
                                variant='outline'
                                onClick={handleRemove}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                        <Code block>
                        {`
    dataChart = [${dataChart?.map((e)=> (
        `
        {label: "${e.label}", value: "${e.value}"}`
    ))}
    ]

    const labelsArray = dataChart?.map((e) => e.label);
    const valuesArray = dataChart?.map((e) => e.value);
    const useChartData: ChartData = {
        labels: labelsArray as string[],
        datasets: [
            {
                label: 'Data',
                data: valuesArray as number[],
            }
        ]
    }

    <ChartComponent
        data={useChartData}
        type={"${typeChart}"}
    />
                        `}
                        </Code>
                    </div>
                    <div className="bg-white rounded-xl p-4 h-fit">
                        <Text c={'dark'}>Bar Type</Text>
                        <ChartComponent data={useChartData} type={typeChart} />
                    </div>
                </div>
            </Layout>
        </>
    )
}
