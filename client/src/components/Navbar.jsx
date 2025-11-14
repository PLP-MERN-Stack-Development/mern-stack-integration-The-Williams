import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container flex items-center justify-between py-4">
        <div>
          <Link to="/" className="font-bold text-xl">MERN Blog</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/create" className="text-sm">New Post</Link>
          {user ? (
            <>
              <span className="text-sm">{user.name}</span>
              <button onClick={handleLogout} className="text-sm text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
