
const Person = ({person, removeEntry}) => {
    return (
        <p>
            {person.name} {person.number}
            <button onClick={()=> removeEntry(person)}>delete</button>
        </p>
    )
}
 export default Person