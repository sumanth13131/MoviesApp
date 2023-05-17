import React, {useState} from "react";
import axios from "axios";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import MovieCard from "./MovieCard";
import Store from "../State/Store";



export default function Genre({genre}) {

        let data = Store.getState("data")["data"][genre];
    
        let limit = 10;
        const [movieDetails, setMovieDetails] = useState(data);
        const [offset, setOffset] = useState(0);
        function nextButton(event) {
            event.preventDefault()
            axios.get(`http://localhost:8080/api/home?genre=${genre}&offset=${offset + limit}&limit=${limit}`)
            .then( resp => {
                if(resp["data"]["data"][genre].length) {
                    setMovieDetails(resp["data"]["data"][genre]);
                    setOffset(offset + limit);
                }
            })
            .catch( (err) => console.log(err))
        }

        function prevButton(event) {
            event.preventDefault()
            if(offset - limit >= 0) {
                axios.get(`http://localhost:8080/api/home?genre=${genre}&offset=${offset - limit}&limit=${limit}`)
                .then( resp => {
                    if(resp["data"]["data"][genre].length) {
                        setOffset(offset - limit); 
                        setMovieDetails(resp["data"]["data"][genre]);
                    }
                })
                .catch( (err) => console.log(err))
            }
        }
        return (
            <>
                <h2 style={{paddingLeft: "20px"}}>{genre}</h2>
                <div style={{display: "flex",  overflow: "auto"}}>
                    {movieDetails.map(details => <MovieCard props={details} key={crypto.randomUUID()}/> )}
                </div>
                <div style={{paddingTop: "3px"}}>
                    <button className="pagination_button" style={{marginLeft: "20px"}} onClick={prevButton}><p className="pagination_icon"><AiOutlineArrowLeft></AiOutlineArrowLeft></p></button>
                    <button className="pagination_button" style={{float: "right", marginRight: "20px"}} onClick={nextButton}><p className="pagination_icon"><AiOutlineArrowRight></AiOutlineArrowRight></p></button>
                </div>
            </>
        )
    }