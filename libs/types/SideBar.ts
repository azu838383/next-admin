import React, { ReactElement } from "react"

export interface ILinkSideBar {
    label: string
    link?: string
}
  
export interface IListMenuSideBar {
    label: string
    icon: ReactElement
    link?: string
    initiallyOpened?: boolean
    links?: ILinkSideBar[]
}