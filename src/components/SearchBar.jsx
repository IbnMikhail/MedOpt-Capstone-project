const SearchBar = () => {
  return (
    <div>
      <div className="container mx-auto mt-4 p-4"/>
        <h2 className="text-2xl font-semibold mb-2">Search for Alternative and Affordable Drugs</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
            <form>
                <div className="mb-4">
                    <label  className="block text-gray-700 font-bold mb-2">Current Drug:</label>
                    <input type="text" id="currentDrug" name="currentDrug" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter current drug"/>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Search</button>
            </form>
        </div>

    </div>
  )
}

export default SearchBar
