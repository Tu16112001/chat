
import React from "react";
import Informa from "../../Components/Information/Informa";
import SeachMan from "../../Components/SearchMan/SearchMan";
import { DefaultComponent } from "../../Components/DefaultComponent/DefaultComponent";
const Recs = () => {
   
    return (
        <>
         <DefaultComponent/>
         <div style={{display:"flex"}}>
           
           <Informa />
            <SeachMan />
        </div>

         </>
        

    );
};

export default Recs;
