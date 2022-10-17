import Person from "./Person";

const Persons = ({persons, newFilter, removeEntry}) => {
    return (
        <div>
            {
                persons.filter((person) => {
                    return person.name.toLowerCase().indexOf(newFilter) > -1
                }).map(person => <Person key={person.name} person={person} removeEntry={removeEntry}/>)
            }
        </div>
    )

}
export default Persons