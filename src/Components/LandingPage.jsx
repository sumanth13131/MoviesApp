import React from "react";
import Image from "../Logos/movies.webp";
import Logo from "../Logos/movies-logo.jpeg"
import {AiOutlineArrowRight} from "react-icons/ai"
import "../Css/LandingPage.css"

export function LandingPage() {
    return ( 
        <>
            <div className="landing_page">
                <img id="landing_back_ground_image" src={Image} alt="BackGround_Image"></img>
                <div className="logo">
                    <img id="logo_img" src={Logo} alt="logo"></img>
                </div>
                <div className="get_started">
                    <a href="/signin" id="landing_page_a"><button id="get_started_button">Get Started &nbsp;&nbsp;&nbsp; <AiOutlineArrowRight/></button></a>
                </div>
            </div>
        </>
    )
}