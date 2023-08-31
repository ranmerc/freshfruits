import { screen, render, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "../SignUpForm";
import useSignUp from "@/hooks/useSignUp";
import { useUserContext } from "@/context/UserContext";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/hooks/useSignUp");
jest.mock("@/context/UserContext");

const mockedUseSignUp = useSignUp as jest.Mock;
const mockedUseUserContext = useUserContext as jest.Mock;

mockedUseSignUp.mockReturnValue({
  isLoading: false,
  isError: false,
  error: null,
  mutateAsync: jest.fn(),
});

mockedUseUserContext.mockReturnValue({
  setUserName: jest.fn(),
});

describe("SignUpForm component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("Renders form heading", () => {
    render(<SignUpForm />);

    expect(
      screen.getByRole("heading", { name: "Sign Up" })
    ).toBeInTheDocument();
  });

  it("Renders input fields", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", { name: /Email Address/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("Renders password errors", async () => {
    render(<SignUpForm />);

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
      expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument();
    });
  });

  it("Renders name errors", async () => {
    render(<SignUpForm />);

    const nameInput = screen.getByRole("textbox", { name: "Name" });

    expect(screen.queryByText(/Username is required/i)).not.toBeInTheDocument();

    act(() => {
      fireEvent.focus(nameInput);
      fireEvent.blur(nameInput);
    });

    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(nameInput, "tes");
      fireEvent.blur(nameInput);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Username must be at least 4 characters long/i)
      ).toBeInTheDocument();
    });

    act(() => {
      userEvent.clear(nameInput);
      userEvent.type(nameInput, "testuser");
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/Username is required/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Username must be at least 4 characters long/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Username must be at most 16 characters long/i)
      ).not.toBeInTheDocument();
    });
  });

  it("Renders email errors", async () => {
    render(<SignUpForm />);

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
