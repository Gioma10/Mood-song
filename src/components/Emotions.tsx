interface EmotionProps {
    bgColor: string,
    name: string,
    timeListen: number
}

const Emotion: React.FC<EmotionProps> = ({ bgColor, name, timeListen }) => {

    return (
        <div className="flex gap-3 w-[25%] justify-center items-center mb-3">
            <div className="rounded-[50%] w-[20px] h-[20px]" style={{background: bgColor}}></div>
            <p>{name}:</p>
            <p>{timeListen}</p>
        </div>
    )
}

export default Emotion