import React from "react";
import "../Css/MovieCard.css"

export default function MovieCard({props}){

    return (
        <>
            <div id="movie_card" key={props.Movie_Id}>
                <a href={`/movie/${props.Movie_Id}`}>
                    <img src={props.Poster_Link} alt="" width={"120px"} style={{borderRadius: "3px"}} ></img>
                </a>
                <p style={{color: "white", fontSize:"13px", height: "25px", paddingTop:"1px"}}>{props.Series_Title}</p>
                <h4 style={{color: "#cb7676"}} >{props.AvgRating}/5.0 ⭐️</h4>
            </div>
        </>
    )
    
}