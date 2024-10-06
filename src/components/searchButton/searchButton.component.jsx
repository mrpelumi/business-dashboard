
const SearchButton = ({onSubmitHandler}) => {
    return (
        <button className="px-4 p-2 bg-blue-900 text-white rounded-md text-lg" onClick={onSubmitHandler}>Search</button>
    )
}


export default SearchButton;