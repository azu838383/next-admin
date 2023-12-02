import React from "react";
import { Button, Menu, ScrollArea, Text, UnstyledButton, rem } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconArrowsLeftRight,
  IconTrash,
  IconUser,
  IconLogout,
  IconQrcode,
} from '@tabler/icons-react';
import classes from './SideNavbar.module.css';
import { LinksGroup } from '../NavbarLinkGroup';
import { Logo } from '../Logo';
import Link from 'next/link';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

export function SideNavbar({
  opened,
  delayed
}:{
  opened: boolean
  delayed: boolean
}) {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <div className={`h-screen bg-gray-300 dark:bg-slate-900 text-black dark:text-white transition duration-300 ${opened?'w-[250px]':'w-[0] opacity-0'} ${delayed && 'hidden'}`}>
        <nav className={`w-[250px] ${classes.navbar}`}>
            <div className={classes.header}>
                <Link href={"#"} className='flex justify-center'>
                    <Logo style={{ width: rem(120) }} />
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