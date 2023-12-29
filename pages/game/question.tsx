import { useLoading } from "@/components/Loading";
import Layout from "@/components/layout";
import CardLayout from "@/components/layout/CardLayout";
import { Button } from "@mantine/core";
import Head from "next/head";
import React, { useState } from "react";
import appConfig from "../../app.json";

export default function Question() {
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
    const [isCheat, setIsCheat] = useState(false)

    return (
        <>
            <Head>
                <title>Little Game | {appConfig.name}</title>
            </Head>
            <Layout>
                <div className="grid grid-cols-2 gap-4">
                    <CardLayout className="text-center flex flex-col gap-4 items-center h-44">
                        Are you gay?
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
                                        message: "Yes I know 🤣",
                                        type: "warning",
                                    });
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

                    </CardLayout>
                </div>
            </Layout>
        </>
    );
}
