import React, { useState } from "react";
import { NotificationMess } from "../ Notification/ Notification_mess";
import { Notification } from "../ Notification/ Notification";
const Inter = () => {
    const [showNotification, setShowNotification] = useState(false); // Initially show Notification

    const toggleNotification = () => {
        setShowNotification(!showNotification);
    };

    return (
        <div style={{ width: "100%", display: "flex", alignItems: 'center', flexDirection: 'column' }}>
            <div className="" style={{ width: "100%", background: "white" }}>
                <div style={{width:"100%"}}>
                    <div style={{display:"flex" }}>
                       <div style={{width:"50%",textAlign:"center"}} className="hov2"  onClick={toggleNotification}> 
                       <h4 className={showNotification ? "Inter-hov-bottom" : ""}>Các tương hợp</h4></div>
                       <div style={{width:"50%",textAlign:"center"}} className="hov2" onClick={() => setShowNotification(false)}>
                         <h4 className={!showNotification ? "Inter-hov-bottom" : ""} >Tin nhắn</h4></div>
                    </div>
                </div>
                <div style={{width:"100%",height:"81vh"}}>
                    {showNotification && <Notification />}
                    {!showNotification && <NotificationMess />}
                </div>
            </div>
        </div>
    );
};

export default Inter;
