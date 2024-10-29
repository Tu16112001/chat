import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory từ react-router-dom

const EditHeight = () => {
    const [height, setHeight] = useState("120"); // State để lưu trữ chiều cao mới
    const navigate = useNavigate(); // Sử dụng useHistory để điều hướng trang
    const Idprofile = localStorage.getItem("IdProfile");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Gửi yêu cầu cập nhật chiều cao mới đến API sử dụng Axios
            const response = await axios.post("http://localhost:8080/public/profile/update", {
                id:Idprofile,
                height: height + " Cm"
            });
            // Kiểm tra phản hồi từ API và xử lý
            if (response.status === 200) {
                
                setHeight(response.data.result);
                navigate("/profile/Edit");
            } else {
                console.error("Có lỗi xảy ra khi cập nhật chiều cao!");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi gửi yêu cầu cập nhật chiều cao:", error);
        }
    };

    // Hàm xử lý khi người dùng nhấn nút "Xong" để quay lại trang Profile


    return (
        <div className="Profile">
            <div className="set">
                <div style={{ width: 375, height: 600,background:"white",textAlign:"center" }}>
               
                    {/* Form để người dùng nhập chiều cao mới */}
                    <h2 className="Setting" style={{marginTop:"50px"}}>Chiều cao</h2>
                    <p className="Setting">Đây là cơ hội để thêm chiều cao cho hồ sơ của bạn</p>
                    <form onSubmit={handleSubmit}>
                       
                       <div className="fl">
                        <div className="fle">
                        <button
                                     type="submit"
                                    className="hov3 doneButton"
                                    style={{
                                        top:"-190px",
                                        left:220,
                                    }}>Xong</button>
                        <input
                            type="number"
                            id="height"
                            style={{width:"90px",height:"50px",padding:"10px",fontSize:"20px",borderRadius:"20px",marginTop:"50px"}}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            required
                        />
                           <p className="Setting" style={{marginTop:"60px"}}>Cm</p>
                        </div>
                       
                       
                       </div>
                       
                      
                       
                    </form>
                    <p style={{marginTop:"70px"}}>Hãy cập nhật chiều cao của bạn để có thể thêm nhiều thông tin vào hồ sơ của bản thân nó sẽ gây ấn tượng cho nhiều nguời muốn tìm hiểu về bạn</p>
                </div>
            </div>
        </div>
    );
};

export default EditHeight;
