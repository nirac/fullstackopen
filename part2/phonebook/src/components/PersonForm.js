
const PersonForm = ({addPerson, newName, handleChangeName, newNumber, handleChangeNumber}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <p>name: <input value={newName} onChange={handleChangeName}/></p>
                <p>number: <input value={newNumber} onChange={handleChangeNumber}/></p>
            </div>
            <p>
                <button type="submit">add</button>
            </p>
        </form>
    )
}

export default PersonForm