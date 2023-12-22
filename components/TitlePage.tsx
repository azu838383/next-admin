import { Text } from "@mantine/core";

const TitlePage = ({ label }: { label: string }): JSX.Element => {
	return (
		<div className="title-page px-4 py-2">
			<Text size="lg">{label}</Text>
		</div>
	);
};

export default TitlePage;
