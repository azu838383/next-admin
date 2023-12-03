import React, { type ReactElement } from 'react'

type TextVariant = 'default' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

interface PropCard {
  children: React.ReactNode
  variant?: TextVariant
  className?: string
}

const Text: React.FC<PropCard> = ({
    children,
    variant,
    className
}) => {
    const defaultText = (): ReactElement => {
    return (
        <p className={className}>{children}</p>
        )
    }
    const h1Text = (): ReactElement => {
        return (
            <h1 className={`text-5xl ${className}`}>{children}</h1>
        )
    }
    const h2Text = (): ReactElement => {
        return (
            <h2 className={`text-4xl ${className}`}>{children}</h2>
        )
    }
    const h3Text = (): ReactElement => {
        return (
            <h3 className={`text-3xl ${className}`}>{children}</h3>
        )
    }
    const h4Text = (): ReactElement => {
        return (
            <h4 className={`text-2xl ${className}`}>{children}</h4>
        )
    }
    const h5Text = (): ReactElement => {
        return (
            <h5 className={`text-xl ${className}`}>{children}</h5>
        )
    }

  const textToRender = (): ReactElement => {
    switch (variant) {
        case 'default':
            return defaultText()
        case 'h1':
            return h1Text()
        case 'h2':
            return h2Text()
        case 'h3':
            return h3Text()
        case 'h4':
            return h4Text()
        case 'h5':
            return h5Text()
        default:
            return defaultText()
    }
  }

  return textToRender()
}

export default Text
