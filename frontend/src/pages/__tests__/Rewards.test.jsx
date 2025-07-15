import { render, screen, waitFor } from "@testing-library/react";

import { AuthProvider } from "../../context/AuthContext";
import { PointsProvider } from "../../context/PointsContext";
import APIService from "../../services/APIService";
import Rewards from "../Rewards";

jest.mock("../../services/APIService");

const mockRewards = [
  { id: 1, title: "Free Coffee", cost: 50 },
  { id: 2, title: "Movie Ticket", cost: 100 },
];

describe("Rewards Page", () => {
  beforeEach(() => {
    localStorage.setItem("token", "mock-token");
    APIService.getRewards.mockResolvedValue(mockRewards);
    APIService.getPoints.mockResolvedValue({ user_id: 1, points: 120 });
  });

  it("renders rewards from the API", async () => {
    render(
      <AuthProvider>
        <PointsProvider>
          <Rewards />
        </PointsProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Free Coffee")).toBeInTheDocument();
      expect(screen.getByText("Movie Ticket")).toBeInTheDocument();
    });
  });
});
