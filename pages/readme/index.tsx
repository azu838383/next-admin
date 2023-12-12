import React from 'react'
import Layout from '@/components/layout'
import Head from 'next/head'
import appConfig from '../../app.json'
import TitlePage from '@/components/TitlePage'
import { Text, Title } from '@mantine/core'
import CardLayout from '@/components/layout/CardLayout'

export default function Dashboard() {

  return (
    <>
    <Head>
      <title>Readme | {appConfig.name}</title>
    </Head>
    <Layout>
      <div className="grid grid-cols-2">
        <CardLayout>
          <div className="text-justify">
            <div className="mb-2">
              <Title order={2}>Introduction</Title>
              <Text size='sm'>
                The objective of this project is to develop a versatile and efficient admin panel template using Mantine components. Leveraging the robustness and flexibility of Mantine, this initiative aims to streamline the process of building powerful admin interfaces.
              </Text>
            </div>
            <div className="mb-2">
              <Title order={2}>Project Goals</Title>
              <Text size='sm'>
                <b>Utilization of Mantine Components:</b> The project centers around harnessing {"Mantine's"} diverse and customizable set of UI components. These components are instrumental in crafting an intuitive, responsive, and visually appealing admin panel.
              </Text>
              <Text size='sm'>
                <b>Efficiency and Ease of Use:</b> The primary focus is on creating a template that facilitates the rapid development of admin interfaces. By integrating Mantine components, the project aims to simplify the setup and configuration processes for developers.
              </Text>
              <Text size='sm'>
                <b>Customizability and Scalability:</b> The admin panel template will be designed with flexibility in mind, allowing for easy customization and adaptation to various project requirements. Scalability is a key consideration to ensure the template can accommodate future enhancements.
              </Text>
            </div>
            <div className="mb-2">
              <Title order={2}>
                Features 
              </Title>
              <Text size='sm'>
                <b>Responsive Layout:</b> The admin panel will feature a responsive layout optimized for various devices, ensuring seamless user experiences across different screen sizes.
              </Text>
              <Text size='sm'>
                <b>Mantine Component Integration:</b> The utilization of a wide array of Mantine components for navigation menus, forms, data visualization, and more, providing a consistent and polished user interface.
              </Text>
              <Text size='sm'>
                <b>Theming and Styling:</b> Customizable theming options to enable easy branding and styling adjustments, allowing users to personalize the appearance of the admin panel.
              </Text>
              <Text size='sm'>
                <b>Ready-to-Use Starter Kit:</b> The project will deliver a ready-to-use starter kit containing all the necessary configurations, reducing the setup time for developers.
              </Text>
              <Text size='sm'>
                <b>Documentation and Support:</b> Comprehensive documentation will accompany the template, offering guidance on usage, customization, and troubleshooting. Additionally, support channels will be available to assist developers in implementing the admin panel.
              </Text>
            </div>
            <div className="mb-2">
              <Title order={2}>
                Conclusion
              </Title>
              <Text size='sm'>
                Creating an admin panel template using Mantine components aims to empower developers by offering a robust foundation for building powerful and user-friendly interfaces. By focusing on ease of use, customizability, and scalability, this project endeavors to accelerate the development process and enhance the overall user experience for admin interfaces.
              </Text>
            </div>
          </div>
        </CardLayout>
      </div>
    </Layout>
    </>
  )
}
