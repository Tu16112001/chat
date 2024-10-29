import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiMoonClearLine } from "react-icons/ri";
import { AiTwotoneTrophy } from "react-icons/ai";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { GiSelfLove } from "react-icons/gi";
import { GiClover } from "react-icons/gi";
import { Divider, message } from "antd";

const EditAboutme = () => {
    const [selectedZodiac, setSelectedZodiac] = useState([]);
    const [selectedEducation, setSelectedEducation] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState([]);
    const [selectedCommunication, setSelectedCommunication] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const Idprofile = localStorage.getItem("IdProfile");
    useEffect(() => {
        const fetchUserabout_me = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/public/profile/getId?id=${userId}`
                );
                const data = response.data.result.about_me.split(",");
                setSelectedZodiac(data[0] ? [data[0]] : []);
                setSelectedEducation(data[1] ? [data[1]] : []);
                setSelectedFamily(data[2] ? [data[2]] : []);
                setSelectedCommunication(data[3] ? [data[3]] : []);
                setSelectedLanguage(data[4] ? [data[4]] : []);
            } catch (error) {
                console.error("Error fetching user about_me:", error);
            }
        };

        fetchUserabout_me();
    }, []);

    const totalSelected = [
        ...selectedZodiac,
        ...selectedEducation,
        ...selectedFamily,
        ...selectedCommunication,
        ...selectedLanguage,
    ].length;

    const handleInterestClick = (interest, selectedInterests, categorySetter) => {
        if (selectedInterests.length === 0 && totalSelected < 5) {
            categorySetter([interest]);
        }
    };

    const handleRemoveInterest = (categorySetter) => {
        categorySetter([]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Kiểm tra xem người dùng đã chọn đủ 5 trường chưa
            if (
                selectedZodiac.length !== 1 ||
                selectedEducation.length !== 1 ||
                selectedFamily.length !== 1 ||
                selectedCommunication.length !== 1 ||
                selectedLanguage.length !== 1
            ) {
                message.error("Vui lòng chọn đủ 5 trường trước khi gửi.");
                return;
            }
    
            // Tạo chuỗi about_me từ các trường đã chọn
            const about_me = [
                selectedZodiac.join(","),
                selectedEducation.join(","),
                selectedFamily.join(","),
                selectedCommunication.join(","),
                selectedLanguage.join(","),
            ].join(",");
    
            // Gửi yêu cầu cập nhật

            const response = await axios.post("http://localhost:8080/public/profile/update", {
                id: Idprofile,
                about_me: about_me,
            });
    
            // Xử lý kết quả
            if (response.status === 200) {
                navigate("/profile/Edit");
            } else {
                console.error("Có lỗi xảy ra khi cập nhật sở thích!");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi gửi yêu cầu cập nhật sở thích:", error);
        }
    };
    
    const renderInterestButtons = (interests, selectedInterests, categorySetter) => (
        interests.map((interest, index) => (
            <button
                key={index}
                className={`selectedinterests-button ${selectedInterests.includes(interest) && "selectedinterests"}`}
                onClick={() =>
                    selectedInterests.includes(interest)
                        ? handleRemoveInterest(categorySetter)
                        : handleInterestClick(interest, selectedInterests, categorySetter)
                }
            >
                {interest}
            </button>
        ))
    );

    const zodiacOptions = [ "Bạch Dương","Kim Ngưu",    // Taurus
    "Song Tử","Cự Giải","Sư Tử",       // Leo
    "Xử Nữ", "Thiên Bình", "Bọ Cạp", "Nhân Mã",  
    "Ma Kết",    "Bảo Bình",  "Song Ngư"  ]; // Replace with actual options
    const educationOptions = [ "Bằng Tốt nghiệp Trung học Phổ thông",  // High School Diploma
    "Bằng Cử nhân",                         // Bachelor's Degree
    "Bằng Thạc sĩ",                         // Master's Degree
    "Bằng Tiến sĩ hoặc Bác sĩ",             // Doctorate or PhD
    "Bằng Cao đẳng",                        // Associate's Degree
    "Đào tạo nghề",                         // Vocational Training
    "Chứng chỉ nghề nghiệp",                // Professional Certification
    "Khác"  ]; // Replace with actual options
    const familyOptions = [
        "Có gia đình"," muốn có thêm con",        // Option1: Has family, wants more children
        "Chưa có gia đình"," muốn lập gia đình",  // Option2: No family, wants to start a family
       "Muốn 2 con" ,"Hình mẫu lý tưởng"   // Option3: Has family, does not want more children
        // Feel free to add more options here if needed
    ]; // Replace with actual options
    const communicationOptions = [
        "Trò chuyện trực tiếp", "Thẳng thắn","Thích rap" ,
        "Trò chuyện cẩn thận ", "Dùa vui","Tinh ngịch"  ,
        "Trò chuyện hài hước", "Hóm hỉnh"  
       
    ];// Replace with actual options
    const languageOptions = ["Quan tâm", "Săn sóc", "Bao dung","Cảm thông","Chia sẻ","Nội tâm"]; // Replace with actual options

    return (
        <div className="Profile">
            <div className="set">
                <div style={{ width: 375, background: "white" }}>
                    <div className="Setting fle" style={{ height: "47px", position: "relative" }}>
                        <h2 className="mar" style={{ textAlign: "center", width: "100%" }}>Chỉnh Sửa</h2>
                        <button className="hov3 doneButton" style={{ position: "absolute", right: "10px" }} onClick={handleSubmit}>Xong</button>
                    </div>
                    <div style={{ background: "#eef0f3" }}>
                        <p className="Setting" style={{ width: "90%", padding: "10px" }}>Hãy chọn đủ thông tin để bạn có thêm nhiều cơ hội ghép đôi</p>
                    </div>
                    <div><h4 className="Setting mar" style={{ width: "90%", padding: "10px" }}>Thông tin đã chọn ({totalSelected}/5)</h4></div>
                    <div className="Setting fle" style={{ width: 266 }}>
                        <RiMoonClearLine size={20} />
                        <h4>Cung hoàng đạo của bạn là gì ?</h4>
                    </div>
                    <div className="Setting">
                        {renderInterestButtons(zodiacOptions, selectedZodiac, setSelectedZodiac)}
                    </div>
                    <Divider />
                    <div className="Setting fle" style={{ width: 148 }}>
                        <AiTwotoneTrophy size={20} />
                        <h4>Trình độ học vấn</h4>
                    </div>
                    <div className="Setting">
                        {renderInterestButtons(educationOptions, selectedEducation, setSelectedEducation)}
                    </div>
                    <Divider />
                    <div className="Setting fle" style={{ width: 257 }}>
                        <MdOutlineFamilyRestroom size={20} />
                        <h4>Mong muốn gia đình tương lai</h4>
                    </div>
                    <div className="Setting">
                        {renderInterestButtons(familyOptions, selectedFamily, setSelectedFamily)}
                    </div>
                    <Divider />
                    <div className="Setting fle" style={{ width: 200 }}>
                        <GiSelfLove size={20} />
                        <h4>Phong cách trò chuyện</h4>
                    </div>
                    <div className="Setting">
                        {renderInterestButtons(communicationOptions, selectedCommunication, setSelectedCommunication)}
                    </div>
                    <Divider />
                    <div className="Setting fle" style={{ width: 230 }}>
                        <GiClover size={20} />
                        <h4>Muốn nhận được giao tiếp</h4>
                    </div>
                    <div className="Setting">
                        {renderInterestButtons(languageOptions, selectedLanguage, setSelectedLanguage)}
                    </div>
                    <div style={{height:"70px",background:"#eef0f3", marginTop:"10px"}}></div>
                </div>

            </div>

        </div>
    );
};

export default EditAboutme;
