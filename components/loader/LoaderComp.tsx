import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

const LoaderComp = ({
  loadingText,
  withText,
}: {
  loadingText?: string
  withText?: boolean
}): JSX.Element => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto h-full">
        <BiLoaderAlt size={48} className="animate-spin" />
        {withText ? <span className='text-center animate-pulse'>{loadingText??'Please wait...'}</span> : null}
      </div>
    </>
  )
}

export default LoaderComp