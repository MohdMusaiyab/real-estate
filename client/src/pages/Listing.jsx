import Contact from "../components/Contact.jsx";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
// For icons
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
const Listing = () => {
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const [contact, setContact] = useState(false);
  const fetchListing = async () => {
    try {
      setLoading(true);
      const listingId = params.listingId;
      const listing = await axios.get(
        `/api/v1/listing/get-listing/${listingId}`
      );
      if (listing?.data?.success) {
        setFormData(listing?.data?.listing);
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };
  //   console.log(formData?.userRef);
  useEffect(() => {
    fetchListing();
  }, []);
  //   console.log(formData);
  //   console.log(currentUser?.User);
  return (
    <main>
      {loading && (
        <p className="text-center font-semibold my-10">Loading..............</p>
      )}
      {formData && !loading && (
        <div>
          <Swiper navigation>
            {formData.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {formData.name} - ${" "}
              {formData.offer
                ? formData.discountPrice.toLocaleString("en-US")
                : formData.regularPrice.toLocaleString("en-US")}
              {formData.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {formData.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {formData.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {formData.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+formData.regularPrice - +formData.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {formData.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {formData.bedrooms > 1
                  ? `${formData.bedrooms} beds `
                  : `${formData.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {formData.bathrooms > 1
                  ? `${formData.bathrooms} baths `
                  : `${formData.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {formData.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {formData.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser &&
              currentUser?.User?._id !== formData.userRef &&
              !contact && (
                <button
                  className="bg-slate-500 text-white rounded-lg hover:opacity-85"
                  onClick={() => setContact(true)}
                >
                  Contact Landlord
                </button>
              )}
            {contact && <Contact listing={formData} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
