import { useState, useRef } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from "../UseAuth";
import { Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
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
      <div className="py-4 px-8 bg-white rounded-md shadow-md md:w-2/5">
        <h1 className="text-primary-bg mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-1 mb-2">
            <label htmlFor="username">
              <p className="mb-1">Username:</p>
              <div className="px-2 border-2 border-primary-bg/30 focus-within:border-primary-bg rounded-full">
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-none outline-none"
                />
              </div>
            </label>
            <label htmlFor="email">
              <p className="mb-1">Email:</p>
              <div className="px-2 border-2 border-primary-bg/30 focus-within:border-primary-bg rounded-full">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-none outline-none"
                />
              </div>
            </label>
          </div>
          <label htmlFor="password">
            <p className="mb-1">Password:</p>
            <div className="flex gap-1.5 px-2 border-2 border-primary-bg/30 focus-within:border-primary-bg rounded-full">
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
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
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
