import React, { useState, useEffect } from "react";
import axios from "axios";
import ListImage from "../ListImage/ListImage";
import { TiHomeOutline, TiEdit } from "react-icons/ti";
import { Divider, Spin } from "antd";
import { HiBadgeCheck } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
const Setting = () => {

    const [isLocationUpdated, setIsLocationUpdated] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDataAndUpdateLocation = async () => {
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const { latitude, longitude } = position.coords;
                    await axios.post('http://localhost:8080/public/profile/update/user', {
                        id: userId,
                        latitude,
                        longitude
                    });
                    // notification.success({
                    //     message: "Cập nhật toạ độ thành công",
                    //     description: "Toạ độ của bạn đã được cập nhật thành công.",
                    //     placement: "topRight"
                    // });
                    setIsLocationUpdated(true);
                } else {
                    console.log("Người dùng đã từ chối quyền thông báo");
                }
            } catch (error) {
                //console.error('Error updating location:', error);
                // notification.error({
                //     message: "Lỗi khi cập nhật toạ độ",
                //     description: "Có lỗi xảy ra khi cập nhật toạ độ của bạn.",
                //     placement: "bottomRight"
                // });
            }
        };

        fetchDataAndUpdateLocation();
    }, [userId, setIsLocationUpdated]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                setProfileData(profileResponse.data);
                localStorage.setItem("IdProfile", profileResponse.data.result.idProfile);
            } catch (error) {
                console.error("Error fetching profile data: ", error);
                // Handle error gracefully
            }
        };

        if (isLocationUpdated && !profileData) {
            fetchData();
        }
    }, [isLocationUpdated,profileData,userId]);

    const handleEditClick = () => {
        navigate("/Profile/Edit")
    };

    const limitStringLength = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength) + '' : str;
    };

    

    return (
        <div className="Profile">
            {profileData ? (
                <div style={{ marginTop: "5%" }}>
                    <div className="set">
                        <div>
                            <ListImage />
                        </div>
                        <div className="width">
                            <div style={{ background: "white", marginTop: "-468px", padding: "10px 5px 20px 0" }}>
                                <div style={{ display: "flex" }}>
                                    <h1 className="text Setting">{limitStringLength(profileData.result.fullname, 17)}</h1>
                                    <h1 style={{ fontSize: "25px" }} className="text Setting">
                                        {profileData.result.age}<HiBadgeCheck fontSize={25} color="blue" /></h1>
                                </div>
                                <p className="text Setting"><TiHomeOutline /> Sống tại Hà Nội</p>
                            </div>
                            <Divider className="mar" />
                            {profileData.result.bio &&
                            <div className="fle" style={{ background: "white",width:375 }}>
                                <p className="Setting">{profileData.result.bio}</p>

                            </div>}
                            <div style={{ background: "white", height: "60px", display: 'flex', alignItems: "center", justifyContent: "flex-start" }}>
                                        {profileData && profileData.result.passions.split(',').map((purpose, index) => {
                                            let purposeText;
                                            switch (purpose.trim()) {
                                                case "1":
                                                    purposeText = "Tìm Kiếm Người Yêu";
                                                    break;
                                                case "2":
                                                    purposeText = "Tìm Kiếm Mối Quan Hệ không Ràng Buộc";
                                                    break;
                                                case "3":
                                                    purposeText = "Tìm Người Trò Chuyện";
                                                    break;
                                                case "4":
                                                    purposeText = "Tìm Người Cùng Sở Thích";
                                                    break;
                                                case "5":
                                                    purposeText = "Muốn Tâm Sự Riêng Tư";
                                                    break;
                                                default:
                                                    purposeText = "Unknown Purpose";
                                            }
                                            return (
                                                <div className="fle" style={{
                                                    padding: "5px", borderRadius: "7px"
                                                    , marginLeft: "10px", background: "rgb(140, 230, 230)"}}>
                                                <FaHeart fontSize={30} style={{ color: "red" }} />
                                                    <button  style={{
                                                   border:"none",
                                                   background: "rgb(140, 230, 230)"
                                                }} key={index}>{purposeText}</button>
                                                </div>
                                            );
                                        })}
                                    </div>
                            <Divider className="mar" />
                            <h4 className="Setting" style={{ margin: "20px 0 5px 10px" }}>Email</h4>
                            <div className="fle" style={{ width: "100%", height: "50px", background: "white" }}>
                                <p className="Setting">{profileData.result.email}</p>
                            </div>
                            <h4 className="Setting" style={{ margin: "25px 0 5px 10px" }}>Giới Tính</h4>
                            <div className="fle  " style={{ width: "100%", height: "50px", background: "white" }}>
                                <p className="Setting"> {profileData.result.gender === "Men" ? "Nam" : profileData.result.gender === "Women" ? "Nữ" : ""}</p>
                            </div>
                            {profileData.result.phone_number && (
                                <>
                                    <h4 style={{ margin: "25px 0 5px 10px" }}>Số Điên Thoại</h4>
                                    <div className="fle" style={{ background: "white", height: "50px" }}>
                                        <p className="Setting"> {profileData.result.phone_number}</p>
                                    </div>
                                </>
                            )}

                            {profileData.result.interests && (
                                <>
                                    <Divider className="mar" />
                                    <h4 style={{ margin: "25px 0 5px 10px" }}>Sở thích</h4>
                                    <div className="print-profile">
                                        {profileData && profileData.result.interests.split(',').map((interest, index) => (
                                            <button style={{ marginLeft: "7px", border: "1px solid gray",background:"white",padding:"6px"
                                            , borderRadius: "20px" }} key={index}>{interest.trim()}</button>
                                        ))}
                                    </div>
                                </>
                            )}
                            {profileData.result.passions && (
                                <>
                                    <h4 style={{ margin: "25px 0 5px 10px" }}>Mục Đích Tìm Kiếm</h4>
                                    <div className="print-profile">
                                        {profileData && profileData.result.passions.split(',').map((purpose, index) => {
                                            let purposeText;
                                            switch (purpose.trim()) {
                                                case "1":
                                                    purposeText = "Tìm Kiếm Người Yêu";
                                                    break;
                                                case "2":
                                                    purposeText = "Tìm Kiếm Mối Quan Hệ không Ràng Buộc";
                                                    break;
                                                case "3":
                                                    purposeText = "Tìm Người Trò Chuyện";
                                                    break;
                                                case "4":
                                                    purposeText = "Tìm Người Cùng Sở Thích";
                                                    break;
                                                case "5":
                                                    purposeText = "Muốn Tâm Sự Riêng Tư";
                                                    break;
                                                default:
                                                    purposeText = "Unknown Purpose";
                                            }
                                            return (
                                                <button style={{ marginLeft: "7px", borderRadius: "20px",
                                                 border: "1px solid gray",background:"white",padding:"6px"}} key={index}>{purposeText}</button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {profileData.result.favorite_song && (
                                <>
                                    <Divider />
                                    <h4 className="Setting">Bài hát tôi yêu thích</h4>
                                    <div className="Setting" style={{ width: "93%", height: "70px", background: "aqua", borderRadius: "10px" }}>
                                        {profileData.result.favorite_song}
                                    </div>
                                </>
                            )}
                            <div style={{ height: "50px" }}></div>
                        </div>


                    </div>
                   
                       
                        <div className="float-but-edit" >
                           <div className="fl">
                           <button className="but edit-profile"  onClick={handleEditClick}><TiEdit fontSize={23} />
                                Chỉnh sửa</button>
                           </div>
                        </div>
                       
                </div>
            ) : (
                
               
                  <div className="fl" style={{width:"100%",height:"100vh"}}>
                    <div className="set" style={{width:385}}>
                    <Spin style={{fontSize:"40vh"}} size="large"/>
                    </div>
                   
                  </div>
                
             
            )}

        </div>
    )
}
export default Setting