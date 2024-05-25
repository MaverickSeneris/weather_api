import React, { FormEvent, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import Card from "./card";
import { Location } from "../App";

interface GeoLocationFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleGeoLocation: ( 
    lat: number,
    lon: number,
    name: string,
    state?: string
  ) => void;
  locations: Location[];
  city: string;
  error: string | null;
  setError: (error: string | null) => void;
}

const GeoLocationForm: React.FC<GeoLocationFormProps> = ({
  handleSubmit,
  handleCityChange,
  handleGeoLocation,
  locations,
  city,
  error,
}) => {
  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center">
      <Card>
        <div className="flex flex-col items-center justify-center gap-2 p-10">
          <h1 className="text-5xl font-thin mb-5">
            Weather <span className="font-bold">Wise</span>
          </h1>
          <form
            className="flex items-center w-full px-3 py-2 border-2 rounded-lg shadow-sm bw-2 hover:border-sky-200 focus:outline-none focus:ring focus:border-blue-300 border-slate-500"
            onSubmit={handleSubmit}
          >
            <div className="flex-grow">
              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                required
                className="outline-none text-2xl w-full bg-transparent placeholder-slate-500"
                placeholder="Enter a City..."
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <FaSearch size={20} />
            </button>
          </form>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </Card>
      {locations.length > 0 && (
        <Card>
          <div className="flex flex-col items-start gap-3 w-96 mx-11 my-5">
            {locations.map((location, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-1 items-start justify-start  cursor-pointer hover:text-blue-600 text-3xl active:text-blue-700 ..."
                  onClick={() =>
                    handleGeoLocation(
                      location.lat,
                      location.lon,
                      location.name,
                      location.state
                    )
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
