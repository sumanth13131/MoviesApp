import React, { useEffect, useState } from "react";
import "../Css/Movie.css"
import axios from "axios";
import MovieDetails from "./MovieDetails";
import { Navigate, useParams } from "react-router-dom";
import Banner from "./Banner";
import Loader from "./Loader";


export function Movie() {
    const param = useParams()
 
    const [movieDetails, setMovieDetails] = useState();
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        axios.get(`http://localhost:8080/api/movies/${param.id}`)
        .then(resp => {
            if(loading) {
                setMovieDetails(resp["data"])
                setLoading(false);
            }
        })
        .catch(err => console.log(err))
    })

    return (
        <>  
            <Banner />
            {localStorage.getItem("isAuth") === "no" && (<Navigate to={"/signin"} replace={true}></Navigate>)}
            {loading && <Loader height={"200px"}/>}
            {!loading && <MovieDetails data={movieDetails} key={crypto.randomUUID()} />}
        </>
    )
}