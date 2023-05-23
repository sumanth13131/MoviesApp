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
    .catch(err => {
        setSignOut(true);
        console.log(err);
    })

    return (
        <>  
            {signOut && <Navigate to={"/signin"}></Navigate>}
        </>
    )
}