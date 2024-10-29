
import React from "react";
import Information from "../../Components/Information/Information";
import SeachMan from "../../Components/SearchMan/SearchMan";
import { DefaultComponent } from "../../Components/DefaultComponent/DefaultComponent";
const Search = () => {
   
    return (
        <>
         <DefaultComponent/>
         <div style={{display:"flex"}}>
           
           <Information />
            <SeachMan />
        </div>

         </>
        

    );
};

export default Search;
