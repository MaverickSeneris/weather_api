import { WeatherData } from "../../types.tsx";

interface WeatherInfoProps {
  name: string;
  state: string;
  weatherData: WeatherData[];
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ name, state, weatherdata }) => {
  return <div>WeatherInfo</div>;
}

export default WeatherInfo;
