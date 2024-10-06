
const SearchInput = ({onChangeHandler}) => {
    return (
        <input type="text" className="border-2 border-blue-400 rounded-md font-base p-2" onChange={onChangeHandler} />
    )
}

export default SearchInput;