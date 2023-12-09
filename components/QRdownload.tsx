import React, { type ReactElement } from 'react'
import QRCode from 'qrcode.react'
import { Button } from '@mantine/core'

type QRvariant = 'default' | 'download'

interface PropCard {
  value: string
  size: number
  qrname?: string
  className?: string
  labelSave?: string
  containerClassName?: string
  variant?: QRvariant
  variantButton?: "filled" | "light" | "outline" | "subtle" | "transparent" | "white"
  classButtonSave?: string
}

const QRDownload: React.FC<PropCard> = ({ value, qrname, className, variant, size, containerClassName, labelSave, variantButton, classButtonSave }) => {

  const handleDownload = (): void => {
    const canvas = document.getElementById('qrcode-canvas') as HTMLCanvasElement
    const padding = 10

    const paddedCanvas = document.createElement('canvas')
    const context = paddedCanvas.getContext('2d')
    const canvasWidth = canvas.width + 2 * padding
    const canvasHeight = canvas.height + 2 * padding
    paddedCanvas.width = canvasWidth
    paddedCanvas.height = canvasHeight

    if (context) {
      context.fillStyle = 'white'
      context.fillRect(0, 0, canvasWidth, canvasHeight)

      context.drawImage(canvas, padding, padding)

      const paddedDataURL = paddedCanvas.toDataURL('image/png')

      const a = document.createElement('a')
      a.href = paddedDataURL
      a.download = 'QR'+" " + qrname +'.png'

      a.click()
    }
  }

  const defaultQR = (): ReactElement => {
    return (
      <div className={containerClassName}>
        <QRCode value={value} className={`p-2 bg-white ${className}`} size={size} id="qrcode-canvas"/>
      </div>
    )
  }

  const downloadQR = (): ReactElement => {
    return (
      <div className='flex flex-col items-center'>
        <QRCode value={value} className={`p-2 bg-white ${className}`} size={size} id="qrcode-canvas"/>
        <div className="flex flex-col items-center">
          <Button
            variant={variantButton??''}
            onClick={handleDownload}
            className={`mt-2 ${classButtonSave}`}
          >
            {labelSave??'Save'}
          </Button>
        </div>
      </div>
    )
  }

  const cardToRender = (): ReactElement => {
    switch (variant) {
      case 'default':
        return defaultQR()
      case 'download':
        return downloadQR()
      default:
        return defaultQR()
    }
  }

  return cardToRender()
}

export default QRDownload
