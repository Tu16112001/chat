import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditInterests = () => {
  const [selectedInterests, setSelectedInterests] = useState([]); // Danh sách sở thích đã chọn
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const Idprofile = localStorage.getItem("IdProfile");
  useEffect(() => {
    const fetchUserInterests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/public/profile/getId?id=${userId}`
        );
        const userInterests = response.data.result.interests.split(",");
        setSelectedInterests(userInterests);
      } catch (error) {
        console.error("Error fetching user interests:", error);
      }
    };

    fetchUserInterests();
  }, []);

  const interests = [
    "Thể thao", "Âm nhạc", "Đọc sách", "Phim ảnh", "Lập trình", "Thiên nhiên",
    "Kinh doanh", "Xem phim", "Đá bóng", "Chụp ảnh", "Chơi game", "Viết blog",
    "Nghệ thuật sống", "Trồng cây", "Yoga", "Học ngoại ngữ", "Thiết kế", "Dã ngoại",
    "Hoa hồng", "Thời trang", "Đi bơi", "Chạy bộ", "Điều khiển robot", "Lập kế hoạch",
    "Nấu ăn", "Đọc sách",  "Nghệ thuật",
   "Du lịch", // Sở thích mới, không bị lặp lại// Sở thích mới, không bị lặp lại
  ];
  
   // Danh sách sở thích

  const handleInterestClick = (interest) => {
    if (selectedInterests.length < 5) {
      setSelectedInterests((prevInterests) => [...prevInterests, interest]);
    }
  };

  const handleRemoveInterest = (interest) => {
    const updatedInterests = selectedInterests.filter(
      (item) => item !== interest
    );
    setSelectedInterests(updatedInterests);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Gửi yêu cầu cập nhật sở thích mới đến API sử dụng Axios
      const response = await axios.post("http://localhost:8080/public/profile/update", {
        id: Idprofile,
        interests: selectedInterests.join(","),
      });
      // Kiểm tra phản hồi từ API và xử lý
      if (response.status === 200) {
        navigate("/profile/Edit");
      } else {
        console.error("Có lỗi xảy ra khi cập nhật sở thích!");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi yêu cầu cập nhật sở thích:", error);
    }
  };

  return (
    <div className="Profile">
      <div className="set">
        <div style={{ width: 375, interests: 600,background:"white" }}>
        <div  className="Setting fle" style={{height:"47px",position:"relative"}}>
           
          <h2 className="mar" style={{textAlign:"center",width:"100%"}}> Chỉnh sửa</h2>
          <button className="hov3 doneButton" style={{position:"absolute", right:"10px"}} onClick={handleSubmit}>Xong</button>
        </div>
         
          <div style={{background:"#eef0f3"}}>
            <p className="Setting" style={{width:"90%",padding:"10px"}}>Hãy chọn đủ sở thích để bạn có thêm nhiều cơ hội ghép đôi</p>
            <h4 className="Setting" style={{width:"90%",padding:"10px"}}>Sở thích đã chọn ({selectedInterests.length}/5)</h4>
          </div>
          <div className="Setting">
            {interests.map((interest, index) => (
              <button
                key={index}
                className={`selectedinterests-button ${
                  selectedInterests.includes(interest) && "selectedinterests"
                }`}
                onClick={() =>
                  selectedInterests.includes(interest)
                    ? handleRemoveInterest(interest)
                    : handleInterestClick(interest)
                }
              >
                {interest}
              </button>
            ))}
          </div>
          <div style={{height:"70px",background:"#eef0f3", marginTop:"10px"}}></div>
         
        </div>
      </div>
    </div>
  );
};

export default EditInterests;
