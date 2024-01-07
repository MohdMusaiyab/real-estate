import React from "react";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import toast from "react-hot-toast";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [filePercentage, setFilePercentage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(file);
  // console.log(filePercentage);
  // console.log(formData);
  // console.log(currentUser);
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
  // For setting the Values in the Form
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(
        `/api/v1/user/update/${currentUser?.User?._id}`,
        formData
      );
      // console.log("Update Res.data.User not right")
      // console.log(res?.data);
      if (res?.data?.success) {
        toast.success("Update Successful");
        dispatch(updateUserSuccess(res?.data));
        return;
      } else {
        dispatch(updateUserFailure(res?.data?.message));
        toast.error(res?.data?.message || "Update Failed");
        return;
      }
    } catch (err) {
      console.log(err);
      dispatch(updateUserFailure(err?.response?.data?.message));
      toast.error(err?.response?.data?.message || "Update Failed");
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `/api/v1/user/delete/${currentUser?.User?._id}`
      );
      if (res?.data?.success) {
        dispatch(deleteUserSuccess(res?.data));
        toast.success("Delete Successful");
        return;
      } else {
        dispatch(deleteUserFailure(res?.data?.message));
        toast.error(res?.data?.message || "Delete Failed");
        return;
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message || "Delete Failed");
    }
  };
  // console.log(formData);
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.get("/api/v1/auth/signout");
      if (res?.data?.success) {
        dispatch(signOutUserSuccess(res?.data));
        toast.success("Sign Out Successful");
        // window.location.href="/";
        return;
      } else {
        dispatch(signOutUserFailure(res?.data?.message));
        toast.error(res?.data?.message || "Sign Out Failed");
        return;
      }
    } catch (err) {
      dispatch(signOutUserFailure(res?.data?.message));

      console.log(err);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md ">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
      <form onSubmit={handleProfileUpdate}>
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
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <div>
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              defaultValue={currentUser?.User?.username}
              id="username"
              className="border rounded-md px-3 py-2 w-full mx-auto "
              onChange={handelChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="text"
            defaultValue={currentUser?.User?.email}
            id="email"
            className="border rounded-md px-3 py-2 w-full"
            onChange={handelChange}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">New Password:</label>
          <input
            type="password"
            placeholder="Enter New Password"
            id="password"
            className="border rounded-md px-3 py-2 w-full"
            onChange={handelChange}
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-slate-700 text-white rounded-md px-4 py-2 hover:bg-slate-800 align-middle w-full"
          disabled={loading}
        >
          {loading ? "Loading...." : "Update"}
        </button>
      </form>
      <div className="flex mt-2 justify-between ">
        <span className="text-red-600" onClick={handleDeleteUser}>
          Delete Account
        </span>
        <span className="text-red-600" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
