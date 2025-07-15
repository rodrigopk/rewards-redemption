import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import NavBar from "../NavBar";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ points: 120 }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("NavBar", () => {
  const renderWithAuth = (token = "fake-jwt-token") =>
    render(
      <AuthContext.Provider value={{ token }}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

  it("renders when user is authenticated", async () => {
    renderWithAuth();

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument(); // dropdown button
    });
  });

  it("does not render when user is not authenticated", async () => {
    render(
      <AuthContext.Provider value={{ token: null }}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
