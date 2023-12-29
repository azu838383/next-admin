import React, { useState } from "react";
import Layout from "@/components/layout";
import CardLayout from "@/components/layout/CardLayout";
import Head from "next/head";
import appConfig from "../../app.json";
import { Button, Group, Stepper, Text, TextInput, Title } from "@mantine/core";

export default function Scramble() {

    const [active, setStep] = useState(0);
    const nextStep = () => setStep((current) => (current < 5 ? current + 1 : current));
    const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

    const originalString = [
        "default",
        "components",
        "mantine",
        "useState",
        "typescript",
        "javascript",
      ];
      
      const shuffleString = (str:string)=> {
        let arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join(' ');
      }
      const randomIndex = Math.floor(Math.random() * originalString.length);
      const randomString = originalString[randomIndex];
      const shuffledString = shuffleString(randomString);
      
    return (
        <>
            <Head>
                <title>Scramble words | {appConfig.name}</title>
            </Head>
            <Layout>
                <CardLayout className="text-center flex flex-col gap-4 items-center">
                    <Stepper active={active} allowNextStepsSelect={false} className="w-[90%]">
                        <Stepper.Step label="Quiz 1" description="Create an account">
                            <Title>Quiz 1</Title>
                        </Stepper.Step>
                        <Stepper.Step label="Quiz 2" description="Verify email">
                            <Title>Quiz 2</Title>
                        </Stepper.Step>
                        <Stepper.Step label="Quiz 3" description="Get full access">
                            <Title>Quiz 3</Title>
                        </Stepper.Step>
                        <Stepper.Step label="Quiz 4" description="Verify email">
                            <Title>Quiz 4</Title>
                        </Stepper.Step>
                        <Stepper.Step label="Quiz 5" description="Get full access">
                            <Title>Quiz 5</Title>
                        </Stepper.Step>
                        <Stepper.Completed>
                            <Title size={20}>Your score is:</Title>
                        </Stepper.Completed>
                    </Stepper>

                    <Title size={30} className="uppercase">{shuffledString}</Title>
                    <Text>Please correct word above!</Text>
                    <TextInput
                        placeholder="Type your answer here"
                        
                    />

                    <Group justify="center">
                        <Button variant="default" onClick={prevStep}>Back</Button>
                        <Button onClick={nextStep}>Next step</Button>
                    </Group>
                </CardLayout>
            </Layout>
        </>
    );
}
