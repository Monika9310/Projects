import { useEffect, useState } from "react";
  import ExpenseForm from "./Components/ExpenseForm";

  function App(){
    const [expenses , setExpense] = useState(()=>{
    const storedata = localStorage.getItem("expenses")
       return storedata ? JSON.parse(storedata) : []
    })
    const [editExpenseData, SetEditExpenseData] = useState()
   
   
    const addexpense = (expense)=>
    {
      
    setExpense([...expenses , expense])
    }

    useEffect(()=>{
      localStorage.setItem("expenses",JSON.stringify(expenses))
    },[expenses])

    //update
    const saveExpense = (exp)=>{
      if(editExpenseData){
        setExpense((prev) => prev.map((item)=> item.id === exp.id ? exp : item));
        SetEditExpenseData(null)
      }else{
        setExpense((prev) => [...prev , exp])
      }
    }

    // delete 
    const deleteExpense = (id)=>{
        setExpense((prev) => prev.filter((item)=> item.id !== id))
    }

    const totalAmount = expenses.reduce((acc , curr)=>acc + curr.price, 0)
    
  

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="font-bold text-3xl text-center">Expense Tracker</h1>
    
      <p className="text-center font-bold text-gray-500 mt-1 mb-6 text-md">
        Total Items : <span className="font-semibold text-blue-500">{expenses.length}</span>
      </p>

      <ExpenseForm
  Onexpense={saveExpense}
  editExpenseData={editExpenseData}
/>  

      <div className="mt-7 border-t pt-4">
        <div className="flex justify-between items-center mb-3">
       <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
       <span className="text-md font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Total : {totalAmount}</span>
        </div>
    {
      expenses.length === 0 ? (
       <p className="text-center text-gray-400 text-sm py-4">No expense is added till now </p>
      ):(
        <ul className="flex flex-col gap-3">
           {expenses.map((item)=>(
            <li key={item.id} className="flex justify-between items-center bg-gray-50 border border-gray-200 px-4 py-2 rounded">
              <span className="text-gray-800 font-medium">{item.title}</span>
              <span className="text-gray-900 font-bold">{item.price}</span>
              <button className="text-xs bg-amber-500 text-white px-2 py-1 font-bold rounded hover:bg-amber-700 transition" onClick={()=>{
                SetEditExpenseData(item)
              }}>Edit</button>
              <button className="text-xs bg-red-500 text-white px-2 py-1 font-bold rounded hover:bg-red-800 transition" onClick={()=>{
                deleteExpense(item.id)
              }}>Delete</button>
            </li>
           ))}
        </ul>
      )
    }

      </div>
      </div>
    </div>
    </>
  )
  }

  export default App;



// //add expense 
// // delete 
// // search
// // filter by category
// //total expense
// //dark light theme
// //form
// //local storage
// //optimization by usememo and usecallback
// // usecontext