import { useState, useRef } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function Register() {
  const { register, loading } = useAuth();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const checkboxRef = useRef(null);
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, email, password);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-linear-to-br from-primary-bg to-secondary-bg">
      <div className="py-4 px-8 bg-white rounded-md shadow-md md:w-1/2">
        <h1 className="text-primary-bg mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <label htmlFor="password">
            Password:
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
            Register
          </button>
        </form>
        <p className="mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-secondary-bg">
            log in
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
