import SearchBar from "../components/SearchBar";
import AlternativeDrugs from "../components/AlternativeDrugs";
import Footer from "../components/Footer";
import NavBar from "../components/Nav";
import { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import img from "../assets/images/docc.gif";

const DisplayPage = () => {
  let [msg, setMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let [results, setResults] = useState([]);
  let user_id = localStorage.getItem("medOpt");

  const handleSearchClick = async (searchTerm) => {
    setLoading(true);

    const isMissingFields = searchTerm.trim() === "";

    if (isMissingFields) {
      setMsg("Please fill search field");
      const t1 = setTimeout(() => {
        setMsg("");
        setLoading(false);
      }, 3000);
      return () => clearTimeout(t1);
    }

    const url = `http://localhost:8000/api/history`;
    const data = { search: searchTerm, user_id };
    try {
      const response = await fetch(url, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        let res = await response.json();
        // console.log(res, "response");
        if (res?.history?.results?.length > 0) {
          setMsg("Results Found!");
          setResults(res);
        } else {
          setMsg("No Matching Drug Found!");
          setResults(res.results);
        }
        const t1 = setTimeout(() => {
          setMsg("");
          setLoading(false);
        }, 3000);
        return () => clearTimeout(t1);
      } else {
        const err = await response.json();
        setMsg(err.error);
        const t1 = setTimeout(() => {
          setMsg("");
          setLoading(false);
        }, 3000);
        return () => clearTimeout(t1);
      }
    } catch (error) {
      setMsg(error.message);
      const t1 = setTimeout(() => {
        setMsg("");
        setLoading(false);
      }, 3000);
      return () => clearTimeout(t1);
    }
  };

  return (
    <div className="p-2">
      <NavBar />
      <div className="container mx-auto">
        <hr />
        <div className="w-full py-4">
          <SearchBar
            click={(searchTerm) => handleSearchClick(searchTerm)}
            btn={
              loading ? <FadeLoader height="10px" color="green" /> : "Search"
            }
          />

          <p className="py-5 font-bold text-xl text-center text-#43ce3f capitalize">
            {msg}
          </p>
          <div className="bg-white border rounded-lg shadow p-4">
            {results?.drug ? (
              <>
                {" "}
                <h3 className="text-xl font-semibold mb-2">Drug Details:</h3>
                <AlternativeDrugs
                  name={results.drug?.drugname}
                  price={results.drug?.price.toLocaleString()}
                  description={results.drug?.description}
                  brand={results.drug?.brand}
                  ingredients={results.drug?.ingredients.join(", ")}
                  bg={"bgDrug"}
                />
              </>
            ) : (
              <></>
            )}

            {results?.history?.results?.length > 0 ? (
              <>
                <h3 className="text-xl font-semibold mb-2">Recommendations:</h3>
                {results?.history?.results.map((e, i) => (
                  <AlternativeDrugs
                    key={i} // Assuming you have a unique key for each item
                    name={e.drugname}
                    price={e.price.toLocaleString()}
                    description={e.description}
                    brand={e.brand}
                    ingredients={e.ingredients.join(", ")}
                    bg={"bgRes"}
                  />
                ))}
              </>
            ) : (
              <div className="flex justify-center">
                <img src={img} alt="Welcome" />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DisplayPage;
