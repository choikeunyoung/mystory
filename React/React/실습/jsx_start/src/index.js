import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from "./reportWebVitals";
import Library from "./jsx실습/Library";
import Clock from "./clock/Clock";
import CommentList from "./comment/CommentList";

// jsx실습
// v17 버전
// ReactDOM.render(
//     <React.StrictMode>
//         <Library />
//     </React.StrictMode>,
//     document.getElementById('root')
// );

// v18 버전
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Library />
//   </React.StrictMode>
// );

// clock 실습

// setInterval(() => {
//     ReactDOM.render(
//         <React.StrictMode>
//             <Clock />
//         </React.StrictMode>,
//         document.getElementById("root")
//     );
// }, 1000);

// Comment 실습
ReactDOM.render(
    <React.StrictMode>
        <CommentList />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();