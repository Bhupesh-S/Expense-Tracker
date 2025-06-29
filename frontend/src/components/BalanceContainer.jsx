import React from 'react';
import CurrencyItem from './CurrencyItem';

const BalanceContainer = (props) => {
    const { expenses } = props;

    const incomeArr = expenses.filter((e) => e.amount > 0);
    const expenseArr = expenses.filter((e) => e.amount < 0);

    let income = 0;
    let expense = 0;

    incomeArr.forEach(element => {
        income += element.amount;
    });

    expenseArr.forEach(element => {
        expense += element.amount;
    });

    console.log(income, expense);

    return (
        <>
            <div className='balance-container'>
                <CurrencyItem title="Income" amount={income} type="income" />
                <CurrencyItem title="Expense" amount={expense} type="expense" />
                <CurrencyItem title="Balance" amount={income + expense} type="balance" />
            </div>
        </>
    );
}

export default BalanceContainer;