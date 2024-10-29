import React from 'react';
import Information from "../../Information/Information";
import EditAboutme from '../../Edit/EditAbout_me';



const FormEditAboutMe = () => {
    return (
       
            <div style={{ display: "flex" }}>
                <Information />
                
                    <EditAboutme/>
               
            </div>
        
    );
};

export default FormEditAboutMe;
