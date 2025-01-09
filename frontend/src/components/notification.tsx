import TaskList from "./socket";

const Notification = () => {
  return (
    <div className="w-80 ssm:w-full h-full max-h-96 overflow-y-auto overflow-x-hidden scrollbar">
      <p className="font-medium border-b pb-2 mb-4 sticky top-0 bg-white">
        Notifications
      </p>
      {TaskList()}
    </div>
  );
};

export default Notification;
