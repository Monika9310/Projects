
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
        }
      );

      alert("Task created successfully!");

      setTitle("");
      setDescription("");

      // Refresh tasks
      fetchTasks();
    } catch (error) {
      console.log("Error:", error);
      alert("Error creating task");
    }
  };
  const handleComplete = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      {
        status: "completed",
      }
    );

    alert("Task completed!");

    fetchTasks();
  } catch (error) {
    console.log("Error completing task:", error);
  }
};
const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`
    );

    alert("Task deleted successfully!");

    fetchTasks();
  } catch (error) {
    console.log("Error deleting task:", error);
  }
};
const totalTasks = tasks.length;

const pendingTasks = tasks.filter(
  (task) => task.status === "pending"
).length;

const completedTasks = tasks.filter(
  (task) => task.status === "completed"
).length;
const filteredTasks = tasks.filter((task) => {
  if (filter === "all") return true;

  return task.status === filter;
});
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Student Task Manager
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-8 max-w-md rounded-lg bg-white p-6 shadow"
      >
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full rounded border p-2"
          required
        />

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 w-full rounded border p-2"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
<div className="mx-auto mb-8 grid max-w-md grid-cols-3 gap-3">
  <div className="rounded-lg bg-blue-100 p-4 text-center">
    <h3 className="text-sm font-semibold text-blue-700">
      Total
    </h3>
    <p className="text-2xl font-bold text-blue-800">
      {totalTasks}
    </p>
  </div>

  <div className="rounded-lg bg-yellow-100 p-4 text-center">
    <h3 className="text-sm font-semibold text-yellow-700">
      Pending
    </h3>
    <p className="text-2xl font-bold text-yellow-800">
      {pendingTasks}
    </p>
  </div>

  <div className="rounded-lg bg-green-100 p-4 text-center">
    <h3 className="text-sm font-semibold text-green-700">
      Completed
    </h3>
    <p className="text-2xl font-bold text-green-800">
      {completedTasks}
    </p>
  </div>
</div>
      <div className="mx-auto max-w-md">
        <h2 className="mb-4 text-2xl font-semibold">
          All Tasks
        </h2>
<div className="mb-5 flex gap-2">
  <button
    onClick={() => setFilter("all")}
    className="rounded-lg bg-blue-500 px-4 py-2 text-white"
  >
    All
  </button>

  <button
    onClick={() => setFilter("pending")}
    className="rounded-lg bg-yellow-500 px-4 py-2 text-white"
  >
    Pending
  </button>

  <button
    onClick={() => setFilter("completed")}
    className="rounded-lg bg-green-500 px-4 py-2 text-white"
  >
    Completed
  </button>
</div>
        
{filteredTasks.map((task) => (
  <div
    key={task._id}
    className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-md transition hover:shadow-lg"
  >
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold text-gray-800">
        {task.title}
      </h3>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          task.status === "completed"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {task.status}
      </span>
    </div>

    <p className="mt-2 text-gray-600">
      {task.description}
    </p>

    <div className="mt-4 flex gap-2">
      {task.status === "pending" && (
        <button
          onClick={() => handleComplete(task._id)}
          className="rounded-lg bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
        >
          Complete
        </button>
      )}

      <button
        onClick={() => handleDelete(task._id)}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
))}
      </div>
    </div>
  );
}

export default App;