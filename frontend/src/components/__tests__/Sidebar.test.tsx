import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Import redux-mock-store
import Sidebar from "../Sidebar";

const mockStore = configureStore([]); // Create the mock store

// Mock `setIsLoggedIn`
const mockSetIsLoggedIn = jest.fn();

describe("Sidebar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("navigates to the route when sidebar items are clicked", () => {
    const store = mockStore({
      User: {
        users: {
          data: {
            username: "Test User",
            email: "test@example.com",
            role: "User", // Change to "Admin" for admin test
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Sidebar setIsLoggedIn={mockSetIsLoggedIn} />
        </Router>
      </Provider>
    );

    // Check if the 'Task' link is in the document and click it
    const taskLink = screen.getByText("Task");
    fireEvent.click(taskLink);

    // Check if the URL changes to '/task'
    expect(window.location.pathname).toBe("/task");
  });

  test("shows user details correctly", () => {
    const store = mockStore({
      User: {
        users: {
          data: {
            username: "Test User",
            email: "test@example.com",
            role: "User",
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Sidebar setIsLoggedIn={mockSetIsLoggedIn} />
        </Router>
      </Provider>
    );

    // Check if user details are displayed correctly
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  test("does not show 'User' menu when user is not admin", () => {
    const store = mockStore({
      User: {
        users: {
          data: {
            username: "Test User",
            email: "test@example.com",
            role: "User", // User is not Admin
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Sidebar setIsLoggedIn={mockSetIsLoggedIn} />
        </Router>
      </Provider>
    );

    // 'User' menu should not be rendered if user is not admin
    expect(screen.queryByText("User")).toBeNull();
  });

  test("shows 'User' menu when user is admin", () => {
    const store = mockStore({
      User: {
        users: {
          data: {
            username: "Test User",
            email: "test@example.com",
            role: "Admin", // Change to "Admin"
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Sidebar setIsLoggedIn={mockSetIsLoggedIn} />
        </Router>
      </Provider>
    );

    // 'User' menu should be rendered if user is admin
    expect(screen.getByText("User")).toBeInTheDocument();
  });

  test("clicking logout button clears localStorage and navigates to '/' page", async () => {
    const clearMock = jest.fn();
    // global.localStorage.clear = clearMock;
    global.Storage.prototype.clear = clearMock;

    const store = mockStore({
      User: {
        users: {
          data: {
            username: "Test User",
            email: "test@example.com",
            role: "User",
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Sidebar setIsLoggedIn={mockSetIsLoggedIn} />
        </Router>
      </Provider>
    );

    // Click on the logout button
    fireEvent.click(screen.getByText(/logout/i));

    // Wait for the effects to be applied
    await waitFor(() => {
      // Check if localStorage.clear was called
      expect(clearMock).toHaveBeenCalled();

      // Check if setIsLoggedIn was called with false
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);

      // Check if the user is navigated to '/'
      expect(window.location.pathname).toBe("/");
    });
  });
});
