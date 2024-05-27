import { WeatherData } from "../../../types";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { LuWind } from "react-icons/lu";
import { IoIosWater } from "react-icons/io";
import { FaWater, FaEye } from "react-icons/fa";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { PiGaugeFill } from "react-icons/pi";
import Card from "../card";
import { Location } from "../../App";
import LocationName from "./locationName";
import CurrentWeather from "./currentWeather";
import HourlyWeatherInfo from "./hourlyWeatherInfo";
import convertUnixTimestampToHHMM from "../../lib/utils";


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
          {/* TODO: Make this a reusable component use array.map: WEATHER DETAILS */}
          <div className="grid grid-cols-2 mt-4 gap-y-3 gap-x-2.5">
            <Card>
              <div className="flex flex-col items-center justify-center px-10 py-2">
                <BsFillSunriseFill size={25} />
                <p className="text-sm mt-2">
                  {convertUnixTimestampToHHMM(weatherData.current.sunrise, true)}
                </p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center justify-center px-10 py-2">
                <BsFillSunsetFill size={25} />
                <p className="text-sm mt-2">
                  {convertUnixTimestampToHHMM(weatherData.current.sunset, true)}
                </p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start px-1.5 py-2 gap-2">
                <div className="flex items-center gap-1">
                  <LuWind size={13} />
                  <p className="text-xs font-semibold">Wind</p>
                </div>
                <p className="text-xl font-thin mt-2">{weatherData.current.wind_speed} km/h</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start px-1.5 py-2 gap-2">
                <div className="flex items-center gap-1">
                  <FaTemperatureThreeQuarters size={13} />
                  <p className="text-xs font-semibold">Feels Like</p>
                </div>
                <p className="text-xl font-thin mt-2">{Math.ceil(weatherData.current.feels_like)}&deg;</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start px-1.5 py-2 gap-2">
                <div className="flex items-center gap-1">
                  <FaWater size={13} />
                  <p className="text-xs font-semibold">Humidity</p>
                </div>
                <p className="text-xl font-thin mt-2">{Math.ceil(weatherData.current.humidity)} %</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start px-1.5 py-2 gap-2">
                <div className="flex items-center gap-1">
                  <IoIosWater size={13} />
                  <p className="text-xs font-semibold">Precipitation</p>
                </div>
                <p className="text-xl font-thin mt-2">{Math.ceil(weatherData.minutely[0].precipitation)} %</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start px-1.5 py-2 gap-2">
                <div className="flex items-center gap-1">
                  <PiGaugeFill size={13} />
                  <p className="text-xs font-semibold">Pressure</p>
                </div>
                <p className="text-xl font-thin mt-2">{Math.ceil(weatherData.current.pressure)} hPa</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start px-1.5 py-2 gap-2">
                <div className="flex items-center gap-1">
                  <FaEye size={13} />
                  <p className="text-xs font-semibold">Visibility</p>
                </div>
                <p className="text-xl font-thin mt-2">{Math.ceil(weatherData.current.visibility / 1000)} km</p>
              </div>
            </Card>
          </div>
          {/* TODO: Make this a reusable component: BUTTON */}
          <button
            onClick={handleResetData}
            className="flex items-center bg-blue-500 text-white py-2 px-4 mt-5 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <MdOutlineArrowBackIos size={20} />
            <span className="font-semibold text-lg">Go Back</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default WeatherInfo;
