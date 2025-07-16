import { render, screen, waitFor } from "@testing-library/react";

import { PointsProvider, usePoints } from "../PointsContext";
import { AuthProvider } from "../AuthContext";
import APIService from "../../services/APIService";
import { act } from "react";

jest.mock("../../services/APIService", () => ({
  getPoints: jest.fn(),
}));

beforeEach(() => {
  localStorage.setItem("token", "storedToken");
});

afterEach(() => {
  localStorage.clear();
});

const TestComponent = () => {
  const { points, setPoints } = usePoints();

  return (
    <div>
      <div data-testid="points">{points ?? "no-points"}</div>
      <button onClick={() => setPoints(777)}>Update Points</button>
    </div>
  );
};

describe("PointsContext", () => {
  it("fetches and provides initial points from the API", async () => {
    APIService.getPoints.mockResolvedValueOnce({ points: 123 });

    render(
      <AuthProvider>
        <PointsProvider>
          <TestComponent />
        </PointsProvider>
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("points")).toHaveTextContent("123")
    );
  });

  it("allows updating points via setPoints", async () => {
    APIService.getPoints.mockResolvedValueOnce({ points: 42 });

    render(
      <AuthProvider>
        <PointsProvider>
          <TestComponent />
        </PointsProvider>
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("points")).toHaveTextContent("42")
    );

    act(() => {
      screen.getByText("Update Points").click();
    });

    await waitFor(() =>
      expect(screen.getByTestId("points")).toHaveTextContent("777")
    );
  });
});
