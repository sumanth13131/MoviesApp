import React, { useEffect, useState} from "react";
import axios from "axios";
import Genres from "./Genres";
import Loader from "./Loader";

import Store from "../State/Store";
import { fetchedHomeData } from "../State/Actions";

export default function HomeContent() {
    
    // const [homeData, setHomeData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        axios.get("http://localhost:8080/api/home")
        .then(
            resp => {
                if(loading) {
                    Store.dispatch({
                        type: fetchedHomeData,
                        payload: resp["data"]["data"],
                    })
                    // setHomeData(resp["data"]);
                    setLoading(false);
                }
            }
        )
        .catch( err => console.log(err));
    })

    return (
        <>  
            {loading && <Loader height={"200px"}/>}
            {!loading && <Genres />}
        </>
    );
}