import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminUpdate = () => {
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || newPassword === "") {
      alert("Please fill all the fields");
      return;
    }

    axios
      .put("http://localhost:4000/adminUpdate", {
        email: email,
        newPassword: newPassword, // Ensure the key matches what the backend expects
      })
      .then((res) => {
        alert(res.data.message);
        setEmail("");
        setNewPassword(""); // Display the backend message directly
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message || "Password Update Failed");
        } else {
          alert("Password Update Failed. Please try again.");
        }
        console.error(err); // Log the error for debugging purposes
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Update Login</h1>
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
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="bg-blue-500 p-2 rounded-lg text-white" type="submit">
          Update Password
        </button>
      </form>
      <Link to="/admin/login" className="mt-4">
        Don't have an account? <span className="text-blue-500">Sign Up</span>
      </Link>
    </div>
  );
};

export default AdminUpdate;
