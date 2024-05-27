import { WeatherData } from "../../types";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { LuWind } from "react-icons/lu";
import { IoIosWater } from "react-icons/io";
import { FaWater, FaEye } from "react-icons/fa";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { PiGaugeFill } from "react-icons/pi";
import Card from "./card";
import { Location } from "../App";

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

  // NOTE: Encapsulate this and make it as a function:
  const hourlyData = weatherData?.hourly;
  const filteredHourlyData = hourlyData.filter(
    (_, index) => index === 0 || index % 2 !== 0
  );

  // NOTE: Encapsulate this function:
  const convertUnixTimestampToHHMM = (
    timestamp: number,
    hourMin?: boolean
  ): string => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return hourMin ? `${hours}:${minutes}` : `${hours}`;
  };

  return (
    <div className="flex flex-col justify-center p-10">
      <Card>
        <div className="flex flex-col items-center gap-2 w-full px-1 py-5">
          {/* TODO: Make this a reusable component: LOCATION */}
          <h1 className="text-4xl font-bold">
            {name}
            {state && <span className="font-thin">, {state}</span>}
          </h1>
          {/* TODO: Make this a reusable component: CURRENT TEMP */}
          <p className="text-4xl font-black">
            {Math.ceil(weatherData.current?.temp)}&deg;
          </p>
          {/* TODO: Make this a reusable component: CURRENT CONDITION */}
          <p className="text-xl">
            {weatherData?.current.weather[0].main} (
            {weatherData?.current.weather[0].description})
          </p>
          {/* TODO: Make this a reusable component: CURRENT TEMP */}
          <div className="flex gap-5">
            <p className="text-xl">
              H: {Math.ceil(weatherData?.daily[0].temp.max)}&deg;
            </p>
            <p className="text-xl">
              L: {Math.ceil(weatherData?.daily[0].temp.min)}&deg;
            </p>
          </div>
          {/* TODO: Make this a reusable component: SUNSET SUNRISE */}
          <div className="flex gap-5 justify-start scrollbar-thin overflow-auto hover:overflow-scroll w-64 mt-3 mx-10 py-2">
            {filteredHourlyData.map((hourData, index) => {
              return (
                <div
                  className="flex flex-col gap-1 items-center justify-center "
                  key={index}
                >
                  <p className="text-sm">
                    {index === 0 ? (
                      <span className="text-xs font-semibold">Now</span>
                    ) : (
                      convertUnixTimestampToHHMM(hourData.dt)
                    )}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@4x.png`}
                    alt="Weather icon"
                  />
                  <p className="text-sm font-bold">
                    {Math.ceil(hourData.temp)}&deg;
                  </p>
                </div>
              );
            })}
          </div>
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
