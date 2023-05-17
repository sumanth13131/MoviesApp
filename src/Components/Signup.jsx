import React,{useState} from "react";
import Image from "../Logos/movies.webp";
import "../Css/Sign.css"
import axios from "axios";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";


export function Signup() {

    const [creds, setCreds] = useState({username:"", email:"", password:""})
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    
    function signup(event) {
        event.preventDefault()
        setLoading(true);
        axios.post("http://localhost:8080/api/sign-up", creds).then(
            resp => {
                setErrMsg("signup");
            }
        ).catch( err => {
            if(err.code === "ERR_NETWORK") {
                setErrMsg("ERR_NETWORK")
            }else if(err.response.status === 400) {
                setErrMsg("Please enter all fields")
            } else if(err.response.status === 409) {
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
                <h1>Sign up</h1>
                <div className="fields"> 
                    <input type="text" className="sign_input" id="username" placeholder="User name"  value={creds.username} onChange={(e) => setCreds({...creds, username:e.target.value})}/><br/><br/>
                    <input type="email" className="sign_input" id="email" placeholder="Email" required value={creds.email} onChange={(e) => setCreds({...creds, email:e.target.value})}/><br/><br/>
                    <input type="password" className="sign_input" id="password" placeholder="Password" required value={creds.password} onChange={(e) => setCreds({...creds, password:e.target.value})} /><br/><br/><br/>
                </div>
                <div className="register">
                    <button type="submit" className="sign_button"   onClick={signup}> Register</button> <br/><br/><br/>
                </div>
                <div className="signin">
                    <h4><a href="/signin" id="signup">Sign In</a></h4>
                </div>
                <ErrorMsg/>
                {loading && <Loader height={"30px"}/>}
                {errMsg === "signup" && (
                    <Navigate to={"/signin"} replace={true}></Navigate>
                )}
            </form>
        </div>        
        </>
    )
}