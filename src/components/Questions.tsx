import React from "react";
import { useState } from "react";
import ChooseCategory from "./ChooseCategory";

interface QuestionsProps{
    onBack: ()=> void
}

interface answerObject{
    categories: string,
    emotions: string[],
}

const Questions: React.FC<QuestionsProps> = ()=>{
    const [isNext, setIsNext]= useState<boolean>(false)

    const [answer, setAnswer]= useState<answerObject>({
        categories: '',
        emotions: [], 
    })

    const handleNext= ()=>{
        setIsNext(true);
    }

    return (
        <main className="h-screen flex justify-center items-center">
            <ChooseCategory onNext={handleNext}/>
        </main>
    )
}

export default Questions;