import '../styles/MainWrapper.scss'
import { useState, useEffect } from "react";
import api from "../api";

function MainWrapper() {
    const [recommendations, setRecommendations] = useState([]);

     // this will run once when the component mounts
     useEffect(() => {
        
        // fetchRecommendationsByGenre();
    }, []);  // Empty dependency array = runs only once

    // Handle genre click
    const handleGenreClick = (e) => {
        e.preventDefault();
        const genre = e.target.textContent.trim();
        fetchRecommendationsByGenre(genre);
    };

    const fetchRecommendationsByGenre = async (genre) => {
        try {
            // 👈 reset recommendations first 
            setRecommendations([]);

            // called the method and get the recommendations by genre response
            const recommendationsResponse = await api.get(`/api/movie/recommendations_genre/`, {
                params: {
                    genre: genre
                }
            });
            const data = recommendationsResponse.data.recommendations; // get the recommendation array
            // console.log(data); //
            // extract the data of recommendations in response
            const recommendationsByGenre = data;

            // fetch movie detail for each recommended movie
            const recommendationsWithDetails = await Promise.all(
                recommendationsByGenre.map(async (movie_title) => {
                    // fetch movie_id using the title
                    const movieIdResponse = await api.get('/api/movie/fetch_movie_id/', {
                        params: { title: movie_title }
                    });

                    const movie_id = movieIdResponse.data.movie_id;

                    console.log(movie_id)

                    // fetch the image_url using the movie_id
                    const imageUrlResponse = await api.get(`/api/movie/fetch_image_url/`, {
                        params: {
                            movie_id: movie_id // sending the movie_id as a query
                        }
                    });

                    const image_url = imageUrlResponse.data.poster_url;

                    // fetch the number of ratings and average rating
                    const ratingResponse = await api.get('/api/movie/fetch_ratings/agg/', {
                        params: { movie_id }
                    });

                    const ratings_count = ratingResponse.data.ratings_count;
                    const ratings_average = ratingResponse.data.ratings_average;

                    // console.log(image_url, ratings_count, ratings_average)

                    return {
                        title: movie_title,
                        id: movie_id,
                        image_url: image_url,
                        count: ratings_count,
                        average: ratings_average
                    };
                })
            )

            setRecommendations(recommendationsWithDetails); // set the recommendations
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div className="main-wrapper">
            <div className="books-of">
                <div className="week">
                    <div className="author-title">Author of the week</div>
                    <div className="author">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80" alt="" className="author-img" />
                    <div className="author-name">Sebastian Jeremy</div>
                    </div>
                    <div className="author">
                    <img src="https://images.unsplash.com/photo-1586297098710-0382a496c814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="" className="author-img" />
                    <div className="author-name">Jonathan Doe</div>
                    </div>
                    <div className="author">
                    <img src="https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="author-img" />
                    <div className="author-name">Angeline Summer</div>
                    </div>
                    <div className="author">
                    <img src="https://pbs.twimg.com/profile_images/737221709267374081/sdwta9Oh.jpg" alt="" className="author-img" />
                    <div className="author-name">Noah Jones</div>
                    </div>
                    <div className="author">
                    <img src="https://pbs.twimg.com/profile_images/2452384114/noplz47r59v1uxvyg8ku.png" alt="" className="author-img" />
                    <div className="author-name">Tommy Adam</div>
                    </div>
                    <div className="author">
                    <img src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="author-img" />
                    <div className="author-name">Ian Cassandra</div>
                    </div>
                </div>

                <div className="week year">
                    <div className="author-title">Books of the year</div>
                    <div className="year-book">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/A1kNdYXw0GL.jpg" alt="" className="year-book-img" />
                    <div className="year-book-content">
                    <div className="year-book-name">Disappearing Earth</div>
                    <div className="year-book-author">by Julia Phillips</div>
                    </div>
                    </div>
                    <div className="year-book">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/81eI0ExR+VL.jpg" alt="" className="year-book-img" />
                    <div className="year-book-content">
                    <div className="year-book-name">Lost Children Archive</div>
                    <div className="year-book-author">by Valeria Luiselli</div>
                    </div>
                    </div>
                    <div className="year-book">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/81OF9eJDA4L.jpg" alt="" className="year-book-img" />
                    <div className="year-book-content">
                    <div className="year-book-name">Phantoms: A Thriller </div>
                    <div className="year-book-author">by Dean Koontz</div>
                    </div>
                    </div>
                    <div className="year-book">
                    <img src="https://m.media-amazon.com/images/I/515FWPyZ-5L.jpg" alt="" className="year-book-img" />
                    <div className="year-book-content">
                    <div className="year-book-name">Midnight in Chernobyl</div>
                    <div className="year-book-author">by Adam Higginbotham</div>
                    </div>
                    </div>
                    <div className="year-book">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/91dBtgERNUL.jpg" alt="" className="year-book-img" />
                    <div className="year-book-content">
                    <div className="year-book-name">10 Minutes 38 Seconds</div>
                    <div className="year-book-author">by Elif Shafak</div>
                    </div>
                    </div>
                </div>

                <div className="overlay"></div>
            </div>

            <div className="popular-books">
                <div className="main-menu">
                    {/* <div className="genre">Popular by Genre</div> */}
                    <div className="book-types">
                        <a href="#" className="book-type" onClick={handleGenreClick}>Comedy</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Crime</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Documentary</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Drama</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Fantasy</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Film-Noir</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Horror</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Musical</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Mystery</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Romance</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Sci-Fi</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Thriller</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>War</a>
                        <a href="#" className="book-type" onClick={handleGenreClick}>Western</a>
                    </div>
                </div>

                <div className="book-cards">
                    {recommendations.map((movie) => (
                        <div className="book-card" key={movie.id}>
                            <div className="content-wrapper">
                                <img 
                                src={movie.image_url || 'https://via.placeholder.com/150'} 
                                alt={movie.title} 
                                className="book-card-img" 
                                />
                                <div className="card-content">
                                <div className="book-name"> {movie.title} </div>
                                {/* If you have author data, replace this with movie.author */}
                                <div className="book-by">by Author Name</div> 
                                
                                <div className="rate">
                                    <div className="rating book-rate">
                                    {/* Render star rating based on average */}
                                    {[...Array(5)].map((_, i) => {
                                        const ratingValue = i + 1;
                                        return (
                                        <span 
                                            key={ratingValue}
                                            className={`star ${ratingValue <= movie.average ? 'filled' : ''}`}
                                        >
                                            ★
                                        </span>
                                        )
                                    })}
                                    </div>
                                    <span className="book-voters card-vote">
                                        {movie.count} {movie.count === 1 ? 'voter' : 'voters'}
                                    </span>
                                </div>

                                {/* If you have description in your data, use movie.description */}
                                <div className="book-sum card-sum">
                                    {movie.description || 'Description not available'}
                                </div>
                                </div>
                            </div>

                            {/* Friends likes section - update with real data if available */}
                            <div className="likes">
                                <div className="like-profile">
                                <img 
                                    src="https://randomuser.me/api/portraits/women/63.jpg" 
                                    alt="" 
                                    className="like-img" 
                                />
                                </div>
                                <div className="like-name">
                                <span>Kimberly Jones</span> and<span> 2 other friends</span> like this
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainWrapper;