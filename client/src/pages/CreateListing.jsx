import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">
        Create a Listing
      </h1>
      <form className="flex flex-col gap-2 sm:flex-row ">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength={62}
            required
            id="name"
          ></input>
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            id="description"
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
            id="address"
          ></input>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg "
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                id="regularPrice"
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Price</p>
                <span className="text-xs">(Rs / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">(Rs / month)</span>
              </div>
            </div>
          </div>
        
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-semibold">Images: 
          <span className="font-normal text-gray-600 ml-2">The first image will be cover (max 6 images)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <input className="p-3 border border-gray-400 rounded w-full" type="file" id='images' accept="'image/*" multiple  />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 mb-2">Upload</button>
          </div>
        <button className="p-3 bg-slate-500 text-white rounded-lg uppercase disabled:opacity-80 gap-2">Create Listing</button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
