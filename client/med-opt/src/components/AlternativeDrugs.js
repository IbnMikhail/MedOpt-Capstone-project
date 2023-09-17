const AlternativeDrugs = () => {
  return (
    <div>
      <div className="mb-4">
        <a href="#" className="block md:flex md:items-center">
          <div className="md:w-1/4">
            <p className="w-full h-[8rem] flex justify-center items-center bg-#47d1cc text-3xl font-bold ">
              $2000
            </p>
          </div>
          <div className="md:w-3/4 md:ml-4">
            <h3 className="text-xl font-semibold mb-2">Product Name: Power Thirst</h3>           
            <p className="text-gray-600 mb-2">
              {" "}
              <b>Brand:</b>
              Cras nisi dolor, tristique id vehicula vitae
            </p>
            <p className="text-gray-600">
              {" "}
              <b>Active Ingredients:</b>
              Cras nisi dolor, tristique id vehicula vitae
            </p>
            <p className="text-gray-600">
              <b>Description:</b>
              Cras nisi dolor, tristique id vehicula vitae, mollis at eros. Ut
              euismod sem eu tellus vestibulum, in facilisis est feugiat. Mauris
              sed leo sed erat vestibulum suscipit.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AlternativeDrugs;
