import { useState } from 'react'

import { Icon } from '@iconify/react'
import drizzleIcon from '@iconify/icons-noto/sun-behind-rain-cloud'
import thunderIcon from '@iconify/icons-noto/cloud-with-lightning'
import rainIcon from '@iconify/icons-noto/cloud-with-rain'
import snowIcon from '@iconify/icons-noto/cloud-with-snow'
import tornadoIcon from '@iconify/icons-noto/tornado'
import sunIcon from '@iconify/icons-noto/sun'
import cloudIcon from '@iconify/icons-noto/cloud'
import fogIcon from '@iconify/icons-noto/fog'

import plusIcon from '@iconify/icons-noto/plus'
import minusIcon from '@iconify/icons-noto/minus';


const CurrentWeather = ({ currentWeatherData, units }) => {

    const [isExtraInfoOpen, setIsExtraInfoOpen] = useState(false)

    const handleClickExtraInfo = () => {
        setIsExtraInfoOpen((prev) => !prev)
    }

    const { temp, sunrise, sunset, feels_like, pressure, humidity, clouds, uvi, wind_speed, weather: [{main}]} = currentWeatherData

    const getWeatherIcon = (description) => {
        if (description === 'Thunderstorm') return thunderIcon
        if (description === 'Drizzle') return drizzleIcon
        if (description === 'Rain') return rainIcon
        if (description === 'Snow') return snowIcon
        if (description === 'Tornodo') return tornadoIcon
        if (description === 'Clear') return sunIcon
        if (description === 'Clouds') return cloudIcon
        return fogIcon
    }

    const getTemperatureUnit = (units) => {
        if (units === 'metric') return '°C'
        if (units === 'imperial') return '°F'
        return '°K'
    }

    const getWindSpeedUnit = (units) => {
        if (units === 'imperial') return 'mph'
        return 'km/h'
    }

    const getWindSpeed = (windSpeed) => {
        if (units === 'imperial') return windSpeed
        // convert m/s to km/h with a 0.1 precision
        return Math.round(windSpeed * 3.6 * 10) / 10
    }

    const weatherIcon = getWeatherIcon(main)

    const temperature = Math.floor(temp) 
    const real_feel = Math.floor(feels_like * 10) / 10
    const temperatureUnit = getTemperatureUnit(units)

    const windSpeedUnit = getWindSpeedUnit(units)

    // Get date
    const today = new Date()
    const day = today.getDate()
    const monthRaw = today.toLocaleString('default', { month: 'short'})
    const month = monthRaw[0].toUpperCase() + monthRaw.slice(1)
    const currentDay = `${month} ${day}`

    return (
        <div className="current-weather">
            <div className="current-weather__card">
                <h2>{currentDay}</h2>
                <div className="current-weather__main-info">
                    <p className="current-weather__temperature">{`${temperature} ${temperatureUnit}`} </p>
                    <Icon 
                        className="current-weather__icon-weather"
                        icon={weatherIcon} 
                    />
                    <p className="current-weather__description">{main}</p>
                    <Icon 
                        className="current-weather__icon-plus"
                        icon={isExtraInfoOpen ? minusIcon : plusIcon} 
                        onClick={handleClickExtraInfo}
                    />
                </div>
                { isExtraInfoOpen && <div className="current-weather__extra-info">
                    <div className="current-weather__real_feel extra-info__card">
                        <p className="real_feel__label extra-info__label">Real feel</p>
                        <p className="real_feel__value extra-info__value">{`${real_feel} ${temperatureUnit}`}</p>
                    </div>
                    <div className="current-weather__humidity extra-info__card">
                        <p className="humidity__label extra-info__label">Humidity</p>
                        <p className="humidity__value extra-info__value">{`${humidity}%`}</p>
                    </div>
                    <div className="current-weather__cloudiness extra-info__card">
                        <p className="cloudiness__label extra-info__label">Cloudiness</p>
                        <p className="cloudiness__value extra-info__value">{`${clouds}%`}</p>
                    </div>
                    <div className="current-weather__pressure extra-info__card">
                        <p className="pressure__label extra-info__label">Pressure</p>
                        <p className="pressure__value extra-info__value">{`${pressure} mbar`}</p>
                    </div>
                    {/* TODO : change wind speed to km/h */}
                    <div className="current-weather__wind-speed extra-info__card">
                        <p className="wind-speed__label extra-info__label">Wind speed</p>
                        <p className="wind-speed__value extra-info__value">{`${getWindSpeed(wind_speed)} ${windSpeedUnit}`}</p>
                    </div>
                    <div className="current-weather__uvi extra-info__card">
                        <p className="uvi__label extra-info__label">UV index</p>
                        <p className="uvi__value extra-info__value">{Math.round(uvi)}</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default CurrentWeather
