import React, { useState } from 'react';

export default function Expenseitem(props) {
  const { id, title, amount, deleteExpense, setItemToEdit, updateExpense } = props;
  const type = amount > 0 ? "income" : "expense";
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAmount, setUpdatedAmount] = useState(amount);

  function handleDelete() {
    deleteExpense(id);
  }

  function handleEditClick() {
    setIsUpdating(true); // show input fields
  }

  function handleUpdateSubmit() {
    updateExpense(id, updatedTitle, updatedAmount);
    setIsUpdating(false);
  }

  return (
    <>
      <div className={`expense-item ${type}`}>
        {isUpdating ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <input
              type="number"
              value={updatedAmount}
              onChange={(e) => setUpdatedAmount(Number(e.target.value))}
            />
            <button onClick={handleUpdateSubmit}>Save</button>
            <button onClick={() => setIsUpdating(false)}>Cancel</button>
          </>
        ) : (
          <>
            <div className='expense-title'>{title}</div>
            <div className='expense-amount'>{amount}</div>
            <div className='delete-button-overlay'>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleEditClick}>Update</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
