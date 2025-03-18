import React from "react";
import { useState } from "react";
import ChooseCategory from "./ChooseCategory";
import ChooseEmotions from "./ChooseEmotions";

interface answerObject{
    categories: string,
    emotions: string[],
}

const Questions: React.FC = ()=>{
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
            {!isNext ? 
                <ChooseCategory onNext={handleNext}/>
                :
                <ChooseEmotions />
            }
        </main>
    )
}

export default Questions;