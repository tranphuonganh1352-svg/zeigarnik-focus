import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";


export default function ZeigarnikChart({ history }) {

  console.log("History:", history);

  const data = history.map(item => ({
    day: item.date,
    unfinished: item.unfinished,
    completed: item.completed
  }));

  console.log("Data:", data);


  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "30px",
        boxShadow: "0 0 10px rgba(0,0,0,.1)"
      }}
    >

      <h2>
        📈 Biểu đồ Zeigarnik
      </h2>


      {data.length === 0 ? (

        <p>Chưa có dữ liệu lịch sử</p>

      ) : (

      <LineChart
        width={600}
        height={350}
        data={data}
      >

        <CartesianGrid />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />


        <Line
  type="monotone"
  dataKey="unfinished"
  dot={{ r: 6 }}
  strokeWidth={3}
/>


        <Line
  type="monotone"
  dataKey="completed"
  dot={{ r: 6 }}
  strokeWidth={3}
/>

      </LineChart>

      )}

    </div>
  );
}