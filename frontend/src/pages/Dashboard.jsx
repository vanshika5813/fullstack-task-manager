import { useEffect, useState } from "react";
import API from "../api/authApi";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
  try {
    await API.post(
      "/tasks",
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");

    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (id) => {
  try {
    await API.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};

const toggleComplete = async (task) => {
  try {
    await API.put(
      `/tasks/${task._id}`,
      {
        completed: !task.completed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/";
};

const completedTasks = tasks.filter(
  (task) => task.completed
).length;

const pendingTasks =
  tasks.length - completedTasks;

  return (
  <div className="container">
      <h2>Dashboard</h2>

      <button
  className="logout-btn"
  onClick={logout}
>
  Logout
</button>

      <p>Welcome {user?.name}</p> 

      <hr />

<div>
  <h4>Total Tasks: {tasks.length}</h4>
  <h4>Completed: {completedTasks}</h4>
  <h4>Pending: {pendingTasks}</h4>
</div>

<hr />

      <hr />

      <input
  placeholder="Search Task"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

<input
  placeholder="Enter Task"
  value={title}
  onChange={(e) =>
    setTitle(e.target.value)
  }
/>

      <button
  className="add-btn"
  onClick={addTask}
>
  Add Task
</button>

      <hr />

     {tasks
  .filter((task) =>
    task.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map((task) => (
  <div className="task" key={task._id}>
    <div className="task-info">
      <strong>{task.title}</strong>

      <br />

      <span
        className={
          task.completed
            ? "status-complete"
            : "status-pending"
        }
      >
        {task.completed
          ? "✅ Completed"
          : "⏳ Pending"}
      </span>
    </div>

    <div>
      <button
        className="toggle-btn"
        onClick={() =>
          toggleComplete(task)
        }
      >
        Toggle
      </button>

      <button
        className="delete-btn"
        onClick={() =>
          deleteTask(task._id)
        }
      >
        Delete
      </button>
    </div>
  </div>
))}
    </div>
  );
}

export default Dashboard;