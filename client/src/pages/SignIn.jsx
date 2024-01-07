import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch , useSelector } from "react-redux";
import { signInSuccess,signInFailure,signInStart ,signInComplete} from "../redux/user/userSlice"
import OAuth from "../components/OAuth";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  // const [loading, setLoading] = useState(false);
  const{error,loading} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      // setLoading(true);
      dispatch(signInStart());
      const res = await axios.post("/api/v1/auth/signin", {
        email,
        password,
      });
      // console.log("Sign in Res.data")
      // console.log(res?.data);
      // console.log("Sign in Res.data.User is defined")
      // console.log(res?.data?.User);
      if(res?.data?.success){
        toast.success("Sign In Successful");
        // setLoading(false);
        dispatch(signInSuccess(res?.data));
        navigate("/");
      }
      else{
        dispatch(signInFailure(res?.data?.message));
        toast.error(res?.data?.message || "Sign In Failed");
      }
    }
    catch(error){
      dispatch(signInFailure(error?.response?.data?.message));
      toast.error(error?.response?.data?.message || "Sign In Failed" );
      // setLoading(false);
    }
    finally{
      dispatch(signInComplete());
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
        <OAuth></OAuth>
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
