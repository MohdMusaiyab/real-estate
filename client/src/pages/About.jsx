import React from "react";
import {Link} from "react-router-dom";
const About = () => {

  return (
    <>
      <div className="container mx-auto mt-8 text-slate-700">
        <h1 className="text-4xl font-bold mb-4">
          About Our Real Estate Listing Platform
        </h1>
        <p className="text-lg leading-6 mb-4">
          Welcome to our platform, where we connect buyers and sellers in the
          world of real estate. Whether you're looking for your dream home or
          aiming to sell a property, we've got you covered.
        </p>
        <p className="text-lg leading-6 mb-4">
          Our mission is to simplify the process of buying and selling real
          estate by providing a user-friendly platform with a wide range of
          listings and powerful tools for both buyers and sellers.
        </p>
        <p className="text-lg leading-6 mb-4">
          Explore our listings, connect with real estate professionals, and make
          your real estate journey a seamless experience.
        </p>
        <p className="text-lg leading-6">
          Thank you for choosing our platform. We look forward to helping you
          find or sell your property!
        </p>
      </div>
     <Link className=" block text-center text-slate-700 w-full my-10" to={`mailto:musaiyab123@gmail.com?subject=Regarding Real Estate Project`}>
      Send Message to Admin
     </Link>
    </>
  );
};

export default About;
