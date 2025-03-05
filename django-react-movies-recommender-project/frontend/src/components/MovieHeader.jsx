import "../styles/MovieHeader.scss"

function MovieHeader() {
    return (
        <div className="header">
            <div className="browse">
                <div className="browse-category">
                Browse Category
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                <path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="search-bar">
                <input type="text" placeholder="Search Movie" />
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