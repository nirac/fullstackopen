import Person from "./Person";

const Persons = (props) => {
    const {persons, newFilter} = props;
    return (
        <div>
            {
                persons.filter((person) => {
                    return person.name.toLowerCase().indexOf(newFilter) > -1
                }).map(person => <Person key={person.id} person={person}/>)
            }
        </div>
    )

}
export default Persons