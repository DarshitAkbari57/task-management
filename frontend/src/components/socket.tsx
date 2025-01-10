import { useEffect, useState } from "react";
import { IoNotificationsCircle } from "react-icons/io5";
import io from "socket.io-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Establish socket connection
const socket = io("http://localhost:8080");

dayjs.extend(relativeTime);

const TaskList = () => {
  const [tasks, setTasks] = useState<any>([]);

  useEffect(() => {
    // Listen for the 'taskUpdated' event from the server
    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks: any) => {
        // Update task list with the new or updated task
        const taskIndex = prevTasks.findIndex(
          (task: any) => task._id === updatedTask._id
        );
        if (taskIndex !== -1) {
          const updatedTasks = [...prevTasks];
          updatedTasks[taskIndex] = updatedTask;
          return updatedTasks;
        }
        return [...prevTasks, updatedTask];
      });
    });

    // Listen for the 'taskDeleted' event
    socket.on("taskDeleted", (deletedTask) => {
      setTasks((prevTasks: any) =>
        prevTasks.filter((task: any) => task._id !== deletedTask._id)
      );
    });

    return () => {
      // Cleanup on component unmount
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  });

  return tasks?.length > 0 ? (
    <>
      <div className="flex flex-col gap-1">
        {tasks?.[0]?.data?.map((item: any) => {
          return (
            <div className="flex items-center gap-x-1 rounded-md px-1 py-2 hover:bg-gray-100 duration-300">
              <IoNotificationsCircle className="text-3xl text-primary flex-shrink-0" />
              <div className="flex flex-col">
                <p className="text-sm text-black">{tasks?.[0]?.message}</p>
                <p className="text-xs text-neutral-400">
                  {dayjs(item?.data?.created_at).fromNow()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center pt-5 pb-1 sticky bottom-0 bg-white">
        <p
          // href={'/notifications'}
          className="text-gray-800 hover:text-gray-800/80 text-sm border-b border-transparent font-medium hover:border-gray-800/60 duration-300 cursor-pointer"
        >
          View All{" "}
          {tasks?.[0]?.data?.length > 0 && `(${tasks?.[0]?.data?.length})`}
        </p>
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center h-full p-5 my-8">
      <p className="text-lg font-medium text-gray-500">No Notifications</p>
      <p className="text-sm text-gray-400 mt-2 text-center">
        You have no new notifications at the moment.
      </p>
    </div>
  );
};

export default TaskList;
