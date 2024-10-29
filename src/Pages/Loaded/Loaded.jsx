
import React from "react";
import Loadeds from "../../Components/Loaded/Loaded";
import LoadedMenu from "../../Components/Loaded/LoadedMenu";
const Loaded = () => {
   
    return (
        <div style={{display:"flex"}}>
            <LoadedMenu  />
            <Loadeds />
        </div>


    );
};

export default Loaded;
