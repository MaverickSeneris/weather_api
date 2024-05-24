import { WeatherData } from "../../types.tsx";
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
  setCity:(city: string) => void
  setWeatherData: (weatherData: WeatherData | null) => void;
  setLocations: (locations: Location[] | []) => void
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  name,
  state,
  weatherData,
  setWeatherData,
  setName,
  setState,
  setCity,
  setLocations
}) => {
  const handleResetData = () => {
    setWeatherData(null);
    setName("")
    setState("")
    setCity("")
    setLocations([])
  };

  return (
    <div>
      <Card>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">
            {name}{state &&<span>, {state}</span>}
          </h1>
          <p className="text-4xl font-black">{Math.ceil(weatherData.current?.temp)}C</p>
          <button onClick={handleResetData}>Search a City</button>
        </div>
      </Card>
    </div>
  );
};

export default WeatherInfo;
