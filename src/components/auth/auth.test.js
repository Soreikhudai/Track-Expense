import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Auth from "./Auth";
import store from "../../store/index";

describe("Auth component", () => {
  test("renders login form by default", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </Provider>
    );
    const loginTitle = screen.getByText("Login");
    expect(loginTitle).toBeInTheDocument();
  });

  test("renders sign up form when switch auth mode button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </Provider>
    );
    const switchButton = screen.getByText(
      "Don't have an account? Sign up here"
    );
    fireEvent.click(switchButton);
    const signUpTitle = screen.getByText("Sign Up");
    expect(signUpTitle).toBeInTheDocument();
  });

  test("shows error message when passwords do not match on sign up form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </Provider>
    );
    const switchButton = screen.getByText(
      "Don't have an account? Sign up here"
    );
    fireEvent.click(switchButton);
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByText("Sign Up");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      "Passwords do not match. Please try again."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("shows loading spinner when submit button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Login");
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);
    const loadingSpinner = screen.getByText("sending request....");
    expect(loadingSpinner).toBeInTheDocument();
  });

  test("navigates to main page after successful login", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Login");
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);
    const mainPageTitle = await screen.findByText("Main Page");
    expect(mainPageTitle).toBeInTheDocument();
  });
});
