import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaStar } from "react-icons/fa";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import { HiBadgeCheck } from "react-icons/hi";
import { GiBodyHeight } from "react-icons/gi";
import { FaCircleDown } from "react-icons/fa6";
import { TiHomeOutline } from "react-icons/ti";
import { Divider } from "antd";
import { useParams, useNavigate } from 'react-router-dom';
import { CgClose } from "react-icons/cg";

const ListProfile = () => {
    const { id } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`http://localhost:8080/public/profile/getId?id=${id}`)
            .then(response => {
                const { result } = response.data;
                setProfile(result);
                const userImages = result.images.split(',');
                setImages(userImages);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleNextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
    };

    const handlePrevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
    };

    const handleSuperLike = async () => {
        try {
            const response = await axios.post("http://localhost:8080/public/follower/like", {
                u_id1: userId,
                u_id2: id,
                status: "Like"
            });
            setTimeout(() => {
                navigate("/Recs")
            }, 900);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSkip = async () => {
        try {
            const response = await axios.post("http://localhost:8080/public/follower/like", {
                u_id1: userId,
                u_id2: id,
                status: "Canceled"
            });
            
            setTimeout(() => {
                navigate("/Recs")
            }, 900);
        } catch (error) {
            console.error(error);
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "100%" }} className="fl">
            <div className="ProfileImage" style={{ marginTop: "4.1%", borderRadius: "7px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", width: 385, }}>
                <div className="scrollprofle">
                    <div>
                        <img
                            src={images[currentIndex]}
                            alt={images[currentIndex]}
                            style={{
                                width: 385,
                                height: 450,
                                borderTopLeftRadius: "7px",
                                borderTopRightRadius: "7px",
                                objectFit: "cover",
                            }}
                        />

                        <div style={{ position: "relative", margin: "1px 0", top: "-450px" }}>
                            <div className="fl">
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "96%",
                                    height: "5px",
                                    backgroundColor: "rgb(0 , 0 , 0, 0.5)",
                                    borderRadius: "50px",
                                }}>
                                    {images.map((image, index) => (
                                        <span key={index} style={{
                                            width: `${100 / images.length}%`,
                                            height: "100%",
                                            backgroundColor: currentIndex === index ? "white" : "transparent",
                                            borderRadius: "5px",
                                        }}></span>
                                    ))}
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", position: "relative", top: "-10px" }}>
                                    <button onClick={handlePrevImage} className="backGroundimage"><PiCaretLeftBold className="next" /></button>
                                    <button onClick={handleNextImage} className="backGroundimage"><PiCaretRightBold className="next2" /></button>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: "-450px" }}>
                            <div className="fle mar">
                                <div className="fl Setting">
                                    <h1 className="fle mar">{profile.fullname}
                                        <h5 className="fle" style={{ margin: "0 0 0 10px" }}>{profile.age}<HiBadgeCheck fontSize={27} color="blue" /></h5>
                                    </h1>

                                    <div className="fle" style={{ width: "100%", marginTop: "10px" }}>
                                        <div>
                                            <div className="fle Setting">
                                                <TiHomeOutline className="mar" />
                                                <p style={{ margin: "0 0 0 4px" }}>
                                                    Đang ở {profile.location || "Không xác định"}
                                                </p>
                                            </div>

                                            {profile.height &&
                                                <div className=" Setting">
                                                    <p style={{ margin: "5px 0 0 0", display: "flex" }}>
                                                        <GiBodyHeight style={{ margin: "3px 3px 0 0" }} />
                                                        {profile.height}
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div style={{ width: "45px", height: "45px", position: "relative", top: "-50px", right: "5px" }}>
                                    <FaCircleDown
                                        color="#ff4459"
                                        fontSize={35}
                                        className="zoom1"
                                        style={{ background: "white", borderRadius: "30px", transition: "transform 0.3s" }}
                                        onClick={() => navigate("/Recs")}
                                    />
                                </div>
                            </div>
                            <Divider />
                            <div className="Setting fle">
                                <div className="fle" style={{ padding: "10px", borderRadius: "7px", marginLeft: "10px", background: "rgb(140, 230, 230)" }}>
                                    <FaHeart fontSize={45} style={{ color: "red" }} />
                                    <div className="Setting">
                                        <p className="mar">Đang Tìm Kiếm</p>
                                        <h4 className="mar">{profile.relationship_goals}</h4>
                                    </div>
                                </div>
                            </div>

                            {profile.about_me &&
                                <div>
                                    <h3 className="Setting">Thông Tin Về Tôi</h3>
                                    <div className="aboutMeContainer">
                                        {profile.about_me.split(',').map((aboutme, index) => (
                                            <div className="interestItem" key={index}>
                                                <p>{aboutme}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            <Divider className="mar" />
                            <div>
                                <h3 className="Setting">Sở Thích</h3>
                                <div className="aboutMeContainer">
                                    {profile.interests.split(',').map((interest, index) => (
                                        <div className="interestItem" key={index}>
                                            <p>{interest}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Divider className="mar" />
                            <div style={{ textAlign: "center", color: "gray" }}>
                                <h3 className="hov5">Chặn {profile.fullname}</h3>
                                <p className="mar" style={{ color: 'gray' }}>Yên tâm {profile.fullname} sẽ không tìm thấy bạn</p>
                            </div>
                            <Divider />
                            <div style={{ textAlign: "center", color: "gray" }}>
                                <h3 className="hov5">Báo cáo {profile.fullname}</h3>
                                <p className="mar" style={{ color: 'gray' }}>Yên tâm {profile.fullname} sẽ không biết là bạn</p>
                            </div>
                            <Divider />
                            <div style={{ height: "90px" }}></div>
                            <div className="fl" style={{
                                display: "flex",
                                justifyContent: "center",
                                position: "absolute",
                                bottom: "0px",
                                width: "100%",
                                background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.22) 25%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.55) 90%, rgba(0,0,0,0.7) 100%)"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "60%", padding: "10px" }}>
                                    <button className="Like6 zoom" onClick={handleSkip}>
                                        <CgClose />
                                    </button>
                                    <button className={`Like8 zoom`} onClick={handleSuperLike}>
                                        <FaStar />
                                    </button>
                                    <button className="Like7 zoom" onClick={handleSuperLike}>
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProfile;
