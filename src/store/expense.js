import { createSlice } from "@reduxjs/toolkit";

const expenseInitialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: expenseInitialState,
  reducers: {
    addExpense(state, action) {
      // Add a new expense to the state
      state.expenses.push(action.payload);
    },
    updateExpense(state, action) {
      // Update an existing expense in the state
      const updatedExpense = action.payload;
      const index = state.expenses.findIndex(
        (expense) => expense.id === updatedExpense.id
      );
      state.expenses[index] = updatedExpense;
    },
    deleteExpense(state, action) {
      // Remove an expense from the state
      const id = action.payload;
      state.expenses = state.expenses.filter((expense) => expense.id !== id);
    },
    setExpenses(state, action) {
      // Set expenses fetched from backend to the state
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, updateExpense, deleteExpense, setExpenses } =
  expenseSlice.actions;

export default expenseSlice.reducer;
