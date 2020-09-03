import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'

/*
Weather api: openweathermap.org
*/

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [singleCountry, setSingleCountry] = useState(false)

  //weatherthings
  const [weather, setWeather] = useState({})
  const [query, setQuery] = useState('London')
  const [weatherIcon, setWeatherIcon] = useState('00')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => {
        setWeather(response.data)
        setWeatherIcon(response.data.weather[0].icon)
      })
  },[query])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if(event.target.value === '') {
      setFilteredCountries(countries)
      setSingleCountry(false)
    }
    else {
      const filterArray = []
      for (let i = 0; i < countries.length; i++) {
        if (countries[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
          filterArray.push(countries[i])
        }
      }
      setFilteredCountries(filterArray)
      if(filterArray.length === 1) {
        setQuery(filterArray[0].name)
        setSingleCountry(true)

      }
      else {
        setSingleCountry(false)
      }
    }
  }

  const handleShowButton = (country) => {
    const filterArray = []
    filterArray.push(country)
    setFilteredCountries(filterArray)
    setQuery(filterArray[0].name)
    setSingleCountry(true)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <ShowCountries singleCountry={singleCountry} filteredCountries={filteredCountries} handleShowButton={handleShowButton} weather={weather} weatherIcon={weatherIcon}/>
    </div>
  )
}

export default App