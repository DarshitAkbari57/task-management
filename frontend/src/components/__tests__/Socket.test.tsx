import { render, screen, waitFor, act } from "@testing-library/react";
import TaskList from "../socket";

// Mock the socket.io-client
jest.mock("socket.io-client", () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  }));
});

// Mock dayjs
jest.mock("dayjs", () => ({
  extend: jest.fn(),
  fromNow: jest.fn().mockReturnValue("a few seconds ago"),
}));

describe("TaskList Component", () => {
  it("should render 'No Notifications' message when there are no tasks", () => {
    render(<TaskList />);
    expect(screen.getByText("No Notifications")).toBeInTheDocument();
    expect(
      screen.getByText("You have no new notifications at the moment.")
    ).toBeInTheDocument();
  });

  //   it("should render task notifications when tasks are present", async () => {
  //     const mockTasks = [
  //       {
  //         _id: "1",
  //         message: "New task created",
  //         data: [
  //           {
  //             _id: "1",
  //             data: {
  //               created_at: "2025-01-01T00:00:00Z",
  //             },
  //           },
  //         ],
  //       },
  //     ];

  //     render(<TaskList />);

  //     const socketInstance = require("socket.io-client")();
  //     socketInstance.on.mockImplementationOnce((event: any, callback: any) => {
  //       if (event === "taskUpdated") {
  //         callback(mockTasks[0]); // Emit the taskUpdated event with mock data
  //       }
  //     });

  //     // Simulate emitting the taskUpdated event
  //     act(() => {
  //       socketInstance.on("taskUpdated", (task: any) => {
  //         // Task should be rendered after the event
  //       });
  //     });

  //     // Use waitFor to wait for the task to be rendered
  //     await waitFor(() => {
  //       const taskElement = screen.getByText(mockTasks[0].message);
  //       expect(taskElement).toBeInTheDocument();
  //     });
  //   });

  //   it("should update task list when a 'taskUpdated' event is emitted", async () => {
  //     const initialTask = {
  //       _id: "1",
  //       message: "Task 1",
  //       data: [
  //         {
  //           _id: "1",
  //           data: {
  //             created_at: "2025-01-01T00:00:00Z",
  //           },
  //         },
  //       ],
  //     };

  //     const updatedTask = {
  //       _id: "1",
  //       message: "Updated Task 1",
  //       data: [
  //         {
  //           _id: "1",
  //           data: {
  //             created_at: "2025-01-01T01:00:00Z",
  //           },
  //         },
  //       ],
  //     };

  //     render(<TaskList />);

  //     const socketInstance = require("socket.io-client")();
  //     socketInstance.on.mockImplementationOnce((event: any, callback: any) => {
  //       if (event === "taskUpdated") {
  //         callback(updatedTask); // Emit the updated task
  //       }
  //     });

  //     // Simulate emitting the taskUpdated event
  //     act(() => {
  //       socketInstance.on("taskUpdated", (task: any) => {
  //         const taskElement = screen.queryByText(task.message);
  //         expect(taskElement).toBeInTheDocument();
  //         expect(taskElement).toHaveTextContent("Updated Task 1");
  //       });
  //     });

  //     // Wait for updated task message appearance
  //     await waitFor(() => screen.getByText("Updated Task 1"));
  //   });

  //   it("should remove task from list when 'taskDeleted' event is emitted", async () => {
  //     const taskToDelete = {
  //       _id: "1",
  //       message: "Task to be deleted",
  //       data: [
  //         {
  //           _id: "1",
  //           data: {
  //             created_at: "2025-01-01T00:00:00Z",
  //           },
  //         },
  //       ],
  //     };

  //     render(<TaskList />);

  //     const socketInstance = require("socket.io-client")();
  //     socketInstance.on.mockImplementationOnce((event: any, callback: any) => {
  //       if (event === "taskUpdated") {
  //         callback(taskToDelete); // Emit task to be displayed
  //       }
  //       if (event === "taskDeleted") {
  //         callback(taskToDelete); // Emit task to be deleted
  //       }
  //     });

  //     // Simulate emitting the taskUpdated event
  //     act(() => {
  //       socketInstance.on("taskUpdated", (task: any) => {
  //         const taskElement = screen.queryByText(task.message);
  //         expect(taskElement).toBeInTheDocument();
  //       });
  //     });

  //     // Simulate emitting the taskDeleted event
  //     act(() => {
  //       socketInstance.on("taskDeleted", (task: any) => {
  //         // Ensure the task is removed from the DOM
  //         const taskElement = screen.queryByText(task.message);
  //         expect(taskElement).not.toBeInTheDocument();
  //       });
  //     });

  //     // Wait for task deletion
  //     await waitFor(() => screen.queryByText("Task to be deleted"));
  //   });
});
