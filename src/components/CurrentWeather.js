import { Icon } from '@iconify/react'
import drizzleIcon from '@iconify/icons-noto/sun-behind-rain-cloud'
import thunderIcon from '@iconify/icons-noto/cloud-with-lightning'
import rainIcon from '@iconify/icons-noto/cloud-with-rain'
import snowIcon from '@iconify/icons-noto/cloud-with-snow'
import tornadoIcon from '@iconify/icons-noto/tornado'
import sunIcon from '@iconify/icons-noto/sun'
import cloudIcon from '@iconify/icons-noto/cloud'
import fogIcon from '@iconify/icons-noto/fog'


const CurrentWeather = ({ currentWeatherData, units }) => {

    const { temp, sunrise, sunset, feels_like, pressure, humidity, uvi, wind_speed, weather: [{main}]} = currentWeatherData

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

    const temperature = Math.floor(temp)

    const weatherIcon = getWeatherIcon(main)
    const temperatureUnit = getTemperatureUnit(units)

    const today = new Date()
    const day = today.getDate()
    const month = today.toLocaleString('default', { month: 'short'})
    const currentDay = `${month[0].toUpperCase()}${month.slice(1)} ${day}`

    return (
        <div className="current-weather">
            <div className="current-weather__card">
                <h2>{currentDay}</h2>
                <div className="current-weather__main">
                    <Icon 
                        className="current-weather__icon"
                        icon={weatherIcon} 
                    />
                    <p className="current-weather__temperature">{`${temperature} ${temperatureUnit}`} </p>
                    <p className="current-weather__description">{main}</p>
                </div>

            </div>
        </div>
    )
}

export default CurrentWeather
