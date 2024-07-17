"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUsername } from "../store/userSlice";

const HomePage = () => {
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (name) {
      fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            dispatch(setUsername(name));
            router.push("/chat");
          }
        });
    }
  };

  const handleLogin = () => {
    if (name) {
      fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            dispatch(setUsername(name));
            router.push("/chat");
          }
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Enter your name to start chatting</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      {isSignUp ? (
        <button
          onClick={handleSignUp}
          className={`px-4 py-2 ${
            name ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
          disabled={!name}
        >
          Sign Up
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className={`px-4 py-2 ${
            name ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
          disabled={!name}
        >
          Login
        </button>
      )}
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="mt-4 text-blue-500 underline"
      >
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default HomePage;
