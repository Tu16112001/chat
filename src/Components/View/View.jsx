import React, { useState, useEffect } from "react";
import axios from 'axios';
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import { TiHomeOutline, TiEdit } from "react-icons/ti";
import { BiCheckCircle } from "react-icons/bi";

const View = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const userId = localStorage.getItem("userId");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profile data
                const profileResponse = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                setProfileData(profileResponse.data);

                // Fetch images
                const imageResponse = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                const { result } = imageResponse.data;
                const userImages = result.images.split(',');
                setImages(userImages);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [userId]);

    const handleNextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
    };

    const handlePrevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
    };

    const limitStringLength = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength) + '' : str;
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="fl">
            <div>
                <img src={images[currentIndex]} alt="" width={375} height={468.75} style={{ marginTop:"-15px", objectFit: "cover" }} />
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", position: "relative", bottom: "260px" }}>
                    <PiCaretLeftBold className="next" onClick={handlePrevImage} />
                    <PiCaretRightBold className="next" onClick={handleNextImage} />
                </div>
            </div>
            {profileData && (
                <div style={{ background: "white", marginTop: "-30px", padding: "10px 5px 20px 30px",width:"100%" }}>
                    <div style={{ display: "flex" }}>
                        <h1 className="text Setting">{limitStringLength(profileData.result.fullname, 17)}</h1>
                        <h2 style={{ fontSize: "21px", marginTop: "2px" }} className="text Setting">
                            {profileData.result.age}<BiCheckCircle fontSize={15} style={{ marginTop: "3px" }} /></h2>
                    </div>
                    <p className="text Setting"><TiHomeOutline /> Sống tại Hà Nội</p>
                </div>
            )}
       
                                <div style={{width:"100%"}}>
                                    <h4 style={{ margin: "25px 0 5px 10px" }}>Sở thích</h4>
                                    <div style={{ background: "white", height: "50px", display: 'flex', alignItems: "center", justifyContent: "flex-start" }}>
                                        {profileData && profileData.result.interests.split(',').map((interest, index) => (
                                            <button style={{ marginLeft: "7px", border: "1px solid gray",background:"white",padding:"6px"
                                            , borderRadius: "20px" }} key={index}>{interest.trim()}</button>
                                        ))}
                                    </div>
                                </div>
                           
        </div>
    );
};

export default View;
