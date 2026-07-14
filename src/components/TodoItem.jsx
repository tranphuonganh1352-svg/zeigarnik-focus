export default function TodoItem({
  task,
  onToggle,
  onDelete,
  onSelect,
  onProgress
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#eef4ff",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span
          style={{
            marginLeft: "10px",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
         <div style={{ marginLeft: "10px" }}>
  <div
    style={{
      textDecoration: task.completed ? "line-through" : "none",
      fontWeight: "bold",
    }}
  >
    {task.title}
  </div>

  <small>
    📅 {task.deadline || "Chưa có hạn"} | ⭐ {task.priority}
  </small>
  <div style={{ marginTop: "10px" }}>
  <input
    type="range"
    min="0"
    max="100"
    value={task.progress || 0}
    onChange={(e) =>
      onProgress(task.id, Number(e.target.value))
    }
    style={{ width: "180px" }}
  />

  <div>
    {task.progress || 0}%
  </div>
</div>
</div>
        </span>
      </div>

      <div>

<button
  onClick={() => onSelect(task)}
  style={{
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight:"10px",
  }}
>
  🎯 Tập trung
</button>


<button
  onClick={() => onDelete(task.id)}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Xóa
</button>

</div>
    </div>
  );
}