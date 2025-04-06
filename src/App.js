import { useReducer, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";
import { db } from "./firebaseinit";
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [payload.expense, ...state.expenses] };

    case "REMOVE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== payload.id),
      };

    case "EDIT_EXPENSE":
      const index = state.expenses.findIndex((e) => e.id === payload.id);
      return {
        ...state,
        newExpense: state.expenses[index],
      };

    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e.id === payload.expense.id ? payload.expense : e
        ),
        newExpense: null,
      };

    case "SET":
      return { ...state, expenses: payload.expenses };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    expenses: [],
    newExpense: null,
  });

  useEffect(() => {
      document.title = "Expense Tracker App";
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const fetchedExpenses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "SET", payload: { expenses: fetchedExpenses } });
    });

    return () => unsub();
  }, []);

  const addExpense = async (expense) => {
    try {
      await addDoc(collection(db, "expenses"), {
        text: expense.text,
        amount: Number(expense.amount),
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  async function deleteExpense (id){
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
    // You can also delete from Firestore here if desired
    const docRef = doc(db, "expenses", id);
    await deleteDoc(docRef);
  };

  const editExpense = (id) => {
    dispatch({ type: "EDIT_EXPENSE", payload: { id } });
  };

  const updateExpense = async (expense) => {
    try {
      const docRef = doc(db, "expenses", expense.id); // 🔑 reference to the specific doc
      await updateDoc(docRef, {
        text: expense.text,
        amount: Number(expense.amount), // 👈 ensure number is stored
      });
  
      dispatch({ type: "UPDATE_EXPENSE", payload: { expense } }); // ✅ still update local state
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          newExpense={state.newExpense}
          updateExpense={updateExpense}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
          />
        </div>
      </div>
    </>
  );
}

export default App;
