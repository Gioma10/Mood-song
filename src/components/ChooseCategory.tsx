import Button from "./Button";
import React, { useContext } from "react";
import AppContext from "../utils/AppContext";


interface ChooseCategoryProps{
    onNext: ()=> void,
    categories: {title: string, active:boolean, emotions: string[]}[],
    onSelectCategory: (index:number)=> void,
    disableBtn: boolean
}

const ChooseCategory: React.FC<ChooseCategoryProps> = ({onNext, categories, onSelectCategory, disableBtn})=>{
    const {setIsStarted} =useContext(AppContext)
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
                            onClick={()=>onSelectCategory(index)}>
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
                <Button isDisable={disableBtn} text="Next" onClick={onNext}></Button>
            </div>
        </div>
    )
}

export default ChooseCategory;