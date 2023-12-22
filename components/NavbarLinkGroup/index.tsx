import { GENERAL, HISTORY } from "@/store/actions/actionTypes";
import { RootState } from "@/store/reducers";
import {
	Avatar,
	Box,
	Collapse,
	Group,
	ThemeIcon,
	rem
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./NavbarLinksGroup.module.css";

export interface LinksGroupProps {
	icon: React.FC<any>;
	image?: string;
	label: string;
	initiallyOpened?: boolean;
	link?: string;
	links?: { label: string; link: string }[];
	arrowMenu?: boolean;
}

export function LinksGroup({
	icon: Icon,
	image,
	label,
	link,
	links,
	arrowMenu,
}: LinksGroupProps) {
	const dispatch = useDispatch();
	const hasLinks = Array.isArray(links);
	const { dropDownSideBar } = useSelector(
		(state: RootState) => state.general
	);
	const items = (hasLinks ? links : []).map((link) => (
		<Link
			className={`${classes.link} !border-l-0 !pl-[30px] !ml-0 hover:text-[#82c8fd]`}
			href={link.link}
			key={link.label}
			onClick={() => {
				dispatch({
					type: HISTORY.ADD_PAGE_TO_HISTORY,
					payload: { label: link.label, route: link.link },
				});
			}}
		>
			<div className="border-l-2 pl-5 border-[#74c0fc]">{link.label}</div>
		</Link>
	));

	return (
		<>
			<div
				onClick={() => {
					if (!link) {
						if (!Array.isArray(dropDownSideBar)) {
							dispatch({
								type: GENERAL.SET_DROPDOWN_SIDEBAR_STATE,
								payload: [label],
							});
						} else if (!dropDownSideBar.includes(label)) {
							dispatch({
								type: GENERAL.SET_DROPDOWN_SIDEBAR_STATE,
								payload: [...dropDownSideBar, label],
							});
						} else {
							dispatch({
								type: GENERAL.SET_DROPDOWN_SIDEBAR_STATE,
								payload: dropDownSideBar.filter(
									(f) => f !== label
								),
							});
						}
					}
				}}
				className={`cursor-pointer ${classes.control}`}
			>
				<Group justify="space-between" gap={0}>
					{link ? (
						<Link
							className="w-full"
							href={String(link)}
							onClick={() => {
								dispatch({
									type: HISTORY.ADD_PAGE_TO_HISTORY,
									payload: { label: label, route: link },
								});
							}}
						>
							<Box
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<ThemeIcon variant="light" size={30}>
									<Icon
										style={{
											width: rem(18),
											height: rem(18),
										}}
									/>
								</ThemeIcon>
								<Box ml="md">{label}</Box>
							</Box>
						</Link>
					) : (
						<Box style={{ display: "flex", alignItems: "center" }}>
							{image ? (
								<Avatar src={image} alt="avatar" />
							) : (
								<ThemeIcon variant="light" size={30}>
									<Icon
										style={{
											width: rem(18),
											height: rem(18),
										}}
									/>
								</ThemeIcon>
							)}
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
								transform:
									Array.isArray(dropDownSideBar) &&
									dropDownSideBar.includes(label)
										? "rotate(-90deg)"
										: "none",
							}}
						/>
					)}
					{arrowMenu && (
						<IconChevronRight
							className={classes.chevron}
							stroke={1.5}
							style={{
								width: rem(16),
								height: rem(16),
							}}
						/>
					)}
				</Group>
			</div>
			{hasLinks ? (
				<Collapse
					in={
						Array.isArray(dropDownSideBar) &&
						dropDownSideBar.includes(label)
					}
				>
					{items}
				</Collapse>
			) : null}
		</>
	);
}
