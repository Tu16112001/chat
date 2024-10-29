import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Flex } from 'antd';
import { CgCloseO } from "react-icons/cg";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RiHandHeartLine } from "react-icons/ri";
import ListProfile from "../../Components/ListImage/ListProfile";
const MessageContainer = styled.div`
    height: 85.5vh;
    width:100%;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;

`;



const LikeNotification = () => {
    const [likedUsers, setLikedUsers] = useState([]);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(true);
    useEffect(() => {
        const fetchLikedUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/follower/list/liked?id=${userId}`);
                setLikedUsers(response.data.result);
                
            } catch (error) {
                console.error('Error fetching liked users:', error);
            }
        };

        fetchLikedUsers();
    }, [userId]);


    return (
        <div className="mess">

            <div className="messchat" style={{ width: "100%", height: "100vh" }}>

                <Flex style={{ width: "100%", height: "11.5vh" }} className="fle appbarmess2">
                    <div style={{ display: 'flex' }}>
                        <h3 className="Setting">Bạn có {likedUsers.length} lượt thích</h3>

                    </div>
                    <div style={{
                        fontSize: "40px", cursor: "pointer",
                        width: '60px'
                    }}>

                        <CgCloseO color="gray" className="close-btn" onClick={()=>{navigate("/Recs")}} />
                    </div>
                </Flex>

                <div>
                {showNotification ? (
                    <MessageContainer> {/* Thêm id cho MessageContainer */}
                    {likedUsers.length > 0 ? (
                        likedUsers.map((user, index) => (
                            <div style={{ borderRadius: "5px", margin: "10px", padding: "8px 0 0 10px" }}>
                                {/* Render the current image */}
                                <img src={user.images} alt="" width={235} height={308.75}
                                    className="like-image"
                                    onClick={() => {
                                        navigate(`/Notification/${user.id}`);
                                        setShowNotification(false);
                                    }} />
                                <div style={{
                                    display: "flex", justifyContent: "space-between",

                                }}>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="fl" style={{ width: "100%", margin: "20% 0px" }}>
                            <RiHandHeartLine fontSize={"200px"} />
                        </div>
                    )}
                    </MessageContainer>
                  ) : (
                    <MessageContainer>
                         <ListProfile />
                    </MessageContainer>
                   
                )}
                    
                </div>

            </div>



        </div>

    )
}
export default LikeNotification;
