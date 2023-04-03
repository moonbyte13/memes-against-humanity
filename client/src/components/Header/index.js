import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import "./header.css";

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  function redirect(event) {
    event.preventDefault();
    window.location.href = "/";
  }

  function memeRedirect() {
    window.location.href = "/memes";
  }

  return (
    <header className=" w-full bg-slate-950 text-white flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 mr-6">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer pb-3 font-futura"
          onClick={redirect}
        >
          Memes Against Humanity
        </h1>
      </div>
      <nav>
        <div className="flex flex-grow items-center">
          <Link
            to="/memes"
            onClick={memeRedirect}
            className="mr-4 text-lg md:text-xl lg:text-2xl font-futura hover:text-gray-400"
          >
            Meme Gallery
          </Link>
          {Auth.loggedIn() ? (
            <div className="flex items-center">
              <Link
                to="/profile"
                className="mr-4 text-lg md:text-xl lg:text-2xl font-futura hover:text-gray-400"
              >
                Profile
              </Link>

              <button
                className="bg-white text-gray-800 rounded-md px-4 py-2 font-futura hover:bg-gray-400 hover:text-white text-lg md:text-xl lg:text-2xl"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to="/login"
                className="mr-4 text-lg md:text-xl lg:text-2xl font-futura hover:text-gray-400"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border-2 border-white rounded-md px-4 py-2 text-lg md:text-xl lg:text-2xl font-futura hover:bg-gray-400 hover:border-gray-400 hover:text-white"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
