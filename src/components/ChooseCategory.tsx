import Button from "./Button";
import React, { useState, useContext } from "react";
import AppContext from "../utils/AppContext";

interface ChooseCategoryProps{
    onNext: ()=> void
}

const ChooseCategory: React.FC<ChooseCategoryProps> = ({onNext})=>{
    const {setIsStarted} =useContext(AppContext)

    const [categories, setCategories]= useState<{title: string, active:boolean}[]>([
            {title: 'positivy', active: false },
            {title: 'negativy', active: false },
            {title: 'neutral', active: false },
            {title: 'variable', active: false },
            ])

    const handleSelectCategory= (index: number, title: string )=>{
        setCategories(prevCategories =>
            prevCategories.map((category, i) => ({
                ...category,
                active: i === index, // Solo l'elemento cliccato diventa attivo
            }))
        );
    }

    const handleBack= ()=>{
        setIsStarted(false)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-32">
                <h2 className="text-6xl">Choose your Category</h2>
                <div className="flex gap-10">
                    {categories.map((category, index)=>{
                        return (
                            <div 
                                key={index} 
                                className={`border ${category.active && 'border-[#7D3C98]'} p-20 text-4xl cursor-pointer `}
                                onClick={()=>handleSelectCategory(index, category.title)}>
                                <p>{category.title}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="flex gap-6">
                    <Button 
                        text="Back"
                        onClick={handleBack}>
                    </Button>
                    <Button text="Next" onClick={onNext}></Button>
                </div>
            </div>
    )
}

export default ChooseCategory;