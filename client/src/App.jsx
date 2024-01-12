import React from "react";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import CreateListing from "./pages/CreateListing";
import { Toaster } from 'react-hot-toast';
import PrivateRoute from "./components/PrivateRoute";
import UpdateListing from "./pages/UpdateListing";
const App = () => {
  return (
    <BrowserRouter>
    <Toaster />
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/create-listing" element={<CreateListing></CreateListing>}></Route>
        <Route path="/update-listing/:listingId" element={<UpdateListing></UpdateListing>}></Route>  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
