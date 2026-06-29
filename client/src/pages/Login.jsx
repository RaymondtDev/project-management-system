import { useRef, useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
  const { login, loading, admin } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [checked, setChecked] = useState(false);
  const checkboxRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
  };
  const handleCheck = (e) => {
    e.preventDefault();
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="h-screen w-full flex justify-center items-center bg-linear-to-br from-primary-bg to-secondary-bg">
      <div className="py-4 px-8 bg-white rounded-md shadow-md md:w-1/2">
        <h1 className="mb-4 text-primary-bg">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <p>Email:</p>
            <input
              type="email"
              className="mb-2"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <div className="flex gap-1.5">
              <input
                type="checkbox"
                ref={checkboxRef}
                hidden
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <input
                type={checked ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleCheck} className="cursor-pointer px-1">
                {checked ? (
                  <FaRegEyeSlash className="hover:fill-lime-100 w-12 aspect-square" />
                ) : (
                  <FaRegEye className="hover:fill-lime-100 w-12 aspect-square" />
                )}
              </button>
            </div>
          </label>
          <button
            type="submit"
            className="py-2 px-4 cursor-pointer bg-primary-btn rounded-md mt-2"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-secondary-bg">
            register
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
