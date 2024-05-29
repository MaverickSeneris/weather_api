import React, { FormEvent, ChangeEvent } from "react";
import Card from "../components/shared/card";
import { Location } from "../App";
import Form from "../components/location_form/form";
import Header from "../components/shared/header";
import LocationResults from "../components/location_form/locationResults";

interface GeoLocationFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleGeoLocation: (
    lat: number,
    lon: number,
    name: string,
    state: string
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
    <div>
      <Card>
        <Header />
        <Form
          handleCityChange={handleCityChange}
          handleSubmit={handleSubmit}
          city={city}
        />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </Card>
      {locations.length > 0 && (
        <Card>
          <LocationResults
            handleGeoLocation={handleGeoLocation}
            locations={locations}
          />
        </Card>
      )}
    </div>
  );
};

export default GeoLocationForm;
