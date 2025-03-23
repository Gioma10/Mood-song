import React, {useState} from "react";
import Button from "../components/Button";


interface ChooseEmotionsProps{
    emotions: string[] ,
    onGenerate: (selectedEmotions:string[], songsQuantity: string | number) => void
}

const ChooseEmotions: React.FC<ChooseEmotionsProps> = ({emotions, onGenerate})=>{
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
    const [songsQuantity, setSongsQuantity] = useState<number | string>('')

    // Funzione per gestire il cambio di stato delle checkbox
    const handleCheckboxChange = (emotion: string) => {
        setSelectedEmotions((prev) =>
            prev.includes(emotion)
                ? prev.filter((item) => item !== emotion) // Rimuove se già presente
                : [...prev, emotion] // Aggiunge se non presente
        );
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSongsQuantity(Number(event.target.value))
        
    }
    // console.log(songsQuantity);

    const disable: boolean = !(selectedEmotions.length >= 1 && (songsQuantity != ''))

    return (
        <div className="flex flex-col justify-center items-center gap-20">
                <h2 className="text-6xl">Choose your Emotions</h2>
            <div className="flex flex-col gap-8">
                <div className="gap-2 grid grid-cols-2 p-10 border">
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
                <div className="flex justify-center items-center gap-5">
                    <h4>Select the number of songs to generate: </h4>

                    <input 
                        type="number" 
                        placeholder="1"
                        min={1}
                        className="text-center w-10  py-2 border focus:outline-none rounded-lg shadow-sm outline-none transition-all duration-200 border-gray-300 focus:border-purple-500 hover:border-purple-400"
                        value={songsQuantity}
                        onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
            <div className="flex gap-6">
                <Button path="/choose-category" text="Back"/>
                <Button path="/result-generate" text="Generate" isDisable={disable} onClick={()=>onGenerate(selectedEmotions, songsQuantity)} />            
            </div>
        </div>
    )
}

export default ChooseEmotions;