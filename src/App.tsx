// Importing necessary React hooks and types
import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios"; // For making API calls
import "./App.css"; // Styling
import GeoLocationForm from "./components/locationForm"; // Form to input city
import WeatherInfo from "./components/weatherInfo"; // Component to show weather
import { WeatherData } from "../types"; // Type definition for weather data

// Custom type for location data from the geolocation API
export interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

function App() {
  // State to track user input and results
  const [city, setCity] = useState<string>(""); // User's input city
  const [locations, setLocations] = useState<Location[]>([]); // List of matched locations
  const [error, setError] = useState<string | null>(null); // Error messages
  const [name, setName] = useState<string>(""); // Selected location's name
  const [state, setState] = useState<string>(""); // Selected location's state
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Weather info

  // Form submission handler to fetch possible locations based on city name
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {


    const geoLocationUrl = import.meta.env.VITE_GEOLOCATION_URL
    e.preventDefault(); // Prevent form from refreshing the page
    const apiKey = import.meta.env.VITE_APP_KEY;
    const apiUrl = `${geoLocationUrl}q=${city}&limit=5&appid=${apiKey}`;

    axios
      .get<Location[]>(apiUrl)
      .then((response) => {
        setLocations(response.data); // Save locations
        setError(null); // Clear any previous error
      })
      .catch((error: []) => {
        console.error("Error fetching data from the API:", error);
        setError(`Error fetching data from the API: ${error}`);
      });
  };

  // Tracks input changes for city field
  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value); // Update city as user types
  };

  // Called when user picks a specific location
  const handleGeoLocation = (
    lat: number,
    lon: number,
    name: string,
    state: string
  ) => {
    console.log(lat, lon);
    setName(name);
    setState(state);
    const apiKey = import.meta.env.VITE_APP_KEY;
    const url = import.meta.env.VITE_URL;
    const unit = "metric";
    const apiUrl = `${url}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

    axios
      .get<WeatherData>(apiUrl)
      .then((response) => {
        setWeatherData(response.data); // Save weather info
        setError(null); // Clear error if successful
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setError("Error fetching data from the API");
      });
  };

  // Renders either the weather info or the city input form depending on whether we have weather data
  return (
    <div className="flex h-screen overflow-auto flex-col items-center justify-center bg-blue-500">
      {weatherData ? (
        <WeatherInfo
          city={city}
          locations={locations}
          name={name}
          state={state}
          weatherData={weatherData}
          setName={setName}
          setState={setState}
          setWeatherData={setWeatherData}
          setCity={setCity}
          setLocations={setLocations}
        />
      ) : (
        <GeoLocationForm
          handleSubmit={handleSubmit}
          locations={locations}
          city={city}
          handleCityChange={handleCityChange}
          error={error}
          setError={setError}
          handleGeoLocation={handleGeoLocation}
        />
      )}
    </div>
  );
}

export default App;
