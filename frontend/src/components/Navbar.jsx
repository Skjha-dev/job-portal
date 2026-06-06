import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">

      {/* Top Bar */}
      <div className="flex justify-between items-center p-4">

        {/* Logo */}
        <Link to="/" className="font-bold text-xl">
          JobPortal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/jobs">Jobs</Link>

              {/* Dropdown */}
              <div className="relative">

                <button
                  onClick={() => setOpen(!open)}
                  className="px-3 py-1 bg-gray-100 rounded"
                >
                  {user.fullname} ▼
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow border rounded">

                    {user.role === "recruiter" && (
                      <>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>

                        <Link
                          to="/my-jobs"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Jobs
                        </Link>
                      </>
                    )}

                    {user.role === "seeker" && (
                      <Link
                        to="/applications"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Applications
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden flex flex-col gap-2 p-4 border-t">

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMobileMenu(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileMenu(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/jobs" onClick={() => setMobileMenu(false)}>
                Jobs
              </Link>

              {user.role === "recruiter" && (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenu(false)}>
                    Dashboard
                  </Link>
                  <Link to="/my-jobs" onClick={() => setMobileMenu(false)}>
                    My Jobs
                  </Link>
                </>
              )}

              {user.role === "seeker" && (
                <Link to="/applications" onClick={() => setMobileMenu(false)}>
                  My Applications
                </Link>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenu(false);
                }}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;