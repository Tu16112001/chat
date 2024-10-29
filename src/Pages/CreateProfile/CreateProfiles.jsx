import React from "react";
import { TranslationOutlined} from '@ant-design/icons'
import Logo from "../../Image/Lovepik_com-380607142-free-printable-heart-vector-cartoon-in-the-style-of-crimson-and-beige-cartoon-sticker.png"
import Profile from "./Profile";
import{ BackGroundHeader3 }from '../../Style/Background'
const CreateProfiles = () => {
    return (
        <BackGroundHeader3 style={{ width: "100%", height: "100vh" }}>
            <div style={{ width: "100%" }}>
                <div className="fle" style={{ borderBottom: "0.1px solid gray", height: "10vh" }}>
                    <div className="fle" style={{ width: "93%", marginLeft: "3%" }}>
                        <div className="fle">
                            <img src={Logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
                            <h1 style={{
                                fontWeight: "900"
                            }}>LOVE</h1>
                        </div>
                        <div className="fle">
                            <button
                                className="hov3"
                                style={{
                                    border: "none",
                                    fontSize: '17px',
                                    fontWeight: "900",
                                    borderRadius: "10px",
                                    padding: "5px 15px 5px 15px",
                                }}>
                                <TranslationOutlined /> Ngôn ngữ</button>
                        </div>
                    </div>
                </div>
                <div className="fl" style={{ overflowX: "hidden", height: "calc(100vh - 10vh)", width: "100%" }}>
                    <div className="pad">
                        <h1>Tạo Tài Khoản</h1>
                    </div>
                    <Profile/>
                </div>
            </div>
        </BackGroundHeader3  >
    )
}
export default CreateProfiles;
