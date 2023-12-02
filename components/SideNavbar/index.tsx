import React from "react";
import { ScrollArea, rem } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
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

export function SideNavbar() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <div className="w-[250px] h-screen bg-gray-900">
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Link href={"#"} className='flex justify-center'>
                    <Logo style={{ width: rem(120) }} />
                </Link>
            </div>

            <ScrollArea className={`${classes.links}`}>
                <div className={classes.linksInner}>
                    {links}
                </div>
            </ScrollArea>

            <div className={classes.footer}>
                {/* <UserButton /> */}
            </div>
        </nav>
    </div>
  );
}