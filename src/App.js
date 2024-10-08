import { useEffect, useState } from "react";
import './App.css';

function App() {

  const [city, setCity] = useState("")
  const [temp, setTemp] = useState("")
  const [humidity, setHumidity] = useState("")
  const [condition, setCondition] = useState("")
  const [windspeed, setWindSpeed] = useState("")
  const [loading, setLoading] = useState("")

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=8ed0f84b16d1451fb5c32057240810&q=${city}`)
      if (!res.ok) throw new Error("Invalid data")
      console.log(res)
      const data = await res.json()
      setTemp(data.current.temp_c)
      setHumidity(data.current.humidity)
      setCondition(data.current.condition.text)
      setWindSpeed(data.current.wind_kph)
      setLoading(false)
    } catch (error) {
      alert("Failed to fetch weather data")
      setLoading(false)
    }
  }
  const handleInputChange = (e) => {
    setTemp("")
    setHumidity("")
    setCondition("")
    setWindSpeed("")
    setCity(e.target.value)
  }
  return (
    <div className="App">
      <input type="text" onChange={handleInputChange} />
      <button onClick={handleSubmit}>Search</button>
      {temp && humidity && condition && windspeed &&
        <div className="weather-cards">
          <div className="weather-card"><h2>Temperature</h2><p>{temp}</p></div>
          <div className="weather-card"> <h2>Humidity</h2><p>{humidity}</p></div>
          <div className="weather-card"> <h2>Condition</h2><p>{condition}</p></div>
          <div className="weather-card"><h2>Wind Speed</h2><p>{windspeed}</p></div>
        </div>}
      {loading && <p>Loading data...</p>}
    </div>
  );
}

export default App;
