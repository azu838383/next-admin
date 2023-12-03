import React from "react";
import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import Link from "next/link";
import { useDispatch } from 'react-redux'
import { HISTORY } from "@/store/actions/actionTypes";

export interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, link, links }: LinksGroupProps) {
  const dispatch = useDispatch()
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={()=>{
        dispatch({
          type: HISTORY.ADD_PAGE_TO_HISTORY,
          payload: {label: link.label, route: link.link}
        })
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <div onClick={() => setOpened((o) => !o)} className={`cursor-pointer ${classes.control}`}>
        <Group justify="space-between" gap={0}>
          {link ? (
            <Link
            href={String(link)}
            onClick={()=>{
              dispatch({
                type: HISTORY.ADD_PAGE_TO_HISTORY,
                payload: {label: label, route: link}
              })
            }}
            >
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon style={{ width: rem(18), height: rem(18) }} />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
            </Link>
          ):(
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
          )}
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </div>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
