import { Divider, Text } from "@mantine/core";
import React from "react";

const TitlePage = ({label}:{label:string}): JSX.Element => {

	return (
        <div className="title-page">
            <Text size='lg'>{label}</Text>
            <Divider my={'sm'} className='!border-white !border-opacity-40'/>
        </div>
    )
}

export default TitlePage
