import React, {FormEvent, ChangeEvent} from 'react'
import { FaSearch } from "react-icons/fa";

interface FormProps{
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  city: string;
}

const Form: React.FC<FormProps> = ({handleSubmit, city, handleCityChange}) => {
  return (
<div className="flex flex-col items-center justify-center gap-2 px-5 pb-5">
          
          <form
            className="flex items-center w-full px-3 py-2 border-2 rounded-lg shadow-sm bw-2 hover:border-sky-200 focus:outline-none focus:ring focus:border-blue-300 border-slate-500"
            onSubmit={handleSubmit}
          >
            <div className="flex-grow">
              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                required
                className="outline-none text-2xl w-full bg-transparent placeholder-slate-500"
                placeholder="Enter a City..."
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <FaSearch size={20} />
            </button>
          </form>
        </div>
  )
}

export default Form