const Filter = ({newFilter, handleChangeFilter}) => {
    return (
        <p>
            Filter shown with: <input value={newFilter} onChange={handleChangeFilter}/>
        </p>
    )
}

export default Filter