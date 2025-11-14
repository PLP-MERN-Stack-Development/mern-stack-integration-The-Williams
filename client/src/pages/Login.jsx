import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handle} className="grid gap-2 max-w-md">
      <h2 className="text-xl">Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 border"/>
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 border"/>
      <button className="px-3 py-1 bg-blue-600 text-white rounded">Login</button>
    </form>
  );
}
