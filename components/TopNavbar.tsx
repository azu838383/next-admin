import { Anchor, Badge, Breadcrumbs, Burger, Button, Center, Group, Input, Text, rem, useMantineColorScheme } from '@mantine/core'
import { IconAlarmSnooze, IconBell, IconCameraSelfie, IconHome, IconMagnetic, IconNotification, IconSearch, IconUser } from '@tabler/icons-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Logo } from './Logo'
import { Spotlight, SpotlightActionData, SpotlightActionGroupData, spotlight } from '@mantine/spotlight';
import Image from 'next/image'

const TopNavbar = ({
  opened,
  toggle,
  delayState
}:{
  opened: boolean
  toggle: (opened:boolean) => void
  delayState: ()=> void
}): JSX.Element => {

	const [query, setQuery] = useState('');

	const data = [
		{
			icon: <IconHome />,
			title: 'Dummy Text',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			new: true,
		},
	  
		{
			icon: <IconAlarmSnooze />,
			title: 'Dummy Text',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			new: true,
		},
		{
			icon: <IconCameraSelfie />,
			title: 'Dummy Text',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			new: false,
		},
		{
			icon: <IconMagnetic />,
			title: 'Dummy Text',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			new: false,
		},
	  ];

	const items = data
	.filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()))
	.map((item) => (
		<Spotlight.Action key={item.title} className='w-full !px-4 !py-2' onClick={() => console.log(item)}>
		<Group wrap="nowrap" className='w-full'>
			{item.icon && (
			<Center>
				{item.icon}
			</Center>
			)}

			<div style={{ flex: 1 }}>
			<Text>{item.title}</Text>

			{item.description && (
				<Text opacity={0.6} size="xs">
				{item.description}
				</Text>
			)}
			</div>

			{item.new && <Badge variant="default">new</Badge>}
		</Group>
		</Spotlight.Action>
	));

	const dataBreadcrumbs = [
		{ title: 'Market news', href: '#' },
		{ title: 'Overview', href: '#' },
	  ].map((item, index) => (
		<Anchor className='!text-white' href={item.href} key={index}>
		  {item.title}
		</Anchor>
	  ));

	return (
        <div className="relative shadow-inner w-full h-[80px] bg-gray-300 dark:bg-slate-900 max-h-[60px] flex justify-between items-center px-4">
          	<div className="flex">
				<Burger opened={opened} onClick={()=>{toggle(!opened); delayState()}} aria-label="Toggle navigation" />
				<Breadcrumbs className='ml-4'>{dataBreadcrumbs}</Breadcrumbs>
			</div>
			<Link href={"#"} className={`absolute left-0 right-0 w-fit mx-auto transition-all ${opened ? 'opacity-0' : 'opacity-100'}`}>
				<Logo style={{ width: rem(120) }} />
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
				<Spotlight.Root query={query} onQueryChange={setQuery}>
					<Spotlight.Search className='!p-2' placeholder="Search..." leftSection={<IconSearch stroke={1.5} />} />
					<Spotlight.ActionsList className='!p-2 !pt-0'>
					{items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
					</Spotlight.ActionsList>
				</Spotlight.Root>
				<div className="relative pr-3 text-white hover:text-sky-500 cursor-pointer transition-all">
					<IconBell />
					<Badge size='sm' className='absolute -top-3 right-0'>2</Badge>
				</div>
				
			</div>
        </div>
    )
}

export default TopNavbar