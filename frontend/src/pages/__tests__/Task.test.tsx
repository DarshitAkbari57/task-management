import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useNavigate } from "react-router-dom";
import LoginRegister from "../login";

// Mock the necessary dependencies
jest.mock("../../redux/user/actions", () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

jest.mock("../../utility/popup", () => ({
  generatePopup: jest.fn(),
}));

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

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });

  test("should toggle to Register mode when clicked on 'Register'", async () => {
    render(
      <Provider store={store}>
        <LoginRegister setIsLoggedIn={jest.fn()} />
      </Provider>
    );

    // Wait for the element to render
    await waitFor(() => screen.getByText("Register"));

    // Simulate the click event
    fireEvent.click(screen.getByText("Register"));

    // Use a more flexible query for the header or button in register mode
    const registerButton = screen.getByRole("button", { name: /Register/i }); // Adjust if necessary
    expect(registerButton).toBeInTheDocument();

    // Assert that the register form elements are now present
    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
  });

  test("should toggle to Login mode when clicked on 'Login'", async () => {
    render(
      <Provider store={store}>
        <LoginRegister setIsLoggedIn={jest.fn()} />
      </Provider>
    );

    // Wait for the Login button to appear
    await waitFor(() => screen.getByRole("button", { name: /login/i }));

    // Find the Login button by its role and name
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Simulate the click event on the Login button
    fireEvent.click(loginButton);

    // Assert that the Login button is now visible
    expect(loginButton).toBeInTheDocument();

    // Also assert that other login-specific elements (like password input) are present
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });
});
