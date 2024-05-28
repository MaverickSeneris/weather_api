import React from "react";
import { WeatherData } from "../../../types";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaWater, FaEye } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { LuWind } from "react-icons/lu";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { PiGaugeFill } from "react-icons/pi";
import convertUnixTimestampToHHMM from "../../lib/utils";
import Card from "../shared/card";

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weatherData }) => {
  const weatherDetails = [
    {
      name: "Wind",
      icon: <LuWind size={30} />,
      data: weatherData.current.wind_speed,
      unit: "km/h",
    },
    {
      name: "Feels Like",
      icon: <FaTemperatureThreeQuarters size={13} />,
      data: Math.ceil(weatherData.current.feels_like),
      unit: "°C",
    },
    {
      name: "Humidity",
      icon: <FaWater size={30} />,
      data: Math.ceil(weatherData.current.humidity),
      unit: "%",
    },
    {
      name: "Precipitation",
      icon: <IoIosWater size={30} />,
      data: Math.ceil(weatherData.minutely[0].precipitation),
      unit: "%",
    },
    {
      name: "Pressure",
      icon: <PiGaugeFill size={30} />,
      data: Math.ceil(weatherData.current.pressure),
      unit: "hpa",
    },
    {
      name: "Visibility",
      icon: <FaEye size={30} />,
      data: Math.ceil(weatherData.current.visibility / 1000),
      unit: "km",
    },
  ];

  return (
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

      {weatherDetails.map((data, index) => {
        return (
          <Card>
            <div className="flex flex-col self-start px-1.5 py-2 gap-2">
              <div key={index} className="flex items-center gap-1">
                {data.icon}
                <p className="text-xs font-semibold">{data.name}</p>
              </div>
              <p className="text-xl font-thin mt-2">
                {data.data} {data.unit}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default WeatherDetails;
