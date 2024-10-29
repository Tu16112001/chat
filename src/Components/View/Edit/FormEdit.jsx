import React from 'react';
import Information from "../../Information/Information";
import EditInterests from "../../Edit/EditInterests";



const FormEdit = () => {
    return (
       
            <div style={{ display: "flex" }}>
                <Information />
                
                    <EditInterests />
               
            </div>
        
    );
};

export default FormEdit;
