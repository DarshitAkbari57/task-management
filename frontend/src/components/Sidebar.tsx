import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <h2 className="p-4 text-lg font-bold">App Sidebar</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/task" className="block px-4 py-2 hover:bg-gray-700">
              Task
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
