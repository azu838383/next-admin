import React, { useMemo, useState } from 'react'
import Layout from '@/components/Layout'
import { Button, Code, Modal, NumberFormatter, Switch, TextInput } from '@mantine/core'
import TabelComp from '@/components/tableComp'
import Text from '@/components/TextComp'
import Head from 'next/head'
import appConfig from '../../app.json'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import TitlePage from '@/components/TitlePage'

export default function TablePage() {

    const [checkedDownload, setCheckedDownload] = useState(false)
    const [checkedSearch, setCheckedSearch] = useState(false)
    const [checkedPagination, setCheckedPagination] = useState(false)
    const [checkedCentered, setCheckedCentered] = useState(false)
    const [buttonLabel, setButtonLabel] = useState<string|undefined>(undefined)

    const [state, setState] = useState<string | undefined>(undefined)
    const [modalVisible, setModalVisible] = useState(false)

    const dataDummy = useMemo(() => [
        { position: 1, mass: 12011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14007, symbol: 'N', name: 'Nitrogen' },
        { position: 24, mass: 88906, symbol: 'Y', name: 'Yttrium' },
        { position: 32, mass: 13733, symbol: 'Ba', name: 'Barium' },
        { position: 9, mass: 120011, symbol: 'C', name: 'Carbon' },
        { position: 3, mass: 140007, symbol: 'N', name: 'Nitrogen' },
        { position: 13, mass: 88906, symbol: 'Y', name: 'Yttrium' },
        { position: 4, mass: 137133, symbol: 'Ba', name: 'Barium' },
        { position: 5, mass: 121011, symbol: 'C', name: 'Carbon' },
        { position: 16, mass: 141007, symbol: 'N', name: 'Nitrogen' },
        { position: 18, mass: 886906, symbol: 'Y', name: 'Yttrium' },
        { position: 17, mass: 137833, symbol: 'Ba', name: 'Barium' },
        { position: 19, mass: 129011, symbol: 'C', name: 'Carbon' },
        { position: 20, mass: 143007, symbol: 'N', name: 'Nitrogen' },
        { position: 21, mass: 884906, symbol: 'Y', name: 'Yttrium' },
        { position: 22, mass: 134533, symbol: 'Ba', name: 'Barium' },
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
            Cell: ({ value }: { value: number }) => (
                <NumberFormatter prefix="$" value={value} thousandSeparator="." decimalSeparator="," />
            ),
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

    const handleExportGlobal = async (): Promise<any> => {
        const data = dataDummy
        // Create a new workbook
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('ReportToExcell')
    
        // Define the header style
        const headerStyle = {
          font: { bold: true },
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '00FF00' },
          } as ExcelJS.FillPattern, // Red fill color
          border: {
            top: { style: 'thin' as ExcelJS.BorderStyle },
            left: { style: 'thin' as ExcelJS.BorderStyle },
            bottom: { style: 'thin' as ExcelJS.BorderStyle },
            right: { style: 'thin' as ExcelJS.BorderStyle },
          },
          alignment: { horizontal: 'center' as any }, // Center align the text
        }
    
        // Define the cell style
        const cellStyle = {
          border: {
            top: { style: 'thin' as ExcelJS.BorderStyle },
            left: { style: 'thin' as ExcelJS.BorderStyle },
            bottom: { style: 'thin' as ExcelJS.BorderStyle },
            right: { style: 'thin' as ExcelJS.BorderStyle },
          },
        }
    
        // Set the header row and apply the header style
        const headerRow = worksheet.getRow(1)
        headerRow.values = [
          'Element Position',
          'Atomic Mass',
          'Symbol',
          'Element Name',
        ]
        headerRow.eachCell((cell) => {
          cell.fill = headerStyle.fill
          cell.font = headerStyle.font
          cell.border = headerStyle.border
        })
    
        // Populate the data rows and apply the cell style
        data.forEach((row, index) => {
          const dataRow = worksheet.getRow(index + 2)
          dataRow.values = [
            row.position,
            row.mass,
            row.symbol,
            row.name,
          ]
          dataRow.eachCell((cell) => {
            cell.border = cellStyle.border
          })
        })
    
        // Auto-fit columns
        worksheet.columns.forEach((column) => {
          column.width = 15
        })
    
        // Generate the Excel file
        const excelBuffer = await workbook.xlsx.writeBuffer()
    
        // Create a Blob and save the file
        const dataBlob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        saveAs(dataBlob, 'ReportToExcell.xlsx')
      }

    return (
        <>
            <Head>
                <title>Table | {appConfig.name}</title>
            </Head>
            <Layout>
                <TitlePage label='Table Component' />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Switch
                        checked={checkedPagination}
                        onChange={(event) => {
                            setCheckedPagination(event.currentTarget.checked)
                        }} 
                        size="md"
                        onLabel="ON" 
                        offLabel="OFF"
                        label="Enable Pagination"
                      />
                      <Switch
                        checked={checkedSearch}
                        onChange={(event) => {
                          setCheckedSearch(event.currentTarget.checked)
                        }} 
                        size="md"
                        onLabel="ON" 
                        offLabel="OFF"
                        label="Enable Search Function"
                      />
                      <Switch
                        checked={checkedDownload}
                        onChange={(event) => {
                          setCheckedDownload(event.currentTarget.checked)
                        }} 
                        size="md"
                        onLabel="ON" 
                        offLabel="OFF"
                        label="Enable Export to Excell"
                      />
                      <Switch
                        checked={checkedCentered}
                        onChange={(event) => {
                          setCheckedCentered(event.currentTarget.checked)
                        }} 
                        size="md"
                        onLabel="ON" 
                        offLabel="OFF"
                        label="Enable Column Center"
                      />
                    </div>

                    {checkedDownload && (
                      <div className="w-fit">
                        <TextInput
                          label={'Label Button Export Excell'}
                          value={buttonLabel}
                          placeholder='Input button export label'
                          onChange={(e)=>{
                            if(e.target.value === '') {
                              setButtonLabel(undefined)
                            } else {
                              setButtonLabel(e.target.value)
                            }
                          }}
                        />
                      </div>
                    )}
                    
                    <Code block>
{`
  <TabelComp
    columns={columns}
    data={dataDummy}
    loading={false}
    withPagination={${checkedPagination?'true':'false'}}
    withSearch={${checkedSearch?'true':'false'}}
    withDownload={${checkedDownload?'true':'false'}}
    centered={${checkedCentered?'true':'false'}}
    downloadBtnLabel={'${buttonLabel??'Export to Excell'}'}
    onDownload={()=>{
        handleExportGlobal()
    }}
  />
`}
                    </Code>
                  </div>
                  <div className="flex flex-col">
                      <TabelComp
                          columns={columns}
                          data={dataDummy.sort((a, b)=> a.position - b.position)}
                          loading={false}
                          centered={checkedCentered}
                          withPagination={checkedPagination}
                          withSearch={checkedSearch}
                          withDownload={checkedDownload}
                          downloadBtnLabel={buttonLabel}
                          onDownload={()=>{
                              handleExportGlobal()
                          }}
                      />
                  </div>
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
