import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import io from 'socket.io-client';
import {over} from 'stompjs';


function TestSocket() {


    useEffect( ()=>{
        const roomId = "4" ;
        const socket = new SockJS('http://localhost:8080/ws');
        const stomClient = Stomp.over(socket);

        // kết nối đăng ký handler:
        stomClient.connect( {}, ()=>{
            // lắng nghe tin nhắn từ phòng chat "123"

            // LAWNSG NGHE CHA VE
            stomClient.subscribe(`/chatroom/public/${roomId}`, (message)=>{ //  /topic/${roomId}  SOCKET CU
                // in tin nhắn ra console.log();
                console.log(JSON.parse( message.body ));
            });
        });



        // gửu tin nhắn khi nhấn phím enter:
        window.addEventListener('keydown', (event)=>{
                if( event.key === 'Enter' ){
                        // tạo một đối tượng message:

                        const message = {
                            nameSender: 'Anh Huy',
                            senderId: 48,
                            receiverId: 7,
                            matchId: 4,
                            message: 'Hello world!'
                        }

                      

                        // chuyển đổi đói tượng message thành chuỗi JSON gửu qua websocket:
                        // GUU DU LIEU LEN DATABASE
                        stomClient.send(`/app/message/${roomId}`, {}, JSON.stringify(message)); ///app/chat/${roomId}  SOCKET CU
   

                }
        });

        return () =>{
            if(stomClient.connected){
                stomClient.disconnect();
            }
        }

    }, []);


    return (
      <div >
            <h1>Chat Application</h1>
      </div>
    );
  }
  
  
  export default TestSocket;