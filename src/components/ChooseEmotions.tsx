import React, {useState} from "react";
import Button from "./Button";

interface ChooseEmotionsProps{
    emotions: string[],
    onNext: ()=> void,
    onGenerate: (selectedEmotions:string[]) => void
}

const ChooseEmotions: React.FC<ChooseEmotionsProps> = ({emotions, onNext, onGenerate})=>{
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
    // Funzione per gestire il cambio di stato delle checkbox
    const handleCheckboxChange = (emotion: string) => {
        setSelectedEmotions((prev) =>
            prev.includes(emotion)
                ? prev.filter((item) => item !== emotion) // Rimuove se già presente
                : [...prev, emotion] // Aggiunge se non presente
        );
    };
    return (
        <div className="flex flex-col justify-center items-center gap-32">
            <h2 className="text-6xl">Choose your Emotions</h2>
            <div className="gap-2 flex flex-col p-10 border">
                    {emotions.map((emotion, index)=>{
                        return (
                            <div key={index} className="flex gap-2">
                                <input 
                                    type="checkbox" 
                                    checked={selectedEmotions.includes(emotion)}
                                    onChange={() => handleCheckboxChange(emotion)}/>
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
                <Button text="Generate" isDisable={selectedEmotions.length<1} onClick={()=>onGenerate(selectedEmotions)}></Button>
            </div>
        </div>
    )
}

export default ChooseEmotions;