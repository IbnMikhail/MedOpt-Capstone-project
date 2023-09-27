import React, { useState } from "react";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";

const AddDrug = () => {
  const [formData, setFormData] = useState({
    drugName: "",
    brand: "",
    price: "",
    description: "",
    ingredients: [],
  });
  const [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ingredientsArray = formData.ingredients
      .split(",")
      .filter((item) => item !== "");

    setFormData({
      ...formData,
      ingredients: ingredientsArray,
    });

    try {
      const response = await fetch("https://medopt.onrender.com/api/drug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMsg("Successfully added drug");
        setFormData({
          drugName: "",
          brand: "",
          price: "",
          description: "",
          ingredients: "",
        });
      } else {
        setMsg(data.message);
        setFormData({
          drugName: "",
          brand: "",
          price: "",
          description: "",
          ingredients: "",
        });
        console.error("Error:", response.statusText);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="bg-white h-100 px-10 pt-5 lg:px-60">
        <h4 className="text-xl mb-4 lg:text-3xl font-bold text-gray-700 text-center">
          Create New Drug Entry
        </h4>
            <p className="text-red-600 mb-3 text-center">{msg}</p>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label for="drug_name" className="block font-bold text-gray-700">
              Drug Name:
            </label>
            <input
              type="text"
              id="drug_id"
              name="drugName"
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 my-5"
              value={formData.drugName}
              onChange={handleInputChange}
            />

            <label for="Brand" className="block font-bold text-gray-700">
              Brand:
            </label>
            <input
              type="text"
              id="Brand"
              name="brand"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 my-5"
              value={formData.brand}
              onChange={handleInputChange}
            />

            <label for="price" className="block font-bold text-gray-700">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 my-5"
              value={formData.price}
              onChange={handleInputChange}
            />

            <label for="description" className="block font-bold text-gray-700">
              Description:
            </label>
            <input
              id="description"
              name="description"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 my-5"
              value={formData.description}
              onChange={handleInputChange}
            />

            <label for="description" className="block font-bold text-gray-700">
              Ingredients:
            </label>
            <input
              id="ingredients"
              name="ingredients"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 my-5"
              value={formData.ingredients}
              onChange={handleInputChange}
            />

            {loading ? (
              <p>Loading...</p>
            ) : (
              <input
                type="submit"
                value="Add Drug"
                className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 my-5"
              />
            )}
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default AddDrug;
