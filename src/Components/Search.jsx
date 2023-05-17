import React, {useState} from "react";
import Banner from "./Banner";
import "../Css/Search.css"
import axios from "axios";
import MovieCard from "./MovieCard";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Navigate } from "react-router-dom";


export default function Search() {

    const [textInput, setTextInput] = useState(String(""));
    const [selectedOption, setSelectedOption] = useState('Series_Title');
    const [searchData, setSearchData] = useState([]);
    const [offset, setOffset] = useState(0);
    let limit = 18;

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
        if(event.target.value.length > 0) {
            handleSubmit(event.target.value, selectedOption);
        } else {
            setSearchData([]);
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        handleSubmit(textInput, event.target.value);
    };

    const handleSubmit = (text, field) => {
        axios.get(`http://localhost:8080/api/search?text=${text}&field=${field}&offset=${offset}&limit=${limit}`)
        .then(resp => setSearchData(resp["data"]["data"]))
        .catch( err => console.log(err))
    };

    function nextButton(event) {
        event.preventDefault()
        if(searchData.length >= limit) {
            axios.get(`http://localhost:8080/api/search?text=${textInput}&field=${selectedOption}&offset=${offset + limit}&limit=${limit}`)
            .then( resp => {
                setSearchData(resp["data"]["data"]);
                setOffset(offset + limit);
            })
            .catch( (err) => console.log(err))
        }
    }

    function prevButton(event) {
        event.preventDefault()
        if(searchData.length >= 0) {
            if(offset - limit >= 0) {
                axios.get(`http://localhost:8080/api/search?text=${textInput}&field=${selectedOption}&offset=${offset - limit}&limit=${limit}`)
                .then( resp => {
                    setSearchData(resp["data"]["data"]);
                    setOffset(offset - limit); 
                })
                .catch( (err) => console.log(err))
                }
        }
    } 

    return (
        <>

            {localStorage.getItem("isAuth") === "no" && (<Navigate to={"/signin"} replace={true}></Navigate>)}
            <Banner />
            <div id="search">
                <input type="search" id="search_input" value={textInput}  onChange ={handleTextChange} placeholder={`Search`}></input>
                <select name="Filters" id="search_select" onChange={handleOptionChange}>
                    <option value="Series_Title">Title</option>
                    <option value="Overview">Overview</option>
                    <option value="Director">Director</option>
                    <option value="Actors">Actors</option>
                    <option value="Genres">Genres</option>
                </select>
            </div>
            

            <div className="grid-container">
                {searchData.length > 0 && searchData.map(details => <MovieCard className="search_data" props={details} key={crypto.randomUUID()}/> )}
            </div>

            <div className="search_pagination_buttons">
                <div style={{paddingTop: "3px"}}>
                    <button className="pagination_button" style={{marginLeft: "20px"}} onClick={prevButton}><p className="pagination_icon"><AiOutlineArrowLeft></AiOutlineArrowLeft></p></button>
                    <button className="pagination_button" style={{float: "right", marginRight: "20px"}} onClick={nextButton} ><p className="pagination_icon"><AiOutlineArrowRight></AiOutlineArrowRight></p></button>
                </div>
            
            </div>
        </>
    )
}