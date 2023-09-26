import React from "react";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";

const AddDrug = () => {
  return (
    <>
      <NavBar />

      <div className="bg-white h-100 p-10 px-60">
        <h4 className="text-3xl font-bold text-gray-700 text-center">Create New Drug Entry</h4>
        <div>
          <label for="drug_name" className="block font-bold text-gray-700">
            Drug Name:
          </label>
          <input
            type="text"
            id="drug_name"
            name="drug_name"
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 my-5"
          />

          <label for="Brand" className="block font-bold text-gray-700">
            Manufacturer:
          </label>
          <input
            type="text"
            id="Brand"
            name="Brand"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 my-5"
          />

          <label for="price" className="block font-bold text-gray-700">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 my-5"
          />

          <label for="description" className="block font-bold text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 my-5"
          ></textarea>

          <input
            type="submit"
            value="Add Drug"
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 my-5"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddDrug;
