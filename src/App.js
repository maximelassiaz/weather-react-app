import { useEffect, useState } from 'react'
import CurrentWeather from './components/CurrentWeather'

require('dotenv').config()

const App = () => {

  const [weather, setWeather] = useState(null)
  // const [city, setCity] = useState('Paris')
  const lat = 48.8566
  const lon = 2.3522
  const units = 'metric'

  useEffect(() => {
    const abortController = new AbortController()

    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        const response = await fetch( url, {
          signal: abortController.signal
        })
        const weatherData = await response.json()
        setWeather(weatherData)
        /* TODO: Change error logic with setError */
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.error(err)
        }
      }
    }
    fetchWeather()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <>
      { weather && <CurrentWeather 
        currentWeatherData={weather.current}
        units={units}
      />}
    </>
  );
}

export default App;
