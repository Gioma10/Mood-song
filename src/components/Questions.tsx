import React from "react";
import { useState } from "react";
import ChooseCategory from "./ChooseCategory";
import ChooseEmotions from "./ChooseEmotions";
import { ANSWERQUESTIONS } from "../utils/answerQuestions";

interface answerObject{
    category: string,
    emotions: string[],
}

const Questions: React.FC = ()=>{
    const [isNext, setIsNext]= useState<boolean>(false)
    const [categories, setCategories]= useState<{title: string, active:boolean, emotions: string[]}[]>(ANSWERQUESTIONS);
    const [answer, setAnswer]= useState<answerObject>({
        category: '',
        emotions: [], 
    })
    
    // Categoria selezionata 
    const handleSelectCategory= (index: number )=>{
        setCategories(prevCategories =>
            prevCategories.map((category, i) => ({
                ...category,
                active: i === index, // Solo l'elemento cliccato diventa attivo
            }))
        );
    }
    
    const selectedCategory  = categories.filter((category)=> category.active && category.title);
    const isSelected = selectedCategory.length > 0
    // console.log(selectedCategory);


    // Prossima domanda 
    const handleNext= ()=>{
        setIsNext(prevNext => !prevNext);
        setAnswer(prevAnswer =>{
            return {
                ...prevAnswer,
                category: selectedCategory[0].title
            }
        })
    }
    console.log(answer);
    
    //Funzione salvataggio risposte
    const handleGenerate = (selectedEmotions: string[] )=>{
        setAnswer(prevAnswer =>{
            return {
                ...prevAnswer,
                emotions: selectedEmotions,
            }
        })
    }
    console.log(answer);
    

    return (
        <main className="h-screen flex justify-center items-center">
            {!isNext ? 
                <ChooseCategory disableBtn={!isSelected} onSelectCategory={handleSelectCategory} categories={categories} onNext={handleNext}/>
                :
                <ChooseEmotions onGenerate={handleGenerate} onNext={handleNext} emotions={selectedCategory[0].emotions}/>
            }
        </main>
    )
}

export default Questions;