import { useRef, useState, useEffect } from "react";
import Wrapper from "../UI/Wrapper";
import classes from "./ExpenseForm.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SoreiApp } from "../../firebase";
import { getDatabase, onChildAdded, ref, remove, set } from "firebase/database";
import { useDispatch } from "react-redux";
import { setExpenses } from "../../store/expense";
import { useSelector } from "react-redux";

const firebaseDatabaseUrl =
  "https://react-http-project-da8f6-default-rtdb.firebaseio.com/expenses/";
var dataArray = [];
Object.preventExtensions(dataArray);
const ExpenseForm = () => {
  const dispatch = useDispatch();
  const auth = getAuth(SoreiApp);
  const database = getDatabase();
  const amountRef = useRef("");
  const descriptionRef = useRef("");
  const categoryRef = useRef("");

  // const [switchTheme, setSwitchTheme] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [editId, setEditId] = useState(null);
  const expenses = useSelector((state) => state.expense.expenses);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth.currentUser) {
          return;
        }
        return onAuthStateChanged(auth, async (user) => {
          if (user) {
            dataArray = [];

            onChildAdded(
              ref(
                database,
                `expenses/${user.email.replace("@", "").replace(".", "")}`
              ),
              (snapshot) => {
                const data = snapshot.val();

                dataArray = dataArray.concat({ id: snapshot.key, ...data });

                dispatch(setExpenses(dataArray));
              }
            );
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [auth, deleted, dispatch, database]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const details = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      id: Math.random().toString(36).substr(2, 8),
    };
    try {
      if (editId) {
        const cartRef = ref(
          database,
          `expenses/${auth.currentUser.email.replace("@", "").replace(".", "")}`
        );
        onChildAdded(cartRef, (snapshot) => {
          const item = snapshot.val();
          if (item.id === editId) {
            // Updating  the item in the database
            const itemRef = ref(
              database,
              `/expenses/${auth.currentUser.email
                .replace("@", "")
                .replace(".", "")}/${snapshot.key}`
            );
            set(itemRef, details)
              .then(() => {
                setDeleted(true);
              })
              .catch((error) => {
                console.error("Error updating item: ", error);
              });
          }
        });

        const updatedExpenses = expenses.map((expense) =>
          expense.id === editId ? { ...expense, ...details } : expense
        );
        dispatch(setExpenses(updatedExpenses));
        setEditId(null);

        // Clear input fields
        amountRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "";
      } else {
        const response = await fetch(
          firebaseDatabaseUrl +
            auth.currentUser.email.replace("@", "").replace(".", "") +
            ".json",
          {
            method: "POST",
            body: JSON.stringify(details),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await response.json();
        dispatch(setExpenses([...expenses, details]));

        // Clear input fields
        amountRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "";
      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  const deleteHandler = async (expenseId) => {
    try {
      const cartRef = ref(
        database,
        `/expenses/${auth.currentUser.email.replace("@", "").replace(".", "")}`
      );
      onChildAdded(cartRef, (snapshot) => {
        const item = snapshot.val();
        if (item.id === expenseId) {
          // Remove the item from the database
          const itemRef = ref(
            database,
            `/expenses/${auth.currentUser.email
              .replace("@", "")
              .replace(".", "")}/${snapshot.key}`
          );
          remove(itemRef)
            .then(() => {
              setDeleted(true);
            })
            .catch((error) => {
              console.error("Error deleting item: ", error);
            });
        }
      });

      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== expenseId
      );
      dispatch(setExpenses(updatedExpenses));
    } catch (error) {
      console.log(error.message);
    }
  };

  const editHandler = (expenseId) => {
    const expense = expenses.find((expense) => expense.id === expenseId);
    amountRef.current.value = expense.amount;
    descriptionRef.current.value = expense.description;
    categoryRef.current.value = expense.category;
    setEditId(expenseId);
  };
  const totalPrice = expenses?.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const downloadHandler = () => {
    downloadCsv(
      expenses?.filter(
        (ele, ind) =>
          ind ===
          expenses.findIndex(
            (elem) => elem.jobid === ele.jobid && elem.id === ele.id
          )
      )
    );
  };
  const downloadCsv = (expenses) => {
    const csv =
      "data:text/csv;charset=utf-8," +
      "Amount,Description,Category\n" +
      expenses
        .map((e) => `${e.amount},${e.description},${e.category}`)
        .join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <div className={classes.activatePremium}>
        <div>
          <h2 className={classes["total-sum"]}>${totalPrice}</h2>
        </div>
        <div>
          {totalPrice > 1000 && (
            <button className={classes.toatalButton}>Activate Premium</button>
          )}
        </div>
        <div>
          <button onClick={downloadHandler}>Download File</button>
        </div>
      </div>
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
          {expenses
            ?.filter(
              (ele, ind) =>
                ind ===
                expenses.findIndex(
                  (elem) => elem.jobid === ele.jobid && elem.id === ele.id
                )
            )
            .map((item, index) => (
              <tr
                key={index}
                style={{ textAlign: "center", borderBottom: "1px solid green" }}
              >
                <td style={{ padding: "1rem" }}>${item.amount}</td>
                <td style={{ padding: "1rem" }}>{item.description}</td>
                <td style={{ padding: "1rem" }}>{item.category}</td>
                <td style={{ padding: "1rem" }}>
                  <button onClick={() => editHandler(item.id)}>Edit </button>
                  <button onClick={() => deleteHandler(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
export default ExpenseForm;
