export default function Statistics({ tasks }) {


const total = tasks.length;


const completed = tasks.filter(
(task)=>task.completed
).length;


const unfinished = total - completed;


const focusTime = tasks.reduce(
(sum,task)=>
sum + (task.focusTime || 0),
0
);


const percent =
total === 0
?
0
:
Math.round(
(completed / total) * 100
);



return (

<div
style={{
background:"white",
padding:"20px",
borderRadius:"15px",
marginTop:"30px",
boxShadow:"0 0 10px rgba(0,0,0,.1)"
}}
>

<h2>
📊 Bảng thành tích
</h2>


<p>
📋 Tổng công việc:
<b> {total}</b>
</p>


<p>
✅ Đã hoàn thành:
<b> {completed}</b>
</p>


<p>
⏳ Chưa hoàn thành:
<b> {unfinished}</b>
</p>


<p>
⏱ Tổng thời gian tập trung:
<b> {focusTime} phút</b>
</p>



<h3>
Hiệu suất:
{percent}%
</h3>


<div
style={{
width:"100%",
height:"12px",
background:"#ddd",
borderRadius:"20px"
}}
>


<div
style={{
width:`${percent}%`,
height:"100%",
background:"#2563eb",
borderRadius:"20px"
}}
>


</div>

</div>


<p
style={{
color:"#666"
}}
>

{
unfinished > 0

?

"🧠 Các nhiệm vụ chưa hoàn thành có thể tiếp tục thu hút sự chú ý của bạn (hiệu ứng Zeigarnik)."

:

"🎉 Bạn đã hoàn tất các nhiệm vụ!"

}

</p>


</div>

)

}