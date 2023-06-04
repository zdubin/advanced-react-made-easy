import { render, fireEvent, screen } from "@testing-library/react";
import { Spot } from "./Spot";

describe("Spot", () => {
  it("should render the Select button if spotValue is null and didWin is false", () => {
    const setPiece = jest.fn();
    const didWin = jest.fn().mockReturnValue(false);
    render(
      <Spot row={0} column={0}spotValue={null} didWin={didWin} setPiece={setPiece} />
    );
    const selectButton = screen.getByRole("button", { name: "Select" });
    expect(selectButton).toBeInTheDocument();
    fireEvent.click(selectButton);
    expect(setPiece).toHaveBeenCalledTimes(1);
  });

  it("should not render the Select button if spotValue is not null or didWin is true", () => {
    const setPiece = jest.fn();
    const didWin = jest.fn().mockReturnValue(true);
    render(
      <Spot row={0} column={0}spotValue={"X"} didWin={didWin} setPiece={setPiece} />
    );
    const selectButton = screen.queryByRole("button", { name: "Select" });
    expect(selectButton).not.toBeInTheDocument();
  });
});
