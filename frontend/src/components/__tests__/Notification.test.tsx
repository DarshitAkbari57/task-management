import { render, screen } from "@testing-library/react";
// import TaskList from "../socket"; // Correct import path if necessary
import "@testing-library/jest-dom"; // For custom matchers
import Notification from "../notification";

// Mock the TaskList component to simplify the test
jest.mock("../socket", () => () => (
  <div>Mocked Task List</div> // Return a mocked TaskList for testing
));

describe("Notification Component", () => {
  it("renders the notification header correctly", () => {
    render(<Notification />);

    // Check if the header 'Notifications' is rendered
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("renders the TaskList component", () => {
    render(<Notification />);

    // Check if the mocked TaskList content is rendered
    expect(screen.getByText("Mocked Task List")).toBeInTheDocument();
  });

  it("has the correct styles for notification container", () => {
    render(<Notification />);

    const notificationContainer = screen
      .getByText("Notifications")
      .closest("div");

    // Check if the container has the expected class for the notification box
    expect(notificationContainer).toHaveClass("w-80");
    expect(notificationContainer).toHaveClass("ssm:w-full");
    expect(notificationContainer).toHaveClass("h-full");
    expect(notificationContainer).toHaveClass("max-h-96");
    expect(notificationContainer).toHaveClass("overflow-y-auto");
    expect(notificationContainer).toHaveClass("overflow-x-hidden");
    expect(notificationContainer).toHaveClass("scrollbar");
  });

  it("renders the sticky header correctly", () => {
    render(<Notification />);

    // Check if the sticky header with 'Notifications' is rendered
    const header = screen.getByText("Notifications");

    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("font-medium");
    expect(header).toHaveClass("border-b");
    expect(header).toHaveClass("pb-2");
    expect(header).toHaveClass("mb-4");
    expect(header).toHaveClass("sticky");
    expect(header).toHaveClass("top-0");
    expect(header).toHaveClass("bg-white");
  });
});
