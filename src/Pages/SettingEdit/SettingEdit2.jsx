
import React from "react";
import Setting from "../../Components/Setting/Setting";
import { DefaultComponent } from "../../Components/DefaultComponent/DefaultComponent";
import { SettingPhone } from "../../Components/Edit/SettingEdit/SettingPhone";
import { HeartFilled } from '@ant-design/icons'
import { BsShieldLockFill } from "react-icons/bs";
import { RiFileSearchFill } from "react-icons/ri";
import { FaChartColumn } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
    
const SettingEdit2 = () => {
    const navigate = useNavigate();
    return (
        <>
        <DefaultComponent/>
        <div style={{display:"flex"}}>
            
        <div style={{ width: "495px", height: "100vh", borderRight:"0.2px solid gray" }}>
                <div className="informa">
                    <div className="btn1" style={{marginLeft:"15px"}}>
                       
                        <button onClick={()=>navigate("/Recs")} className="custom-button btn3"><HeartFilled /></button>
                    
                    </div>
                    <div>
                        <button className="custom-button bnt2"><RiFileSearchFill /></button>
                        <button className="custom-button bnt2"><FaChartColumn /></button>
                        <button className="custom-button bnt2"><BsShieldLockFill /></button>
                    </div>
                </div>
                <div className="Cente" >
                    <SettingPhone/>
                </div>
            </div>
           
            <Setting />
        </div>
        </>


    );
};

export default SettingEdit2;
