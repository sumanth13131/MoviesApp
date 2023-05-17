import React from "react";
import Genre from "./Genre";
import Store from "../State/Store";

export default function Genres() {
    let data = Store.getState("data");
    return (
        <>
            {Object.keys(data["data"]).map(genre => <Genre genre={genre} key={crypto.randomUUID()}></Genre>)}
        </>
    )
}