import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import "./App.css";
import GeoLocationForm from "./components/locationForm";
import WeatherInfo from "./components/weatherInfo";
import { WeatherData } from "../types";

export interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

function App() {
  const [city, setCity] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiKey = "fd994ec80d186de6dc97b9fd5ef8aac2";
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    axios
      .get<Location[]>(apiUrl)
      .then((response) => {
        setLocations(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setError("Error fetching data from the API");
      });
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleGeoLocation = (
    lat: number,
    lon: number,
    name: string,
    state: string
  ) => {
    console.log(lat, lon);
    setName(name);
    setState(state);
    const apiKey = "fd994ec80d186de6dc97b9fd5ef8aac2";
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setError("Error fetching data from the API");
      });
  };

  return (
    <div className=" flex flex-col h-screen flex items-center justify-center bg-blue-500 ">
      {weatherData ? <WeatherInfo
        name={name}
        state={state}
        weatherData={weatherData}
        setName={setName}
        setState={setState}
        setWeatherData={setWeatherData}
        setCity={setCity}
        setLocations={setLocations}
      /> :
      <GeoLocationForm
        handleSubmit={handleSubmit}
        locations={locations}
        city={city}
        handleCityChange={handleCityChange}
        error={error}
        setError={setError}
        handleGeoLocation={handleGeoLocation}
      />}
      :
    </div>
  );
}

export default App;
