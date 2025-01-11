import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UsersPage from "../user";
import { GetAllUsers } from "../../redux/user/actions";

// Mock the action creator
jest.mock("../../redux/user/actions", () => ({
  GetAllUsers: jest.fn().mockReturnValue({ type: "GET_ALL_USERS" }),
}));

const mockStore = configureStore();

describe("UsersPage", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      User: {
        allUsers: {
          data: [
            {
              _id: "1",
              username: "testuser1",
              email: "test1@example.com",
              role: "admin",
            },
            {
              _id: "2",
              username: "testuser2",
              email: "test2@example.com",
              role: "user",
            },
          ],
        },
      },
    });

    // Mock the dispatch function to avoid actual dispatch calls
    store.dispatch = jest.fn();
  });

  test("should render UsersPage component", () => {
    render(
      <Provider store={store}>
        <UsersPage />
      </Provider>
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
  });

  test("should fetch users on component mount", () => {
    render(
      <Provider store={store}>
        <UsersPage />
      </Provider>
    );

    // Verify the dispatch was called to fetch users
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GET_ALL_USERS" });
  });

  test("should display user data in table", async () => {
    render(
      <Provider store={store}>
        <UsersPage />
      </Provider>
    );

    // Wait for the table rows to appear
    await waitFor(() => {
      expect(screen.getByText("testuser1")).toBeInTheDocument();
      expect(screen.getByText("test1@example.com")).toBeInTheDocument();
      expect(screen.getByText("admin")).toBeInTheDocument();

      expect(screen.getByText("testuser2")).toBeInTheDocument();
      expect(screen.getByText("test2@example.com")).toBeInTheDocument();
      expect(screen.getByText("user")).toBeInTheDocument();
    });
  });
});
