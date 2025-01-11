import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useNavigate } from "react-router-dom";
import LoginRegister from "../login";

// Mocking the necessary dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Dummy reducer to create the store
const dummyReducer = (state = {}, action: any) => state;
const store = createStore(dummyReducer);

describe("LoginRegister Component", () => {
  let navigateMock: jest.Mock;

  beforeEach(() => {
    navigateMock = useNavigate() as jest.Mock; // Mock useNavigate
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

  it("should render the Login form by default", () => {
    render(
      <Provider store={store}>
        <LoginRegister setIsLoggedIn={jest.fn()} />
      </Provider>
    );

    // Ensure that the "Login" header is present and is the correct element
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    // Check for the presence of input fields for email and password
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });

  it("should toggle to Register mode when clicked on 'Register'", () => {
    render(
      <Provider store={store}>
        <LoginRegister setIsLoggedIn={jest.fn()} />
      </Provider>
    );

    // Click on the 'Register' link
    fireEvent.click(screen.getByText("Register"));

    // Ensure the 'Register' heading is present
    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();

    // Ensure that the "Enter your username" input field appears in register mode
    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
  });

  it("should toggle to Login mode when clicked on 'Login'", () => {
    render(
      <Provider store={store}>
        <LoginRegister setIsLoggedIn={jest.fn()} />
      </Provider>
    );

    // Switch to register mode
    fireEvent.click(screen.getByText("Register"));

    // Then switch back to login mode
    fireEvent.click(screen.getByText("Login"));

    // Ensure that the "Login" header is present again
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    // Ensure that the username field is no longer present
    expect(screen.queryByPlaceholderText("Enter your username")).toBeNull();
  });
});
