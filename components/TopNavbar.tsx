import { Anchor, Badge, Breadcrumbs, Burger, Image, Input, Kbd, rem, useMantineColorScheme } from '@mantine/core'
import { IconBell, IconDashboard, IconFileText, IconHome, IconSearch, IconThermometer } from '@tabler/icons-react'
import Link from 'next/link'
import React, { ReactElement, useMemo, useState } from 'react'
import { Spotlight, SpotlightActionData, SpotlightActionGroupData, spotlight } from '@mantine/spotlight';
import { listMenu } from './sideNavbar';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { GENERAL } from '@/store/actions/actionTypes';
import { RootState } from '@/store/reducers';
import TitlePage from './TitlePage';

const TopNavbar = ({
  opened,
  notificationOpen
}:{
  opened: boolean
  notificationOpen: ()=> void
}): JSX.Element => {
	const dispatch = useDispatch()
    const { pageTitle } = useSelector((state: RootState) => state.historyTab)
    const { hamburger } = useSelector((state: RootState) => state.general)
	const dataSpotlight = useMemo((): SpotlightActionData[] => {
		const data = listMenu.filter((f) => !f.links).map((menuItem) => ({
		  id: menuItem.label,
		  label: menuItem.label,
		  description: menuItem.desc ?? '',
		  onClick: () => Router.push(String(menuItem.link)),
		  leftSection: <menuItem.icon /> as React.ReactElement,
		}));
	  
		const subData = listMenu.filter((f) => f.links).flatMap((menuItem) => {
			if(menuItem?.links){
				return (
					menuItem.links.map((link) => ({
					  id: link.label,
					  label: link.label,
					  description: link.desc ?? '',
					  onClick: () => Router.push(String(link.link)),
					  leftSection: <menuItem.icon /> as React.ReactElement,
					}))
				)
			} else {
				return []
			}
		});
		return [...data, ...subData];
	}, []);

	return (
		<>
			<div className="relative select-none shadow-inner">
				<div className={`fixed z-10 right-0 flex justify-between items-center px-4 h-[60px] max-h-[60px] bg-slate-900 transition-all duration-300 ${opened ? 'w-[calc(100%-250px)]' : 'w-full'}`}>
					<div className="flex items-center">
						<Burger
						opened={hamburger}
						onClick={()=>{
							dispatch({
								type: GENERAL.SET_SIDEBAR_STATE,
								payload: !hamburger
							})
						}}
						aria-label="Toggle navigation"
						/>
      					<TitlePage label={pageTitle} />
					</div>
					<Link href={"#"} className={`absolute left-0 right-0 w-fit mx-auto transition-all ${opened ? 'opacity-0' : 'opacity-100'}`}>
						<Image
							src={'/img/logo/sgg-logo-yellow.png'}
							alt="Logo Admin"
							h={50}
							w="auto"
							fit="contain"
							className="saturate-200 drop-shadow-none "
						/>
					</Link>
					<div className="flex gap-4 items-center">
						<div onClick={spotlight.open} className="flex justify-between items-center border border-white border-opacity-30 bg-zinc-800 rounded-lg w-[200px] px-2 py-1 cursor-pointer">
							<IconSearch />
							<div className="nowrap whitespace-nowrap -ml-10 mb-1">
								<Kbd>⌘</Kbd> + <Kbd>K</Kbd>
							</div>
						</div>
						
						<div onClick={notificationOpen} className="relative pr-3 text-white hover:text-sky-700 cursor-pointer transition-all">
							<IconBell />
							<Badge size='sm' className='absolute -top-3 right-0'>0</Badge>
						</div>

					</div>
				</div>
			</div>
			<Spotlight
				actions={dataSpotlight}
				nothingFound="Nothing found..."
				highlightQuery
				className='flex flex-col'
				limit={5}
				searchProps={{
				leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
				placeholder: 'Search...',
				}}
			/>
		</>
    )
}

export default TopNavbar