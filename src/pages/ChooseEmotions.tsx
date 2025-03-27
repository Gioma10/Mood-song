import React, {useState} from "react";
import Button from "../components/Button";


interface ChooseEmotionsProps{
    emotions: {emotion: string, color: string}[] ,
    onGenerate: (selectedEmotions:string[], songsQuantity: string | number) => void
}

const ChooseEmotions: React.FC<ChooseEmotionsProps> = ({emotions, onGenerate})=>{
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
    const [songsQuantity, setSongsQuantity] = useState<number | string>('')

    // Funzione per gestire il cambio di stato delle checkbox
    const handleSelect = (emotion: string) => {
        setSelectedEmotions((prev) =>
            prev.includes(emotion)
                ? prev.filter((item) => item !== emotion) // Rimuove se già presente
                : [...prev, emotion] // Aggiunge se non presente
        );
    };

    console.log('emotions', selectedEmotions);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSongsQuantity(Number(event.target.value))
        
    }
    // console.log(songsQuantity);

    const disable: boolean = !(selectedEmotions.length >= 1 && (songsQuantity != ''))

    return (
        <div className="flex flex-col justify-center items-center gap-20">
            <h2 className="text-6xl shadow-dance-text">Choose your Emotions</h2>
            <div className="flex flex-col gap-8">
                <div className="flex justify-center p-10 gap-10">
                        {emotions.map((item, index)=>{
                            return (
                                <div 
                                    key={index} 
                                    className="cursor-pointer p-4 rounded-2xl w-32 text-center bg-black"
                                    style={{
                                        boxShadow: selectedEmotions.includes(item.emotion) ? `0px 4px 8px ${item.color}` : undefined,
                                        border: `1px outset ${item.color}`
                                    }}
                                    onClick={()=>handleSelect(item.emotion)}>
                                    <p>{item.emotion}</p>
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
                        className="bg-black text-center w-10  py-2 border focus:outline-none rounded-lg shadow-sm outline-none transition-all duration-200 border-gray-300 focus:border-purple-800 hover:border-purple-800"
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