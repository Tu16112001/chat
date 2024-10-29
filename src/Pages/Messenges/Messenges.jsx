
import React from "react";
import Informa from "../../Components/Information/Informa";
import Mess from "../../Components/Messenges/Mess";
import { DefaultComponent } from "../../Components/DefaultComponent/DefaultComponent";
const Messenges = () => {

    return (
        <>
        <DefaultComponent/>
        <div style={{display:"flex"}}>
            
            <Informa />
            <Mess />
        </div>

        </>
        

    );
};

export default Messenges;
