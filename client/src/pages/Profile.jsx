import React from "react";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [filePercentage, setFilePercentage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(file);
  console.log(filePercentage);
  console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md ">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>

      <div className="mb-6">
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser?.User?.avatar}
          alt="Profile"
          className="h-12 w-12 rounded-full mx-auto mb-4 cursor-pointer hover:opacity-75"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <div>
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            value={currentUser?.User?.username}
            id="username"
            className="border rounded-md px-3 py-2 w-full mx-auto "
            readOnly
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Email:</label>
        <input
          type="text"
          value={currentUser?.User?.email}
          id="email"
          className="border rounded-md px-3 py-2 w-full"
          readOnly
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">New Password:</label>
        <input
          type="password"
          placeholder="Enter New Password"
          id="password"
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="mt-6 bg-slate-700 text-white rounded-md px-4 py-2 hover:bg-slate-800 align-middle w-full"
      >
        Update
      </button>
      <div className="flex mt-2 justify-between ">
        <span className="text-red-600">Delete Account</span>
        <span className="text-red-600">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
