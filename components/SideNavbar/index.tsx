import React from "react";
import { Image, Menu, ScrollArea, UnstyledButton, rem } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconSettings,
  IconUser,
  IconLogout,
  IconQrcode,
} from '@tabler/icons-react';
import classes from './SideNavbar.module.css';
import { LinksGroup } from '../NavbarLinkGroup';
import Link from 'next/link';

export const listMenu = [
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard', desc: 'This is menu dashboard' },
  {
    label: 'Component',
    icon: IconNotes,
    initiallyOpened: true,
	new: true,
	desc: 'All of component will be here',
    links: [
      { label: 'Table', link: '/component/table', desc: 'Component of table can be use with <TableComp />' },
    ],
  },
//   {
//     label: 'Releases',
//     icon: IconCalendarStats,
// 	desc: 'This is menu dashboard',
// 	new: false,
//     links: [
//       { label: 'Upcoming releases', link: '/', desc: 'This is menu dashboard' },
//       { label: 'Previous releases', link: '/', desc: 'This is menu dashboard' },
//       { label: 'Releases schedule', link: '/', desc: 'This is menu dashboard' },
//     ],
//   },
//   { label: 'Analytics', icon: IconPresentationAnalytics, link: '/', desc: 'This is menu dashboard' },
//   { label: 'Contracts', icon: IconFileAnalytics, link: '/', desc: 'This is menu dashboard' },
//   { label: 'Settings', icon: IconAdjustments, desc: 'This is menu dashboard' },
//   {
//     label: 'Security',
//     icon: IconLock,
// 	desc: 'This is menu dashboard',
// 	new: false,
//     links: [
//       { label: 'Enable 2FA', link: '/', desc: 'This is menu dashboard' },
//       { label: 'Change password', link: '/', desc: 'This is menu dashboard' },
//       { label: 'Recovery codes', link: '/', desc: 'This is menu dashboard' },
//     ],
//   },
];

export function SideNavbar({
  opened,
  delayed
}:{
  opened: boolean
  delayed: boolean
}) {
  const links = listMenu.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <div className={`h-screen bg-gray-300 dark:bg-slate-900 text-black dark:text-white transition duration-300 w-[0] ${opened?'w-[250px]':'opacity-0'} ${delayed ? 'hidden' : ''}`}>
        <nav className={`w-[250px] drop-shadow-md ${classes.navbar}`}>
            <div className={classes.header}>
                <Link href={"/"} className='flex justify-center'>
                  <Image
                    src={'/img/logo/sgg-logo-yellow.png'}
                    alt="Logo Admin"
                    h={50}
                    w="auto"
                    fit="contain"
                    className="drop-shadow-lg saturate-200 dark:drop-shadow-none "
                  />
                </Link>
            </div>

            <ScrollArea className={`border-t border-white dark:border-opacity-30 ${classes.links}`}>
                <div className={classes.linksInner}>
                    {links}
                </div>
            </ScrollArea>

            <div className={classes.footer}>
              <Menu shadow="md" width={200} position="right-end">
                <Menu.Target>
                  <UnstyledButton className="w-full">
                    <LinksGroup icon={IconUser} label="Account"  />
                  </UnstyledButton>
                </Menu.Target>

                <div className="pb-2">
                  <Menu.Dropdown>
                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item leftSection={<IconQrcode style={{ width: rem(14), height: rem(14) }} />}>
                      2FA Code
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                      Settings
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </div>
              </Menu>
            </div>
        </nav>
    </div>
  );
}