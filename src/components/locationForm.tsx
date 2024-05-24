import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { FaSearchLocation } from "react-icons/fa";
import Card from "./card";

interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

const GeoLocationForm: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState<string | null>(null);

  console.log(locations);

  console.log(weatherData)

  const handleGeoLocation = (lat: number, lon: number) => {
    console.log(lat, lon);
    const apiKey = "fd994ec80d186de6dc97b9fd5ef8aac2";
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${apiKey}`
  
    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setError("Error fetching data from the API");
      });

};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiKey = "fd994ec80d186de6dc97b9fd5ef8aac2";
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    axios
      .get<Location[]>(apiUrl)
      .then((response) => {
        setLocations(response.data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
        setError("Error fetching data from the API");
      });
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-5xl font-thin mb-5">
            Weather <span className="font-bold">Wise</span>
          </h1>
          <form
            className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            onSubmit={handleSubmit}
          >
            <div className="flex-grow">
              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                required
                className="outline-none text-2xl w-full"
                placeholder="Enter a City..."
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <FaSearchLocation />
            </button>
          </form>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </Card>
      {locations.length > 0 && (
        <Card>
          <div className="flex flex-col items-start gap-3">
            {locations.map((location, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-1 items-start justify-start  cursor-pointer hover:text-blue-600 text-3xl active:text-blue-700 ..."
                  onClick={() =>
                    handleGeoLocation(location.lat, location.lon)
                  }
                >
                  <h2 className="text-2xl font-semibold">{location.name},</h2>
                  <h2 className="text-2xl font-thin">{location.state}</h2>
                  <h2 className="text-2xl font-thin">{location.country}</h2>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default GeoLocationForm;
