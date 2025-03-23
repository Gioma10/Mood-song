import Button from "../components/Button"
import Emotion from "../components/Emotions";

const Historical = () => {

    return (
        <div className="w-full h-[100%] pt-30">
            <h1 className="w-[200px] text-center m-auto text-5xl mb-10">Historical</h1>
            <div className="w-[90%]  bg-slate-300 h-80 m-auto text-black rounded-3xl mb-36">
                <h2 className="text-3xl text-center mt-10 pt-10">Ultime Canzoni</h2>
                <div className=" flex justify-around items-center mt-10">
                    <div className=" flex gap-3">
                        <p>immagine</p>
                        <p>titolo canzone - Cantante</p>
                    </div>
                    <div className=" flex gap-3">
                        <p>immagine</p>
                        <p>titolo canzone - Cantante</p>
                    </div>
                    <div className=" flex gap-3">
                        <p>immagine</p>
                        <p>titolo canzone - Cantante</p>
                    </div>
                </div>
                <div className=" p-0 mt-10 text-center">
                    <Button text="Visualizza tutto" path=""></Button>
                </div>
            </div>


            <div className="w-[90%]  bg-slate-300 h-100 m-auto text-black rounded-3xl mb-56">
                <h2 className="text-3xl text-center mt-10 pt-10">Canzoni per Emozioni</h2>
                
                <div className="flex flex-wrap mt-8">
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                    <Emotion bgColor="green" name="felicita" timeListen={10}/>
                </div>
                
            </div>


        </div>
    )
}

export default Historical; 