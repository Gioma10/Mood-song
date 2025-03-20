import React, { useState } from "react";
import ChooseCategory from "./ChooseCategory";
import ChooseEmotions from "./ChooseEmotions";
import GenerateResult from "./GenerateResult";
import { ANSWERQUESTIONS } from "../utils/answerQuestions";

interface AnswerObject {
    category: string;
    emotions: string[];
}

const Questions: React.FC = () => {
    const [step, setStep] = useState<number>(0); // 0: categoria, 1: emozioni, 2: risultato
    const [categories, setCategories] = useState<{ title: string; active: boolean; emotions: string[] }[]>(ANSWERQUESTIONS);
    const [answer, setAnswer] = useState<AnswerObject>({ category: "", emotions: [] });

    // Selezione categoria
    const handleSelectCategory = (index: number) => {
        setCategories(prevCategories =>
            prevCategories.map((category, i) => ({
                ...category,
                active: i === index, // Solo l'elemento cliccato diventa attivo
            }))
        );
    };

    const selectedCategory = categories.find(category => category.active);
    const isSelected = !!selectedCategory;

    // Passa alla prossima schermata
    const handleNext = () => {
        if (step === 0 && selectedCategory) {
            setAnswer(prevAnswer => ({ ...prevAnswer, category: selectedCategory.title }));
        }
        setStep(prevStep => prevStep + 1);
    };

    // Salvataggio emozioni
    const handleGenerate = (selectedEmotions: string[]) => {
        setAnswer(prevAnswer => ({ ...prevAnswer, emotions: selectedEmotions }));
        handleNext();
    };
    
    return (
        <main className="h-screen flex justify-center items-center">
            {step === 0 && (
                <ChooseCategory disableBtn={!isSelected} onSelectCategory={handleSelectCategory} categories={categories} onNext={handleNext} />
            )}
            {step === 1 && selectedCategory && (
                <ChooseEmotions onGenerate={handleGenerate} onNext={handleNext} emotions={selectedCategory.emotions} />
            )}
            {step === 2 && <GenerateResult answer={answer} />}
        </main>
    );
};

export default Questions;
