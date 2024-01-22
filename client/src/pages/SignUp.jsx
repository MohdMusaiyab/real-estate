import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import OAuth from "../components/OAuth";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/auth/signup", {
        username,
        email,
        password,
      });
      if (res?.data?.success) {
        toast.success("Sign Up Successful");
        // alert("Sign Up Successful");
        setLoading(false);
        navigate("/sign-in");

      } else {
        toast.error(res.data.message);
        // alert("User Already Exists");
        setLoading(false);
      }
    } catch (error) {
      // alert("Something went wrong");
      toast.error("Something went wrong")
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold my-7">Sign Up</h1>
      <form
        className="bg-gray-300 p-8 rounded-md shadow-md max-w-md w-full mt-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full border-2 border-gray-300 p-2 my-2 rounded-md"
          id="username"
          required={true}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border-2 border-gray-300 p-2 my-2 rounded-md"
          id="email"
          required={true}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-2 border-gray-300 p-2 my-2 rounded-md"
          id="password"
          required={true}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="bg-slate-800 text-white w-full p-2 mt-4 rounded hover:opacity-85 disabled:placeholder-opacity-80">
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex my-5">
        <p>Already Have an Account..</p>
        <Link to={"/sign-in"}>
          <p className="text-blue-600 ml-1 hover:scale-110">Sign In</p>
        </Link>
      </div>
      
    </div>
    
  );
};

export default SignUp;
