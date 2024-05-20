import React, { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';

const ExpenseList = () => {
    const {expenses} = useContext(AppContext);

    return(
        <table className='table'>
            <thead className="thead-light">
                <tr>
                    <th scope="col">Items</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Items Price</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((item) => (
                    <ExpenseItem id={item.id} key={item.id} name={item.name} quantity={item.quantity} unitprice={item.unitprice} />
                ))}
            </tbody>
          
        </table>
    )
};

export default ExpenseList;
