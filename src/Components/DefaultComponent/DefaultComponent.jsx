import React, { useEffect, useState } from "react";
import socketIOClient from 'socket.io-client';
import { Avatar} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { addNotification, removeNotification } from '../../Redux/notificationActions';

const ENDPOINT = "http://localhost:3005";

export const DefaultComponent = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const notifications = useSelector((state) => state.notifications);
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
      const socket = socketIOClient(ENDPOINT);

      socket.on(`send_message${userId}`, (data) => {
          console.log("Received notification:", data);
          dispatch(addNotification(data));
      });

      socket.on(`send_Profile${userId}`, (dataPro) => {
          console.log("Received profile notification:", dataPro);
      });

      return () => {
          socket.disconnect();
      };
  }, [dispatch, userId]);

  useEffect(() => {
      setIsVisible(notifications.length > 0);
  }, [notifications]);

  const handleRemoveNotification = (notificationId) => {
    dispatch(removeNotification(notificationId));
};


    return (
      <div className="notification-container" style={{ display: isVisible ? "flex" : "none" }}>
      {notifications.map((notification,index) => (
    <div key={notification.id} className="notification-item" style={{ zIndex: notifications.length - index }}>
              <div
                  className="notification-content-wrapper"
                 
              >
                  <IoMdClose 
                      fontSize={30}
                      className="notification-close" 
                      onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveNotification(notification.id);
                      }}
                  />
                  <div className="notification-content">
                      <h2 style={{textAlign:"center"
                      ,position:'absolute',top:"18px",width:"100%"}}>{notification.title}</h2>
                     <div style={{width:"100%",position:"absolute",top:"80px",left:"0px"}} className="fl" >
                     {notification.image ? (
                
                    <Avatar className="notification-avatar" src={notification.image} />
                
                    ) : (
                        < div style={{marginTop:"70px"}}> 
                            <div className="fle">
                                <div className="tinder-plus" >
                                    <h4>Gói nạp : 50000 VNĐ</h4>
                                   <div className="fl">
                                   <p>Bạn có thể thoả thích like trong 1 tháng</p>
                                    <p>Có thể xem rõ ai đã like mình</p>
                                   </div>
                                </div>
                                <div className="tinder-plus" >
                                    <h4>Gói nạp : 350000 VNĐ</h4>
                                   <div className="fl">
                                   <p>Bạn có thể thoả thích like trong 1 năm</p>
                                    <p>Có thể xem rõ ai đã like mình</p>
                                   </div>
                                </div>
                            </div>
                        </div>
                     )}
                     </div>
                      <h4 style={{position:"absolute",top:"370px",
                    width:"100%",textAlign:"center"}}>{notification.content}</h4>
                    <div style={{position:"absolute",bottom:"0"}}>
                        <div style={{width:"99%"}}>
                          <p style={{fontSize:"13px",textAlign:"center"}}>
                            Khi nhấn Tiếp tục, bạn sẽ bạn sẽ đến tương với đối tượng like hãy xác nhận để bắt đầu cuộc trò truyện </p>
                        </div>
                        <div className="fle" 
                        style={{width:"100%",height:"100px",flexDirection:"column"}}>
                        <button className="checkloaded-contine checkloaded-bg" 
                         onClick={(e) => {
                         e.stopPropagation();
                         navigate(notification.image ? "/Notification" : "/Loaded");
                         handleRemoveNotification(notification.id);
                         window.location.reload();}}>Tiếp Tục</button>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      ))}
  </div>
    );
};
