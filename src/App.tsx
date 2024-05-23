import {useState, useEffect} from "react";
import axios from 'axios'
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchWeather = async () => {
    try {
      const apiKey = "fd994ec80d186de6dc97b9fd5ef8aac2"
      const lat = "14.5948914"
      const long = "120.9782618"
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${apiKey}`

      const response = await axios.get(url)
      setWeatherData(response.data)
    } catch (error) {
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }

  fetchWeather()
}, [])

console.log(weatherData)

if (loading) <div>Loading...</div>
if (error) <div>Error:{error}</div>
  return (
    <div className="h-screen bg-gradient-to-r from-rainbow">
      
    </div>
  );
}

export default App;
