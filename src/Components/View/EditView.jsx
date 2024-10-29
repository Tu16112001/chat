import React, { useState, useEffect } from "react";
import { Form, Switch, Input, Divider } from 'antd';
import { GrNext } from "react-icons/gr";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditView = () => {
    const [imageList, setImageList] = useState(Array(9).fill(null));
    const userId = localStorage.getItem("userId");
    const [isChecked, setIsChecked] = useState(false);
    const [profiles, setProfiles] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                const images = response.data.result.images;

                const updatedImageList = Array(9).fill(null);
                if (images) {
                    const imageUrls = images.split(', ');
                    for (let i = 0; i < Math.min(9, imageUrls.length); i++) {
                        updatedImageList[i] = imageUrls[i];
                    }
                }
                setImageList(updatedImageList);
            } catch (error) {
                console.error('Error fetching image list:', error);
            }
        };

        fetchImages();
    }, [userId]);

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`http://localhost:8080/public/profile/update/images/web?userId=${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.result) {
                const reader = new FileReader();
                reader.onload = () => {
                    const imageUrl = reader.result;
                    setImageList(prevList => {
                        const newList = [...prevList];
                        const nullIndex = newList.findIndex(image => image === null);
                        if (nullIndex !== -1) {
                            newList[nullIndex] = imageUrl;
                        }
                        return newList;
                    });
                };
                reader.readAsDataURL(file);
            } else {
                console.error('Error: No image URL returned from server');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleImageRemove = async (imageUrl) => {
        try {
            const data = {
                idUser: userId,
                url: imageUrl
            };

            await axios.post('http://localhost:8080/public/profile/delete/image/web', data);
            setImageList(prevList => prevList.map(image => image === imageUrl ? null : image));
        } catch (error) {
            console.error('Error removing image:', error);
        }
    };

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                setProfiles(response.data.result);
                setBio(response.data.result.bio); // Set bio state
            } catch (error) {
                console.error('Lỗi khi lấy userId', error);
            }
        };
        fetchUserId();
    }, [userId]);

    const [bio, setBio] = useState(""); // State cho bio

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleEditProfile = async () => {
        try {
            await axios.post('http://localhost:8080/public/profile/update', {
                id: profiles.idProfile, // Update with correct profile ID
                bio: bio,
            });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleEditButtonClick = () => {
        handleEditProfile();
        navigate("/Profile");
    };

    return (
        <>
        <div className="fl" style={{background:"white"}}>
            <div>
                <div style={{ width: 375, height: 468.75}}>
                    <Form.Item>
                        <div style={{ width: 375, marginLeft: "22px" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-container-i">
                                        {image ? (
                                            <>
                                                <img src={image} alt={`Image ${index + 1}`} className="image-i"  />
                                                <button onClick={() => handleImageRemove(image)} className="remove-button-i">
                                                    <CloseOutlined className="close-icon-i" />
                                                </button>
                                            </>
                                        ) : (
                                            <div style={{ width: "100%", height: "100%", border: "3px dashed #d9d9d9", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <label htmlFor={`upload-button-${index}`} style={{ cursor: "pointer" }}>
                                                    <input
                                                        id={`upload-button-${index}`}
                                                        type="file"
                                                        onChange={(e) => handleFileChange(e)}
                                                        style={{ display: "none" }}
                                                    />
                                                    <PlusOutlined style={{ fontSize: "24px", color: "#d9d9d9" }} />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div>
                                    <p style={{ fontSize: "12px" }}>
                                        Tải lên 2 bức ảnh để bắt đầu. Thêm 4 bức <br />ảnh hoặc nhiều hơn nữa để hồ sơ của bạn thật nổi bật.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Form.Item>
                </div>
                <div className="fl" style={{ marginTop: "20px" }}>
                      <div className="bg-ddit">
                        <label className="Setting">Giới Thiệu</label>
                        <Input.TextArea
                            maxLength={500}
                            style={{ height: 70, border: "none", marginTop: "6px" }}
                            value={bio}
                            onChange={handleBioChange}
                        />
                    </div>
                   <div style={{padding:"10px",background:"#f2f2f2"}}>
                   <p style={{fontSize: "13px" }}>Không nên đưa tên người dùng trên các mạng xã hội hoặc thông tin liên lạc khác vào hồ sơ của bạn.</p>
                   </div>
                    <div className="bg-ddit">
                        <label className="Setting">Sở Thích</label>
                        <div style={{ width: "100%", marginTop: "6px", maxWidth: 375 }} className="fle boder">
                            {profiles.interests && (
                                <div style={{ background: "white", padding: "10px", display: 'flex', alignItems: "center", justifyContent: "flex-start", flexWrap: "wrap" }}>
                                    {profiles.interests.split(',').map((interest, index) => (
                                        <button style={{ marginLeft: "7px", border: "1px solid gray", background: "white", padding: "6px", borderRadius: "20px", marginBottom: "6px" }} key={index}>{interest.trim()}</button>
                                    ))}
                                </div>
                            )}
                            <GrNext className="ic" onClick={() => { navigate("/Profile/Edit/Editinterests") }} />
                        </div>
                    </div>
                    <div className="bg-ddit">
                        <label className="Setting">Thêm Chiều Cao</label>
                        <div style={{ width: "100%", marginTop: "6px" }} className="boder">
                            <div className="fle">
                            {profiles.height ? (
    <p className="Setting">{profiles.height}</p>
) : (
    <p className="Setting">Chiều cao không có sẵn</p>
)}

                                <GrNext className="ic" onClick={() => { navigate("/Profile/Edit/EditHeight") }} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-ddit">
                        <label className="Setting">Thông Tin Thêm Về Tôi</label>
                        <div style={{ width: "100%", marginTop: "6px" }} className="fle boder">
                            <p className="Setting">Cung Hoàng Đạo</p>
                            <GrNext className="ic" onClick={()=>{navigate("/Profile/Edit/EditAboutMe")}}/>
                        </div>
                        <div style={{ width: "100%" }} className="fle boder">
                            <p className="Setting">Giáo Dục</p>
                            <GrNext className="ic" onClick={()=>{navigate("/Profile/Edit/EditAboutMe")}}/>
                        </div>
                        <div style={{ width: "100%" }} className="fle boder">
                            <p className="Setting">Gia Đình Tương Lai</p>
                            <GrNext className="ic" onClick={()=>{navigate("/Profile/Edit/EditAboutMe")}}/>
                        </div>
                        <div style={{ width: "100%" }} className="fle boder">
                            <p className="Setting">Phong Cách Giao Tiếp</p>
                            <GrNext className="ic" onClick={()=>{navigate("/Profile/Edit/EditAboutMe")}}/>
                        </div>
                        <div style={{ width: "100%" }} className="fle boder">
                            <p className="Setting">Ngôn Ngữ Yêu Thích</p>
                            <GrNext className="ic" onClick={()=>{navigate("/Profile/Edit/EditAboutMe")}}/>
                        </div>
                    </div>
                    <div className="bg-ddit">
                        <label className="Setting">Mục Đích Tìm Kiếm</label>
                        <div style={{ width: "100%", marginTop: "6px", maxWidth: 375,padding:"15px" }} className="fle boder">
                        {(profiles.passions ? profiles.passions.split(',') : []).map((purpose, index) => {
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
                            <GrNext className="ic" onClick={() => { navigate("/Profile/Edit/EditPasions") }} />
                        </div>
                    </div>
                    <div style={{ width: "100%", paddingTop: "25px",background:"#f2f2f2" }}>
                        <label className="Setting">Giới Tính</label>
                        <div style={{ width: "100%", marginTop: "6px" }} className="fle boder">
                        <p className="Setting">
                                {profiles.gender === "Men" ? "Nam" : profiles.gender === "Women" ? "Nữ" : profiles.gender === "Other" ? "Khác" : ""}
                            </p>
                            <GrNext className="ic" onClick={() => { navigate("/Profile/Edit/EditGender") }} />
                        </div>
                    </div>
                    <div className="bg-ddit">
                        <label className="Setting">Khuynh Hướng Tính Dục</label>
                        <div style={{ width: "100%", marginTop: "6px" }} className="fle boder">
                        <p className="Setting">{profiles.relationship_goals === "Men" ? "Nam" : profiles.relationship_goals === "Women" ? "Nữ" :  profiles.relationship_goals === null || "EveryOne"? "Toàn Tính":""}</p>
                            <GrNext className="ic" onClick={()=>{navigate("/Profile/Edit/Editrelationship")}} />
                        </div>
                    </div>
                    <div style={{ height: "80px" }}></div>
                </div>
                
            </div>
            
        </div>
        <div className="fl floatbutsave" >
           <button className="but save" style={{marginTop:"10px"}} onClick={handleEditButtonClick}>
               Lưu
           </button>
       </div>
       </>
    );
};

export default EditView;
