import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUsername } from "../store/userSlice";

const HomePage = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (name) {
      dispatch(setUsername(name));
      router.push("/chat");
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
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Chatting
      </button>
    </div>
  );
};

export default HomePage;
