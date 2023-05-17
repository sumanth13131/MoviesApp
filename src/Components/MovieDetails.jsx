import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import ReactStars from "react-rating-stars-component";
import Store from "../State/Store";
import { userCurrentMovieRating } from "../State/Actions";
const swal = withReactContent(Swal)


export default function MovieDetails({data}) {

        const [userRating, setUserRating] = useState(0);
        let refRating = useRef(0)

        useEffect( () => {
            axios.get(`http://localhost:8080/api/my-rating?movie_id=${data.Movie_Id}`)
            .then( resp => {
                            refRating.current = resp["data"]["data"]; 
                            setUserRating(resp["data"]["rating"]);
                        })
            .catch( err => console.log(err))
        }, [data.Movie_Id])

        Store.subscribe( () => {
            let newRating = Store.getState("data")["rating"];
            setUserRating(newRating);
        })

        function Rating() {
            function ratingChanged(newRating) {
                refRating.current = newRating;
            }
            return (
                <div style={{paddingLeft:"150px"}}>
                    <ReactStars count={5}
                                onChange={ratingChanged}
                                size={30}
                                value={userRating}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                    />,
                </div>
            )
        }

        function rate(event) {
            event.preventDefault();
            swal.fire({
                title: <p>Rating</p>,
                icon: "info",
                html: <Rating/>,
                confirmButtonText: "Rate",
                allowEscapeKey: true,
            }).then((ok) => {
                if(ok.isConfirmed) {
                    if(refRating.current > 0 && refRating.current !== Store.getState("data")["rating"]) {
                        axios.patch("http://localhost:8080/api/rating",{movie_id: data.Movie_Id,rating: refRating.current})
                        .then(() => {
                                    swal.fire({
                                        title: <p>Thank's For Rating 😀</p>,
                                        icon: "success",
                                    });
                                    Store.dispatch({
                                        type: userCurrentMovieRating,
                                        payload: refRating.current,
                                    });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    } else {
                        swal.fire({
                                title: <p>Rating Not Submited 🙃</p>,
                                icon: "warning",
                            });
                    }
                }
            })
        }

        return (
             <div className="movie" key={crypto.randomUUID()}>
                <iframe className="viedo_frame" title={crypto.randomUUID()}
                    src={`${data.Viedo_Link}?autoplay=1&mute=1`} key={crypto.randomUUID()}>
                </iframe>
                <div id="movie_details">
                    <div className="title" style={{fontSize: "25px", paddingBottom: "10px", height: "10px"}}>
                        <p key={crypto.randomUUID()}>{data.Series_Title} ({data.AvgRating}/5.0) <button onClick={rate}>Rate This Movie</button></p>
                    </div>
                    <div id="ry_r_c">
                        {data.Released_Year && <p key={crypto.randomUUID()}>{data.Released_Year} &nbsp;</p>}
                        {data.Runtime && <p key={crypto.randomUUID()}>| {data.Runtime} min &nbsp; |  &nbsp;</p>}
                        {data.Certificate && <p id="certificate" key={crypto.randomUUID()}> {data.Certificate}</p>} <br/>
                    </div>
                    
                    <div>
                        {data.Overview && <p key={crypto.randomUUID()} id="overview">{data.Overview}</p>}
                    </div>

                    <div id="genres">
                        {data.Genres && data.Genres.length > 0 && data.Genres.map(genre => <p key={crypto.randomUUID()} className="genre">{genre}</p>)}
                    </div>
            
                    <div id="actors">
                        {data.Actors && data.Actors.length > 0 && data.Actors.map(actor => <p key={crypto.randomUUID()} className="actor">{actor}</p>)}
                    </div>

                    <div id="my_rating">
                        <p> You rated : <span> {userRating} / 5.0</span> </p>
                    </div>
                </div>
            </div>
        )
    }