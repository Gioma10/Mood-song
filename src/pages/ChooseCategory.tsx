import Button from "../components/Button";
import React from "react";

interface ChooseCategoryProps{
    categories: {title: string, active:boolean, emotions: {emotion:string, color: string}[]}[],
    onSelectCategory: (index:number)=> void,
    disableBtn: boolean
}

const ChooseCategory: React.FC<ChooseCategoryProps> = ({ categories, onSelectCategory, disableBtn})=>{

    return (
        <div className="flex flex-col justify-center items-center gap-24">
            <h2 className="text-6xl shadow-dance-text">Choose your Category</h2>
            <div className="flex gap-10">
                {categories.map((category, index)=>{
                    return (
                        <div 
                            key={index} 
                            className={`border ${category.active && 'shadow-purple-600'} shadow-2xl rounded-full w-62 h-62 group text-4xl cursor-pointer relative flex justify-center items-center`}
                            onClick={()=>onSelectCategory(index)}>
                            <p>{category.title}</p>
                            <div className={`absolute bottom-0  group-hover:opacity-100 transition-all duration-500 ${category.active ? 'opcaity-100' : 'opacity-0'}`}>
                                     {category.title === 'positivy' &&
                                         <svg width="150" height="75">
                                             <path d="M20,30 Q75,50 130,30" stroke="white" strokeWidth={3} fill="transparent"/>
                                         </svg>
                                     }
                                     {category.title === 'negativy' &&
                                         <svg width="150" height="75" className="rotate-180">
                                             <path d="M20,30 Q75,50 130,30" stroke="white" strokeWidth={3} fill="transparent"/>
                                         </svg>
                                     }
                                     {category.title === 'neutral' &&
                                         <svg width="150" height="75">
                                             <line x1="20" y1="30" x2="130" y2="30" stroke="white" strokeWidth={3}/>
                                         </svg>
                                     }
                             </div>
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