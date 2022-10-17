import {useEffect, useState} from 'react';
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import phonebookService from './services/persons';
import Notification from "./components/Notification";


const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(()=>{
        phonebookService
            .getAll()
            .then(initialEntries => {
                setPersons(initialEntries);
            })
    }, []);


    const addPerson = (event) => {
        event.preventDefault();

        const name = newName.trim()

        if(persons.some(p => p.name === name)){
            if(window.confirm(`${name} is already in the phonebook, do you want to replace the old number with a new one?`)) {
                const personObject = {
                    name: name,
                    number: newNumber,
                    id: persons.find(p => p.name === newName).id
                };
                phonebookService
                    .update(personObject)
                    .then(response => {
                        setPersons(persons.map(p => p.id !== response.id ? p : response))
                    })
                    .catch(error => {
                        setNotification({message: `Information about ${name} has already been removed from the server`,
                        type: 'errorMessage'});
                        setTimeout(() => {
                            setNotification(null);
                        }, 5000);
                    });
            }
            setNewName('');
            setNewNumber('');
            return
        }


        const personObject = {
                name: name,
                number: newNumber,
        };
        phonebookService
            .create(personObject)
            .then(returnedPerson => {
                setPersons([...persons, returnedPerson]);
            })
            .then(response => {
                setNotification({
                    message: `Added ${name}`,
                    type: 'notification'
                });
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
                setNewName('');
                setNewNumber('');
            });
    }


    const removeEntry = (personToRemove) =>{
            if(window.confirm(`Are you sure you want to delete ${personToRemove.name}`)){
                phonebookService
                    .deleteEntry(personToRemove.id)
                    .then(response => {
                        setPersons(persons.filter(person => person.id!==personToRemove.id))
                    })
                    .catch(error => {
                        alert(
                            `The entry was already deleted`
                        )
                    })
            }

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
            <Notification notification={notification} />
            <Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter}/>
            <h2>Add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} handleChangeName={handleChangeName}
                        newNumber={newNumber} handleChangeNumber={handleChangeNumber}/>

            <h2>Numbers</h2>
            <Persons persons={persons} newFilter={newFilter} removeEntry={removeEntry}/>
        </div>
    )
}

export default App;
