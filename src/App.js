import { useEffect, useState } from 'react'
import CurrentWeather from './components/CurrentWeather'
import CityForm from './components/CityForm'

require('dotenv').config()

const App = () => {

  const [dataAPI, setDataAPI] = useState({
    lat: 45.1885,
    lon: 5.7245,
    units: 'metric'
  })
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('Grenoble')

  const handleChangeCity = (e) => {
    setCity(e.target.value)
  }

  const handleSubmitCity = (e) => {
    e.preventDefault()
    const fetchGeocoding = async () => {
      try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${process.env.REACT_APP_OPENCAGEDATA_API_KEY}`)
        const data = await response.json()
        if (data.results[0] != null) {
          const coordinates = data.results[0].geometry
          setDataAPI((prev) => {
            return {
              ...prev,
              lat: coordinates.lat,
              lon: coordinates.lng
            }
          })
          console.log(dataAPI)     
        }

      } catch (err) {
        console.error(err)
      }
    }
    fetchGeocoding()
  }

  useEffect(() => {
    const abortController = new AbortController()

    const fetchWeather = async () => {
        try {
          const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${dataAPI.lat}&lon=${dataAPI.lon}&units=${dataAPI.units}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
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
    }, [dataAPI])

  return (
    <>
      <main className="main-content">
        <CityForm 
          city={city}
          handleChangeCity={handleChangeCity}
          handleSubmitCity={handleSubmitCity}
        />
        { weather && <CurrentWeather 
          currentWeatherData={weather.current}
          units={dataAPI.units}
        /> }
      </main>
    </>
  );
}

export default App;
