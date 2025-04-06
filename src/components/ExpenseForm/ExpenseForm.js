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
      setEditId(newExpense.id);
      setIsEditing(true);
      expenseTextInput.current.focus();
    }
  }, [newExpense]);

  const clearInputs = () => {
    expenseTextInput.current.value = "";
    expenseAmountInput.current.value = "";
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const text = expenseTextInput.current.value;
    const amount = expenseAmountInput.current.value;

    if (parseInt(amount) === 0) return;

    const expense = {
      text,
      amount,
      id: isEditing ? editId : new Date().getTime().toString(),
    };

    if (isEditing) {
      updateExpense(expense);
    } else {
      addExpense(expense);
    }

    setIsEditing(false);
    setEditId(null);
    clearInputs();
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
