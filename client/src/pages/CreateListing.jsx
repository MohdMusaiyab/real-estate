import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  // For Storing these Files
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 200,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  // console.log(formData);
  const [formError, setFormError] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
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
          setUploadingImages(false);
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
  const handleChange = (e) => {
    // For Handling the Input Fields of The Type
    if (e.target.id == "sale" || e.target.id == "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    // For Handling the Input Fields of The Type True and False
    if (
      e.target.id == "parking" ||
      e.target.id == "furnished" ||
      e.target.id == "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type == "number" ||
      e.target.type == "text" ||
      e.target.type == "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length == 0) {
        setFormError("Please Upload Images");
        toast.error("Please Upload Images");
        return;
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        setFormError("Discount Price cannot be greater than Regular Price");
        toast.error("Discount Price cannot be greater than Regular Price");
        return;
      }
      setFormLoading(true);
      const res = await axios.post("/api/v1/listing/create", {
        ...formData,
        userRef: currentUser?.User?._id,
      });
      setFormLoading(false);
      // console.log(res?.data)
      if (res?.data?.success) {
        toast.success("Listing Created Successfully");
        navigate(`/listing/${res?.data?.listing?._id}`);
      } else {
        toast.error("Listing Creation Failed");
        setFormError(res?.data?.message);
      }
    } catch (error) {
      // console.log(error);
      setFormError(error.message);
      setFormLoading(false);
      toast.error(error.message);
    }
  };
  // console.log(formData)
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">
        Create a Listing
      </h1>
      <form
        className="flex flex-col gap-2 sm:flex-row "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength={62}
            required
            id="name"
            onChange={handleChange}
            value={formData.name}
          ></input>
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            id="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
            id="address"
            onChange={handleChange}
            value={formData.address}
          ></input>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="sale"
                onChange={handleChange}
                checked={formData.type == "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="rent"
                onChange={handleChange}
                checked={formData.type == "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              />
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
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                id="regularPrice"
                min={200}
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
                max={1000000}
              />
              <div className="flex flex-col items-center">
                <p>Price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">(Rs / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={1}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />

                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
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
          <button
            disabled={formLoading || uploadingImages}
            className="p-3 bg-slate-500 text-white rounded-lg uppercase disabled:opacity-80 gap-2"
          >
            {formLoading ? "Creating Listing..." : "Create Listing"}
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
