import React from 'react'
import { MdInfo } from 'react-icons/md'

const EmptyComp = ({ emptyText }: { emptyText?: string }): JSX.Element => {
  return (
    <div className=" text-blue-600 flex flex-col justify-center items-center h-full gap-2">
      <MdInfo size={48} className="animate-pulse" />
      <span className="">{emptyText??''}</span>
    </div>
  )
}

export default EmptyComp
