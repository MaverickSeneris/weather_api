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

  const hourlyData = weatherData?.hourly;
  const filteredHourlyData = hourlyData.filter(
    (_, index) => index === 0 || index % 2 !== 0
  );
  console.log(filteredHourlyData.map((item) => item.temp));

  const convertUnixTimestampToHHMM = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours().toString().padStart(2, "0"); // Ensure 2 digits
    // const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits
    // return `${hours}:${minutes}`;
    return `${hours}`;
  };

  return (
    <div>
      <Card>
        <div className="flex flex-col items-center gap-2">
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
          <div className="flex gap-2 ">
            <p className="text-2xl">
              H:{Math.ceil(weatherData?.daily[0].temp.max)}&deg;
            </p>
            <p className="text-2xl">
              L:{Math.ceil(weatherData?.daily[0].temp.min)}&deg;
            </p>
          </div>
          <div className="flex gap-5 w-10 self-start overflow-auto ... w-96 mt-5">
            {filteredHourlyData.map((hourData, index) => {
              return (
                <div className="flex flex-col gap-1 items-center justify-center" key={index}>
                  <p className="text-2xl">{index === 0 ? "Now" :convertUnixTimestampToHHMM(hourData.dt)}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@4x.png`}
                    alt="Weather icon"
                  />
                  <p className="text-2xl font-bold">{Math.ceil(hourData.temp)}&deg;</p>
                </div>
              );
            })}
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
