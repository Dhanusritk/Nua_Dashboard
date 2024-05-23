import React, { useState } from "react";
import image1 from "../../../assets/book.jpg";
import google from "../../../assets/google.svg";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all required fields.");
      return;
    }

    // Implement your login logic here (e.g., API call)
    // If login is successful, redirect to the home page
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <label htmlFor="email" className="mb-2 text-md">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light placeholder-gray-500"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="py-4">
              <label htmlFor="pass" className="mb-2 text-md">Password</label>
              <input
                type="password"
                name="pass"
                id="pass"
                className="w-full p-2 border border-gray-300 rounded-md placeholder-light placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input
                  type="checkbox"
                  name="ch"
                  id="ch"
                  className="mr-2"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <span className="text-md">Remember for 30 days</span>
              </div>
              <span className="font-bold text-md">Forgot password</span>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Sign in
            </button>
          </form>
          <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
            <img src={google} alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button>
          <div className="text-center text-gray-400">
            Don't have an account?
            <Link to="/signup" style={{ padding: "2px" }}>
              <span className="font-bold text-black">Sign up for free</span>
            </Link>
          </div>
        </div>
        {/* right side */}
        <div className="relative">
          <img
            src={image1}
            alt="img"
            className="w-full md:w-[400px] h-[700px] hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
