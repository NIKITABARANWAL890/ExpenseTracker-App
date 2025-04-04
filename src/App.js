import { useState, useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        expenses: [payload.expense, ...state.expenses]
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id)
      };
    }
    //add logic for updating the expense here
    case "EDIT_EXPENSE": {
      console.log('Editable transaction clicked');
      const tran = state.expenses.findIndex((expense) => expense.id === payload.id);
      console.log(tran);
      console.log(state.expenses[tran]);
    
      return {
        ...state, // Keep the existing state
        newExpense: state.expenses[tran] // Set the expense to be edited
      };
    }

    case "UPDATE_EXPENSE": {
      const updatedExpenses = state.expenses.map((exp) =>
        exp.id === payload.expense.id ? payload.expense : exp
      );
      return {
        ...state,
        expenses: updatedExpenses,
        newExpense: null, // Clear current edit
      };
    }
    
    
    
    default:
      return state;
  }
};
// Use proper state management for populating the form in the expenseForm component on clicking the edit icon in the Transaction component
function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });

  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };

  const editExpense = (id) =>{
    dispatch({type:"EDIT_EXPENSE", payload:{id}});
  }

  const updateExpense = (expense) => {
    dispatch({ type: "UPDATE_EXPENSE", payload: { expense } });
  };
  
  // Add dispatch function for updation
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
            // Pass props to update a transacation
          />
        </div>
      </div>
    </>
  );
}

export default App;
