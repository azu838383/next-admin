import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout";
import CardLayout from "@/components/layout/CardLayout";
import Head from "next/head";
import appConfig from "../../app.json";
import { Button, Group, Stepper, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { RegexString } from "@/libs/constants";
import { useLoading } from "@/components/Loading";
import { MdCheck, MdClose } from "react-icons/md";
import { IRegisData, IResultData, IScrambleWords, RegisStart, SubmitResult } from "@/libs/api/wordBank";

export default function Scramble() {
    const {
		addNotification,
		handleError,
		showLoadingSpinner,
		hideLoadingSpinner,
	}: any = useLoading();

    const [step, setStep] = useState(0);
    const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

    const [registerState, setRegisterState] = useState<IRegisData>({name:''})
    const [dataWordSufle, setDataWordSufle] = useState<string[]>([])

    const handleSubmitName = async (): Promise<any> => {
        try {
            showLoadingSpinner()
            const data = await RegisStart(registerState)
            setDataWordSufle(data)
            setStep((current) => (current < 4 ? current + 1 : current))
        } catch (error) {
            handleError(error)
        } finally {
            hideLoadingSpinner()
        }
    }

    const initiateQuiz: IScrambleWords = {
        name: '',
        resultOne: '',
        resultTwo: '',
        resultThree: '',
    }
    const [resultScramble, setResultScramble] = useState<IScrambleWords>(initiateQuiz)
    const [dataResult, setDataResult] = useState<IResultData|undefined>(undefined)

    const handleSubmitResult = async (): Promise<any> => {
        try {
            showLoadingSpinner()
            const data = await SubmitResult(resultScramble)
            setDataResult(data)
            setStep((current) => (current < 4 ? current + 1 : current))
            console.log(data);
        } catch (error) {
            console.log(error);
            
            handleError(error)
        } finally {
            hideLoadingSpinner()
        }
    }

    const [isHover, setIsHover] = useState<number[]>([1])
    const [isCheat, setIsCheat] = useState(false)
    const [stateQuiz, setStateQuiz] = useState(true)

    useEffect(() => {
        if (stateQuiz) {
            const timer = setTimeout(() => {
                setStateQuiz(false);
            }, 60000);
            return () => clearTimeout(timer);
        }
    }, [stateQuiz])


    return (
        <>
            <Head>
                <title>Scramble words | {appConfig.name}</title>
            </Head>
            <Layout>
                <CardLayout className="text-center flex flex-col gap-4 items-center">
                    <Stepper active={step} allowNextStepsSelect={false} className="w-[90%]">
                        <Stepper.Step label="Registration" description="Register your name">
                            <Title>Register Your Name</Title>
                        </Stepper.Step>
                        <Stepper.Step label="Quiz 1" description="Answer question 1">
                            <div className="flex justify-center gap-2">
                                <Title>Quiz 1 </Title>
                            </div>
                        </Stepper.Step>
                        <Stepper.Step label="Quiz 2" description="Answer question 2">
                            <div className="flex justify-center gap-2">
                                <Title>Quiz 2</Title>
                            </div>
                        </Stepper.Step>
                        <Stepper.Step label="Quiz 3" description="Answer question 3">
                            <div className="flex justify-center gap-2">
                                <Title>Quiz 3</Title>
                            </div>
                        </Stepper.Step>
                        <Stepper.Completed>
                            <Title size={30}>Congratulations!</Title>
                        </Stepper.Completed>
                    </Stepper>

                    {step === 0 ? (
                        <TextInput
                            placeholder="Input your name here"
                            value={registerState.name}
                            onChange={(e) => {
                                if (RegexString.test(e.target.value)) {
                                    setRegisterState({...registerState, name: e.target.value})
                                    setResultScramble({ ...resultScramble, name: e.target.value })
                                } else if (e.target.value === '') {
                                    setResultScramble({ ...resultScramble, name: e.target.value })
                                }
                            }}
                        />
                    ) : step > 3 ? (
                        <div className="">
                            <Text size="xl">{dataResult?.data.name}</Text>
                            <Text size="xl" className="font-semibold">Your score is: {dataResult?.data.score}!</Text>
                            <Text size="sm">Correct answer {dataResult?.data.trueAnswer} of 3 Quiz</Text>
                        </div>
                    ) : (
                        stateQuiz ? (
                            <>
                                <Title size={36} className="uppercase">{step === 1? dataWordSufle[0] : step === 2 ? dataWordSufle[1] : dataWordSufle[2]}</Title>
                                <Text>Please correct word above!</Text>
                                <TextInput
                                    placeholder="Type your answer here"
                                    value={step === 1 ? resultScramble.resultOne : step === 2 ? resultScramble.resultTwo : resultScramble.resultThree}
                                    onChange={(e) => {
                                        if (RegexString.test(e.target.value)) {
                                            if (step === 1) {
                                                setResultScramble({ ...resultScramble, resultOne: e.target.value })
                                            } else if (step === 2) {
                                                setResultScramble({ ...resultScramble, resultTwo: e.target.value })
                                            } else {
                                                setResultScramble({ ...resultScramble, resultThree: e.target.value })
                                            }
                                        } else if (e.target.value === '') {
                                            if (step === 1) {
                                                setResultScramble({ ...resultScramble, resultOne: e.target.value })
                                            } else if (step === 2) {
                                                setResultScramble({ ...resultScramble, resultTwo: e.target.value })
                                            } else {
                                                setResultScramble({ ...resultScramble, resultThree: e.target.value })
                                            }
                                        }
                                    }}
                                />
                            </>
                        ) : (
                            <div className="min-h-[120px]">
                                Are you noob?
                                <div className="flex gap-4 relative ">
                                    <Button
                                        className={`absolute transition-all !w-20 ${isHover.includes(1) ? "-left-0 top-0" :
                                            isHover.includes(2) ? "left-0 top-14" :
                                                isHover.includes(3) ? "left-24 top-14" :
                                                    isHover.includes(4) ? "left-24 top-0" :
                                                        ""
                                            }`}
                                        onClick={() => {
                                            addNotification({
                                                position: "top-right",
                                                message: "Yes I know 🤣 you are noob!",
                                                type: "warning",
                                            });
                                            setStateQuiz(true)
                                        }}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        color={"red"}
                                        className={`absolute transition-all !w-20 ${isHover.includes(1) ? "left-0 top-0" :
                                            isHover.includes(2) ? "-left-24 top-0" :
                                                isHover.includes(3) ? "-left-24 top-14" :
                                                    isHover.includes(4) ? "left-0 top-14" :
                                                        ""
                                            }`}
                                        onClick={() => {
                                            addNotification({
                                                position: "top-right",
                                                message: isCheat ? "I appreciate your effort, thanks for playing 🤣" : "You cheat 😡",
                                                type: isCheat ? "success" : "error",
                                            });
                                            setStateQuiz(true)
                                        }}
                                        onMouseEnter={() => {
                                            if (isHover.includes(1)) {
                                                setIsHover([2])
                                            } else if (isHover.includes(2)) {
                                                setIsHover([3])
                                            } else if (isHover.includes(3)) {
                                                setIsHover([4])
                                            } else {
                                                setIsHover([1])
                                            }
                                            setIsCheat(true)
                                        }}
                                        onMouseLeave={() => {
                                            setIsCheat(false)
                                        }}
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                        )
                    )}

                    <Group justify="center">
                        {step < 4 && (
                            <>
                                {step > 1 && (
                                    <Button variant="default" onClick={prevStep}>Back</Button>
                                )}
                                <Button onClick={() => {
                                    if (step === 0) {
                                        handleSubmitName()
                                    } else if (step >= 1 && step <= 2) {
                                        setStep((current) => (current < 4 ? current + 1 : current))
                                    } else if (step === 3) {
                                        handleSubmitResult()
                                    }
                                    
                                }}
                                    disabled={step === 1 ? resultScramble.resultOne.length < 1 : step === 2 ? resultScramble.resultTwo.length < 1 : step === 3 ? resultScramble.resultThree.length < 1 : Number(resultScramble.name?.length) < 1}
                                >Next step</Button>
                            </>
                        )}
                    </Group>
                </CardLayout>
            </Layout>
        </>
    );
}
