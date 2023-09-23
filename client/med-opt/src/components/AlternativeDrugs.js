const AlternativeDrugs = ({
  price,
  name,
  brand,
  description,
  ingredients,
  bg,
}) => {
  return (
    <div>
      <div className="mb-4">
        <a href="#" className="block md:flex md:items-center">
          <div className="md:w-1/4">
            <p
              className="w-full h-[8rem] flex justify-center items-center text-3xl font-bold" 
              id={bg}
            >
              &#8358; {price}
            </p>
          </div>
          <div className="md:w-3/4 md:ml-4">
            <h3 className="text-xl font-semibold mb-2">Product Name: {name}</h3>
            <p className="text-gray-600 mb-2">
              {" "}
              <b>Brand: </b>
              {brand}
            </p>
            <p className="text-gray-600">
              {" "}
              <b>Active Ingredients: </b>
              {ingredients}
            </p>
            <p className="text-gray-600">
              <b>Description: </b>
              {description}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AlternativeDrugs;
