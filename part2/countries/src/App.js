import axios from "axios";
import React, {useEffect, useState} from "react";


const Weather = ({capital, weather}) => {
    if (weather === null) {
        return <p>loading weather</p>
    }

    const iconURL = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature is {weather.main.temp} degrees Celsius</p>
            <img alt="weather icon" src={iconURL}/>
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}


const Country = ({country}) => {
    const [show, setShow] = useState(false);
    const [weather, setWeather] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        if (show === true) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`)
                .then(response => {
                    setWeather(response.data)
                })
        }
    }, [show])


    return (
        <div key={country.cca3}>
            <li> {country.name.common}
                <button onClick={() => {
                    setShow(!show)
                }
                }> show
                </button>
            </li>
            {show &&
                <div>
                    <h1>{country.name.common}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Area: {country.area}</p>
                    <h2>Languages</h2>
                    <ul>
                        {Object.values(country.languages).map(lang =>
                            <li key={lang}> {lang} </li>
                        )}
                    </ul>
                    <img alt="Flag" src={country.flags.png} width="200px"/>
                    <Weather capital={country.capital} weather={weather}/>
                </div>
            }
        </div>
    )
}

const FilterCountries = ({filter, countries}) => {
    const filteredList = countries.filter((country) => {
        return country.name.common.toLowerCase().indexOf(filter) > -1
    })

    if (filteredList.length > 10) {
        return (
            <p>Too many matches, specify another filter.</p>
        )
    }

    if (filteredList.length < 1) {
        return (
            <p>No matches, specify another filter.</p>
        )
    }

    if (filteredList.length === 1) {

        return (
            <Country country={filteredList[0]}/>)
    }
    return (
        filteredList.map(country => {
            return (
                <Country key={country.cca3} country={country}/>)
        })
    )
}

const App = () => {
    const [countries, setCountries] = useState([]);
    const [newFilter, setFilter] = useState('')


    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data);
            })
    }, [])

    return (
        <div>
            Find country:
            <input value={newFilter} onChange={(event) => setFilter(event.target.value)}/>
            <FilterCountries filter={newFilter} countries={countries}/>
        </div>
    );
}

export default App;

