import React, { useState, useEffect } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { RiFileSearchFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import Inter from "../Interest/Inter";
import { Avatar, Modal, Button } from 'antd';
import axios from "axios";
const Informa = () => {
    const navigate = useNavigate();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const handleSearchClick = () => {
        navigate("/Search");
        setIsSearchPage(true);
    };
    const showModal1 = () => {
        setIsModalVisible1(true);
    };

    const handleOk = () => {
        setIsModalVisible1(false);
    };

    const handleCancel1 = () => {
        setIsModalVisible1(false);
    };
    const [userInfo, setUserInfo] = useState({ name: "", avatar: "" });

    const limitStringLength = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength) + '' : str;
    };

   
        // Lấy ID người dùng từ local storage
        const userId = localStorage.getItem("userId");
        const [data, setData] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const resp = await axios.get(`http://localhost:8080/public/follower/list/matching?id=${userId}`);
                    setData(resp.data.result);
    
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };
            fetchData();
        }, [userId]);
    
        const fetchData1 = async ({id}) => {
            try {
                await axios.post('http://localhost:8080/public/follower/unmatched', {
    
                    u_id1: userId,
                    u_id2: id
                });
               
                setIsModalVisible1(false);
                alert('Huỷ thành công!');
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        useEffect(() => {
            // Gọi API để lấy thông tin người dùng
            fetch(`http://localhost:8080/public/profile/getId?id=${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Xử lý dữ liệu trả về từ API
                    const fullName = data.result.fullname; // Lấy tên đầy đủ
                    const images = data.result.images.split(", "); // Tách các URL ảnh thành một mảng
                    const avatar = images[0]; // Lấy URL của ảnh đầu tiên
    
                    setUserInfo({ name: fullName, avatar: avatar });
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        });
    return (
        <div style={{ width: "495px", height: "100vh", borderRight:"0.2px solid gray" }}>
            <div className="informa">
                <div className="btn1" style={{marginLeft:"15px"}}>
                    <div className="transition-informa hov" onClick={()=> navigate("/Profile")} >
                        <img src={userInfo.avatar} alt="" 
                        style={{width:40, height:40, borderRadius:"20px", cursor:"pointer",objectFit:"cover"}} />
                        <h4 className="Setting " style={{color:"white"}}>{limitStringLength(userInfo.name, 13)}</h4>
                    </div>
                </div>
                <div>
                {isSearchPage ? (
                    <button className="custom-button bnt2" onClick={() => navigate("/Profile")}>
                        <RiFileSearchFill />
                    </button>
                ) : (
                    <button className="custom-button bnt2" onClick={handleSearchClick}>
                        <RiFileSearchFill />
                    </button>
                )}
                     <button className="custom-button bnt2" onClick={showModal1}>
                    <BsShieldLockFill />
                </button>
                </div>
            </div>
            <div className="Cente" >
                <Inter/>
            </div>
            <Modal
            title="Huỷ ghép đôi người này"
            visible={isModalVisible1}
            onOk={handleOk}
            onCancel={handleCancel1}
            width={700}
        >
            {data.map((notification) => (
                <div key={notification.id} className="fle">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={notification.images} style={{ margin: "10px" }} size={60}></Avatar>
                        <h4>{notification.fullname}</h4>
                    </div>
                    <Button style={{background:"red",color:"white"}} onClick={()=>fetchData1({ id: notification.id })}> Huỷ</Button>
                </div>
            ))}

        </Modal>
        </div>
    );
};

export default Informa;
