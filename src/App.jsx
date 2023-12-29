import React from "react";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        <Route path="/sign-up" element={<SignOut></SignOut>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/about" element={<About></About>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
