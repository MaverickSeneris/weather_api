import React from "react";

interface LocationProps{
    name: string;
    state: string;
}

const LocationName: React.FC<LocationProps> = ({name, state}) => {
    return(
        <h1 className="text-4xl font-bold">
            {name}
            {state && <span className="font-thin">, {state}</span>}
          </h1>
    )
}

export default LocationName;