import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";

interface ButtonProps {
    handleResetData: () => void
}


const Button: React.FC<ButtonProps> = ({handleResetData}) => {
    return(
        <button
            onClick={handleResetData}
            className="flex items-center bg-blue-500 text-white py-2 px-4 mt-5 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <MdOutlineArrowBackIos size={20} />
            <span className="font-semibold text-lg">Go Back</span>
          </button>
    )
}

export default Button;