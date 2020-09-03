import React from 'react'
import Button from './Button'

const Persons = ({filteredPersons, handleDelete}) => {
    return (
      <div>{filteredPersons.map((person) =>
        <p key={person.name}>{person.name} {person.number}<Button handleDelete={handleDelete} id={person.id}/></p>
    )}</div>
    )
  }

export default Persons