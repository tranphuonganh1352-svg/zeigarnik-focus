import Pomodoro from "./components/Pomodoro";
import TodoItem from "./components/TodoItem";
import { useState, useEffect } from "react";
import {Header} from "./components/Header";
import Statistics from "./components/Statistics";
import ZeigarnikChart from "./components/ZeigarnikChart";

function App() {
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");

  return saved ? JSON.parse(saved) : [];
});
const [history, setHistory] = useState(() => {

const saved = localStorage.getItem("history");

return saved ? JSON.parse(saved): [];

});
  const [newTask, setNewTask] = useState("");
const [deadline, setDeadline] = useState("");
const [priority, setPriority] = useState("Trung bình");
const [selectedTask, setSelectedTask] = useState(null);
  const addTask = () => {
    if (newTask.trim() === "") return;

   const task = {
  id: Date.now(),
  title: newTask,
  completed:false,
  deadline,
  priority,

  createdAt: new Date().toISOString(),

  focusTime:0,

  reopenCount:0
};
setDeadline("");
setPriority("Trung bình");

    setTasks([...tasks, task]);
    setNewTask("");
  };
 const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const addFocusTime = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            focusTime: (task.focusTime || 0) + 25
          }
        : task
    )
  );
};
const updateProgress = (id, value) => {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            progress: value,
            completed: value === 100
          }
        : task
    )
  );
};
useEffect(()=>{

const today =
new Date().toLocaleDateString("vi-VN");


const completed = 
tasks.filter(
task=>task.completed
).length;


const unfinished =
tasks.length-completed;


const focus =
tasks.reduce(
(sum,task)=>
sum+(task.focusTime||0),
0
);


const todayData={

date:today,

total:tasks.length,

completed,

unfinished,

focus

};


 setHistory(prev => [

    ...prev.filter(
      item => item.date !== today
    ),

    todayData

  ]);


},[tasks]);

useEffect(()=>{

localStorage.setItem(
"history",
JSON.stringify(history)
);

},[history]);

console.log("HISTORY APP:", history);

const completedTasks = tasks.filter(task => task.completed).length;
const remainingTasks = tasks.length - completedTasks;

const progress =
  tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);

const zeigarnikScore = Math.min(
100,
tasks.reduce((score,task)=>{

if(task.completed)
return score;


let point=20;


if(task.priority==="Cao")
point+=15;


if(task.deadline){

const today=new Date();
const due=new Date(task.deadline);


if(due<today)
point+=20;

}


return score+point;


},0)
);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <Header />
      <div
  style={{
    background: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 0 10px rgba(0,0,0,.08)",
    marginBottom: "25px",
  }}
>
  <h2>🧠 Zeigarnik Score</h2>

  <h3>{zeigarnikScore}/100</h3>

  <p>
    Bạn còn <b>{remainingTasks}</b> công việc chưa hoàn thành.
  </p>

  <p>
    Tiến độ hôm nay: <b>{progress}%</b>
  </p>

  <div
    style={{
      width: "100%",
      height: "12px",
      background: "#ddd",
      borderRadius: "20px",
      overflow: "hidden",
      marginTop: "10px",
    }}
  >
    <div
      style={{
        width: `${progress}%`,
        height: "100%",
        background: "#2563eb",
      }}
    />
  </div>

  <p style={{ marginTop: "15px", color: "#666" }}>
    {remainingTasks === 0
      ? "🎉 Bạn đã hoàn thành tất cả công việc hôm nay!"
      : "Đừng để các công việc dang dở chiếm dụng sự chú ý của bạn."}
  </p>
</div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "30px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>📋 Công việc hôm nay</h2>

        <input
          type="text"
          placeholder="Nhập công việc..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            padding: "10px",
            width: "70%",
            marginRight: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
<input
  type="date"
  value={deadline}
  onChange={(e) => setDeadline(e.target.value)}
  style={{
    padding: "10px",
    marginLeft: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
/>

        <button
          onClick={addTask}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        ><select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  style={{
    padding: "10px",
    marginLeft: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
>
  <option value="Cao">🔴 Cao</option>
  <option value="Trung bình">🟡 Trung bình</option>
  <option value="Thấp">🟢 Thấp</option>
</select>
          + Thêm
        </button>

        <div style={{ marginTop: "25px" }}>
          {tasks.length === 0 ? (
            <p>Chưa có công việc nào.</p>
          ) : (
            tasks.map((task) => (
  <TodoItem
    key={task.id}
    task={task}
    onToggle={toggleTask}
    onDelete={deleteTask}
    onSelect={setSelectedTask}
     onProgress={updateProgress}
/>
))
          )}
        </div>
      </div>
      <Pomodoro
 task={selectedTask}
 addFocusTime={addFocusTime}
/>

<Statistics tasks={tasks}/>
<ZeigarnikChart history={history}/>
    </div>
  );
}

export default App;