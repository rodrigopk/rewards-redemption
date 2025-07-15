import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import APIService from "../../services/APIService";
import Redemptions from "../Redemptions";

jest.mock("../../services/APIService");

const mockToken = "test-token";

const renderWithAuth = (ui) =>
  render(
    <AuthContext.Provider value={{ token: mockToken }}>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthContext.Provider>
  );

describe("Redemptions page", () => {
  it("renders redemptions from API", async () => {
    APIService.getRedemptions.mockResolvedValueOnce([
      {
        id: 1,
        redeemed_at: "2025-07-15T12:00:00Z",
        reward: { title: "Free Coffee", cost: 50 },
      },
      {
        id: 2,
        redeemed_at: "2025-07-14T10:30:00Z",
        reward: { title: "Movie Ticket", cost: 100 },
      },
    ]);

    renderWithAuth(<Redemptions />);

    expect(screen.getByText("Redemption History")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Free Coffee")).toBeInTheDocument();
      expect(screen.getByText("Movie Ticket")).toBeInTheDocument();
      expect(screen.getByText(/Cost: 50 pts/i)).toBeInTheDocument();
      expect(screen.getByText(/Cost: 100 pts/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Redeemed at:/i).length).toBe(2);
    });
  });

  it("handles empty redemptions", async () => {
    APIService.getRedemptions.mockResolvedValueOnce([]);

    renderWithAuth(<Redemptions />);

    await waitFor(() => {
      expect(screen.getByText("No redemptions found.")).toBeInTheDocument();
    });
  });

  it("shows error message on fetch failure", async () => {
    APIService.getRedemptions.mockRejectedValueOnce(new Error("Server error"));

    renderWithAuth(<Redemptions />);

    await waitFor(() => {
      expect(
        screen.getByText("Could not load redemptions.")
      ).toBeInTheDocument();
    });
  });
});
