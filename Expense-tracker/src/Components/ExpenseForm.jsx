import {React, useEffect, useState } from 'react'

function ExpenseFrom({Onexpense ,editExpenseData,Cancel}) {
    const [title , Settitle] = useState("")
    const [price , Setprice] = useState("")
    
      useEffect(()=>{
         if(editExpenseData){
          Settitle(editExpenseData.title)
          Setprice(editExpenseData.price) 
         }else{
          Settitle("")
          Setprice("")
         }
     },[editExpenseData])

    const handleSubmit = (e) => {
     e.preventDefault()
      
     const expense ={
      id : editExpenseData ? editExpenseData.id : Date.now(), 
      title ,
      price : Number(price)
     };

   
     
Onexpense(expense)
  Settitle("")
  Setprice("")
    }


  return (
    
        <form className='flex flex-col gap-4 mb-6' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label htmlFor="" className='text-md font-medium text-gray-700 mb-1'>Title : </label>
            <input type="text" className='border border-gray-300 rounded px-3 py-2 text-md focus: outline-none focus:ring-2 focus:ring-blue-500 ' required placeholder='e.g Coffer, book,' value={title} onChange={(e)=>Settitle(e.target.value)} />
            </div>
            <div className='flex flex-col'>
            <label htmlFor="" className='text-md font-medium text-gray-700 mb-1'>Price :  </label>
            <input type="text" className='border border-gray-300 rounded px-3 py-2 text-md focus: outline-none focus:ring-2 focus:ring-blue-500' required placeholder='e.g. 50' value={price} onChange={(e)=>Setprice(e.target.value)}/> 
           
            <br />
            <button className='w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-800 transition'>Add Expense</button>
          </div>

   <div>
    <button type='submit' className={`text-white font-medium py-3 rounded text-sm transition ${editExpenseData ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-800"}` }>
     {editExpenseData ? "Update" : "add expense"}
    </button>
     {
      editExpenseData && (
        <button type='button' onClick={()=>{}} className='bg-gray-700 text-white py-3 font-medium text-sm rounded transition hover:bg-gray-700'>
        Cancel   
        </button>
      )
     }
   </div>
            </form>
    
  )
}

export default ExpenseFrom

// onchange() and onclick()