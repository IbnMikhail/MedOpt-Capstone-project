import Features from "../components/Features";
import Footer from "../components/Footer";
import NavBar from "../components/Nav";

function Home() {
  return (
    <>
      <div className="p-2">
        <NavBar />
        <div className="bg-white h-100 p-8">
          <div className="text-center lg:p-20">
            <div className="text-9xl pb-8 font-bold">
              <span className="text-#43ce3f bold">Med</span>
              <span className="text-#3636a4 bold">Opt</span>
            </div>
            <p className="text-black font-bold pb-8">
              Your Trusted Medication Advisor
            </p>
            <p className="text-black font-bold pb-8">
              Optimizing medication choices for better health outcomes and
              affordability.
            </p>
          </div>
          <Features/>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
