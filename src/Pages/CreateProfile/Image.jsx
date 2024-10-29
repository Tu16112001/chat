import React, { useState, useEffect } from "react";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const Image = () => {
    const [imageList, setImageList] = useState(Array.from({ length: 9 }, () => null));

    const userId = localStorage.getItem("userId");

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
                // Đọc và hiển thị ảnh
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
                reader.readAsDataURL(file); // Đọc file như một URL dữ liệu
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


    return (
        <div style={{ width: "400px", height: "64vh", marginLeft: "5%" }}>
            <div>
                <label htmlFor="">Hồ Sơ Ảnh</label>
                <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
                    {imageList.map((image, index) => (
                        <div key={index} style={{ position: "relative", marginRight: "18px", marginBottom: "19px", width: "96px", height: "114px" }}>
                            {image ? (
                                <>
                                    <img src={image} alt={`Image ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    <button onClick={() => handleImageRemove(image)} style={{ position: "absolute", top: "0", right: "-3px", backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
                                        <CloseOutlined style={{ fontSize: "16px", color: "#fff" }} />
                                    </button>
                                </>
                            ) : (
                                <div style={{ width: "100%", height: "100%", border: "3px dashed #d9d9d9", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <label htmlFor={`upload-button-${index}`} style={{ cursor: "pointer" }}>
                                        <input
                                            id={`upload-button-${index}`}
                                            type="file"
                                            onChange={(e) => handleFileChange(e, index)}
                                            style={{ display: "none" }}
                                        />
                                        <PlusOutlined style={{ fontSize: "24px", color: "#d9d9d9" }} />
                                    </label>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p>
                    Tải lên 2 bức ảnh để bắt đầu. Thêm 4 bức ảnh hoặc nhiều hơn nữa để hồ sơ của bạn thật nổi bật.
                </p>
            </div>
        </div>
    );
};

export default Image;
