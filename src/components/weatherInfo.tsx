import { WeatherData } from "../../types.tsx";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Card from "./card.tsx";
import { Location } from "../App.tsx";

interface WeatherInfoProps {
  name: string;
  state: string;
  city: string;
  locations: [];
  weatherData: WeatherData[];
  setName: (name: string) => void;
  setState: (state: string) => void;
  setCity: (city: string) => void;
  setWeatherData: (weatherData: WeatherData[] | null) => void;
  setLocations: (locations: Location[] | []) => void;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  name,
  state,
  weatherData,
  setWeatherData,
  setName,
  setState,
  setCity,
  setLocations,
}) => {
  const handleResetData = () => {
    setWeatherData(null);
    setName("");
    setState("");
    setCity("");
    setLocations([]);
  };

  return (
    <div>
      <Card>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">
            {name}
            {state && <span>, {state}</span>}
          </h1>
          <p className="text-4xl font-black">
            {Math.ceil(weatherData.current?.temp)}&deg;
          </p>
          <p className="text-2xl">
            {weatherData.current?.weather[0].main} (
            {weatherData.current?.weather[0].description})
          </p>
          <div className="flex gap-2 ">
            <p className="text-2xl">
              H:{Math.ceil(weatherData.daily[0].temp.max)}&deg;
            </p>
            <p className="text-2xl">
              L:{Math.ceil(weatherData.daily[0].temp.min)}&deg;
            </p>
          </div>

          <button
            onClick={handleResetData}
            className="flex items-center text-2xl bg-blue-500 text-white py-2 px-4 mt-5 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <MdOutlineArrowBackIos size={30} />{" "}
            <span className="font-semibold">Go Back</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default WeatherInfo;
