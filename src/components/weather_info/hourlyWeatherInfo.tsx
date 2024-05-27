import React from "react";
import { WeatherData } from "../../../types";
import convertUnixTimestampToHHMM from "../../lib/utils";


interface HourlyWeatherInfoProps {
    weatherData: WeatherData
}

const HourlyWeatherInfo: React.FC<HourlyWeatherInfoProps> = ({weatherData}) => {
  const hourlyData = weatherData?.hourly;
  const filteredHourlyData = hourlyData.filter(
    (_, index) => index === 0 || index % 2 !== 0
  );
  return (
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
            <p className="text-sm font-bold">{Math.ceil(hourData.temp)}&deg;</p>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyWeatherInfo
