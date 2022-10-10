import {useEffect, useState} from 'react';
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');

    useEffect(()=>{
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data);
            })
    }, []);

    const addPerson = (event) => {
        event.preventDefault();
        const alreadyAdded = persons.filter(person => person.name === newName);
        if (alreadyAdded.length !== 0) {
            window.alert(`${newName} is already added to the phonebook`);
            setNewName('');
            return
        }

        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        };
        setPersons([...persons, personObject]);
        setNewName('');
        setNewNumber('');
    }


    const handleChangeFilter = (event) => {
        setNewFilter(event.target.value);
    }

    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value);
    };

    const handleChangeName = (event) => {
        setNewName(event.target.value);
    };


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter}/>
            <h2>Add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} handleChangeName={handleChangeName}
                        newNumber={newNumber} handleChangeNumber={handleChangeNumber}/>

            <h2>Numbers</h2>
            <Persons persons={persons} newFilter={newFilter}/>
        </div>
    )
}

export default App
