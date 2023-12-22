import Layout from "@/components/layout";
import CardLayout from "@/components/layout/CardLayout";
import Head from "next/head";
import appConfig from "../../app.json";

export default function Dashboard() {
	return (
		<>
			<Head>
				<title>Dashboard | {appConfig.name}</title>
			</Head>
			<Layout>
				<CardLayout>Welcome to Admin Panel</CardLayout>
			</Layout>
		</>
	);
}
