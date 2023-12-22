import QRDownload from "@/components/QRdownload";
import Layout from "@/components/layout";
import CardLayout from "@/components/layout/CardLayout";
import { Button, Code, Switch, Text, TextInput } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import appConfig from "../../app.json";

export default function QrCodePage() {
	const [checked, setChecked] = useState(false);
	const [value, setValue] = useState<string>("");
	const [label, setLabel] = useState<string>("");
	const [qrValue, setQrValue] = useState<string>(
		"TLNgsfhccRm4PPqcrbYAfeKSdqnXKxMF4Z"
	);
	const [labelSave, setLabelSave] = useState<string | undefined>(undefined);

	const handleGenerate = (): void => {
		setQrValue(value);
		if (label === "") {
			setLabelSave(undefined);
		} else {
			setLabelSave(label);
		}
	};

	const handleReset = (): void => {
		setLabel("");
		setValue("");
		setQrValue("TLNgsfhccRm4PPqcrbYAfeKSdqnXKxMF4Z");
		setLabelSave("Save");
	};

	return (
		<>
			<Head>
				<title>QRCode | {appConfig.name}</title>
			</Head>
			<Layout>
				<div className="flex flex-col">
					<div className="grid grid-cols-2 gap-4 min-h-[200px]">
						<CardLayout>
							<div className="flex flex-col gap-4">
								<div className="flex items-end gap-4">
									<TextInput
										label="Value to Generate"
										description="Input code value or text to generate"
										placeholder="Value generate to QRCode"
										value={value}
										onChange={(e) => {
											setValue(e.target.value);
										}}
									/>
									{checked && (
										<TextInput
											label="Label Button Save"
											description="You can change label button save here"
											placeholder="Label Button Save"
											value={label}
											onChange={(e) => {
												setLabel(e.target.value);
											}}
										/>
									)}
									<Button
										onClick={() => {
											if (value !== "") {
												handleGenerate();
											}
										}}
									>
										<Text>Generate</Text>
									</Button>
									<Button
										variant="outline"
										onClick={() => {
											handleReset();
										}}
									>
										<Text>Reset</Text>
									</Button>
								</div>
								<Switch
									checked={checked}
									onChange={(event) => {
										setChecked(event.currentTarget.checked);
									}}
									size="md"
									onLabel="ON"
									offLabel="OFF"
									label="Enable Download Function"
								/>
								<Code block>
									{`
    <QRDownload
        value={"${qrValue}"}
        size={120}
        variant={"${checked ? "download" : "default"}"}
        labelSave={"${labelSave ?? "Save"}"}
    />
                                `}
								</Code>
							</div>
						</CardLayout>
						<CardLayout>
							<div className="flex items-center justify-center h-full">
								<div className="flex flex-col items-center gap-4">
									<QRDownload
										value={qrValue}
										size={120}
										variant={
											checked ? "download" : "default"
										}
										labelSave={labelSave ?? "Save"}
									/>
									<div className="text-center">
										<Text>Value of QR Code:</Text>
										<Text>{qrValue}</Text>
									</div>
								</div>
							</div>
						</CardLayout>
					</div>
				</div>
			</Layout>
		</>
	);
}
