import "../styles/MovieHeader.scss";
import { useState } from "react";
import api from "../api";

function MovieHeader() {
    const [searchTerm, setSearchTerm] = useState("")
    const [recommendations, setRecommendations] = useState([]);

    // function to handle input change
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value)
    };

    // function to handle Enter key press
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
            console.log(recommendations)
        }
    };

    const handleSearch = async () => {
        if(!searchTerm.trim()) {
            return; // prevent empty searches
        }
        try {
            const response = await api.get(`/api/movie/recommendations/`, {
                params: {
                    title: searchTerm // sending search term as a query
                }
            });
            setRecommendations(response.data.recommendations); // get the data from the response
        } catch (error) {
            console.log("Error fetching recommendations:", error);
        }
    }

    

    return (
        <div className="header">
            <div className="browse">
                <div className="browse-category">
                Browse Category
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                <path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="search-bar">
                    {/* search movie input */}
                    <input
                        type="text"
                        placeholder="Search Movie"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress} // Listen for Enter key
                    />
                </div>
            </div>
            <div className="header-title"> Movies <span> Recommender </span></div>
            <div className="profile">
                <div className="user-profile">
                {/* Additionally, in JSX, the <img> tag should be self-closing. In HTML, <img> tags can be self-closing, 
                but in JSX (which is what React uses), you need to explicitly close the <img> tag with a / at the end of it, like this: <img />. */}
                <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="" className="user-img" />
                </div>
                <div className="profile-menu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                <path d="M3 12h18M3 6h18M3 18h18" /></svg>
                Menu
            </div>
            </div>
        </div>
    )
}

export default MovieHeader;