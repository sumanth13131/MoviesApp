import React, { useState } from "react";
import "../Css/Home.css";
import { Navigate } from "react-router-dom";
import Banner from "./Banner";
import HomeContent from "./HomeContent";

export function Home () {

    const [isAuth] = useState(localStorage.getItem("isAuth"))

    return (
        <>  
            {isAuth === "no" && (<Navigate to={"/signin"} replace={true}></Navigate>)}
            <div id="home_banner">
                <Banner/>
            </div>
            <div id="home_cards">
                <HomeContent/>
            </div>
            
           
        </>
    )
}