import React, { useState, useEffect } from "react";
import { HeartFilled } from '@ant-design/icons';
import { BsShieldLockFill } from "react-icons/bs";
import { RiFileSearchFill } from "react-icons/ri";
import { FaChartColumn } from "react-icons/fa6";
import Interest from "../Interest/Interest";
import { useNavigate } from 'react-router-dom';
import { Avatar, Modal, Button } from 'antd';
import Banner from '../../Image/Screenshot 2024-07-28 at 20.48.49.png'
import axios from "axios";

const Information = () => {
    const navigate = useNavigate();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const handleSearchClick = () => {
        navigate("/Search");
        setIsSearchPage(true);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModal1 = () => {
        setIsModalVisible1(true);
    };

    const handleOk = () => {
        setIsModalVisible1(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancel1 = () => {
        setIsModalVisible1(false);
    };
    const [data, setData] = useState([]);
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/public/follower/list/matching?id=${userId}`);
                setData(resp.data.result);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [userId]);

    const fetchData1 = async ({id}) => {
        try {
            await axios.post('http://localhost:8080/public/follower/unmatched', {

                u_id1: userId,
                u_id2: id
            });
           
            setIsModalVisible1(false);
            alert('Huỷ thành công!');
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    


return (

    <div style={{ width: "495px", height: "100vh", borderRight: "0.2px solid gray" }}>
        <div className="informa">
            <div className="btn1" style={{ marginLeft: "15px" }}>

                <button onClick={() => navigate("/Recs")} className="custom-button btn3"><HeartFilled /></button>

            </div>
            <div>
                {isSearchPage ? (
                    <button className="custom-button bnt2" onClick={() => navigate("/Profile")}>
                        <RiFileSearchFill />
                    </button>
                ) : (
                    <button className="custom-button bnt2" onClick={handleSearchClick}>
                        <RiFileSearchFill />
                    </button>
                )}
                <button className="custom-button bnt2" onClick={showModal}>
                    <FaChartColumn />
                </button>
                <button className="custom-button bnt2" onClick={showModal1}>
                    <BsShieldLockFill />
                </button>
            </div>
        </div>
        <div className="Cente">
            <Interest />
        </div>

        <Modal
            title="Thống Kê"
            visible={isModalVisible}

            onCancel={handleCancel}
            width={1000}
        >
            <img src={Banner} alt="" width={"100%"} />
        </Modal>

        <Modal
            title="Huỷ ghép đôi người này"
            visible={isModalVisible1}
            onOk={handleOk}
            onCancel={handleCancel1}
            width={700}
        >
            {data.map((notification) => (
                <div key={notification.id} className="fle">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={notification.images} style={{ margin: "10px" }} size={60}></Avatar>
                        <h4>{notification.fullname}</h4>
                    </div>
                    <Button style={{background:"red",color:"white"}} onClick={()=>fetchData1({ id: notification.id })}> Huỷ</Button>
                </div>
            ))}

        </Modal>
    </div>


);
};

export default Information;
