import NavBar from "../components/Nav";
import img from "../assets/images/med.avif";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <div className="p-2">
        <NavBar/>
        <div className="bg-blue-300 h-100 p-8 mb-11">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
            <div className="w-full lg:w-1/2 text-center font-bold text-lg md:text-3xl leading-10">
              <p>
                In recent times where patients often face challenges when it
                comes to choosing the most suitable and cost-effective
                medication options. We provide patients with medication choices
                based on affordability and for better health outcomes.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <img src={img} alt="medicine" />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default About;
