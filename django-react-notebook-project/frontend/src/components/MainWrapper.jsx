import '../styles/MainWrapper.scss'

function MainWrapper() {
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
                    <div className="genre">Popular by Genre</div>
                    <div className="book-types">
                        <a href="#" className="book-type active"> All Genres</a>
                        <a href="#" className="book-type"> Business</a>
                        <a href="#" className="book-type"> Science</a>
                        <a href="#" className="book-type"> Fiction</a>
                        <a href="#" className="book-type"> Philosophy</a>
                        <a href="#" className="book-type"> Biography</a>
                    </div>
                </div>

                <div className="book-cards">
                    <div className="book-card">
                        <div className="content-wrapper">
                        <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F07%2Fchances-are-1-2000.jpg&q=85" alt="" className="book-card-img" />
                        <div className="card-content">
                            <div className="book-name">Changes Are</div>
                            <div className="book-by">by Richard Russo</div>
                            <div className="rate">
                            <fieldset className="rating book-rate">
                                <input type="checkbox" id="star-c1" name="rating" value="5" />
                                <label className="full" htmlFor="star-c1"></label>
                                <input type="checkbox" id="star-c2" name="rating" value="4" />
                                <label className="full" htmlFor="star-c2"></label>
                                <input type="checkbox" id="star-c8" name="rating" value="3" />
                                <label className="full" htmlFor="star-c8"></label>
                                <input type="checkbox" id="star-c9" name="rating" value="2" />
                                <label className="full" htmlFor="star-c9"></label>
                                <input type="checkbox" id="star-c10" name="rating" value="1" />
                                <label className="full" htmlFor="star-c10"></label>
                            </fieldset>
                            <span className="book-voters card-vote">1.987 voters</span>
                            </div>
                            <div className="book-sum card-sum">Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books for years. </div>
                        </div>
                        </div>
                        <div className="likes">
                            <div className="like-profile">
                                <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                                <img src="https://pbs.twimg.com/profile_images/2452384114/noplz47r59v1uxvyg8ku.png" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80" alt="" className="like-img" />
                            </div>
                            <div className="like-name"><span>Samantha William</span> and<span> 2 other friends</span> like this</div>
                        </div>
                    </div>

                    <div className="book-card">
                        <div className="content-wrapper">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/7167iiDUeAL.jpg" alt="" className="book-card-img" />
                        <div className="card-content">
                            <div className="book-name">Dominicana</div>
                            <div className="book-by">by Angie Cruz</div>
                            <div className="rate">
                            <fieldset className="rating book-rate">
                                <input type="checkbox" id="star-c6" name="rating" value="5" />
                                <label className="full" htmlFor="star-c6"></label>
                                <input type="checkbox" id="star-c7" name="rating" value="4" />
                                <label className="full" htmlFor="star-c7"></label>
                                <input type="checkbox" id="star-c8" name="rating" value="3" />
                                <label className="full" htmlFor="star-c8"></label>
                                <input type="checkbox" id="star-c9" name="rating" value="2" />
                                <label className="full" htmlFor="star-c9"></label>
                                <input type="checkbox" id="star-c10" name="rating" value="1" />
                                <label className="full" htmlFor="star-c10"></label>
                            </fieldset>
                            <span className="book-voters card-vote">1.987 voters</span>
                            </div>
                            <div className="book-sum card-sum">eaders of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books for years.</div>
                        </div>
                        </div>
                        <div className="likes">
                            <div className="like-profile">
                                <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="" className="like-img" />
                            </div>
                            
                            <div className="like-name"><span>Kimberly Jones</span> and<span> 2 other friends</span> like this</div>
                        </div>
                    </div>

                    <div className="book-card">
                        <div className="content-wrapper">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/91M4E+SURUL.jpg" alt="" className="book-card-img" />
                        <div className="card-content">
                            <div className="book-name">Afternoon Of A Faun</div>
                            <div className="book-by">by James Lasdun</div>
                            <div className="rate">
                                <fieldset className="rating book-rate">
                                <input type="checkbox" id="star-c16" name="rating" value="5" />
                                <label className="full" htmlFor="star-c16"></label>
                                <input type="checkbox" id="star-c17" name="rating" value="4" />
                                <label className="full" htmlFor="star-c17"></label>
                                <input type="checkbox" id="star-18" name="rating" value="3" />
                                <label className="full" htmlFor="star-c18"></label>
                                <input type="checkbox" id="star-c19" name="rating" value="2" />
                                <label className="full" htmlFor="star-c19"></label>
                                <input type="checkbox" id="star-c20" name="rating" value="1" />
                                <label className="full" htmlFor="star-c20"></label>
                                </fieldset>
                                <span className="book-voters card-vote">1.987 voters</span>
                            </div>
                            <div className="book-sum card-sum">Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books for years. </div>
                        </div>
                        </div>
                        <div className="likes">
                            <div className="like-profile">
                            <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                            <img src="https://pbs.twimg.com/profile_images/2452384114/noplz47r59v1uxvyg8ku.png" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80" alt="" className="like-img" />
                            </div>
                            <div className="like-name"><span>Samantha William</span> and<span> 2 other friends</span> like this</div>
                        </div>
                    </div>

                    <div className="book-card">
                        <div className="content-wrapper">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/61OTY2-4anL.jpg" alt="" className="book-card-img" />
                            <div className="card-content">
                            <div className="book-name">Flash Count Diary</div>
                            <div className="book-by">by Darcey Steinke</div>
                            <div className="rate">
                                <fieldset className="rating book-rate">
                                <input type="checkbox" id="star-c21" name="rating" value="5" />
                                <label className="full" htmlFor="star-c21" />
                                <input type="checkbox" id="star-c22" name="rating" value="4" />
                                <label className="full" htmlFor="star-c22" />
                                <input type="checkbox" id="star-c23" name="rating" value="3" />
                                <label className="full" htmlFor="star-c23" />
                                <input type="checkbox" id="star-c24" name="rating" value="2" />
                                <label className="full" htmlFor="star-c24" />
                                <input type="checkbox" id="star-c25" name="rating" value="1" />
                                <label className="full" htmlFor="star-c25" />
                                </fieldset>
                                <span className="book-voters card-vote">1.987 voters</span>
                            </div>
                            <div className="book-sum card-sum">Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books htmlFor years.</div>
                            </div>
                        </div>
                        <div className="likes">
                            <div className="like-profile">
                            <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                            <img src="https://pbs.twimg.com/profile_images/2452384114/noplz47r59v1uxvyg8ku.png" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80" alt="" className="like-img" />
                            </div>
                            <div className="like-name"><span>Angelina Stone</span> and<span> 2 other friends</span> like this</div>
                        </div>
                    </div>

                    <div className="book-card">
                        <div className="content-wrapper">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/61Vc+xM23GL.jpg" alt="" className="book-card-img" />
                            <div className="card-content">
                            <div className="book-name">Picnic Comma Lightning</div>
                            <div className="book-by">by Lucy Parker</div>
                            <div className="rate">
                                <fieldset className="rating book-rate">
                                <input type="checkbox" id="star-c1" name="rating" value="5" />
                                <label className="full" htmlFor="star-c1" />
                                <input type="checkbox" id="star-c2" name="rating" value="4" />
                                <label className="full" htmlFor="star-c2" />
                                <input type="checkbox" id="star-c3" name="rating" value="3" />
                                <label className="full" htmlFor="star-c3" />
                                <input type="checkbox" id="star-c4" name="rating" value="2" />
                                <label className="full" htmlFor="star-c4" />
                                <input type="checkbox" id="star-c5" name="rating" value="1" />
                                <label className="full" htmlFor="star-c5" />
                                </fieldset>
                                <span className="book-voters card-vote">1.987 voters</span>
                            </div>
                            <div className="book-sum card-sum">Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books htmlFor years.</div>
                            </div>
                        </div>
                        <div className="likes">
                            <div className="like-profile">
                            <img src="https://pbs.twimg.com/profile_images/2452384114/noplz47r59v1uxvyg8ku.png" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80" alt="" className="like-img" />
                            </div>
                            <div className="like-name"><span>George</span> and<span> Mike</span> like this</div>
                        </div>
                    </div>

                    <div className="book-card">
                        <div className="content-wrapper">
                            <img src="https://prodimage.images-bn.com/pimages/9780525655633_p0_v5_s1200x630.jpg" alt="" className="book-card-img" />
                            <div className="card-content">
                            <div className="book-name">Very Nica</div>
                            <div className="book-by">by Lucy Parker</div>
                            <div className="rate">
                                <fieldset className="rating book-rate">
                                <input type="checkbox" id="star-c1" name="rating" value="5" />
                                <label className="full" htmlFor="star-c1" />
                                <input type="checkbox" id="star-c2" name="rating" value="4" />
                                <label className="full" htmlFor="star-c2" />
                                <input type="checkbox" id="star-c3" name="rating" value="3" />
                                <label className="full" htmlFor="star-c3" />
                                <input type="checkbox" id="star-c4" name="rating" value="2" />
                                <label className="full" htmlFor="star-c4" />
                                <input type="checkbox" id="star-c5" name="rating" value="1" />
                                <label className="full" htmlFor="star-c5" />
                                </fieldset>
                                <span className="book-voters card-vote">1.987 voters</span>
                            </div>
                            <div className="book-sum card-sum">Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books htmlFor years.</div>
                            </div>
                        </div>
                        <div className="likes">
                            <div className="like-profile">
                            <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                            <img src="https://pbs.twimg.com/profile_images/2452384114/noplz47r59v1uxvyg8ku.png" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80" alt="" className="like-img" />
                            </div>
                            <div className="like-name"><span>Samantha William</span> and<span> 2 other friends</span> like this</div>
                        </div>
                    </div>

                    <div className="book-card">
                        <div className="content-wrapper">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/71PL7BiZ5NL.jpg" alt="" className="book-card-img" />
                            <div className="card-content">
                            <div className="book-name">Stay And Fight</div>
                            <div className="book-by">by Lucy Parker</div>
                            <div className="rate">
                                <fieldset className="rating book-rate">
                                <input type="checkbox" id="star-c1" name="rating" value="5" />
                                <label className="full" htmlFor="star-c1" />
                                <input type="checkbox" id="star-c2" name="rating" value="4" />
                                <label className="full" htmlFor="star-c2" />
                                <input type="checkbox" id="star-c3" name="rating" value="3" />
                                <label className="full" htmlFor="star-c3" />
                                <input type="checkbox" id="star-c4" name="rating" value="2" />
                                <label className="full" htmlFor="star-c4" />
                                <input type="checkbox" id="star-c5" name="rating" value="1" />
                                <label className="full" htmlFor="star-c5" />
                                </fieldset>
                                <span className="book-voters card-vote">1.987 voters</span>
                            </div>
                            <div className="book-sum card-sum">Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books htmlFor years.</div>
                            </div>
                        </div>
                        <div className="likes">
                            <div className="like-profile">
                            <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                            <img src="https://pbs.twimg.com/profile_images/2452384114/noplz47r59v1uxvyg8ku.png" alt="" className="like-img" />
                            </div>
                            <div className="like-profile">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80" alt="" className="like-img" />
                            </div>
                            <div className="like-name"><span>Angelina Stone</span> and<span> 2 other friends</span> like this</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainWrapper;