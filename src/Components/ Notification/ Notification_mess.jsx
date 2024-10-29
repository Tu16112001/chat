import { Avatar, Flex, message as antMessage } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { firebase } from "../../FireBase/config";
import { Badge, Empty } from 'antd';

export const NotificationMess = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [responses, setResponse] = useState([]);
    const [responseImg, setResponseImg] = useState([]);
    const [name, setFullname] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/public/follower/list/matching?id=${userId}`);
                const respImg = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                setResponse(resp.data.result);
                setResponseImg(respImg.data.result.images);
                setFullname(respImg.data.result.fullname);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [userId]);

    const imGArray = responseImg;

    const createOrNavigateToChatRoom = async ({ id_matching, id, images, fullname }) => {
        const [sortedUserId, sortedId] = [id, userId].sort();
        const docId = `${sortedUserId}${sortedId}`;
        try {
            const chatRef = firebase.firestore().collection("chats").doc(docId);
            const chatDoc = await chatRef.get();
            if (chatDoc.exists) {
                navigate(`/Mess/${docId}`);
            } else {
                await chatRef.set({
                    id: `${id_matching}`,
                    messages: [],
                    newMessage: [],
                    participants: [
                        { id: `${userId}`, fullname: name, images: imGArray },
                        { id: `${id}`, fullname: fullname, images: images }
                    ],
                    contain: [`${id}`, userId],
                });
                navigate(`/Mess/${docId}`);
            }
        } catch (error) {
            antMessage.error('Vui lòng kiểm tra lại đường chuyền Internet!');
        }
    };

    const [mess, setMess] = useState([]);
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection("chats").onSnapshot((snapshot) => {
            const messData = [];
            snapshot.forEach(doc => {
                const messItemData = doc.data();
                const matchingData = messItemData.newMessage;
                messData.push({ id: doc.id, newMessage: matchingData });
            });
            setMess(messData);
        });

        return () => unsubscribe();
    }, []);

    const Chats = () => {
        const sortedResponses = responses.map(follower => {
            const userChat = mess.find(chat => chat.id.includes(follower.id));
            const hasNewMessage = userChat && userChat.newMessage.length > 0;
            const latestMessage = hasNewMessage ? userChat.newMessage.sort((a, b) => b.sentAt - a.sentAt)[0] : null;
          
            return {
                ...follower,
                latestMessage,
                hasNewMessage
            };
           
        }).sort((a, b) => {
            if (a.latestMessage && b.latestMessage) {
                return b.latestMessage.sentAt - a.latestMessage.sentAt;
            } else if (a.latestMessage) {
                return -1;
            } else if (b.latestMessage) {
                return 1;
            } else {
                return 0;
            }
        });

        return (
            <div style={{ maxHeight: "100%", overflowY: "auto" }}>
                {sortedResponses.map(follower => {
                    return (
                        <Flex
                            key={follower.id}
                            className="hov2 shadowbx"
                            onClick={() => createOrNavigateToChatRoom(follower)}
                            style={{ margin: "10px 0", height: "80px", position: 'relative' }}
                        >
                            <Avatar
                                className="Setting"
                                src={follower.images}
                                style={{ width: "80px", height: "80px" }}
                            />
                            {follower.latestMessage && follower.latestMessage.seen === false 
                            && follower.latestMessage.senderID !== userId &&  (
                                <Badge
                                    dot={true}
                                    offset={[-17, 15]}
                                    style={{ width: "10px", height: "10px" }}
                                />
                            )}
                            <div className="newchat" >
                                <h3 className="Setting" style={{ margin: "15px 0 0 5px" }}>{follower.fullname}</h3>
                                <p className="Setting" style={{ margin: "2px 0 0 5px" }}>
                                    {follower.latestMessage
                                        ? (follower.latestMessage.content
                                            ? (follower.latestMessage.content.length > 25
                                                ? `${follower.latestMessage.content.slice(0, 25)}...`
                                                : follower.latestMessage.content)
                                            : `Hãy nhắn tin cho ${follower.fullname}`)
                                        : `Chưa có tin nhắn từ ${follower.fullname}`}
                                </p>
                            </div>
                        </Flex>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            {responses.length > 0 ? (
                <Chats />
            ) : (
                <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                        height: 90,
                        marginTop: "30px"
                    }}
                    description={<span>Không có tin nhắn</span>}
                />
            )}
        </div>
    );
};
