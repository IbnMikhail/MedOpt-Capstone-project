import NavBar from "../components/Nav";
import img from "../assets/images/med.avif";
import Footer from "../components/Footer";
import FAYSAL from "../assets/images/FAYSAL.jpg";
import BIVAAN from "../assets/images/BIVAAN.jpg";
import MEEDO from "../assets/images/MEEDO.jpeg";

function About() {
  return (
    <>
      <div className="p-2">
        <NavBar />
        <div className="bg-gray-200 h-100 p-8 mb-11">
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

        <div>
          <div className="bg-gray-100 font-sans">
            <div className=" max-w-6xl mx-auto mt-8 p-4">
              <div className="mb-60">
                <div className=" max-w-6xl mx-auto mt-8 p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="absolute left-[30%] bg-white p-6 rounded-lg shadow-lg">
                      <h2 className="text-xl font-semibold mb-2">
                        Our Mission
                      </h2>
                      <p className="text-gray-600">
                        In today's healthcare landscape, patients frequently
                        encounter difficulties in selecting the optimal and
                        budget-friendly medication. At MedOpt, we offer patients
                        affordable medication options that align with their
                        financial capabilities, prioritizing improved health
                        outcomes. Our commitment is to empower you in making
                        well-informed healthcare choices. We strive to present
                        economical alternatives to costly medications, ensuring
                        top-notch care without overwhelming expenses.
                      </p>
                    </div>

                    <div className="relative top-[100%] left-[5%] bg-white p-6 rounded-lg shadow-lg">
                      <h2 className="text-xl font-semibold mb-2">
                        How It Works
                      </h2>
                      <p className="text-gray-600">
                        MedOpt uses advanced algorithms to analyze your
                        prescription and medical history. We then recommend more
                        affordable generic drugs that offer the same benefits as
                        their brand-name counterparts. You can save money
                        without compromising your health.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-2xl text-white font-semibold text-center bg-blue-500 p-4 mb-4">
                Meet the Team
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* <!-- member 1 --> */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img
                    src={BIVAAN}
                    alt="member 1"
                    className="w-32 h-32 mx-auto rounded-full"
                  />
                  <h2 className="mt-4 text-xl font-semibold">
                    Bivan Ka'asang Blessing
                  </h2>
                  <div className="">
                    <p className="text-gray-600">Quality Assurance</p>
                    <p className="mt-4">
                      I am an Educationist and IT Enthusiast with an
                      intermediate level of expertise in front end web
                      development and Cyber Security. I am an excellent team
                      player and strive for both individual and team success." I
                      am a Passionate about developing user-friendly and
                      visually appealing websites.
                    </p>
                  </div>
                </div>

                {/* <!-- member 2 --> */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img
                    src={MEEDO}
                    alt="member 2"
                    className="w-32 h-32 mx-auto rounded-full"
                  />
                  <h2 className="mt-4 text-xl font-semibold">Nuhu Ahmed</h2>
                  <p className="text-gray-600">Fullstack Developer</p>
                  <p className="mt-4">
                    I am a developer who is proficient in using the MERN
                    (MongoDB, Express.js, React.js, and Node.js) technology
                    stack for developing web applications. I am able to handle
                    both the front-end and back-end development of web
                    applications using these technologies.
                  </p>
                </div>

                {/* <!-- member 3 --> */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img
                    src={FAYSAL}
                    alt="member 3"
                    className="w-32 h-32 mx-auto rounded-full"
                  />
                  <h2 className="mt-4 text-xl font-semibold">Mikail Faysal</h2>
                  <p className="text-gray-600">Scum Master</p>
                  <p className="mt-4">
                    Hello! I'm a passionate web developer with a keen interest
                    in creating user-friendly and visually appealing websites.
                    My skills include HTML, CSS, JavaScript, and responsive
                    design. When I'm not coding, you'll find me exploring new
                    technologies and enjoying the learning process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default About;
