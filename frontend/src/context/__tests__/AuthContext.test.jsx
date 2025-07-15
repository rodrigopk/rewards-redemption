import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
import userEvent from "@testing-library/user-event";

// Dummy component for testing
const TestComponent = () => {
  const { token, setToken } = useAuth();

  return (
    <div>
      <div data-testid="token">{token || "no-token"}</div>
      <button onClick={() => setToken("abc123")}>Set Token</button>
      <button onClick={() => setToken(null)}>Clear Token</button>
    </div>
  );
};

const renderTestComponent = () =>
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should load token from localStorage", () => {
    localStorage.setItem("token", "storedToken");

    renderTestComponent();

    expect(screen.getByTestId("token")).toHaveTextContent("storedToken");
  });

  it("should update token and persist it", async () => {
    renderTestComponent();

    await userEvent.click(screen.getByText("Set Token"));

    expect(screen.getByTestId("token")).toHaveTextContent("abc123");
    expect(localStorage.getItem("token")).toBe("abc123");
  });

  it("should clear token and remove it from storage", async () => {
    renderTestComponent();

    await userEvent.click(screen.getByText("Set Token"));
    await userEvent.click(screen.getByText("Clear Token"));

    expect(screen.getByTestId("token")).toHaveTextContent("no-token");
    expect(localStorage.getItem("token")).toBeNull();
  });
});
