import React, { useEffect, useState } from "react";

import { Avatar, Flex, Empty } from "antd";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Notification = () => {
    const [likedUsers, setLikedUsers] = useState([]);
    const userId = localStorage.getItem("userId");
     const navigate = useNavigate();
    useEffect(() => {
        const fetchLikedUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/follower/list/liked?id=${userId}`);
                setLikedUsers(response.data.result);
                console.log("Fetched liked users:", likedUsers.length);
            } catch (error) {
                console.error('Error fetching liked users:', error);
            }
        };

        fetchLikedUsers();
    });
    return (
        <div style={{ maxHeight: "100%", overflowY: "auto" }}>
            <div>
                {likedUsers.length > 0 ? (
                    likedUsers.map((user, index) => (
                        <Flex
                            key={index}
                            className="hov2"
                            style={{ margin: "10px 0", height: "80px" }}
                            onClick={()=>navigate(`/Notification/${user.id}`)}
                        >
                            <Avatar
                                className="Setting"
                                src={user.images} // Adjust the field name based on your API response
                                style={{ width: "80px", height: "80px" }}
                            />
                            <div className="Setting">
                                <h4 className="Setting mar" style={{ padding: "13px 0 5px 0" }}>
                                    {user.fullname} 
                                    {/* Adjust the field name based on your API response */}
                                </h4>
                                <p className="mar"> {user.fullname} đã like bạn</p>   
                            </div>
                           
                        </Flex>
                    ))
                ) : (
                    <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 90,
                      marginTop:"30px"
                    }}
                    description={
                      <span>
                        Không có thông báo
                      </span>
                    }
                  >
                  </Empty>
                )}
            </div>
        </div>
    );
}; 
