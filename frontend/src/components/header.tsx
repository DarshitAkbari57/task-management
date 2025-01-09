import { Popover } from "antd";
import { IoNotifications } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Notification from "./notification";

const Header = () => {
  const location = useLocation();

  // Determine the title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case "/task":
        return "Tasks";
      case "/users":
        return "Users";
      default:
        return "Hello";
    }
  };

  // Example notifications array (replace with your actual notification state)
  const notifications = ["New task assigned", "User created"];

  return (
    <div className="bg-white p-4 shadow-md flex items-center justify-between">
      <h1 className="text-xl font-semibold">{getTitle()}</h1>
      <div className="mr-4 relative">
        <Popover
          placement="bottomRight"
          content={<Notification notifications={notifications} />}
          trigger="click" // Trigger the popover on click
        >
          <div className="relative group">
            <IoNotifications className="text-2xl text-gray-400 cursor-pointer" />
            {notifications?.length > 0 ? (
              <div className="absolute -top-2 -right-1 bg-gray-200 text-gray-700 font-medium text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {notifications?.length}
              </div>
            ) : (
              <div className="absolute border border-white -top-1 right-0.5 bg-gray-300 text-white text-[10px] rounded-full w-2.5 h-2.5 flex items-center justify-center"></div>
            )}
            <div className="absolute right-7 top-1/2 -translate-y-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Notifications{" "}
              {notifications?.length > 0 && `(${notifications?.length})`}
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
