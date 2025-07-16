import { render, screen, act } from "@testing-library/react";

import Toast from "../Toast";

jest.useFakeTimers();

describe("Toast component", () => {
  it("renders the message with correct style", () => {
    render(<Toast message="Success!" type="success" onClose={jest.fn()} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Success!");
    expect(screen.getByRole("alert")).toHaveClass("bg-green-500");
  });

  it("uses red styling when type is error", () => {
    render(<Toast message="Oops!" type="error" onClose={jest.fn()} />);
    expect(screen.getByRole("alert")).toHaveClass("bg-red-500");
  });

  it("calls onClose after timeout", () => {
    const onClose = jest.fn();

    render(<Toast message="Gone soon!" type="success" onClose={onClose} />);

    act(() => {
      jest.advanceTimersByTime(3000); // triggers fade out
      jest.advanceTimersByTime(300); // triggers unmount
    });

    expect(onClose).toHaveBeenCalled();
  });
});
