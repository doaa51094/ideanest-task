import React from "react";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Navbar = () => {
  const { login, register, isAuthenticated, user, logout } = useKindeAuth();

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white backdrop:blur-lg transition-all">
      {!isAuthenticated && (
        <div className="flex h-16 items-center justify-end border-b border-zinc-200 lg:px-20 px-2">
          <div className="  flex items-center justify-end gap-3">
            <button
              onClick={register}
              type="button"
              className="bg-[#301d8b] px-6 py-2 rounded-md text-white"
            >
              Register
            </button>
            <button
              onClick={login}
              type="button"
              className=" px-6 py-2 rounded-md  border border-[#301d8b] text-[#301d8b]"
            >
              Log In
            </button>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-2 lg:px-20">
          <div className="flex justify-center items-center gap-1">
            <span>{user.given_name}</span>
            <span>{user.family_name}</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={logout}
              type="button"
              className="bg-[#301d8b] px-6 py-2 rounded-md text-white"
            >
              Logout
            </button>
            {user.picture && (
              <img
                src={user.picture}
                alt=""
                className="w-12 h-12 rounded-full "
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
