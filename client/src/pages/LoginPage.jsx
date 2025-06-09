"use client";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MessageCircle, ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-4 sm:gap-8 p-4 flex-col lg:flex-row lg:justify-evenly">
      {/* Left */}
      <div className="flex flex-col items-center gap-3 sm:gap-4 z-10 text-center lg:text-left">
        <div className="flex items-center gap-2 sm:gap-3 group">
          <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-violet-500 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-3xl sm:text-4xl font-bold text-white transition-colors duration-300 group-hover:text-violet-400">
            Blabber
          </span>
        </div>
        <p className="text-gray-300 text-center text-sm sm:text-base max-w-xs sm:max-w-sm">
          Connect and chat with anyone, anywhere
        </p>
      </div>

      {/* Right */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-gray-900/70 backdrop-blur-xl text-white border-gray-700/50 p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 rounded-2xl shadow-2xl w-full max-w-md z-10 animate-slide-up"
      >
        <h2 className="font-medium text-xl sm:text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <ArrowLeft
              onClick={() => setIsDataSubmitted(false)}
              className="w-5 h-5 cursor-pointer text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-3 border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 focus:scale-[1.02]"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-3 border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 focus:scale-[1.02]"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-3 border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 focus:scale-[1.02]"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-3 border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 focus:scale-[1.02] resize-none"
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 hover:from-purple-500 hover:to-violet-700 text-white rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" className="accent-violet-500" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer hover:text-violet-400 transition-colors duration-300"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600 text-center">
              Create an account{" "}
              <span
                onClick={() => setCurrState("Sign up")}
                className="font-medium text-violet-500 cursor-pointer hover:text-violet-400 transition-colors duration-300"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
