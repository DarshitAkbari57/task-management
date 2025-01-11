import { Popover } from "antd";
import { IoNotifications } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Notification from "./notification";

const Header = () => {
  const location = useLocation();

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

  return (
    <div className="bg-white p-4 shadow-md flex items-center justify-between">
      <h1 className="text-xl font-semibold">{getTitle()}</h1>
      <div className="mr-4 relative">
        <Popover
          placement="bottomRight"
          content={<Notification />}
          trigger="click"
        >
          <div className="relative group">
            <IoNotifications
              className="text-2xl text-gray-400 cursor-pointer"
              data-testid="notification-icon"
            />
            <div className="absolute border border-white -top-1 right-0.5 bg-gray-300 text-white text-[10px] rounded-full w-2.5 h-2.5 flex items-center justify-center"></div>
            <div className="absolute right-7 top-1/2 -translate-y-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Notifications
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
