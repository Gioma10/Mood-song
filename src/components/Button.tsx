const Button: React.FC<{ text: string }> = ({ text }) => {
    return (
        <button className="bg-purple-500 p-2.5 rounded-2xl mt-6 cursor-pointer transition hover:bg-purple-600 hover:translate-x-0.5 hover:translate-y-0.5">{text}</button>
    )
}

export default Button