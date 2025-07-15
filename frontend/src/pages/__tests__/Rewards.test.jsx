import { render, screen, waitFor } from "@testing-library/react";

import Rewards from "../Rewards";
import { AuthProvider } from "../../context/AuthContext";
import APIService from "../../services/APIService";

jest.mock("../../services/APIService");

const mockRewards = [
  { id: 1, title: "Free Coffee", cost: 50 },
  { id: 2, title: "Movie Ticket", cost: 100 },
];

describe("Rewards Page", () => {
  beforeEach(() => {
    localStorage.setItem("token", "mock-token");
    APIService.getRewards.mockResolvedValue(mockRewards);
  });

  it("renders rewards from the API", async () => {
    render(
      <AuthProvider>
        <Rewards />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Free Coffee")).toBeInTheDocument();
      expect(screen.getByText("Movie Ticket")).toBeInTheDocument();
    });
  });
});
