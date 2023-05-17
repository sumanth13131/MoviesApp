import React from "react";
import LogoImage from "../Logos/movies-logo.jpeg"
import { AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";

export default function Banner() {
    return (
        <>
            <div id="banner">
                <div id="banner_container">
                    <div id='banner_logo'>
                        <a href="/home">
                            <img src={LogoImage} width={"40px"} height={"40px"} style={{borderRadius : "10px", opacity: 0.8}} alt="" />
                        </a>
                    </div>
                    <div id="search_button">
                        <a href="/search">
                            <button id="search_button_button">
                                <h3 className="search_text"> Search </h3>
                                <span className="search_logo"><AiOutlineSearch size={"2em"} /></span>
                            </button>
                        </a>
                    </div>

                    <div id="logout_button">
                        <a id="logout_button_logo" href="/signout" style={{color:"white"}}><AiOutlineLogout size={"2em"}/></a>
                    </div>
                </div>
                
            </div>
        </>
    )
}