import { useState } from "react";

function TodoForm({ Ontask }) {

  const [task, Settask] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const todo = {
      id: Date.now(),
      task
    };

    Ontask(todo);

    Settask("");
  };


  return (
    <form
      className="flex flex-col gap-4 mb-6"
      onSubmit={handleSubmit}
    >

      <div className="flex flex-col">

        <label className="text-md font-medium text-gray-700 mb-1">
          Task :
        </label>

        <input
          type="text"
          required
          placeholder="Enter your task"
          value={task}
          onChange={(e) => Settask(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>


      <button
        type="submit"
        className="bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-800 transition"
      >
        Add Task
      </button>

    </form>
  );
}

export default TodoForm;
//usereducer usecontextapi usememo usecallback usestate 