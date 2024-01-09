import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-hot-toast";
import { set } from "mongoose";
const CreateListing = () => {
  // For Storing these Files
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  // console.log(formData);
  const imageUpload = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      //All the URLS will be stored in this array
      setUploadingImages(true);
      setImageUploadError(null);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploadingImages(false);
          toast.success("Images Uploaded Successfully");
        })
        .catch((err) => {
          setImageUploadError("Maximum Image Size is 2MB");
          // setUploadingImages(false);
          toast.error("Maximum Image Size is 2MB");
        });
    } else if (files.length + formData.imageUrls.length == 0) {
      setUploadingImages(false);
      setImageUploadError("No file Selected");
      toast.error("No file Selected");
    } else {
      setUploadingImages(false);
      setImageUploadError("Maximum 6 images are allowed");
      toast.error("Maximum 6 images are allowed");
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  // console.log(formData.imageUrls.length)
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
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
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6 images)
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              className="p-3 border border-gray-400 rounded w-full"
              type="file"
              id="images"
              accept="'image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 mb-2"
              onClick={imageUpload}
              disabled={uploadingImages}
            >
              {uploadingImages ? "Uploading..." : "Upload Images"}
            </button>
          </div>
          <button className="p-3 bg-slate-500 text-white rounded-lg uppercase disabled:opacity-80 gap-2">
            Create Listing
          </button>
          {formData.imageUrls.length > 0 ? (
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-80"
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                >
                  Delete Image
                </button>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
