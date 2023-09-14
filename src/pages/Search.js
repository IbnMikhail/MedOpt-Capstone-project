import SearchBar from "../components/SearchBar";
import AlternativeDrugs from "../components/AlternativeDrugs";
import Footer from "../components/Footer";
import NavBar from "../components/Nav";
const DisplayPage = () => {
  return (
    <div className="p-2">
      <NavBar />
      <div className="container mx-auto">
        <hr />
        <div className="w-full py-4">
          <SearchBar />
          <div className="bg-white border rounded-lg shadow p-4">
            <AlternativeDrugs />
            <AlternativeDrugs />
            <AlternativeDrugs />           
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DisplayPage;
