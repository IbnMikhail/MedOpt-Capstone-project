import { useState } from "react";

const SearchBar = ({ click,btn}) => {
  let [search, setSearch] = useState("");

  const handleSearchClick = () => {
    click(search); // Pass the search term to the click function
  };

  return (
    <div>
      <h3 className="py-5 font-bold text-3xl text-center">
        Search for Alternative and Affordable Drugs
      </h3>
      <div className="bg-white border rounded-lg shadow p-4 mb-4">
        <div className="flex">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearchClick} // Call handleSearchClick when the button is clicked
            className="btn btn-info btn-lg ml-2"
            type="button"
          >
            <i className="fas fa-search"></i> {btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

