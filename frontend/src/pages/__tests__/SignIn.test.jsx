import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

import APIService from "../../services/APIService";
import { AuthProvider } from "../../context/AuthContext";
import SignIn from "../SignIn";

jest.mock("../../services/APIService");
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

describe("SignIn Component", () => {
  const mockNavigate = jest.fn();
  const mockToken = "mocked.jwt.token";

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it("renders input fields and button", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("submits form and redirects on success", async () => {
    APIService.signIn.mockResolvedValue({ token: mockToken });

    render(
      <AuthProvider>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(APIService.signIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/rewards");
    });
  });

  it("shows an alert on sign-in failure", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => { });
    APIService.signIn.mockRejectedValue(new Error("Invalid credentials"));

    render(
      <AuthProvider>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Invalid credentials");
    });

    alertSpy.mockRestore();
  });
});
