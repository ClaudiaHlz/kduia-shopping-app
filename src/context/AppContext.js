import React, { createContext, useReducer } from 'react';

//5. Reducer, update the state based on an action
export function AppReducer(state, action){
    let new_expenses = [];

    switch (action.type) {
        case "ADD_QUANTITY":
            let updatedqty = false;
            state.expenses.map(item => {
                if(item.name === action.payload.name){
                    item.quantity = item.quantity+action.payload.quantity;
                    updatedqty = true;
                }
                new_expenses.push(item);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";

            return{
                ...state
            };

        case "RED_QUANTITY": //reduce quantity
            state.expenses.map(item =>{
                if(item.name === action.payload.name){
                    item.quantity = item.quantity - action.payload.quantity;
                }
                item.quantity = item.quantity < 0 ? 0 : item.quantity;
                new_expenses.push(item);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state
            };

        case "DELETE_ITEM":
            state.expenses.map(item => {
                if(item.name === action.payload.name){
                    item.quantity = 0;
                }
                new_expenses.push(item);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state
            };

        case "CHG_LOCATION":
            action.type = "DONE";
            state.Location = action.payload;
            return{
                ...state
            }

        default:
            return state;
    }

}

//1. initial state
const initialState = {
    expenses: [
        { id: "Shirt", name: 'Shirt', quantity: 0, unitprice: 500 },
        { id: "Jeans", name: 'Jeans', quantity: 0, unitprice: 300 },
        { id: "Dress", name: 'Dress', quantity: 0, unitprice: 400 },
        { id: "Dinner set", name: 'Dinner set', quantity: 0, unitprice: 600 },
        { id: "Bags", name: 'Bags', quantity: 0, unitprice: 200 },
    ],
    Location: "$"
}

//2. create context 
export const AppContext = createContext();

//3. Provider component - wraps the components that we want to give access to the state
export const AppProvider = (props) => {
    //4. set app state 
    //useReducer returns a statefull value and a dispatch function to dispatch user actions to the reducer
    // it receives a reducer function and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // accumulate the prices in the state list
    const totalExpenses = state.expenses.reduce((total, item) =>{
        return (total = total + (item.unitprice*item.quantity));
    }, 0);

    state.CartValue = totalExpenses;

    return(
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.Location
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}