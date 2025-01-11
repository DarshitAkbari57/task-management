// Header.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // For routing context
import Header from "../header";
import "@testing-library/jest-dom"; // Import jest-dom for custom matchers

// Mock Notification component to simplify the test
jest.mock("../notification", () => () => (
  <div>Mocked Notification Content</div>
));

describe("Header Component", () => {
  it("renders the correct title based on the route", () => {
    render(
      <MemoryRouter initialEntries={["/task"]}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Tasks")).toBeInTheDocument();

    render(
      <MemoryRouter initialEntries={["/users"]}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Users")).toBeInTheDocument();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("shows the notification popover when clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Find the notification icon using the test ID
    const notificationIcon = screen.getByTestId("notification-icon");
    {
      /* *** Using test ID to find the notification icon *** */
    }
    expect(notificationIcon).toBeInTheDocument();

    // Click the notification icon to open the popover
    fireEvent.click(notificationIcon);

    // Check if the notification content is visible after the click
    expect(screen.getByText("Mocked Notification Content")).toBeInTheDocument();
  });
});
