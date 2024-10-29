import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3005';

function NodeSocket() {

//const [response, setResponse] = useState({});
 const receiverId = 2;


useEffect(() => {
    // Tạo một socket connection
    const socket = io('http://localhost:3005'); // Thay thế 'http://localhost:3000' bằng URL của server của bạn

    // Lắng nghe sự kiện từ server
    socket.on(`send_message${receiverId}`, (data) => {
      console.log(data); // Xử lý dữ liệu nhận được tại đây
      console.log("tin nhắn là: " + data.title);
       console.log(`http://localhost:3005/send_message${receiverId}`);
    });

    // Dọn dẹp khi component unmount
    return () => {
      socket.off(`send_message${receiverId}`);
    };
  }, []);


return (

    <div >
    <h1>Node js socket</h1>
</div>
);

}

export default NodeSocket;