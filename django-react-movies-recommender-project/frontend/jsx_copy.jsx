import "../styles/MovieSlider.scss"
import { useState, useEffect } from "react";
import 'flickity/css/flickity.css'; // Import Flickity CSS
import Flickity from 'flickity';   // Import Flickity JS

function MovieSlider() {
    useEffect(() => {
        new Flickity(".book", {
          cellAlign: "left",
          contain: true,
          wrapAround: true,
        });
      }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <div className="book-slide">
            <div className="book js-flickity">
                <div className="book-cell">
                    <div className="book-img">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg" alt="" className="book-photo" />
                    </div>
                    <div className="book-content">
                        <div className="book-title">BIG MAGIC</div>
                        <div className="book-author">by Elizabeth Gilbert</div>
                        <div className="rate">
                            <fieldset className="rating">
                                <input type="checkbox" id="star5" name="rating" value="5" />
                                <label className="full" htmlFor="star5"></label>
                                <input type="checkbox" id="star4" name="rating" value="4" />
                                <label className="full" htmlFor="star4"></label>
                                <input type="checkbox" id="star3" name="rating" value="3" />
                                <label className="full" htmlFor="star3"></label>
                                <input type="checkbox" id="star2" name="rating" value="2" />
                                <label className="full" htmlFor="star2"></label>
                                <input type="checkbox" id="star1" name="rating" value="1" />
                                <label className="full" htmlFor="star1"></label>
                            </fieldset>
                        <span className="book-voters">1.987 voters</span>
                    </div>
                    <div className="book-sum">Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books htmlFor years. </div>
                    <div className="book-see">See The Book</div>
                </div>

                </div>
            </div>
        </div>
    )
}

export default MovieSlider;