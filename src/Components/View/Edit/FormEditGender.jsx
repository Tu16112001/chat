
import React from 'react';
import Information from "../../Information/Information";

import EditGender from '../../Edit/EditGender';



const FormEditGender = () => {
    return (
       
            <div style={{ display: "flex" }}>
                <Information />
                
                    < EditGender/>
               
            </div>
        
    );
};

export default FormEditGender;
