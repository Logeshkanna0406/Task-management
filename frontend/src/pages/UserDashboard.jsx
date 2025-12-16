import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axiosInstance.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await axiosInstance.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <input value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add Task</button>

      {tasks.map((task) => (
        <p key={task._id}>{task.title}</p>
      ))}
    </div>
  );
}

export default UserDashboard;
