import { Link } from "react-router-dom"

interface ButtonProps {
    onClick?: () => void,
    text: string,
    isDisable?: boolean
    path: string
}

const Button: React.FC<ButtonProps> = ({ text, onClick, isDisable, path }) => {
    return (
        <Link to={path}>
            <button disabled={isDisable} onClick={onClick} className={`bg-purple-500 p-2.5 rounded-2xl mt-6 transition hover:bg-purple-600 hover:translate-x-0.5 hover:translate-y-0.5 ${isDisable ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                {text}
            </button>
        </Link>
    )
}

export default Button