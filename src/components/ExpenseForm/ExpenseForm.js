import React, { useEffect, useRef, useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, updateExpense, newExpense }) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

useEffect(() => {
  if (newExpense) {
    expenseTextInput.current.value = newExpense.text;
    expenseAmountInput.current.value = newExpense.amount;
    expenseTextInput.current.focus();  
    setIsEditing(true);
    setEditId(newExpense.id);
  }
}, [newExpense]);


  const onSubmitHandler = (e) => {
    e.preventDefault();

    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;

    if (parseInt(expenseAmount) === 0) return;

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: isEditing ? editId : new Date().getTime()
    };

    if (isEditing) {
      updateExpense(expense);  
    } else {
      addExpense(expense);   
    }

    clearInput();
    setIsEditing(false);
    setEditId(null);
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{isEditing ? "Edit Transaction" : "Add New Transaction"}</h3>

      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />

      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense, positive - income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />

      <button className={styles.submitBtn}>
        {isEditing ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;
