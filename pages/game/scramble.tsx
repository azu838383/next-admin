import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout";
import CardLayout from "@/components/layout/CardLayout";
import Head from "next/head";
import appConfig from "../../app.json";
import { Button, Group, Stepper, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { RegexString } from "@/libs/constants";
import { IconCheck, IconCross, IconInfoCircle } from "@tabler/icons-react";
import { useLoading } from "@/components/Loading";
import { MdCheck, MdClose } from "react-icons/md";

export default function Scramble() {

    const [step, setStep] = useState(0);
    const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

    const originalString = [
        "elephant", "strawberry", "computer", "notebook", "giraffe", "sandwich",
        "cucumber", "keyboard", "backpack", "television", "headphone", "mountain",
        "waterfall", "landscape", "telephone", "beautiful", "restaurant", "triangle",
        "pineapple", "celebrate", "adventure", "challenge", "direction", "knowledge",
        "community", "celebrity", "important", "generation", "experience", "secretary",
        "preference", "investment", "university", "background", "understand", "lifestyle",
        "continuous", "technology", "enthusiastic", "combination", "performance", "atmosphere",
        "creativity", "decoration", "preparation", "imagination", "responsible", "individual",
        "motivation", "celebration", "opportunity", "competition", "development", "experience",
        "revolution", "atmosphere", "comfortable", "information", "advertising", "examination",
        "interesting", "environment", "complicated", "relationship", "traditional", "leadership",
        "communication", "application", "professional", "architecture", "relationship", "organization",
        "relationship", "communication", "interaction", "imagination", "respectable", "residential",
        "transaction", "complication", "understanding", "international", "complication", "organization",
        "entertainment", "conversation", "communication", "organization", "relationship", "transaction",
        "relationship", "transaction", "environment", "communication", "relationship", "environment",
    ];
    const shuffleString = (str: string) => {
        let arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join(' ');
    }

    const randomIndex = useMemo(() => Math.floor(Math.random() * originalString.length), []);
    const randomIndex2 = useMemo(() => Math.floor(Math.random() * originalString.length), []);
    const randomIndex3 = useMemo(() => Math.floor(Math.random() * originalString.length), []);
    const randomString = originalString[randomIndex];
    const randomString2 = originalString[randomIndex2];
    const randomString3 = originalString[randomIndex3];
    const shuffledString = useMemo(() => shuffleString(randomString), [randomString]);
    const shuffledString2 = useMemo(() => shuffleString(randomString2), [randomString2]);
    const shuffledString3 = useMemo(() => shuffleString(randomString3), [randomString3]);

    interface IScrambleWords {
        name?: string
        quizOne: string
        quizTwo: string
        quizThree: string
        score?: number
    }
    const initiateQuiz: IScrambleWords = {
        name: '',
        quizOne: '',
        quizTwo: '',
        quizThree: '',
        score: 0
    }
    const [resultScramble, setResultScramble] = useState<IScrambleWords>(initiateQuiz)
    const [quiz, setQuiz] = useState<number[]>([])

    const {
        addNotification,
    }: any = useLoading();

    const [isHover, setIsHover] = useState<number[]>([1])
    const [isCheat, setIsCheat] = useState(false)
    const [stateQuiz, setStateQuiz] = useState(true)

    useEffect(() => {
        if (stateQuiz) {
            const timer = setTimeout(() => {
                setStateQuiz(false);
            }, 30000);
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
                            value={resultScramble.name}
                            onChange={(e) => {
                                if (RegexString.test(e.target.value)) {
                                    setResultScramble({ ...resultScramble, name: e.target.value })
                                } else if (e.target.value === '') {
                                    setResultScramble({ ...resultScramble, name: e.target.value })
                                }
                            }}
                        />
                    ) : step > 3 ? (
                        <div className="">
                            <Text size="xl">{resultScramble.name}</Text>
                            <Text size="xl" className="font-semibold">Your score is: {((100 / 3) * quiz.filter((f) => f === 1).length).toFixed(0)}!</Text>
                            <Text size="sm">Correct answer {quiz.filter((f) => f === 1).length} of 3 Quiz</Text>
                            <div className="flex flex-col">
                                <div className={`flex justify-center items-center`}>
                                {resultScramble.quizOne} {quiz[0]===1?<MdCheck />:<MdClose />}
                                </div>
                                <div className={`flex justify-center items-center`}>
                                {resultScramble.quizTwo} {quiz[1]===1?<MdCheck />:<MdClose />}
                                </div>
                                <div className={`flex justify-center items-center`}>
                                {resultScramble.quizThree} {quiz[2]===1?<MdCheck />:<MdClose />}
                                </div>
                            </div>
                        </div>
                    ) : (
                        stateQuiz ? (
                            <>
                                <Title size={36} className="uppercase">{step === 1 ? shuffledString : step === 2 ? shuffledString2 : shuffledString3}</Title>
                                <Text>Please correct word above!</Text>
                                <TextInput
                                    placeholder="Type your answer here"
                                    value={step === 1 ? resultScramble.quizOne : step === 2 ? resultScramble.quizTwo : resultScramble.quizThree}
                                    onChange={(e) => {
                                        if (RegexString.test(e.target.value)) {
                                            if (step === 1) {
                                                setResultScramble({ ...resultScramble, quizOne: e.target.value })
                                            } else if (step === 2) {
                                                setResultScramble({ ...resultScramble, quizTwo: e.target.value })
                                            } else {
                                                setResultScramble({ ...resultScramble, quizThree: e.target.value })
                                            }
                                        } else if (e.target.value === '') {
                                            if (step === 1) {
                                                setResultScramble({ ...resultScramble, quizOne: e.target.value })
                                            } else if (step === 2) {
                                                setResultScramble({ ...resultScramble, quizTwo: e.target.value })
                                            } else {
                                                setResultScramble({ ...resultScramble, quizThree: e.target.value })
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
                                {step > 0 && (
                                    <Button variant="default" onClick={prevStep}>Back</Button>
                                )}
                                <Button onClick={() => {
                                    setStep((current) => (current < 4 ? current + 1 : current))
                                    shuffleString(randomString)
                                    if (step === 1) {
                                        setQuiz([
                                            (resultScramble.quizOne).toLowerCase() === randomString.toLowerCase() ? 1 : 0,
                                            quiz[1],
                                            quiz[2]
                                        ]);
                                    } else if (step === 2) {
                                        setQuiz([
                                            quiz[0],
                                            (resultScramble.quizTwo).toLowerCase() === randomString2.toLowerCase() ? 1 : 0,
                                            quiz[2]
                                        ]);
                                    } else if (step === 3) {
                                        setQuiz([
                                            quiz[0],
                                            quiz[1],
                                            (resultScramble.quizThree).toLowerCase() === randomString3.toLowerCase() ? 1 : 0
                                        ]);
                                    }
                                }}
                                    disabled={step === 1 ? resultScramble.quizOne.length < 1 : step === 2 ? resultScramble.quizTwo.length < 1 : step === 3 ? resultScramble.quizThree.length < 1 : Number(resultScramble.name?.length) < 1}
                                >Next step</Button>
                            </>
                        )}
                    </Group>
                </CardLayout>
            </Layout>
        </>
    );
}
