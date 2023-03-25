import { render, fireEvent, screen } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";

describe("ExpenseForm", () => {
  test("submitHandler should update expenses state and save data to the database", async () => {
    // Arrange
    const mockExpenses = [
      { id: "123", amount: "50", description: "Groceries", category: "Food" },
      { id: "456", amount: "25", description: "Gas", category: "Travel" },
    ];

    // Mock the dependencies
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    jest.spyOn(console, "error").mockImplementation(() => {});

    const setExpensesMock = jest.fn();
    jest.mock("react-redux", () => ({
      useDispatch: () => jest.fn(),
      useSelector: () => ({
        expenses: mockExpenses,
      }),
    }));

    jest.mock("../../store/expense", () => ({
      setExpenses: setExpensesMock,
    }));

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    render(<ExpenseForm />);

    const amountInput = screen.getByPlaceholderText("Amount");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const categoryInput = screen.getByPlaceholderText("Category");
    const submitButton = screen.getByRole("button", { name: "Add Expense" });

    fireEvent.change(amountInput, { target: { value: "100" } });
    fireEvent.change(descriptionInput, { target: { value: "Rent" } });
    fireEvent.change(categoryInput, { target: { value: "Housing" } });
    fireEvent.click(submitButton);

    // Act
    await Promise.resolve();

    // Assert
    expect(setExpensesMock).toHaveBeenCalledWith([
      ...mockExpenses,
      {
        id: expect.any(String),
        amount: "100",
        description: "Rent",
        category: "Housing",
      },
    ]);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("firebase"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          amount: "100",
          description: "Rent",
          category: "Housing",
          id: expect.any(String),
        }),
      })
    );
  });
});
