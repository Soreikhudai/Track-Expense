import { useRef, useState } from "react";
import Wrapper from "../UI/Wrapper";
import classes from "./ExpenseForm.module.css";
const ExpenseForm = () => {
  const [detailList, setDetailList] = useState([]);
  const amountRef = useRef("");
  const descriptionRef = useRef("");
  const categoryRef = useRef("");
  const submitHandler = (event) => {
    event.preventDefault();
    const details = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    setDetailList([...detailList, details]);
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };
  return (
    <>
      <Wrapper>
        <form className={classes["expense-form"]} onSubmit={submitHandler}>
          <div className={classes["expense-input-wrapper"]}>
            <label className={classes.expenseLabel}>Amount: </label>
            <input
              className={classes.expenseInput}
              type="number"
              ref={amountRef}
            />
          </div>
          <div className={classes["expense-input-wrapper"]}>
            <label className={classes.expenseLabel}>Description: </label>
            <input
              className={classes.expenseInput}
              type="text"
              ref={descriptionRef}
            />
          </div>
          <div className={classes["expense-input-wrapper"]}>
            <label>Category: </label>
            <select ref={categoryRef}>
              <option>Select</option>
              <option>Petrol</option>
              <option>Food</option>
              <option>Salary</option>
              <option>Grocery</option>
              <option>Clothes</option>
              <option>others</option>
            </select>
          </div>
          <div>
            <button className={classes.expenseButton}>Add Expense</button>
          </div>
        </form>
      </Wrapper>
      <table
        style={{
          width: "70%",
          border: "1px solid grey",
          margin: "1rem auto",
          borderRadius: "5px",
          boxShadow: "0px 3px 8px black",
          borderCollapse: "collapse", // new style added
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "center",
                padding: "1rem",
                borderBottom: "1px solid green",
              }}
            >
              Amount
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "1rem",
                borderBottom: "1px solid green",
              }}
            >
              Description
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "1rem",
                borderBottom: "1px solid green",
              }}
            >
              Category
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "1rem",
                borderBottom: "1px solid green",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {detailList.map((item, index) => (
            <tr
              key={index}
              style={{ textAlign: "center", borderBottom: "1px solid green" }}
            >
              <td style={{ padding: "1rem" }}>${item.amount}</td>
              <td style={{ padding: "1rem" }}>{item.description}</td>
              <td style={{ padding: "1rem" }}>${item.category}</td>
              <td style={{ padding: "1rem" }}>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ExpenseForm;
