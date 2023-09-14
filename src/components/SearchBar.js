const SearchBar = () => {
  return (
    <div>
       <h3 className="py-5 font-bold text-3xl text-center">Search for Alternative and Affordable Drugs</h3>
          <div className="bg-white border rounded-lg shadow p-4 mb-4">
            <div className="flex">
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Search"
              />
              <button className="btn btn-info btn-lg ml-2" type="button">
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </div>
    </div>
  );
};

export default SearchBar;
