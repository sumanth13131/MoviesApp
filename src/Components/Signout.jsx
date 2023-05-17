import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";


export default function Signout() {
    const [signOut, setSignOut] = useState(false);

    axios.get("http://localhost:8080/api/sign-out")
    .then(resp => {
        setSignOut(true);
        localStorage.setItem("isAuth", "no");
    })
    .catch(err => console.log(err))

    return (
        <>  
            {/* {localStorage.getItem("isAuth") === "no" && (<Navigate to={"/signin"} replace={true}></Navigate>)} */}
            {signOut && <Navigate to={"/signin"}></Navigate>}
        </>
    )
}