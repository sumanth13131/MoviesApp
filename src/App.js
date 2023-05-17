import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage";
import { Signin } from "./Components/Signin";
import { Signup } from "./Components/Signup";
import { Home } from "./Components/Home";
import { Movie } from "./Components/Movie";
import Signout from "./Components/Signout";
import Search from "./Components/Search";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LandingPage />}></Route>
                <Route exact path="/signin" element={<Signin />}></Route>
                <Route exact path="/signup" element={<Signup />}></Route>
                <Route exact path="/signout" element={<Signout />}></Route>
                <Route exact path="/home" element={<Home />}></Route>
                <Route exact path="/movie/:id" element={<Movie />}></Route>
                <Route exact path="/search" element={<Search />}></Route>
            </Routes>
        </Router>
    );
}
