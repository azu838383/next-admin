import { Anchor, Badge, Breadcrumbs, Burger, Image, Input, rem } from '@mantine/core'
import { IconBell, IconDashboard, IconFileText, IconHome, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import React, { ReactElement, useMemo, useState } from 'react'
import { Spotlight, SpotlightActionData, SpotlightActionGroupData, spotlight } from '@mantine/spotlight';
import { listMenu } from './SideNavbar';
import Router from 'next/router';

const TopNavbar = ({
  opened,
  toggle,
  delayState
}:{
  opened: boolean
  toggle: (opened:boolean) => void
  delayState: ()=> void
}): JSX.Element => {
	
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

	const dataBreadcrumbs = [
		{ title: 'Market news', href: '#' },
		{ title: 'Overview', href: '#' },
	  ].map((item, index) => (
		<Anchor className='dark:!text-white' href={item.href} key={index}>
		  {item.title}
		</Anchor>
	  ));

	return (
		<>
			<div className="relative select-none shadow-inner w-full h-[80px] bg-gray-300 dark:bg-slate-900 max-h-[60px] flex justify-between items-center px-4">
				<div className="flex">
					<Burger opened={opened} onClick={()=>{toggle(!opened); delayState()}} aria-label="Toggle navigation" />
					<Breadcrumbs className='ml-4'>{dataBreadcrumbs}</Breadcrumbs>
				</div>
				<Link href={"#"} className={`absolute left-0 right-0 w-fit mx-auto transition-all ${opened ? 'opacity-0' : 'opacity-100'}`}>
					<Image
						src={'/img/logo/sgg-logo-yellow.png'}
						alt="Logo Admin"
						h={50}
						w="auto"
						fit="contain"
						className="drop-shadow-lg saturate-200 dark:drop-shadow-none "
					/>
				</Link>
				<div className="flex gap-4 items-center">
					<Input
						readOnly={true}
						onClick={spotlight.open}
						rightSectionPointerEvents="all"
						radius={'md'}
						className='w-[200px]'
						leftSection={<IconSearch />}
						rightSection={
							<div className="nowrap whitespace-nowrap -ml-10">Ctrl + K</div>
						}
					/>
					
					<div className="relative pr-3 text-black dark:text-white hover:text-sky-700 cursor-pointer transition-all">
						<IconBell />
						<Badge size='sm' className='absolute -top-3 right-0'>2</Badge>
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