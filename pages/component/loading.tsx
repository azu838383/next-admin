import { useLoading } from "@/components/Loading";
import Layout from "@/components/layout";
import CardLayout from "@/components/layout/CardLayout";
import { ActionIcon, Button } from "@mantine/core";
import Head from "next/head";
import { FaClock } from "react-icons/fa";
import appConfig from "../../app.json";
import { useState } from "react";
import { IconSettings } from "@tabler/icons-react";

export default function LoadingPage() {
	const {
		addNotification,
		handleError,
		showLoadingSpinner,
		hideLoadingSpinner,
	}: any = useLoading();

	const handleLoading = (): void => {
		showLoadingSpinner();
		setTimeout(() => {
			hideLoadingSpinner();
		}, 3000);
	};

	const [isHover, setIsHover] = useState<number[]>([1])

	return (
		<>
			<Head>
				<title>Notification & Loading | {appConfig.name}</title>
			</Head>
			<Layout>
				<div className="grid grid-cols-2 gap-4">
					<CardLayout>
						<div className="grid grid-cols-2 gap-4">
							<Button
								onClick={() => {
									addNotification({
										position: "top-right",
										title: "Notification Default",
										message: "This default notification",
										type: "info",
										icon: <FaClock size={24} />,
										closingOn: 1000,
									});
								}}
							>
								Notification Default
							</Button>
							<Button
								bg={"green"}
								onClick={() => {
									addNotification({
										position: "top-right",
										title: "Notification Success",
										message: "This success notification",
										type: "success",
										className: "!text-white",
									});
								}}
							>
								Notification Success
							</Button>
							<Button
								bg={"red"}
								onClick={() => {
									addNotification({
										position: "top-right",
										title: "Notification Error",
										message: "This error notification",
										type: "error",
									});
								}}
							>
								Notification Error
							</Button>
							<Button
								onClick={() => {
									handleLoading();
								}}
							>
								Loading Overlay
							</Button>
							<Button
								bg={"red"}
								onClick={(error) => {
									handleError(error);
								}}
							>
								Error Catching, can be use on trycatch function
							</Button>
						</div>
					</CardLayout>
					<CardLayout className="text-center flex flex-col gap-4 items-center">
						Are you looser?
						<div className="flex gap-4 relative ">
							<Button
							className={`absolute transition-all !w-20 ${
								isHover.includes(1)?"-left-0 top-0":
								isHover.includes(2)?"left-0 top-14":
								isHover.includes(3)?"left-24 top-14":
								isHover.includes(4)?"left-24 top-0":
								""
							}`}
							onClick={()=>{
								addNotification({
									position: "top-right",
									message: "Yes I know 🤣",
									type: "success",
								});
							}}
							>
								Yes
							</Button>
							<Button
							color={"red"}
							className={`absolute transition-all !w-20 ${
								isHover.includes(1)?"left-0 top-0":
								isHover.includes(2)?"-left-24 top-0":
								isHover.includes(3)?"-left-24 top-14":
								isHover.includes(4)?"left-0 top-14":
								""
							}`}
							onClick={()=>{
								addNotification({
									position: "top-right",
									message: "You shouldn't be able to click on this 🤣",
									type: "error",
								});
							}}
							onMouseEnter={()=>{
								if(isHover.includes(1)){
									setIsHover([2])
								} else if(isHover.includes(2)) {
									setIsHover([3])
								} else if(isHover.includes(3)) {
									setIsHover([4])
								} else {
									setIsHover([1])
								}
							}}
							>
								No
							</Button>
						</div>
						
					</CardLayout>
				</div>
			</Layout>
		</>
	);
}
