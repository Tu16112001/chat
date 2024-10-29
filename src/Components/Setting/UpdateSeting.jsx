import React, { useState } from "react";
import EditView from "../View/EditView";
import View from "../View/View";
const UpdateSetting = () => {
    const [showNotification, setShowNotification] = useState(false);
   
    const toggleNotification = () => {
        setShowNotification(!showNotification);
    };  
    
    return (
        <div style={{marginTop:"5%"}}>
            <div className="set">
                <div style={{ width: 375, height: 468.75,background:"white" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", zIndex: "5" }}>
                        <button className={!showNotification ? "Inter-hov-bottom" : ""} onClick={() => setShowNotification(false)} style={{
                            width: 187.5, borderTopLeftRadius: "8px",
                            height: "50px", border: "0.1px solid #ccc ", fontSize: "18px", background: "white"
                        }}>Chỉnh sửa</button>
                        <button className={showNotification ? "Inter-hov-bottom" : ""} onClick={toggleNotification} style={{
                            width: 187.5, borderTopRightRadius: "8px"
                            , height: "50px", border: "0.1px solid #ccc ", fontSize: "18px", background: "white"
                        }}>Xem trước</button>
                    </div>
                    <div style={{ marginTop: "60px"}}>
                        {!showNotification && <EditView />}
                        {showNotification && <View />}
                    </div>
                    
                </div>

            </div>
            
           
            
        </div>
    );
};

export default UpdateSetting;