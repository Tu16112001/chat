
import React from "react";
import LikeNotification from "./LikeNotification";
import { DefaultComponent } from "../../Components/DefaultComponent/DefaultComponent";
import Informa from "../../Components/Information/Informa";

const Notificatio = () => {
   
    return (
        <>
        <DefaultComponent />
        <div style={{ display: "flex" }}>
            
            <Informa />    
           <LikeNotification />
       </div>
</>
       

    );
};

export default Notificatio;
