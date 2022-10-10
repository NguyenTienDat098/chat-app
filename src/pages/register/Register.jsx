import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

function Register() {
  const AuthData = useContext(AuthContext);
  const { emailSignUp } = AuthData;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div className="login-page w-screen h-screen flex items-center justify-center flex-col bg-slate-100">
      <div className="title mb-3">
        <p className="font-bold text-lg text-center">Sign Up</p>
        <p className="text-gray-500">Sign up to continute to Chat</p>
      </div>
      <div className="view-login p-2 w-96 rounded-lg shadow-lg bg-white flex flex-col items-center">
        <div className="form-controll flex justify-center w-full flex-col mb-3">
          <label className="mb-2 ml-3">Email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            required
            placeholder="Enter email"
            className="p-3 rounded-sm  w-11/12 m-auto outline-none bg-slate-100 focus:shadow-lg transition-all duration-150 ease-linear"
          />
          <p className="note ml-4 text-sm mt-1 text-red-500"></p>
        </div>
        <div className="form-controll flex justify-center w-full flex-col mb-3">
          <label className="mb-2 ml-3">Username</label>
          <input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            required
            placeholder="Enter Username"
            className="p-3 rounded-sm  w-11/12 m-auto outline-none bg-slate-100 focus:shadow-lg transition-all duration-150 ease-linear"
          />
          <p className="note ml-4 text-sm mt-1 text-red-500"></p>
        </div>
        <div className="form-controll flex justify-center w-full flex-col mb-3">
          <label className="mb-2 ml-3">Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            required
            placeholder="Enter password"
            className="p-3 rounded-sm  w-11/12 m-auto outline-none bg-slate-100 focus:shadow-lg transition-all duration-150 ease-linear"
          />
          <p className="note ml-4 text-sm mt-1 text-red-500"></p>
        </div>
        <button
          className="submit w-11/12 bg-green-400 text-white rounded-lg p-2 hover:bg-green-500 transition-all duration-200 ease-linear mb-3"
          onClick={() => {
            emailSignUp(email, password, userName);
          }}
        >
          Register
        </button>
      </div>
      <div className="not-account flex items-center justify-center mt-3">
        <p className="mr-2">Already have an account?</p>
        <Link to="/" className="text-blue-500">
          Signin now
        </Link>
      </div>
    </div>
  );
}
export default Register;
