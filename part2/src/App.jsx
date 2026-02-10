import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    axios.post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      {/* FILTER */}
      <div>
        filter shown with
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <h3>Add new</h3>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h3>Numbers</h3>
      {personsToShow.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App