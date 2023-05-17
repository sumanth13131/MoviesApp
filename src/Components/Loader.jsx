import React from "react";
import LoaderGig from "../Logos/loading.gif"

export default function Loader({height}) {
    return (
        <>
            <div style={{textAlign: "center"}}>
                <img src={LoaderGig} alt="loader" height={height}></img>
            </div>
        </>
    )
}
