import { Location } from "../../App";

interface LocationProps {
  handleGeoLocation: (
    lat: number,
    lon: number,
    name: string,
    state: string
  ) => void;
  locations: Location[];
}

const LocationResults: React.FC<LocationProps> = ({
  handleGeoLocation,
  locations,
}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-96 mx-7 my-5">
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
  );
};

export default LocationResults;
