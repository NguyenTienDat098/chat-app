import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import Notification from "../../components/notifications/Notification";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const AuthData = useContext(AuthContext);
  const { googleSignIn, emailSignIn } = AuthData;
  const handlegoogleLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-page w-screen h-screen flex items-center justify-center flex-col bg-slate-100">
      <Notification />
      <div className="title mb-3">
        <p className="font-bold text-lg text-center">Sign In</p>
        <p className="text-gray-500">Sign in to continute to Chat</p>
      </div>
      <div className="view-login p-2 w-96 rounded-lg shadow-lg bg-white flex flex-col items-center">
        <div className="form-controll flex justify-center w-full flex-col mb-3">
          <label className="mb-2 ml-3" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            type="email"
            placeholder="Enter email"
            className="p-3 rounded-sm  w-11/12 m-auto outline-none bg-slate-100 focus:shadow-lg transition-all duration-150 ease-linear"
          />
          <p className="note ml-4 text-sm mt-1 text-red-500"></p>
        </div>
        <div className="form-controll flex justify-center w-full flex-col mb-3">
          <label className="mb-2 ml-3" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            type="password"
            placeholder="Enter password"
            className="p-3 rounded-sm  w-11/12 m-auto outline-none bg-slate-100 focus:shadow-lg transition-all duration-150 ease-linear"
          />
          <p className="note ml-4 text-sm mt-1 text-red-500"></p>
        </div>
        <button
          onClick={() => {
            emailSignIn(email, password);
          }}
          className="submit w-11/12 bg-green-400 text-white rounded-lg p-2 hover:bg-green-500 transition-all duration-200 ease-linear mb-3"
        >
          Login
        </button>
        <div className="login-method w-full flex items-center justify-center flex-col">
          <button className="login-facebook w-11/12 bg-blue-400 text-white rounded-lg p-2 hover:bg-blue-500 transition-all duration-200 ease-linear mb-3">
            <FontAwesomeIcon icon={faFacebook} className="mr-2" />
            Login with Facebook
          </button>
          <button
            onClick={handlegoogleLogin}
            className="login-facebook w-11/12 bg-red-400 text-white rounded-lg p-2 hover:bg-red-500 transition-all duration-200 ease-linear mb-3"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Login with Google
          </button>
        </div>
      </div>
      <div className="not-account flex items-center justify-center mt-3">
        <p className="mr-2">Don't have an account?</p>
        <Link to="/register" className="text-blue-500">
          Signup now
        </Link>
      </div>
    </div>
  );
}
export default Login;
