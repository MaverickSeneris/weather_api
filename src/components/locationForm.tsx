import React, { useState } from "react";
import axios from "axios";
import { FaSearchLocation } from "react-icons/fa";
import Card from "./card";

function GeoLocationForm() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [limit, setLimit] = useState(1);
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = "fd994ec80d186de6dc97b9fd5ef8aac2";
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${5}&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };

  return (
    <Card>
      <h1 className="text-5xl font-thin mb-5">
        Weather <span className="font-bold">Wise </span>
      </h1>
      <form
        className=" flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="outline-none text-2xl"
            placeholder="Enter a City..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {/* <FaSearchLocation/> */}
          Search
        </button>
      </form>
    </Card>
  );
}

export default GeoLocationForm;
