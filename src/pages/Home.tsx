import React, { useEffect } from "react";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";
import { ANSWERQUESTIONS } from "../utils/answerQuestions";
import Vortex from "../components/ui/Vortex";



interface HomeProps{
    setState: React.Dispatch<React.SetStateAction<{ title: string; active: boolean; emotions: {emotion: string, color: string}[] }[]>>
}

const Home: React.FC<HomeProps> = ({setState})=>{
    const location = useLocation()

    useEffect(()=>{
        setState(ANSWERQUESTIONS);

    },[location.pathname])
    return (
        <Vortex
            backgroundColor="black"
            className="flex flex-col justify-center items-center w-full h-screen gap-12 md:px-10">
                <h1 className="text-9xl relative w-full text-center font-bold text-white drop-shadow-[0_0_10px_rgba(173,133,255,0.8)] shadow-dance-text">
                    Mood Song
                </h1>
                <Button path="/choose-category" text="Get Started" />
        </Vortex>
    )
}

export default Home;