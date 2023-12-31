// import React from 'react';

const Features = () => {
  return (
    <div style={{background:"whitesmoke"}}>
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">
            Key Features
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:bg-#43ce3f cursor-pointer">
              <h3 className="text-xl font-semibold mb-2 hover:text-white ">Drug Recommendations</h3>
              <p className="hover:font-extrabold">Discover affordable and recommendable drugs tailored to your needs.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:bg-blue-500 cursor-pointer">
              <h3 className="text-xl font-semibold mb-2 hover:text-white">Favorites Recommendations</h3>
              <p className="hover:font-extrabold">Effortlessly find all your best recommendations here.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:bg-#43ce3f transition-1s cursor-pointer">
              <h3 className="text-xl font-semibold mb-2 hover:text-white">Medical Records</h3>
              <p className="hover:font-bold font-5xl">Securely store and access your medical records from anywhere.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
