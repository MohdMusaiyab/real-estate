import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingCard from "../components/ListingCard";
const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setofferListings] = useState([]);
  const [saleListings, setsaleListings] = useState([]);
  const [rentListings, setrentListings] = useState([]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get("/api/v1/listing/get?offer=true&limit=4");
        // console.log(res?.data?.listings);
        setofferListings(res.data?.listings);
        fetchRentListings();
      } catch (error) {
        // console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await axios.get("/api/v1/listing/get?type=rent&limit=4");
        setrentListings(res.data?.listings);
        fetchSaleListings();
      } catch (error) {
        // console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await axios.get("/api/v1/listing/get?type=sale&limit=4");
        setsaleListings(res.data?.listings);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  // console.log("offer", offerListings);
  // console.log("rent", rentListings);
  // console.log(saleListings);
  return (
    <div>
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-semibold text-3xl sm:text-6xl">
          Find Your Dream <span className="text-slate-500">Home</span>
        </h1>
        <div className="text-slate-500 text-sx sm:text-sm">
         If home is where the heart is 
      You are at the right place
        </div>
        <Link
          to={"/search"}
          className="text-sx sm:text-sm text-blue-800 font-semibold hover:underline"
        >
          Lets Start Exploring
        </Link>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing?.imageUrls[0]}) center no-repeat`,
                  backgroundSize: `cover`,
                }}
                className="h-[550px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-4">
              <h2 className="font-semibold text-slate-600 text-2xl">
                Recent Offers
              </h2>
              <Link
                to={`/search?offer=true`}
                className="text-blue-700 hover:underline"
              >
                Show More offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-4">
              <h2 className="font-semibold text-slate-600 text-2xl">
                For Rent
              </h2>
              <Link
                to={`/search?type=rent`}
                className="text-blue-700 hover:underline"
              >
                Show More Renting Properties
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-4">
              <h2 className="font-semibold text-slate-600 text-2xl">
                For Sale
              </h2>
              <Link
                to={`/search?type=sale`}
                className="text-blue-700 hover:underline"
              >
                Show More Sale Properties
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
