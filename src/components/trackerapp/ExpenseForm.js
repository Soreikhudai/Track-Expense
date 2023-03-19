import { useRef, useState, useEffect } from "react";
import Wrapper from "../UI/Wrapper";
import classes from "./ExpenseForm.module.css";
import { getAuth } from "firebase/auth";
import { SoreiApp } from "../firebase";
const firebaseDatabaseUrl =
  "https://react-http-project-da8f6-default-rtdb.firebaseio.com/expenses.json";

const ExpenseForm = () => {
  const auth = getAuth(SoreiApp);
  const [detailList, setDetailList] = useState([]);
  const amountRef = useRef("");
  const descriptionRef = useRef("");
  const categoryRef = useRef("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth.currentUser) {
          return;
        }

        // Fetch user data
        const idToken = await auth.currentUser.getIdToken();
        const response = await fetch(
          `https://react-http-project-da8f6-default-rtdb.firebaseio.com/expenses/${auth.currentUser.uid}.json?auth=${idToken}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);

        // Fetch expense details
        const expensesResponse = await fetch(firebaseDatabaseUrl);
        if (!expensesResponse.ok) {
          throw new Error("Failed to fetch expense details");
        }
        const expensesData = await expensesResponse.json();
        const expenses = Object.keys(expensesData).map((key) => {
          return {
            id: key,
            ...expensesData[key],
          };
        });
        setDetailList(expenses);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [auth.currentUser]);

  useEffect(() => {
    if (userData) {
      amountRef.current.value = userData.amount || "";
      descriptionRef.current.value = userData.description || "";
      categoryRef.current.value = userData.category || "";
    }
  }, [userData]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const details = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    try {
      const response = await fetch(firebaseDatabaseUrl, {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
      setDetailList([...detailList, details]);
      amountRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
    } catch (error) {
      alert("something went wrong");
    }
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
