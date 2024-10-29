
import React from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { RiFileSearchFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import avt from "../../Image/Lovepik_com-380607142-free-printable-heart-vector-cartoon-in-the-style-of-crimson-and-beige-cartoon-sticker.png"
import { HeartFilled } from '@ant-design/icons'
import { BsStarFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsLightningChargeFill } from "react-icons/bs";
const LoadedMenu = () => {
    const navigate = useNavigate();
    const limitStringLength = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength) + '' : str;
    };

    return (

            <div style={{ width: "495px", height: "100vh", borderRight:"0.2px solid gray" }}>
                <div className="informa">
                    <div className="btn1" style={{marginLeft:"15px"}}>
                       
                    <div className="transition-informa hov" onClick={()=> navigate("/Profile")} >
                 
                        <img src={avt}  alt="" style={{width:40,height:40,borderRadius:"20px",cursor:"pointer"}} />

                     <h4 className="Setting " style={{color:"white"}}>{limitStringLength("Tú Trần" , 13)}</h4>
                    </div>
                    
                    </div>
                    <div>
                        <button className="custom-button bnt2"><RiFileSearchFill /></button>
                        <button className="custom-button bnt2"><BsShieldLockFill /></button>
                    </div>
                </div>
                <div className="Cente" style={{background:"rgb(0, 0 ,0 , 0.4)"}}>
        <div style={{ width: "100%", display: "flex", alignItems: 'center', flexDirection: 'column'}}>
            <div style={{ width: "88%" }}>
                <div style={{zIndex:"3"}}>
                <button className="buy-package">
                    <h2 style={{ fontWeight: "bold" }}>
                        <HeartFilled /> LOVE</h2>
                    <p>Tăng cấp mọi hành động bạn thực hiện trong Tình yêu</p></button>

                <button className="buy-package">
                    <h2 style={{ fontWeight: "bold" }} >
                        <i style={{ color: 'red' }}><HeartFilled /></i> LOVE</h2>
                    <p>
                        Lượt thích không giới hạn và hơn thế nữa!</p></button>
                </div>
                
            </div>
            <div className="buy-package-overlay" style={{width:"90%"}}>
                

                <div style={{ display: "flex",padding:"8px" }}>
                    <button style={{ marginRight: "4px" }} className="buy-package fl">
                        <i className="btn4" style={{ fontSize: "23px", color: "#f508f1" }}><BsLightningChargeFill /></i>
                        <div>0 còn lại</div>
                        <p style={{ color: "#f508f1" }}>Get More Boosts</p>
                    </button>
                    <button style={{ marginLeft: "4px" }} className="buy-package fl">
                        <i className="btn4" style={{ fontSize: "23px", color: "#ff4458" }}><BsStarFill /></i>
                        <div>0 còn lại</div>
                        <p style={{ color: "#ff4458" }}>Nhận được nhiều lượt thích hơn</p>
                    </button>
                </div>
                <button className="buy-package">
                    <div style={{ fontSize: "22px", marginTop: "10px" }}><BsEyeSlashFill /></div>
                    <h4>
                        Dùng để ẩn danh</h4>
                </button>

            </div>
            </div>
        </div>
    </div>


    );
};

export default LoadedMenu;
