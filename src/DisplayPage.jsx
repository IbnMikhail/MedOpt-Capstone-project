import AlternativeDrugs from "../components/AlternativeDrugs"
import Footer from "../components/Dashboard components/Footer"
import NavBar from "../components/Dashboard components/NavBar"
import SearchBar from "../components/SearchBar"
import SearchedDrug from "../components/SearchedDrug"

const DisplayPage = () => {
  return (
    <div>
      <div className="bg-gray-100">
        <NavBar />

       <SearchBar />
        {/* <!-- Display search results here --> */}
        <SearchedDrug />
        {/* <!-- Display alternative drugs here --> */}
        <AlternativeDrugs />

         <Footer />
</div>
    </div>
  )
}

export default DisplayPage
