import React, { useMemo, useState } from 'react'
import Layout from '@/components/Layout'
import { Button, Modal } from '@mantine/core'
import TabelComp from '@/components/TableComp'
import Text from '@/components/Text'
import Head from 'next/head'
import appConfig from '../../app.json'

export default function Home() {

    const [state, setState] = useState<string | undefined>(undefined)
    const [modalVisible, setModalVisible] = useState(false)

    const data = useMemo(() => [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    ], [])

    const columns = useMemo(() => {
        return [
        {
            Header: 'Element position',
            accessor: 'position',
        },
        {
            Header: 'Atomic mass',
            accessor: 'mass',
        },
        
        {
            Header: 'Symbol',
            accessor: 'symbol',
        },
        {
            Header: 'Element name',
            accessor: 'name',
        },
        {
            Header: 'Action',
            accessor: '_',
            Cell: ({ row }: { row: any }) => (
            <Button
            onClick={()=>{
                setState(row.original.name)
                setModalVisible(true)
            }}
            >
                Set State
            </Button>
            ),
        },
        ]
    }, [])

    return (
        <>
            <Head>
                <title>Table | {appConfig.name}</title>
            </Head>
            <Layout>
                <div className="flex flex-col">
                    
                    <TabelComp
                        columns={columns}
                        data={data}
                        loading={false}
                        customTableClassName="text-center"
                        withPagination={true}
                        withSearch={true}
                    />
                </div>
            </Layout>
            <Modal opened={modalVisible} onClose={()=>{setModalVisible(false)}} title="State Clicked">
                <Text>
                    Data State: {state ?? 'Unset'}
                </Text>
            </Modal>
        </>
    )
}
