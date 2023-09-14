const AlternativeDrugs = () => {
  return (
    <div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Recommended Drugs:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2">Alternative Drug </h4>
                <p className="text-green-700 font-semibold ">Active ingredient: </p><p> acetaminophen or APAP</p>
                <div className="mt-4">
                    <p className="text-blue-500 font-semibold">Price: ₦XX.XX</p>
                </div>
                <div className="mt-4">
                    <a href="#" className="text-blue-500 hover:underline">More Info</a>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default AlternativeDrugs
