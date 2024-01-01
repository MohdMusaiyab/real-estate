import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      console.log(result);
      const res = await axios.post("/api/v1/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      console.log(res?.data);
      dispatch(signInSuccess(res?.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="bg-red-500 text-white p-3 hover:opacity-90"
      type="button"
      onClick={handleClick}
    >
      Connect With Google
    </button>
  );
};

export default OAuth;
