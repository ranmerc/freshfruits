import { screen, render, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../LoginForm";
import useLogin from "@/hooks/useLogin";
import { useUserContext } from "@/context/UserContext";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/hooks/useLogin");
jest.mock("@/context/UserContext");

const mockedUseLogin = useLogin as jest.Mock;
const mockedUseUserContext = useUserContext as jest.Mock;

mockedUseLogin.mockReturnValue({
  isLoading: false,
  isError: false,
  error: null,
  mutateAsync: jest.fn(),
});

mockedUseUserContext.mockReturnValue({
  setUserName: jest.fn(),
});

describe("LoginForm component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("Renders form heading", () => {
    render(<LoginForm />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  it("Renders input fields", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("textbox", { name: /Email Address/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("Renders login button and register link", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Create Account" })
    ).toHaveAttribute("href", "/signup");
  });

  it("Renders password errors", async () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/Password/i);

    expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();

    act(() => {
      fireEvent.focus(passwordInput);
      fireEvent.blur(passwordInput);
    });

    await waitFor(() => {
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(passwordInput, "test");
      fireEvent.blur(passwordInput);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 8 characters long/i)
      ).toBeInTheDocument();
    });

    act(() => {
      userEvent.clear(passwordInput);
      userEvent.type(passwordInput, "password");
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/Password is required/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Password must be at least 8 characters long/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Password must be at most 128 characters long/i)
      ).not.toBeInTheDocument();
    });
  });

  it("Renders email errors", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: "Email Address" });

    expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();

    act(() => {
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);
    });

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    act(async () => {
      userEvent.type(emailInput, "test");
      fireEvent.blur(emailInput);
    });

    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });

    act(() => {
      userEvent.clear(emailInput);
      userEvent.type(emailInput, "name@email.com");
    });

    await waitFor(() => {
      expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument();
    });
  });
});
