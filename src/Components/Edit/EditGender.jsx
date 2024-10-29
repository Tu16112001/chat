import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider, Switch } from "antd";
import { CheckOutlined } from '@ant-design/icons'; // Import biểu tượng Check

const EditGender = () => {
    const [gender, setGender] = useState(""); // State để lưu trữ giới tính đã chọn
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const userId = localStorage.getItem("userId");
    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/public/profile/update/user", {
                id: userId,
                gender: gender
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
        const fetchUserGender = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                setGender(response.data.result.gender);
            } catch (error) {
                console.error("Error fetching user gender:", error);
            }
        };
        fetchUserGender();
    }, []);

    return (
        <div className="Profile">
            <div className="set">
                <div style={{ width: 375, height: 600, background: "white", textAlign: "center" }}>
                    <div className="Setting fle" style={{ height: "47px", position: "relative" }}>
                        <h2 className="mar" style={{ textAlign: "center", width: "100%" }}>Giới Tính</h2>
                        <button className="hov3 doneButton" style={{ position: "absolute", right: "10px" }} onClick={handleSubmit}>Xong</button>
                    </div>
                    <Divider className="mar" />
                    <div className="bg-ddit"></div>
                    <div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handleGenderSelect("Men")}>
                            <p className="Setting">Nam</p>
                            {gender === "Men" && <CheckOutlined style={{ color: "green",marginRight:"10px"  }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handleGenderSelect("Women")}>
                            <p className="Setting">Nữ</p>
                            {gender === "Women" && <CheckOutlined style={{ color: "green",marginRight:"10px"  }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handleGenderSelect("Other")}>
                            <p className="Setting">Khác</p>
                            {gender === "Other" && <CheckOutlined style={{ color: "green",marginRight:"10px" }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div className="bg-ddit"></div>
                        <div style={{ width: "100%" }} className="fle boder">
                            <p className="Setting">Hiển thị giới tính trên hồ sơ của tôi</p>
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

export default EditGender;
