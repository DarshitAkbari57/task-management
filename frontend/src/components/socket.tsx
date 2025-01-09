import { useEffect, useState } from "react";
import io from "socket.io-client";

// Establish socket connection
const socket = io("http://localhost:8080");

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Listen for the 'taskUpdated' event from the server
    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) => {
        // Update task list with the new or updated task
        const taskIndex = prevTasks.findIndex(
          (task) => task._id === updatedTask._id
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
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== deletedTask._id)
      );
    });

    return () => {
      // Cleanup on component unmount
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  });

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
