import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 ">
        <ul className="flex w-full  items-center  bg-black text-white  justify-between ">
          {/* 1st Division */}
          <div className="flex list-none space-x-4 p-3 md:px-20 py-5 font-serif">
            <li className="cursor-pointer rounded-lg px-3  text-black text-lg  hover:text-slate-900">
              <h2 className="text-white   font-semibold ">
                <a href="/">Traffic Violation Management</a>
              </h2>
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Aboutus">About</NavLink>
            </li>
            <li>
              <NavLink to="/">FAQ</NavLink>
            </li>
          </div>
          {/* 3 Division */}

          <li className="flex items-center space-x-14 pr-5 sm:px-10 lg:space-x-14">
            {isAuthenticated && (
              <div className="flex">
                <p className="pt-1 text-[20px]">{user.name}</p>
                <img
                  src={user.picture}
                  alt={user.name}
                  className="mx-3 h-9 w-9 cursor-pointer rounded-full md:rounded-full"
                />
              </div>
            )}
            {isAuthenticated ? (
              <button
                className="rounded-lg bg-red-600 p-1.5 hover:bg-yellow-400"
                onClick={() => {
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  });
                }}
              >
                Log Out
              </button>
            ) : (
              <div>
                <button
                  className="rounded-lg bg-blue-600 p-1.5 hover:bg-green-700"
                  onClick={() => {
                    loginWithRedirect();
                  }}
                >
                  Log In
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
