import React from "react";
import Features from "../components/Features";
import Footer from "../components/Footer";
import NavBar from "../components/Nav";
import videobc from "../assets/video/videobc.mp4"

function Home() {
  return (
    <>
      <div className="">
        <NavBar />
        <div className="bg-white h-700 text-center">
          <div className="relative h-[70%] w-[100%]">
          <video autoPlay loop controls src={videobc} className="h-[-30%]  w-[100%]"  />
            <div className="absolute inset-0 flex items-center justify-center ">
              <span className="text-#43ce3f bold text-9xl lg:text-9xl pb-8 font-bold">Med</span>
              <span className="text-#3636a4 bold text-9xl lg:text-9xl pb-8 font-bold">Opt</span>
            </div>
            <div className="absolute left-[32%] bottom-[16%]" >
              <p className="text-black font-bold pb-8 text-4xl">
              Your Trusted Medication Advisor
            </p>
            <p className="text-black font-bold pb-8 text-xl">
              Optimizing medication choices for better health outcomes and
              affordability.
            </p>
            </div>
            
          </div>
          <Features/>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
