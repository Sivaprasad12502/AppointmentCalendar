
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Contex";

const Login = () => {
  const navigate = useNavigate();
  const {user,setUser}=useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "staff@clinic.com" && password === "123456") {
      setUser(true)
      navigate("/calendarView");
    } else {
      setError("Invalid password or email");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <h2 className="text-2xl mb-4 text-black dark:text-white font-bold">Staff Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72">
        <label htmlFor="email" className="bg-white text-black dark:bg-black dark:text-white">Enter Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 bg-white text-black dark:bg-black dark:text-white"

        />
        <label htmlFor="password" className="bg-white text-black dark:bg-black dark:text-white">EnterPassword</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 bg-white text-black dark:bg-black dark:text-white"
        />
        <button type="submit" className="bg-black text-white dark:bg-white dark:text-black p-2">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
