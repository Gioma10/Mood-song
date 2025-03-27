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
            <button disabled={isDisable} onClick={onClick} className={`px-6 py-3 rounded-full mt-6 transition-all duration-300 
  ${isDisable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} 
  bg-gradient-to-r from-purple-500 to-pink-500 
  text-white font-bold text-lg 
  shadow-[0_0_15px_rgba(204,0,255,0.6)] 
  hover:shadow-[0_0_25px_rgba(204,0,255,0.9)] 
  hover:scale-105`}
>
                {text}
            </button>
        </Link>
    )
}

export default Button