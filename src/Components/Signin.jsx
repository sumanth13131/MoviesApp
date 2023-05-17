import React, { useState} from "react";
import Image from "../Logos/movies.webp";
import "../Css/Sign.css"
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";


export function Signin() {

    const [creds, setCreds] = useState({username:"", password:""})
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    function signin(event) {
        event.preventDefault();
        setLoading(true);
        axios.post("http://localhost:8080/api/sign-in", creds).then(
            resp => {
                setErrMsg("signin");
                localStorage.setItem("isAuth", "yes");
                console.log(resp);
            }
        ).catch( err => {
            if(err.code === "ERR_NETWORK") {
                setErrMsg("ERR_NETWORK")
            }else if(err.response.status === 400) {
                setErrMsg("Please enter all fields")
            } else if(err.response.status === 401) {
                setErrMsg(err.response.data);
            } else {
                setErrMsg(err.code);
            }
        }).finally(
            setLoading(false)
        )
    }

    function ErrorMsg() {
        return (
            <>
                <p>{errMsg}</p>
            </>
        );
    }

    return (
        <>
        <div className="landing_page">
            <img id="landing_back_ground_image" src={Image} alt="BackGround_Image" style={{opacity:0.4}}></img>
            <form>
                <h1>Sign in</h1>
                <div className="fields"> 
                    <input className="sign_input" type="text" id="username" placeholder="User name" required value={creds.username} onChange={(e) => setCreds({...creds, username:e.target.value})}/><br/><br/>
                    <input className="sign_input" type="password" id="password" placeholder="Password" required value={creds.password} onChange={(e) => setCreds({...creds, password:e.target.value})} /><br/><br/><br/><br/>
                </div>
                <div className="login">
                    <button className="sign_button" type="submit" onClick={signin} > Login</button> <br/><br/><br/><br/>
                </div>
                
                <div className="signup">
                    <h4>New User? <a href="/signup" id="signup">Sign up now</a></h4>
                </div>
                <ErrorMsg/>
                {loading && <Loader height={"30px"}/>}
                {errMsg === "signin" && (
                    <Navigate to={"/home"} replace={true}></Navigate>
                )}
            </form>
        </div>
        </>
    )
}