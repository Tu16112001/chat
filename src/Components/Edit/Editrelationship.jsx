
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider, Switch } from "antd";
import { CheckOutlined } from '@ant-design/icons'; // Import biểu tượng Check

const Editrelationship = () => {
    const [relationship_goals, setrelationship_goals] = useState(""); // State để lưu trữ giới tính đã chọn
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const handlerelationship_goalsSelect = (selectedrelationship_goals) => {
        setrelationship_goals(selectedrelationship_goals);
    };
    const userId = localStorage.getItem("userId");
    const Idprofile = localStorage.getItem("IdProfile");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/public/profile/update", {
                id: Idprofile,
                relationship_goals: relationship_goals
            });
            if (response.status === 200) {
                navigate("/profile/Edit");
            } else {
                console.error("Có lỗi xảy ra khi cập nhật giới tính!");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi gửi yêu cầu cập nhật giới tính:", error);
        }
    };

    useEffect(() => {
        const fetchUserrelationship_goals = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                setrelationship_goals(response.data.result.relationship_goals);
            } catch (error) {
                console.error("Error fetching user relationship_goals:", error);
            }
        };
        fetchUserrelationship_goals();
    }, []);

    return (
        <div className="Profile">
            <div className="set">
                <div style={{ width: 375, height: 600, background: "white", textAlign: "center" }}>
                    <div className="Setting fle" style={{ height: "47px", position: "relative" }}>
                        <h2 className="mar" style={{ textAlign: "center", width: "100%" }}>Khuynh Hướng</h2>
                        <button className="hov3 doneButton" style={{ position: "absolute", right: "10px" }} onClick={handleSubmit}>Xong</button>
                    </div>
                    <Divider className="mar" />
                    <div className="bg-ddit"></div>
                    <div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handlerelationship_goalsSelect("Men")}>
                            <p className="Setting">Nam</p>
                            {relationship_goals === "Men" && <CheckOutlined style={{ color: "green",marginRight:"10px"  }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handlerelationship_goalsSelect("Women")}>
                            <p className="Setting">Nữ</p>
                            {relationship_goals === "Women" && <CheckOutlined style={{ color: "green",marginRight:"10px"  }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handlerelationship_goalsSelect("EveryOne")}>
                            <p className="Setting">Toàn Tính</p>
                            {relationship_goals === "EveryOne" && <CheckOutlined style={{ color: "green",marginRight:"10px" }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div className="bg-ddit"></div>
                        <div style={{ width: "100%" }} className="fle boder">
                            <p className="Setting">Hiển thị khuynh hướng tinh dục <br /> trên hồ sơ của tôi</p>
                            <Switch
                                style={{
                                    background: isChecked ? "#ff4458" : "#D3D3D3",
                                    marginRight: "16px"
                                }}
                                checked={isChecked}
                                onChange={(checked) => setIsChecked(checked)}
                            />
                        </div>
                    </div>
                    <div className="Setting" style={{ marginTop: "25px", float: "left" }}>
                        <a href="">Tim hieu them</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editrelationship;
