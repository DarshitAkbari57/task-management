import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC<{ setIsLoggedIn: (loggedIn: boolean) => void }> = ({
  setIsLoggedIn,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state: any) => state.User.users?.data);
  const userName = userData?.username;
  const userEmail = userData?.email;

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  // Function to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
      <h2 className="p-4 text-lg font-bold">App Sidebar</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/task"
              className={`block px-4 py-2 hover:bg-gray-700 ${
                isActive("/task") ? "bg-gray-700" : ""
              }`}
            >
              Task
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              className={`block px-4 py-2 hover:bg-gray-700 ${
                isActive("/user") ? "bg-gray-700" : ""
              }`}
            >
              User
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
      <div className="mt-auto p-4 bg-gray-700 rounded-t-lg">
        <div className="text-center mb-2">
          <p className="font-semibold">{userName}</p>
          <p className="text-sm text-gray-400">{userEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-2 mt-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
