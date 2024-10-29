
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import { CheckOutlined } from '@ant-design/icons'; // Import biểu tượng Check

const EditPasions = () => {
    const [relapassions, setrelapassions] = useState(""); // State để lưu trữ giới tính đã chọn
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const Idprofile = localStorage.getItem("IdProfile");
    const handlerelapassionsSelect = (selectedrelapassions) => {
        setrelapassions(selectedrelapassions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/public/profile/update", {
                id: Idprofile,
                passions: relapassions
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
        const fetchUserrelapassions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                setrelapassions(response.data.result.passions);
            } catch (error) {
                console.error("Error fetching user relapassions:", error);
            }
        };
        fetchUserrelapassions();
    }, []);

    return (
        <div className="Profile">
            <div className="set">
                <div style={{ width: 375, height: 600, background: "white", textAlign: "center" }}>
                    <div className="Setting fle" style={{ height: "47px", position: "relative" }}>
                        <h2 className="mar" style={{ textAlign: "center", width: "100%" }}>Mục đích tìm kiếm</h2>
                        <button className="hov3 doneButton" style={{ position: "absolute", right: "10px" }} onClick={handleSubmit}>Xong</button>
                    </div>
                    <Divider className="mar" />
                    <div className="bg-ddit"></div>
                    <div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handlerelapassionsSelect("1")}>
                            <p className="Setting">Tìm Kiếm Người Yêu</p>
                            {relapassions === "1" && <CheckOutlined style={{ color: "green",marginRight:"10px"  }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handlerelapassionsSelect("2")}>
                            <p className="Setting">Tìm Kiếm Mối Quan Hệ không Ràng Buộc</p>
                            {relapassions === "2" && <CheckOutlined style={{ color: "green",marginRight:"10px"  }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handlerelapassionsSelect("3")}>
                            <p className="Setting">Tìm Người Trò Chuyện</p>
                            {relapassions === "3" && <CheckOutlined style={{ color: "green",marginRight:"10px" }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                       
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handlerelapassionsSelect("4")}>
                            <p className="Setting"> Tìm Người Cùng Sở Thích</p>
                            {relapassions === "4" && <CheckOutlined style={{ color: "green",marginRight:"10px" }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div style={{ width: "100%" }} className="fle boder" onClick={() => handlerelapassionsSelect("5")}>
                            <p className="Setting">Muốn Tâm Sự Riêng Tư</p>
                            {relapassions === "5" && <CheckOutlined style={{ color: "green",marginRight:"10px" }} />} {/* Hiển thị biểu tượng nếu đã chọn */}
                        </div>
                        <div className="bg-ddit"></div>
                       
                    </div>
                    <div className="Setting" style={{ marginTop: "25px", float: "left" }}>
                        <a href="">Tim hieu them</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPasions;
