import { Image, Menu, ScrollArea, UnstyledButton, rem } from "@mantine/core";
import {
	IconComponents,
	IconDeviceGamepad,
	IconGauge,
	IconLogout,
	IconNotes,
	IconQrcode,
	IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import Router from "next/router";
import { useModal } from "../context/ModalsContextProvider";
import { LinksGroup } from "../navbarLinkGroup";
import classes from "./SideNavbar.module.css";

export const listMenu = [
	{
		label: "Dashboard",
		icon: IconGauge,
		link: "/dashboard",
		desc: "This is menu dashboard",
	},
	{
		label: "Component",
		icon: IconComponents,
		initiallyOpened: true,
		new: true,
		desc: "All of component will be here",
		links: [
			{
				label: "Table",
				link: "/component/table",
				desc: "Component Table can be use with <TableComp ...props />",
			},
			{
				label: "QRCode",
				link: "/component/qrcode",
				desc: "Component QRCode can be use with <QRCode ...props />",
			},
			{
				label: "Chart Statistic",
				link: "/component/chartjs",
				desc: "Component Chart Statistic can be use with <ChartComp ...props />",
			},
			{
				label: "Notification & Loading",
				link: "/component/loading",
				desc: "Component Notification & Loading can be use on all of action what you do",
			},
		],
	},
	{
		label: "Little Game",
		icon: IconDeviceGamepad,
		initiallyOpened: true,
		new: true,
		desc: "All of game will be here",
		links: [
			{
				label: "Scramble words",
				link: "/game/scramble",
				desc: "This game will decrease your stress 😊",
			},
		],
	},
	{
		label: "Readme",
		icon: IconNotes,
		link: "/readme",
		desc: "This is page about this project",
	},
];

export function SideNavbar({ opened }: { opened: boolean }) {
	const { showModal } = useModal();
	const links = listMenu.map((item) => (
		<LinksGroup {...item} key={item.label} />
	));

	return (
		<div
			className={`h-screen fixed z-20 bg-slate-900 text-white transition-all duration-300 overflow-hidden ${opened ? "w-[250px] opacity-1" : "opacity-0 w-[0]"
				}`}
		>
			<nav className={`w-[250px] drop-shadow-md ${classes.navbar}`}>
				<div className={classes.header}>
					<Link href={"/"} className="flex justify-center">
						<Image
							src={"/img/logo/sgg-logo-yellow.png"}
							alt="Logo Admin"
							h={50}
							w="auto"
							fit="contain"
							className="saturate-200 drop-shadow-none "
						/>
					</Link>
				</div>

				<ScrollArea className={`${classes.links}`}>
					<div className={classes.linksInner}>{links}</div>
				</ScrollArea>

				<div className={classes.footer}>
					<Menu shadow="md" width={200} position="right-end">
						<Menu.Target>
							<UnstyledButton className="w-full flex items-center">
								<LinksGroup
									icon={IconUser}
									image="/img/user.webp"
									label="Account"
									arrowMenu
								/>
							</UnstyledButton>
						</Menu.Target>

						<div className="pb-2">
							<Menu.Dropdown>
								<Menu.Label>Account</Menu.Label>
								<Menu.Item
									leftSection={
										<IconQrcode
											style={{
												width: rem(14),
												height: rem(14),
											}}
										/>
									}
									onClick={() => {
										showModal("showQR");
									}}
								>
									2FA Code
								</Menu.Item>
								<Menu.Divider />
								<Menu.Item
									leftSection={
										<IconLogout
											style={{
												width: rem(14),
												height: rem(14),
											}}
										/>
									}
									onClick={() => {
										Router.push("/");
									}}
								>
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
