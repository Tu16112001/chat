import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Avatar, Flex, Divider } from 'antd';
import { GoKebabHorizontal } from "react-icons/go";
import { CgCloseO } from "react-icons/cg";
import Messenge from "./messenger";
import { firebase } from '../../FireBase/config';
import { useParams } from "react-router-dom";
import axios from "axios";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import { TiHomeOutline, TiEdit } from "react-icons/ti";
import { BiCheckCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd';
import Report from "../Report/Report";

const MessageContainer = styled.div`
    height: 74vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 5px 0 0;
`;

const MessageItem = styled.div`
position: relative;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    justify-content: ${props => props.isSender ? "flex-end" : "flex-start"};
`;
const MessageBubble = styled.div`
    padding: 10px 14px;
    margin:0 10px 5px 10px;
    border-radius: ${props => props.isSender ? "10px 17px 2px 10px" : "17px 10px 10px 2px"};
    background-color: ${props => props.isSender ? "#ff4458" : "#f0f0f0"};
    align-self: flex-start;
    max-width: 60%;
    word-wrap: break-word;
    cursor: pointer;
`;

const MessageText = styled.p`
    margin: 0;
    color: ${props => props.isSender ? "white" : "black"};
`;
const TimeText = styled.p`
    margin: 14px 10px 0 10px; 
    color: gray;
    font-size: 10px;
`;
const HeartIcon = styled.div`
    display: ${props => props.show ? "block" : "none"};
    font-size: 40px;
    color: red;
`;
const DateDivider = styled.div`
    width: 100%;
    text-align: center;
    margin: 20px 0;
    color: gray;
    font-size: 12px;
`;
const SeenText = styled.span`
    color: gray;
    font-size: 10px;
    position: absolute;
    top:100%;
    margin:0 10px 5px 10px;
    right: 0;
`;

const Mess = () => {
    const { id } = useParams();
    const chatRoomId = id;
    const userId = localStorage.getItem("userId");
    const [messages, setMessages] = useState([]);
    const [showHeart, setShowHeart] = useState(false);
    const [matchingInfo, setMatchingInfo] = useState(null);
    const [Info, setInfo] = useState(null);
    const [lastMessageSender, setLastMessageSender] = useState(null);
    useEffect(() => {
        const unsubscribe = firebase.firestore()
            .collection('chats')
            .doc(chatRoomId)
            .onSnapshot(async (doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const messages = data.messages || [];
                    setMessages(messages);
                    setShowHeart(messages.length === 0);
    
                    // Cập nhật trạng thái 'seen' của tin nhắn cuối cùng trong tập hợp 'messages' khi đối phương xem tin nhắn
                    if (messages.length > 0 && messages[messages.length - 1].senderID !== userId) {
                        const lastMessage = messages[messages.length - 1];
                        if (!lastMessage.seen) {
                            // Cập nhật tin nhắn cuối cùng trong mảng 'messages' để đánh dấu đã xem
                            const updatedMessages = messages.map(msg =>
                                msg.id === lastMessage.id ? { ...msg, seen: true } : msg
                            );
                            const newMessage = [{
                                ...lastMessage,
                                seen: true,
                        }];
                            try {
                                
                                await firebase.firestore()
                                    .collection('chats')
                                    .doc(chatRoomId)
                                    .update({ messages: updatedMessages ,
                                        newMessage : newMessage
                                    });

                        
                            } catch (error) {
                                console.error("Error updating message seen status: ", error);
                            }
                        }
                    }
                }
            });
    
        return () => unsubscribe();
    }, [chatRoomId, userId]);
    


    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const doc = await firebase.firestore().collection('chats').doc(chatRoomId).get();
                if (doc.exists) {
                    const data = doc.data();
                    // Kiểm tra nếu có trường participants
                    if (data.participants) {
                        // Lấy dữ liệu của người dùng từ participants
                        const user = data.participants.find(p => p.id !== userId);
                         // Giả sử bạn muốn lấy thông tin của người dùng khác
                         if (user) {
                            // Đảm bảo user có trường images
                            const userWithImages = {
                                id: user.id,
                                images: user.images || '', // Dùng giá trị mặc định nếu images không tồn tại
                                fullname: user.fullname|| ''// Thêm các trường khác nếu cần
                            };
                            setInfo(userWithImages);
                        }
                        setMatchingInfo(user);
                    }
                }
            } catch (error) {
                console.error("Error fetching chat data: ", error);
            }
        };
        fetchChatData();
    }, [chatRoomId, userId]);
    

    useEffect(() => {
        const messageContainer = document.getElementById('message-container');
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }, [messages]);
    function formatTime(timestamp) {
        if (!timestamp) return '';

        const date = timestamp.toDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours}:${minutes}:${seconds}`;
    }

    function formatDate(timestamp) {
        if (!timestamp) return '';

        const date = timestamp.toDate();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function shouldShowDateDivider(currentTimestamp, previousTimestamp) {
        if (!previousTimestamp) return true;

        const currentDate = currentTimestamp.toDate();
        const previousDate = previousTimestamp.toDate();

        return currentDate.getDate() !== previousDate.getDate() ||
            currentDate.getMonth() !== previousDate.getMonth() ||
            currentDate.getFullYear() !== previousDate.getFullYear();
    }
    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            setLastMessageSender(lastMessage.senderID === userId);
        }
    }, [messages, userId]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (matchingInfo) {
                try {
                    const imageResponse = await axios.get(`http://localhost:8080/public/profile/getId?id=${matchingInfo?.id}`);
                    const { result } = imageResponse.data;
                    const userImages = result.images.split(',');
                    setProfileData(imageResponse.data);
                    setImages(userImages);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            }
        };
        fetchData();
    }, [matchingInfo]);

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
    const navigate = useNavigate();


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div className="mess">
            <div className="messchat" style={{ width: "65%" }}>
                <div className="appbarmess">
                    <Flex style={{ width: "100%" }} justify="space-between" align="center" >
                        <div style={{ display: 'flex' }}>
                            <Avatar src={Info?.images} className="Setting" style={{ width: "60px", height: "60px" }}></Avatar>
                            <h4 className="Setting">{Info?.fullname}</h4>
                        </div>
                        <div className="ic" style={{ fontSize: "40px", cursor: "pointer", width: '100px', display: "flex", justifyContent: "space-between" }}>
                            <GoKebabHorizontal color="#ff4458" fontWeight={900} onClick={showModal} />
                            <Modal

                                visible={isModalVisible}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <h2 className="mar">Bạn muốn báo cáo {Info?.fullname}</h2>
                                <Report
                                    user_report={userId}
                                    user_accused={Info?.id}
                                    onClose={handleCancel}
                                />
                            </Modal>
                            <CgCloseO color="gray" className="close-btn" onClick={() => { navigate("/Recs") }} />
                        </div>
                    </Flex>
                </div>
                <div style={{ height: "75vh" }}>
                    <MessageContainer id="message-container">
                        <HeartIcon show={showHeart}><span role="img" aria-label="heart">❤️{Info?.fullname}</span></HeartIcon>
                        {messages
                            .sort((a, b) => a.sentAt - b.sentAt)
                            .map((msg, index) => (
                                <React.Fragment key={index}>
                                    {shouldShowDateDivider(msg.sentAt, messages[index - 1]?.sentAt) && (
                                        <DateDivider>{formatDate(msg.sentAt)}</DateDivider>
                                    )}
                                    <MessageItem className="times" isSender={msg.senderID === userId}>
                                        {msg.senderID !== userId && <Avatar src={Info?.images} className="Setting" style={{ width: "40px", height: "40px" }}></Avatar>}
                                        {msg.senderID === userId && <TimeText isSender={msg.senderID === userId} className="time">{formatTime(msg.sentAt)}</TimeText>}
                                        <MessageBubble isSender={msg.senderID === userId}>
                                            <MessageText isSender={msg.senderID === userId}>{msg.content}</MessageText>

                                            {index === messages.length - 1 && (
                                                <SeenText seen={msg.seen}>
                                                    {msg.seen ? 'Đã xem ' : 'Đã gửi'}
                                                </SeenText>
                                            )}


                                        </MessageBubble>
                                        {msg.senderID !== userId && <TimeText isSender={msg.senderID === userId} className="time">{formatTime(msg.sentAt)}</TimeText>}
                                    </MessageItem>
                                </React.Fragment>
                            ))}


                    </MessageContainer>

                </div>
                <Divider />
                <Messenge />
            </div>
            <div className="messchat" style={{ width: "35%" }} >
                <div style={{ borderLeft: "0.2px solid gray", width: "495px", height: "100vh", position: "relative" }}>
                    <div className="fl" style={{ position: "absolute" }}>
                        <div>
                            <img src={images[currentIndex]} alt="" width={375} height={568.75} style={{ marginTop: "-15px", objectFit: "cover" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", position: "relative", bottom: "260px" }}>
                                <PiCaretLeftBold className="next" onClick={handlePrevImage} />
                                <PiCaretRightBold className="next" onClick={handleNextImage} />
                            </div>
                        </div>


                        <div style={{ width: "100%" }}>
                            {profileData && (
                                <div style={{ background: "white", marginTop: "-30px", width: "100%" }}>
                                    <div style={{ display: "flex" }}>
                                        <h1 className="text Setting">{limitStringLength(profileData.result.fullname, 17)}</h1>
                                        <h2 style={{ fontSize: "21px", marginTop: "2px" }} className="text Setting">
                                            {profileData.result.age}<BiCheckCircle fontSize={15} style={{ marginTop: "3px" }} /></h2>
                                    </div>
                                    <p className="text Setting"><TiHomeOutline /> Sống tại Hà Nội</p>
                                </div>
                            )}
                            <h4 style={{ margin: "25px 0 5px 10px" }}>Sở thích</h4>
                            <div style={{ background: "white", height: "50px", display: 'flex', alignItems: "center", justifyContent: "flex-start" }}>
                                {profileData && profileData.result.interests.split(',').map((interest, index) => (
                                    <button style={{
                                        marginLeft: "7px", border: "1px solid gray", background: "white", padding: "6px"
                                        , borderRadius: "20px"
                                    }} key={index}>{interest.trim()}</button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mess;
