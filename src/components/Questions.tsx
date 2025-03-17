import React from "react";
import { useState } from "react";

interface QuestionsProps{
    onBack: ()=> void
}


const Questions: React.FC<QuestionsProps> = ({onBack})=>{

    const [categories, setCategories]= useState<{title: string, active:boolean}[]>([
        {title: 'positivy', active: false },
        {title: 'negativy', active: false },
        {title: 'neutral', active: false },
        {title: 'variable', active: false },
        ])

    const handleSelectCategory= (index: number, )=>{
        setCategories(prevCategories =>
            prevCategories.map((category, i) => ({
                ...category,
                active: i === index, // Solo l'elemento cliccato diventa attivo
            }))
        );
    }

    return (
        <main className="h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-32">
                <h2 className="text-6xl">Choose your Category</h2>
                <div className="flex gap-10">
                    {categories.map((category, index)=>{
                        return (
                            <div 
                                key={index} 
                                className={`border ${category.active && 'border-[#7D3C98]'} p-20 text-4xl cursor-pointer `}
                                onClick={()=>handleSelectCategory(index)}>
                                <p>{category.title}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="flex gap-6">
                    <button 
                        className="border py-1 px-4 cursor-pointer"
                        onClick={onBack}>
                            back
                    </button>
                    <button className="border py-1 px-4 cursor-pointer">Next</button>
                </div>
            </div>
        </main>
    )
}

export default Questions;