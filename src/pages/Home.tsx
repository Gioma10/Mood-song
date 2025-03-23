import React, { useEffect } from "react";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
import { ANSWERQUESTIONS } from "../utils/answerQuestions";


interface HomeProps{
    setState: React.Dispatch<React.SetStateAction<{ title: string; active: boolean; emotions: string[] }[]>>
}

const Home: React.FC<HomeProps> = ({setState})=>{
    const location = useLocation()

    useEffect(()=>{
        setState(ANSWERQUESTIONS);

    },[location.pathname])
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-12">
            {/* <h1 className="text-9xl">Mood Song</h1>
                <Button path="/choose-category" text="Get Started" /> */}
                <Loading />
        </div>
    )
}

export default Home;