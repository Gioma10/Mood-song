import Button from "../components/Button";
import React from "react";

interface ChooseCategoryProps{
    categories: {title: string, active:boolean, emotions: string[]}[],
    onSelectCategory: (index:number)=> void,
    disableBtn: boolean
}

const ChooseCategory: React.FC<ChooseCategoryProps> = ({ categories, onSelectCategory, disableBtn})=>{

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
                <Button path="/" text="Back" />
                <Button path="/choose-emotions" isDisable={disableBtn} text="Next" />
            </div>
        </div>
    )
}

export default ChooseCategory;