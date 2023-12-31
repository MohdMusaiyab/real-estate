import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await axios.post("/api/v1/auth/signin", {
        email,
        password,
      });
      console.log(res?.data);
      if(res?.data?.success){
        toast.success("Sign In Successful");
        setLoading(false);
        navigate("/");
      }
      else{
        toast.error(res?.data?.message || "Sign In Failed");
        setLoading(false);
      }
    }
    catch(error){
      toast.error(error?.response?.data?.message || "Sign In Failed" );
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold my-7">Sign In</h1>
      <form
        className="bg-gray-300 p-8 rounded-md shadow-md max-w-md w-full mt-4"
        onSubmit={handleSubmit}
      >
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex my-5">
        <p>Don't Have an Account..</p>
        <Link to={"/sign-up"}>
          <p className="text-blue-600 ml-1 hover:scale-110">Sign Up</p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
