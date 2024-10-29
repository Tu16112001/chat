import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEnvironment } from "react-icons/ai";
import { FaRedo, FaHeart } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import { HiBadgeCheck } from "react-icons/hi";
import { GiBodyHeight } from "react-icons/gi";
import { FaCircleDown } from "react-icons/fa6";
import { TiHomeOutline } from "react-icons/ti";
import { Divider,Spin } from "antd";
const SeachMan = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSuperLiked, setIsSuperLiked] = useState(false);
    const [isCanceled, setCanceled] = useState(false);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // Gọi API để lấy thông tin các đối tượng
        axios
            .get(`http://localhost:8080/public/explore?userId=${userId}&offset=0`)
            .then((response) => {
                // Lưu trữ thông tin các đối tượng vào state
                setProfiles(response.data.result);
                // Thiết lập ID hiện tại mặc định là ID đầu tiên trong danh sách
                setCurrentId(response.data.result[0].id);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    });

    const getFirstImage = (images) => {
        // Phân tách chuỗi thành một mảng các URL ảnh
        const imageArray = images.split(", ");
        // Trích xuất URL của ảnh đầu tiên từ mảng
        const firstImage = imageArray[0];
        // Trả về URL ảnh đầu tiên (hoặc null nếu không có ảnh)
        return firstImage ? firstImage.trim() : null;
    };
    const handleSkip = async () => {
        setShowNotification(false);
        try {
            const likedUserId = profiles[currentIndex].id;
           await axios.post("http://localhost:8080/public/follower/like", {
                u_id1: userId,
                u_id2: likedUserId,
                status: "Canceled"
            });
            setTimeout(() => {
                setCanceled(false);
                const nextIndex = (currentIndex + 1) % profiles.length;
                setCurrentIndex(nextIndex);
                setCurrentId(profiles[nextIndex].id);
            }, 900);
            setCanceled(true);
        } catch (error) {
            console.log()
            console.error(error); // Log the error for debugging purposes
        }

    };

    const handleSuperLike = async () => {
        setShowNotification(false);
        try {
            const likedUserId = profiles[currentIndex].id;
             await axios.post("http://localhost:8080/public/follower/like", {
                u_id1: userId,
                u_id2: likedUserId,
                status: "Like"
            });


            // If the response is successful, update state and schedule the "super like" effect to turn off
            setTimeout(() => {
                setIsSuperLiked(false);
                const nextIndex = (currentIndex + 1) % profiles.length;
                setCurrentIndex(nextIndex);
                setCurrentId(profiles[nextIndex].id);
            }, 900);
            setIsSuperLiked(true); // Enable the "super like" effect
        } catch (error) {
            console.log()
            console.error(error); // Log the error for debugging purposes
        }

    };


    const handleReload = () => {
        window.location.reload();
    };
    const [showNotification, setShowNotification] = useState(false); // Initially show Notification

    const toggleNotification = (id) => {
        setShowNotification(!showNotification);
        setCurrentId(id);
    };

    const targetProfile = profiles.find(profile => profile.id === currentId);



    const SeachManLike = () => {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
        const [images, setImages] = useState([]);
        useEffect(() => {
            // Fetch user data from the API
            axios.get(`http://localhost:8080/public/profile/getId?id=${currentId}`)
                .then(response => {
                    // Extract images from the API response
                    const { result } = response.data;
                    const userImages = result.images.split(',');
                    setImages(userImages);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }, [currentId]); // Update useEffect dependency

        const handleNextImage = () => {
            const nextIndex = (currentImageIndex + 1) % images.length;
            setCurrentImageIndex(nextIndex);
        };

        const handlePrevImage = () => {
            const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
            setCurrentImageIndex(prevIndex);
        };

        if (targetProfile) {
            return (
                <div className="Profile" style={{height: 450,}}>
                    <div className={`ProfileImage `} 
                    style={{ marginTop: "5.5%", borderRadius: "7px", width: 385,
                        
                     boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="scrollprofle">
                            <div>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={targetProfile.fullname}
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
                                                    backgroundColor: currentImageIndex === index ? "white" : "transparent",
                                                    borderRadius: "5px",
                                                }}></span>
                                            ))}
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", position: "relative", top: "-10px" }}>
                                            <button onClick={handlePrevImage} className="backGroundimage"> <PiCaretLeftBold className="next" /></button>
                                            <button onClick={handleNextImage} className="backGroundimage"> < PiCaretRightBold className="next2" /></button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: "-450px" }}>
                                    <div className="fle mar">
                                        <div className="fl Setting">
                                            <h1 className="fle mar" > {targetProfile.fullname}
                                                <h5 className="fle" style={{ margin: "0 0 0 10px" }}>{targetProfile.age}<HiBadgeCheck fontSize={27}
                                                    color="blue" /></h5>
                                            </h1>

                                            <div className="fle" style={{ width: "100%", marginTop: "10px" }}>
                                                <div>
                                                    <div className="fle Setting">
                                                        <TiHomeOutline
                                                            className="mar"
                                                        />
                                                        <p style={{ margin: "0 0 0 4px" }}>
                                                            Đang ở {targetProfile.location}
                                                        </p>
                                                    </div>

                                                    {targetProfile.height &&
                                                        <div className=" Setting">

                                                            <p style={{ margin: "5px 0 0 0", display: "flex" }}>
                                                                <GiBodyHeight
                                                                    style={{ margin: "3px 3px 0 0" }}
                                                                />
                                                                {targetProfile.height}
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
                                                onClick={() => setShowNotification(false)}
                                            />
                                        </div>

                                    </div>
                                    <Divider />
                                    <div className="Setting fle">
                                        <div className="fle"
                                            style={{
                                                padding: "10px", borderRadius: "7px"
                                                , marginLeft: "10px", background: "rgb(140, 230, 230)"
                                            }}>
                                            <FaHeart fontSize={45} style={{ color: "red" }} />
                                            {targetProfile &&
                                                <div className="Setting">
                                                    <p className="mar">Đang Tìm Kiếm</p>
                                                    <h4 className="mar">{targetProfile.relationship_goals}</h4>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                   {targetProfile.about_me &&
                                     <div >
                                     <h3 className="Setting">Thông Tin Về Tôi</h3>
                                     <div className="aboutMeContainer">
                                         {targetProfile.about_me.split(',').map((aboutme, index) => (
                                             <div className="interestItem" key={index}>
                                                 <p>{aboutme}</p>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                                   }
                                    <Divider className="mar"/>
                                    <div>
                                        <h3 className="Setting">Sở Thích</h3>
                                        <div className="aboutMeContainer">
                                            {targetProfile.interests.split(',').map((aboutme, index) => (
                                                <div className="interestItem" key={index}>
                                                    <p>{aboutme}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Divider className="mar"/>
                                    <div  style={{textAlign:"center",color:"gray"}}>
                                        <h3 className="hov5">Chặn {targetProfile.fullname}</h3>
                                        <p className="mar" style={{color:'gray'}}>Yên tâm  {targetProfile.fullname} sẽ không tìm thấy bạn</p>
                                    </div>
                                    <Divider/>
                                    <div  style={{textAlign:"center",color:"gray"}}>
                                        <h3 className="hov5">Báo cáo {targetProfile.fullname}</h3>
                                        <p className="mar" style={{color:'gray'}}>Yên tâm  {targetProfile.fullname} sẽ không biết là bạn</p>
                                    </div>
                                    <Divider />
                                    <div style={{height:"90px"}}></div>
                                    <div className="fl"  style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            position: "absolute",
                                            bottom: "0px",
                                            width: "100%",
                                            background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.22) 25%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.55) 90%, rgba(0,0,0,0.7) 100%)"
                                        }}> 
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",width:"60%",padding:"10px"}}>
                                        <button className="Like6 zoom" onClick={handleSkip }>
                                            <CgClose />
                                        </button>
                                        <button
                                            className={`Like8 zoom `}
                                            onClick={handleSuperLike}>
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
        } else {
            // Xử lý trường hợp không tìm thấy profile có id = 6
            return <div>Profile không tồn tại</div>;
        }
    };


    return (

        <div className="Profile" >
            {!showNotification &&
                <div className={`ProfileImage ${isSuperLiked ? "flyLeft" : ""} ${isCanceled ? "shrink-and-fly-right" : ""}`}
                    style={{ marginTop: "5.9%", borderRadius: "7px",background:"white"
                    , boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",width:385,height:630 }}>
                    {profiles.length > 0 ?(
                       <div >

                       {profiles.map((profile, index) => (
                           <div
                               key={profile.id}
                               style={{
                                   display: currentId === profile.id ? "block" : "none",
                                   position: "relative"
                               }}
                               className="ProfileImageWrapper"
                           >
                               {isSuperLiked && (
                                   <div className="Slow">
                                       <p style={{
                                           border: "2px solid red", padding: "10px", color: "red"
                                           , fontSize: "20px", fontWeight: "900", borderRadius: "5px", background: "rgb(0,0,0,0.5"
                                       }}>Đã Thích</p>
                                   </div>
                               )}
                               {isCanceled && (
                                   <div className="Slow">
                                       <p style={{
                                           border: "2px solid red", padding: "10px", color: "red"
                                           , fontSize: "20px", fontWeight: "900", borderRadius: "5px", background: "rgb(0,0,0,0.5"
                                       }}>Bỏ Qua</p>
                                   </div>
                               )}

                               <img
                                   src={getFirstImage(profile.images)}
                                   alt={profile.fullname}
                                   style={{
                                       width: 385,
                                       height: 630,
                                       borderRadius: "7px",
                                       objectFit: "cover"
                                   }}

                               />
                               
                               <div
                                   className={`ProfileImage ${isSuperLiked ? "fly-up" : ""} ${isCanceled ? "fly-up" : ""}`}
                                   style={{
                                       position: "absolute",
                                       top: isSuperLiked || isCanceled ? "-50%" : "49.9%", // Điều chỉnh top tùy thuộc vào isSuperLiked
                                       left: "50%",
                                       transform: "translate(-50%, -50%)",
                                       textAlign: "center",
                                       color: "white",
                                       background:
                                           "linear-gradient(rgba(0, 0, 0, 0.001), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6))",
                                       borderRadius: "7px",
                                       width: 385,
                                       height: 630,
                                       transition: "top 0.5s ease" // Sử dụng transition để tạo hiệu ứng mềm mại
                                   }}
                               >

                                   <div style={{ position: "absolute", top: "60%", left: "20px" }}>
                                       <h2 className="fle" style={{ margin: "0" }}>
                                           <h2 style={{ margin: "0", fontSize: "20px" }}><h2>{profile.fullname}
                                           </h2>
                                           </h2>
                                           <h2 className="fle" style={{ margin: "0 0 0 10px", fontSize: "20px" }}>{profile.age}
                                               <HiBadgeCheck fontSize={25} color="blue" /></h2>

                                       </h2>
                                      
                                       <p
                                           className="fle"
                                           style={{
                                               width: "125px",
                                               position: "relative",
                                               top: "-20px",
                                               margin: "0",
                                               left: "5px"
                                           }}
                                       >
                                           <AiFillEnvironment
                                               style={{ color: "white", margin: "0" }}
                                           />
                                           <p style={{ color: "white", margin: "0" }}>
                                               Đang ở {profile.location}
                                           </p>
                                       </p>
                                       {profile.height &&
                                           <p
                                               className="fle"
                                               style={{
                                                   width: "148px",
                                                   position: "relative",
                                                   top: "-18px",
                                                   margin: "0",
                                                   left: "5px"
                                               }}
                                           >
                                               <GiBodyHeight
                                                   style={{ color: "white", margin: "0" }}
                                               />
                                               <p style={{ color: "white", margin: "0" }}>
                                                   Chiều cao : {profile.height}
                                               </p>
                                           </p>
                                       }
                                   </div>
                                   <FaInfoCircle color="white" fontSize={20} className="zoom1"
                                           style={{ position: "absolute", right: "20px", top: "66%" }}
                                           onClick={() => toggleNotification(profile.id)} />
                                   <div
                                       style={{
                                           display: "flex",
                                           justifyContent: "space-evenly",
                                           position: "absolute",
                                           bottom: "10px",
                                           width: "100%"
                                       }}
                                   >
                                       <button className="Like zoom" onClick={handleReload}>
                                           <FaRedo />
                                       </button>
                                       <button className="Like5 zoom" onClick={handleSkip}>
                                           <CgClose />
                                       </button>
                                       <button
                                           className={`Like2 zoom `}
                                           onClick={handleSuperLike}>
                                           <FaStar />
                                       </button>
                                       <button className="Like3 zoom" onClick={handleSuperLike}>
                                           <FaHeart />
                                       </button>
                                       {/* <button className={`Like4 zoom`}
                                           onClick={handleBoost}>
                                           <BsLightningChargeFill />
                                       </button> */}
                                   </div>
                               </div>
                           </div>
                       ))}
                   </div>
                    ):(
                        <div className="fl" style={{width:385,background:"white"}}>
                             <Spin style={{fontSize:"40vh"}} size="large"/>
                      </div>
                    )}
                   
                </div>
            }
            {showNotification &&
                <SeachManLike />
            }
        </div>
    );
};

export default SeachMan;
