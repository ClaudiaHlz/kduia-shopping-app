import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CartValue(){
    const {expenses, Location} = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) =>{
        return (total += (item.unitprice*item.quantity));
    }, 0);

    return(
        <div className='alert alert-primary'>
            <span>Cart Value: {Location} {totalExpenses}</span>
        </div>
    )
}


