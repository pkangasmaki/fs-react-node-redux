import React from 'react'
import Button from './Button'

const ShowCountries = ({singleCountry, filteredCountries, handleShowButton, weather, weatherIcon}) => {

    const weatherString = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    if (singleCountry) {
      return (
        <div>
          <h1>{filteredCountries[0].name}</h1>
          <p>capital {filteredCountries[0].capital}</p>
          <p>population {filteredCountries[0].population}</p>
          <h2>Spoken languages</h2>
          <ul>{filteredCountries[0].languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
          <img src={filteredCountries[0].flag} alt="Flag" width="160" height="106"></img>
          <h2>Weather in {filteredCountries[0].capital}</h2>
          <p><b>temperature: </b>{weather.main.temp} celcius</p>
          <img src={weatherString} alt="weather" width="70" height="70"></img>
          <p><b>wind: </b>{weather.wind.speed} mph direction {weather.wind.deg} degrees </p>
        </div>
      )
    } 
    else if (filteredCountries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
    else{
      return (
        <div>
          {filteredCountries.map(country => <p key={country.name}>{country.name}<Button country={country} handleShowButton={handleShowButton}/></p>)}
        </div>
      )
    }
  }

export default ShowCountries