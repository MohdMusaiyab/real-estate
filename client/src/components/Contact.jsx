import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const getLandlord = async () => {
    try {
      const landlord = await axios.get(`/api/v1/user/${listing.userRef}`);
      if (landlord?.data?.success) {
        setLandlord(landlord?.data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLandlord();
  }, []);
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };
  return (
    landlord && (
      <div className="flex flex-col gap-2">
        <p>
          Contact <span className="font-semibold">{landlord.username}</span>
          for <span className="font-semibold">{listing.name}</span>
        </p>
        <textarea
          className="w-full border p-3 rounded-lg"
          name="message"
          id="message"
          rows={2}
          onChange={handleMessageChange}
          value={message}
          placeholder="Enter your Message Here"
        ></textarea>
        <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name} &body=${message}`}
          className="bg-blue-500 text-white p-3 rounded-lg text-center hover:bg-blue-600"
        >
          Send Message
        </Link>
      </div>
    )
  );
};

export default Contact;
