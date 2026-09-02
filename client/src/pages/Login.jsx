import { useRef, useState } from "react";
import { useAuth } from "../UseAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
  const { login, loading } = useAuth();
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
      <div className="py-4 px-8 bg-white rounded-md shadow-md md:w-1/3">
        <h1 className="mb-4 text-primary-bg text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <p className="mb-1">Email:</p>
            <div className="mb-3 px-1.5 rounded-full outline-2 outline-primary-bg/30 focus-within:outline-primary-bg">
              <input
                type="email"
                className="border-none outline-none"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          <label htmlFor="password">
            <p className="mb-1">Password:</p>
            <div className="flex gap-1.5 outline-2 outline-primary-bg/30 rounded-full px-1.5 focus-within:outline-primary-bg">
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
                className="border-none outline-none"
              />
              <button onClick={handleCheck} className="cursor-pointer">
                {checked ? (
                  <FaRegEyeSlash className="w-12 aspect-square" />
                ) : (
                  <FaRegEye className="w-12 aspect-square" />
                )}
              </button>
            </div>
          </label>
          <button
            type="submit"
            className="py-2 px-4 cursor-pointer bg-primary-btn rounded-full mt-4 w-full"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
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
