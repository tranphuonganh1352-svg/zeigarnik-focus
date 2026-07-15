export default function LandingPage({ onStart }) {
  return (
    <div
      style={{
        height: "100vh",
        background:
          "linear-gradient(135deg,#2563eb,#3b82f6,#60a5fa)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "50px",
          borderRadius: "20px",
          textAlign: "center",
          width: "500px",
          boxShadow: "0 15px 40px rgba(0,0,0,.2)",
        }}
      >
        <h1
  style={{
    fontSize: "clamp(32px, 8vw, 42px)",
    color: "#2563eb",
    marginBottom: "10px",
    textAlign: "center",
    lineHeight: "1.1",
  }}
>
  Zeigarnik Focus
</h1>

        <p
          style={{
            color: "#666",
            lineHeight: "1.8",
            marginBottom: "35px",
          }}
        >
          Quản lý công việc bằng hiệu ứng Zeigarnik.
          <br />
          Giảm trì hoãn • Tăng tập trung • Hoàn thành mục tiêu.
        </p>

        <button
          onClick={onStart}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "15px 35px",
            borderRadius: "12px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          🚀 Bắt đầu
        </button>
      </div>
    </div>
  );
}