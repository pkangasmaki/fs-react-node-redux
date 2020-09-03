import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ filteredPersons, setFilteredPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const addNumber = (e) => {
    e.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber
    }

    if(!newNumber || !newName) {
      alert("Name and number are required")
    }
    else {
      //Check if newName is already in persons[]
      let alreadyListed = false
      let i
      let alreadyListedId = 1
      let dataChange = {
        name: null,
        number: null,
        id: null
      }
      for (i = 0; i < persons.length; i++) {
          if (persons[i].name === newName) {
            alreadyListed = true
            alreadyListedId = persons[i].id
            if (alreadyListed) {
              dataChange = {
                name: persons[i].name,
                number: newNumber,
                id: persons[i].id
              }
            }
          }
      }

      //Add numberObject to persons[] if it wasn't already there
      if (alreadyListed) {
        const replaceBool = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (replaceBool) {
          personService
          .replaceNo(alreadyListedId, dataChange)
          .then(response => {
            personService
            .getAll()
            .then(response => {
              setPersons(response.data)
              setFilteredPersons(response.data)
              setErrorMsg(
                `Changed the phone number of ${newName}`
              )
              setTimeout(() => {
                setErrorMsg(null)
              }, 5000)
            })
          })
          .catch(error => {
            setErrorMsg(
              `Information of ${newName} has already been removed from the server`
            )
            setTimeout(() => {
              setErrorMsg(null)
            }, 5000)
          })
        }
      }
      //Luodaan uusi henkilö puhelinluetteloon
      else {
        personService
        .create(numberObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setFilteredPersons(persons.concat(response.data))

          //Notification
          setErrorMsg(
            `Added ${response.data.name} to the phonebook`
          )
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000)
        })
      }
    }

    //Reset input values
    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    //If filter is cleared, reset values
    if(event.target.value === '') {
      setFilteredPersons(persons)
    }
    else {
      const filterArray = []
      for (let i = 0; i < persons.length; i++) {
        if (persons[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
          filterArray.push(persons[i])
        }
      }
      setFilteredPersons(filterArray)
    }
  }

  const handleDelete = (id) => {

    //Find the name of the person with the parameter ID
    const findPerson = () => {
      return persons.filter(person => id === person.id)
    }
    let personObject = findPerson()

    //Person = The person with the parameter ID
    let person = personObject[0].name
    
    const result = window.confirm(`Delete ${person} ?`)
    if(result) {
      personService
      .remove(id)
      .then(response => {
        /*
        Tehään uus lista ilman poistettua id:tä
        */
       const newPersonArray = persons.filter(person => person.id !== id)
       const newFilteredPersonArray = filteredPersons.filter(person => person.id !== id)
       setPersons(newPersonArray)
       setFilteredPersons(newFilteredPersonArray)

       //Notification
       setErrorMsg(
        `Deleted ${person} from the phonebook`
        )
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMsg(
          `Information of ${person} has already been removed from the server`
        )
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h3>Phonebook</h3>
      <Notification message={errorMsg} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers:</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )

}

export default App