
import React from "react";
import Setting from "../../Components/Setting/Setting";
import Information from "../../Components/Information/Information";
import { DefaultComponent } from "../../Components/DefaultComponent/DefaultComponent";
const Profile = () => {
   
    return (
        <>
        <DefaultComponent/>
        <div style={{display:"flex"}}>
            <Information  />
            <Setting />
        </div>
        </>


    );
};

export default Profile;
