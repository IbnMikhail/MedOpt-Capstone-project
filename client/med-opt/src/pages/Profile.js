import NavBar from "../components/Nav";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import AlternativeDrugs from "../components/AlternativeDrugs";

function Profile() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  let id = localStorage.getItem("medOpt");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/user/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/history/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let array = [];
        let arr = [];
        const data = await response.json();
        data.forEach((e) => {
          if (e.search && !arr.includes(e.search)) {
            arr.push(e.search);
            array.push(e);
          }
          return array;
        });
        setHistory(array);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };
    fetchData();
    fetchUserHistory();
  }, [id]);

  return (
    <>
      <div className="p-2 w-full">
        <NavBar />
        <div className="bg-white h-100 p-8 mb-11">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4 md:mb-0">
                <img
                  src="https://th.bing.com/th/id/OIP.ncOCV5LVCL8j70Edjgyn6QHaGy?pid=ImgDet&rs=1"
                  alt="Profile"
                  className="w-1/2"
                />
              </div>
              <div className="px-6">
                <div className="bg-black inline-block py-3 px-6 mb-4 rounded">
                  <h3 className="text-white text-2xl font-bold mb-0 ">
                    {user?.firstname} {user?.lastname}
                  </h3>
                  {/* <span className="text-white">Coach</span> */}
                </div>
                <ul className="list-unstyled mb-6">
                  <li className="mb-2 display-24">
                    <span className="text-secondary me-2 font-bold">
                      Email:
                    </span>{" "}
                    {user?.email}
                  </li>
                  <li className="mb-2 display-24">
                    <span className="text-secondary me-2 font-bold">
                      Website:
                    </span>{" "}
                    {user?.med_history}
                  </li>
                  <li className="display-24">
                    <span className="text-secondary me-2 font-bold">
                      Phone:
                    </span>{" "}
                    507 - 541 - 4567
                  </li>
                </ul>
                <ul className="social-icon-style1 list-unstyled mb-0">
                  <li>
                    <a href="#!">
                      <i className="ti-twitter-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="ti-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="ti-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="ti-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full p-0 m-0">
              {history?.length > 0 ? (
                <>
                  <h3 className="text-3xl font-semibold my-5 text-center">
                    HISTORY
                  </h3>
                  {history?.map((e, i) => (
                    <div className="w-full bg-gray-100 p-3 m-3">
                      <h3 className="text-xl font-semibold mb-2">Searched: {e.search}</h3>
                 
                      <h4 className="text-xl font-semibold mb-2">Results</h4>     {e.results.map((j, k) => {
                        return (
                          <AlternativeDrugs
                            key={k} // Assuming you have a unique key for each item
                            name={j.drugname}
                            price={j.price.toLocaleString()}
                            description={j.description}
                            brand={j.brand}
                            ingredients={j.ingredients.join(", ")}
                            bg={"bgRes"}
                          />
                        );
                      })}
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex justify-center">
                  <h3 className="text-xl font-semibold mb-2">
                    No History Yet....
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Profile;
