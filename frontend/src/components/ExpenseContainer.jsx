import { useState, useEffect } from "react";
import History from "./History";
import { Expenseform } from "./Expenseform";
import BalanceContainer from "./BalanceContainer";

function ExpenseContainer() {
  const [expenses, setExpense] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('https://expense-tracker-bn4l.onrender.com/expense');
      const data = await response.json();
      setExpense(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (title, amount) => {
    try {
      const response = await fetch('https://expense-tracker-bn4l.onrender.com/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount }),
      });

      if (response.ok) {
        const newItem = await response.json();
        setExpense(prev => [...prev, newItem]);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const deleteExpenses = async (id) => {
    try {
      const response = await fetch(`https://expense-tracker-bn4l.onrender.com/expense/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExpense(prev => prev.filter(exp => exp._id !== id));
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const editExpense = async (id, title, amount) => {
    try {
      const response = await fetch(`https://expense-tracker-bn4l.onrender.com/expense/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setExpense(prev =>
          prev.map(exp => (exp._id === id ? updatedItem : exp))
        );
        setItemToEdit(null);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      // Optionally, you can handle the error here, e.g., show a notification
    }
  };

  return (
    <div className="expense-container">
      <h1>Expense Tracker</h1>
      <BalanceContainer expenses={expenses} />
      <Expenseform
        addExpense={addExpense}
        itemToEdit={itemToEdit}
        updateExpense={editExpense}
        setItemToEdit={setItemToEdit}
      />
      <History
        expenses={expenses}
        deleteExpenses={deleteExpenses}
        updateExpense={editExpense}
        setItemToEdit={setItemToEdit}
      />
    </div>
  );
}

export default ExpenseContainer;
