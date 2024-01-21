import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-sadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing-cover"
          className="h-[330px] sm:h-[200px] w-full ovject-cover hover:scale-105 transition-scale duration-300"
        ></img>
        <div className="p-3 flex flex-col gap-2">
          <p className="font-semibold text-slate-700 text-lg truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="w-4 h-4 text-green-600"></MdLocationOn>
            <p className="text-slate-500">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 font-semibold  mt-2">Rs{" "} 
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
              {
                listing.type==='rent' ? '/month' : ''
              }
          </p>
          <div className="flex gap-2">
            <p className="text-slate-600 font-semibold">{listing.bedrooms ===1 ? listing.bedrooms + " Bedroom" : listing.bedrooms + " Bedrooms"}</p>
            <p className="text-slate-600 font-semibold">{listing.bathrooms==1 ? listing.bathrooms + "Bathroom": listing.bathrooms+" Bathrooms"}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
