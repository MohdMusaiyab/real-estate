import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md ">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>

      <div className="mb-6">
        <img
          src={currentUser?.User?.avatar}
          alt="Profile"
          className="h-12 w-12 rounded-full mx-auto mb-4 cursor-pointer hover:opacity-75"
        />
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
