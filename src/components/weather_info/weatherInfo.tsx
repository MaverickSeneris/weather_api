import { WeatherData } from "../../../types";
import Card from "../card";
import { Location } from "../../App";
import LocationName from "./locationName";
import CurrentWeather from "./currentWeather";
import HourlyWeatherInfo from "./hourlyWeatherInfo";
import Button from "../shared/button";
import WeatherDetails from "./weatherDetails";

interface WeatherInfoProps {
  name: string;
  state: string;
  city: string;
  locations: Location[];
  weatherData: WeatherData;
  setName: (name: string) => void;
  setState: (state: string) => void;
  setCity: (city: string) => void;
  setWeatherData: (weatherData: WeatherData | null) => void;
  setLocations: (locations: Location[]) => void;
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
    <div className="flex flex-col justify-center p-10">
      <Card>
        <div className="flex flex-col items-center gap-2 w-full px-1 py-5">
          <LocationName name={name} state={state}/>
          <CurrentWeather weatherData={weatherData}/>
          <HourlyWeatherInfo weatherData={weatherData}/>
          <WeatherDetails weatherData={weatherData}/>
          <Button handleResetData={handleResetData}/>
        </div>
      </Card>
    </div>
  );
};

export default WeatherInfo;