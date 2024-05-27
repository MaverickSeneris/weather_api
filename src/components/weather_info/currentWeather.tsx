import React from "react";
import {WeatherData} from '../../../types'

interface CurrentWeatherProps {
  weatherData: WeatherData
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({weatherData}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-4xl font-black">
        {Math.ceil(weatherData.current?.temp)}&deg;
      </p>

      <p className="text-xl">
        {weatherData?.current.weather[0].main} (
        {weatherData?.current.weather[0].description})
      </p>

      <div className="flex gap-5">
        <p className="text-xl">
          H: {Math.ceil(weatherData?.daily[0].temp.max)}&deg;
        </p>
        <p className="text-xl">
          L: {Math.ceil(weatherData?.daily[0].temp.min)}&deg;
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
