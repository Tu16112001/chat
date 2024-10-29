import React from 'react';
import Information from "../../Information/Information";
import EditPasions from '../../Edit/EditPasions';



const FormEditPasions = () => {
    return (
       
            <div style={{ display: "flex" }}>
                <Information />
                
                < EditPasions/>
               
            </div>
        
    );
};

export default FormEditPasions;
