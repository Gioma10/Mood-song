interface ButtonProps {
    onClick?: () => void,
    text: string,
    isDisable?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, onClick, isDisable }) => {
    return (
        <button disabled={isDisable} onClick={onClick} className={`bg-purple-500 p-2.5 rounded-2xl mt-6 transition hover:bg-purple-600 hover:translate-x-0.5 hover:translate-y-0.5 ${isDisable ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            {text}
        </button>
    )
}

export default Button