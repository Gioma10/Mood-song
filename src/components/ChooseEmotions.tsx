import React from "react";
import Button from "./Button";

interface ChooseEmotionsProps{
    emotions: string[],
    onNext: ()=> void,
}

const ChooseEmotions: React.FC<ChooseEmotionsProps> = ({emotions, onNext})=>{
    return (
        <div className="flex flex-col justify-center items-center gap-32">
            <h2 className="text-6xl">Choose your Emotions</h2>
            <div className="gap-2 flex flex-col p-10 border">
                    {emotions.map((emotion, index)=>{
                        return (
                            <div key={index} className="flex gap-2">
                                <input type="checkbox" />
                                <label>
                                    {emotion}
                                </label>
                            </div>
                        )
                    })}
                
            </div>
            <div className="flex gap-6">
                <Button 
                    text="Back"
                    onClick={onNext}>
                </Button>
                <Button text="Generate"></Button>
            </div>
        </div>
    )
}

export default ChooseEmotions;