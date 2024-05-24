import { WeatherData } from "../../types.tsx";
import Card from "./card.tsx";

interface WeatherInfoProps {
  name: string;
  state: string;
  weatherData: WeatherData[];
  setWeatherData: (weatherData: WeatherData | null) => void;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  name,
  state,
  weatherData,
  setWeatherData,
}) => {
  const handleResetData = () => {
    setWeatherData(null);
  };

  return (
    <div>
      <Card>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">
            {name}{state &&<span>, {state}</span>}
          </h1>
          <p className="text-4xl font-black">{Math.ceil(weatherData.current?.temp)}C</p>
          <button onClick={handleResetData}>Search</button>
        </div>
      </Card>
    </div>
  );
};

export default WeatherInfo;
