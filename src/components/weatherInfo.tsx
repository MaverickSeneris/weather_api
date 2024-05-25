import { WeatherData } from "../../types.tsx";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { LuWind } from "react-icons/lu";
import { IoIosWater } from "react-icons/io";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { FaWater } from "react-icons/fa";
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

  const hourlyData = weatherData?.hourly;
  const filteredHourlyData = hourlyData.filter(
    (_, index) => index === 0 || index % 2 !== 0
  );
  console.log(filteredHourlyData.map((item) => item.temp));

  const convertUnixTimestampToHHMM = (
    timestamp: number,
    hourMin?: true | false
  ): string => {
    if (hourMin === true) {
      const date = new Date(timestamp * 1000);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } else {
      const date = new Date(timestamp * 1000);
      const hours = date.getHours().toString().padStart(2, "0");
      return `${hours}`;
    }
  };

  return (
    <div>
      <Card>
        <div className="flex flex-col items-center gap-2 w-full p-10">
          <h1 className="text-4xl font-bold">
            {name}
            {state && <span className="font-thin">, {state}</span>}
          </h1>
          <p className="text-6xl font-black">
            {Math.ceil(weatherData.current?.temp)}&deg;
          </p>
          <p className="text-2xl">
            {weatherData?.current.weather[0].main} (
            {weatherData?.current.weather[0].description})
          </p>
          <div className="flex gap-5">
            <p className="text-2xl">
              H: {Math.ceil(weatherData?.daily[0].temp.max)}&deg;
            </p>
            <p className="text-2xl">
              L: {Math.ceil(weatherData?.daily[0].temp.min)}&deg;
            </p>
          </div>
          <div className="flex gap-5 justify-center scrollbar-thin overflow-auto ... w-96 mt-7 mx-10">
            {filteredHourlyData.map((hourData, index) => {
              return (
                <div
                  className="flex flex-col gap-1 items-center justify-center "
                  key={index}
                >
                  <p className="text-2xl">
                    {index === 0
                      ? "Now"
                      : convertUnixTimestampToHHMM(hourData.dt)}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@4x.png`}
                    alt="Weather icon"
                  />
                  <p className="text-2xl font-bold">
                    {Math.ceil(hourData.temp)}&deg;
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 mt-10 gap-5">
            <Card>
              <div className="flex flex-col items-center px-20 py-5">
                <BsFillSunriseFill size={30} />
                <p className="text-xl mt-2">
                  {convertUnixTimestampToHHMM(
                    weatherData.current.sunrise,
                    true
                  )}
                </p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center px-20 py-5">
                <BsFillSunsetFill size={30} />
                <p className="text-xl mt-2">
                  {convertUnixTimestampToHHMM(weatherData.current.sunset, true)}
                </p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start p-5 gap-5">
                <div className="flex items-center gap-1">
                  <LuWind size={25}/>
                  <p className='text-xl font-semibold'>Wind</p>
                </div>
                <p className="text-3xl font-thin mt-2">{weatherData.current.wind_speed} km/h</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start p-5 gap-5">
                <div className="flex items-center gap-1">
                <FaTemperatureThreeQuarters size={25} />
                  <p className='text-xl font-semibold'>Feels Like</p>
                </div>
                <p className="text-3xl font-thin mt-2">{Math.ceil(weatherData.current.feels_like)}&deg;</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start p-5 gap-5">
                <div className="flex items-center gap-1">
                <FaWater size={25} />

                  <p className='text-xl font-semibold'>Humidity</p>
                </div>
                <p className="text-3xl font-thin mt-2">{Math.ceil(weatherData.current.humidity)} %</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col self-start p-5 gap-5">
                <div className="flex items-center gap-1">
                <IoIosWater size={25} />
                  <p className='text-xl font-semibold'>Precipitation</p>
                </div>
                <p className="text-3xl font-thin mt-2">{Math.ceil(weatherData.minutely[0].precipitation)} %</p>
              </div>
            </Card>
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
