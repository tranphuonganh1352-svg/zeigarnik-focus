import { useState, useEffect } from "react";

export default function Pomodoro({ task, addFocusTime }) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (running && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

   if (seconds === 0) {

  alert(
    `🎉 Hoàn thành Pomodoro cho: ${task?.title || "công việc"}`
  );

  if(task){
    addFocusTime(task.id);
  }

  setRunning(false);
}

    return () => clearInterval(timer);
  }, [running, seconds]);

  const formatTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "30px",
        boxShadow: "0 0 10px rgba(0,0,0,.1)",
      }}
    >
      <h2>🍅 Pomodoro</h2>
      {
task ?

<p>
🎯 Đang tập trung:
<b>{task.title}</b>
</p>

:

<p>
⚠️ Chưa chọn công việc
</p>

}

      <h1 style={{ fontSize: "50px" }}>
        {formatTime()}
      </h1>

      <button onClick={() => setRunning(true)}>
        Start
      </button>

      <button
        onClick={() => setRunning(false)}
        style={{ marginLeft: "10px" }}
      >
        Pause
      </button>

      <button
        onClick={() => {
          setRunning(false);
          setSeconds(25 * 60);
        }}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>
    </div>
  );
}