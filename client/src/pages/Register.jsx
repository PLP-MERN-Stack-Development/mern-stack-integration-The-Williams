import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      nav('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handle} className="grid gap-2 max-w-md">
      <h2 className="text-xl">Register</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="p-2 border"/>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 border"/>
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="p-2 border"/>
      <button className="px-3 py-1 bg-green-600 text-white rounded">Register</button>
    </form>
  );
}
