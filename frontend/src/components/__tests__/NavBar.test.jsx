import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { PointsContext } from "../../context/PointsContext";
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
  const renderWithContext = (token = "fake-jwt-token") =>
    render(
      <AuthContext.Provider value={{ token }}>
        <PointsContext.Provider value={{ points: 120 }}>
          <MemoryRouter>
            <NavBar />
          </MemoryRouter>
        </PointsContext.Provider>
      </AuthContext.Provider>
    );

  it("renders when user is authenticated", async () => {
    renderWithContext();

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument(); // dropdown button
    });
  });

  it("does not render when user is not authenticated", async () => {
    renderWithContext(null);

    await waitFor(() => {
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
