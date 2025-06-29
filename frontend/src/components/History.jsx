import React from 'react';
import Expenseitem from './Expenseitem';

export default function History({ expenses, deleteExpenses, updateExpense, setItemToEdit }) {
    return (
        <>
            <div className='history'>
                <h2>History</h2>
            </div>
            {expenses.map((expense) => (
                <Expenseitem
                    key={expense._id}
                    id={expense._id}
                    title={expense.title}
                    amount={expense.amount}
                    deleteExpense={deleteExpenses}
                    updateExpense={updateExpense}
                    setItemToEdit={setItemToEdit}
                    expense={expense}
                />
            ))}
        </>
    );
}
