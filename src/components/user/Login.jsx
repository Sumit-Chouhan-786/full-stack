import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }

    axios
      .post("http://localhost:4000/userLogin", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.email === email) {
          alert("Login Successfully!");
        } else {
          alert("user not found");
        }
        setEmail("");
        setPassword("");
        navigate("/allProduct");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message || "Login Failed");
        } else {
          alert("Login Failed. Please try again.");
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">User Login</h1>
      <form
        className="flex bg-gray-200 p-4 rounded-lg flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 bg-white outline-none rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 bg-white outline-none rounded-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/">
          Don't have an account? <span className="text-blue-500">Sign Up</span>
        </Link>
        <Link to="/updateLogin">
          <span className="text-blue-500">Forgot Password?</span>
        </Link>

        <button
          className="bg-blue-500 p-2 rounded-lg text-white"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
