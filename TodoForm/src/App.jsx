import { useEffect,useState } from "react";
import TodoForm from "./Components/TodoForm";

function App() {

  const [tasks, Settasks] = useState(()=>{
    const storedata = localStorage.getItem("tasks")
       return storedata ? JSON.parse(storedata) : []
    })


  const addTask = (todo) => {
    Settasks((prev) => [...prev, todo]);
  };
 useEffect(()=>{
      localStorage.setItem("tasks",JSON.stringify(tasks))
    },[tasks])
    // delete 
    const deleteTask = (id)=>{
        Settasks((prev) => prev.filter((item)=> item.id !== id))
    }

  return (
    <div className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">

        <h1 className="font-bold text-3xl text-center mb-6">
          To-Do List
        </h1>


        <TodoForm Ontask={addTask} />


        <ul className="flex flex-col gap-3">

          {tasks.map((item) => (

            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-50 border border-gray-200 px-4 py-3 rounded"
            >

              <span className="text-gray-800 font-medium">
                {item.task}
              </span>
              <button className="text-xs bg-red-500 text-white px-2 py-1 font-bold rounded hover:bg-red-800 transition" onClick={()=>{
                deleteTask(item.id)
              }}>Delete</button>

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}

export default App;