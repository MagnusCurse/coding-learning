import "../styles/MovieHeader.scss";
import "../styles/MovieSlider.scss"
import { useState, useEffect } from "react";
import api from "../api";
import React, { useRef } from 'react';  // Add this at the very top of your file
import 'flickity/css/flickity.css'; // Import Flickity CSS
import Flickity from 'flickity';   // Import Flickity JS

function MovieHeader() {
    const [searchTerm, setSearchTerm] = useState("")
    const [recommendations, setRecommendations] = useState([]);

    const flickityRef = useRef(null);
    const carouselRef = useRef(null);
    const isMounted = useRef(false); // Track mount state

    // Initialize/destroy Flickity
    useEffect(() => {
        isMounted.current = true;
        
        const initFlickity = () => {
        if (!carouselRef.current || !isMounted.current) return;
        
        // Destroy existing instance first
        if (flickityRef.current) {
            flickityRef.current.destroy();
            flickityRef.current = null;
        }
    
        // Add slight delay for DOM update
        setTimeout(() => {
            if (carouselRef.current && isMounted.current) {
            flickityRef.current = new Flickity(carouselRef.current, {
                cellAlign: 'left',
                contain: true,
                freeScroll: true,
                wrapAround: true, // 👈 Enable infinite loop
                imagesLoaded: true,
                pageDots: false // ← This removes the dots completely
            });
            }
        }, 50);
        };
    
        initFlickity();
    
        return () => {
            isMounted.current = false;
            if (flickityRef.current) {
                flickityRef.current.destroy();
            }
        };
    }, [recommendations]); // Re-run when recommendations change

    // function to handle input change
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        // console.log(event.target.value);
    };

    // function to handle Enter key press
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
            console.log(JSON.stringify(recommendations, null, 2)); //
        }
    };

    // function to get the image url of the poster
    // still need to know more about the async and await function 👈 
    // const getImgUrlByTMBD = (movie_id) => { 
    //     const imageUrlResponse = api.get(`/api/movie/fetch_image_url/`, {
    //         params: {
    //             movie_id: movie_id // sending the movie_id as a query
    //         }
    //     });

    //     const image_url = imageUrlResponse.data.poster_url;
    //     return image_url;
    // }

    // function to handle the result of the search
    const handleSearch = async () => {
        if(!searchTerm.trim()) {
            return; // prevent empty searches
        }
        try {
            // reset recommendations first
            setRecommendations([]); // 👈 critical reset

            const recommendationsResponse = await api.get(`/api/movie/recommendations/`, {
                params: {
                    title: searchTerm // sending search term as a query
                }
            });

            // fetch movie_id and rating for each recommendation
            const recommendationsWithDetails = await Promise.all(
                recommendationsResponse.data.recommendations.map(async (movie_title) => {
                    // fetch movie_id using the title
                    const movieIdResponse = await api.get('/api/movie/fetch_movie_id/', {
                        params: { title: movie_title }
                    });

                    const movie_id = movieIdResponse.data.movie_id;
        
                    // fetch the image_url using the movie_id
                    const imageUrlResponse = await api.get(`/api/movie/fetch_image_url/`, {
                        params: {
                            movie_id: movie_id // sending the movie_id as a query
                        }
                    });

                    const image_url = imageUrlResponse.data.poster_url;

                    // fetch rating using the movie_id
                    const ratingResponse = await api.get('/api/movie/fetch_movie_ratings/', {
                        params: { movie_id }
                    });

                    const top_ratings = ratingResponse.data.top_ratings || []; // Default to empty array if no ratings exist
                    
                    // if you want to transform the data:
                    const processedRatings = top_ratings.map(rating => ({
                        userId: rating.user_id,
                        score: rating.rating
                    }));

                    console.log("Movie ID:", ratingResponse.data.movie_id);
                    console.log("Image_URL", image_url);
                    console.log("Top Ratings:", processedRatings);

                    // Return the structured data
                    return {
                        title: movie_title,
                        id: movie_id,
                        image_url: image_url,
                        ratings: processedRatings,
                    };
                })
            );

            setRecommendations(recommendationsWithDetails); // get the data from the response
        } catch (error) {
            console.log("Error fetching recommendations:", error);
        }
    }

    
    return (
        <div className="container">
            {/* MovieHeader */}
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

            <div className="book-slide">
                <div ref={carouselRef} 
                     className="book js-flickity"
                     key={JSON.stringify(recommendations)} 
                     style={{ 
                        height: '290px',
                        visibility: recommendations.length ? 'visible' : 'hidden'
                      }} 
                >
                    {recommendations.map((movie) => {
                        const average = movie.ratings.length > 0 
                        ? movie.ratings.reduce((s, r) => s + r.score, 0) / movie.ratings.length
                        : 0;

                        return (
                            <div className="book-cell" key={movie.id}>
                                <div className="book-img">
                                    {/* <img src={movie.image_url} alt="" className="book-photo" /> */}
                                    <img 
                                        src={movie.image_url || 'https://via.placeholder.com/150x200'} 
                                        alt={movie.title}
                                        loading="eager"
                                        className="book-photo"
                                    />
                                </div>
                                <div className="book-content">
                                    <div className="book-title"> { movie.title } </div>
                                    <div className="book-author">by Claudia Gray</div>
                                    <div className="rate">
                                        {/* Got some error with the show of the stars */}
                                        <fieldset className="rating blue">
                                            <input type="checkbox" id="star6" name="rating" value="5" />
                                            <label className="full1" htmlFor="star6"></label>
                                            <input type="checkbox" id="star7" name="rating" value="4" />
                                            <label className="full1" htmlFor="star7"></label>
                                            <input type="checkbox" id="star8" name="rating" value="3" />
                                            <label className="full1" htmlFor="star8"></label>
                                            <input type="checkbox" id="star9" name="rating" value="2" />
                                            <label className="full1" htmlFor="star9"></label>
                                            <input type="checkbox" id="star10" name="rating" value="1" />
                                            <label className="full1" htmlFor="star10"></label>
                                        </fieldset>

                                        <span className="book-voters">
                                        {movie.ratings.length} ratings (Avg: {average.toFixed(1)})
                                        </span>
                                    </div>

                                    <div className="book-sum"> The hunt htmlFor each splinter of Paul's soul sends Marguerite racing through a war-torn San Francisco.  </div>
                                    <div className={`book-see book-blue`}> See The Movie </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default MovieHeader;