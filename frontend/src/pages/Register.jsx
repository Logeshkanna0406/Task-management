import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post("/auth/register", form);
    alert("Registered successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
