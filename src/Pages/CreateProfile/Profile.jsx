import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Radio, Divider, Modal, message } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [profiles, setProfiles] = useState({});
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [passions, setPassions] = useState("");
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const { Option } = Select;
    const userId = localStorage.getItem("userId");
    const IdProfile = localStorage.getItem("IdProfile");
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                setProfiles(response.data.result);
                setAge(response.data.result.age);
                setGender(response.data.result.gender);
                setPassions(response.data.result.passions);
                setSelectedInterests(response.data.result.interests.split(','));
            } catch (error) {
                console.error('Lỗi khi lấy userId', error);
            }
        };
        fetchUserId();
    }, [userId]);

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleInterestsChange = (value) => {
        setSelectedInterests(value);
    };

    const handleFormSubmit = async () => {
        if (!age || !gender || !selectedInterests.length || !passions) {
            message.error('Vui lòng điền đầy đủ thông tin');
            return;
        }


        try {
            let response;
            if (Object.keys(profiles).length > 0) {
                response = await axios.post('http://localhost:8080/public/profile/update', {
                    id: IdProfile,
                    age: age,
                    gender: gender,
                    interests: selectedInterests.join(','),
                    passions: passions
                });
            } else {
                response = await axios.post('http://localhost:8080/public/profile/create', {
                    u_id: userId,
                    age: age,
                    gender: gender,
                    interests: selectedInterests.join(','),
                    passions: passions
                });
            }

            if (response.data.code === 200) {
                navigate("/CreateProfile3");
            } else {
                console.error('Lỗi khi tạo hồ sơ:', response.data.message);
            }
            localStorage.setItem("IdProfile", response.data.result.id);

        } catch (error) {
            console.error('Lỗi khi gửi biểu mẫu:', error);
        }
    };

    return (
        <div>
            <Form>
                <div className="fle">
                    <div style={{ width: "500px", height: "47vh" }}>
                        <div>
                            <Form.Item>
                                <label htmlFor="age">Tuổi</label> <br />
                                <Input id="age" type="number" style={{ height: "40px" }} value={age} onChange={handleAgeChange} />
                            </Form.Item>
                            <Form.Item>
                                <label htmlFor="passions">Mục Đích Hẹn Hò</label> <br />
                                <Select id="passions" style={{ height: "40px" }} value={passions} onChange={value => setPassions(value)}>
                                    <Option value="1">Tìm Kiếm Người Yêu</Option>
                                    <Option value="2">Tìm Kiếm Mối Quan Hệ không Ràng Buộc</Option>
                                    <Option value="3">Tìm Người Trò Chuyện </Option>
                                    <Option value="4">Tìm Người Cùng Sở Thích </Option>
                                    <Option value="5">Muốn Tâm Sự Riêng Tư </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <label htmlFor="gender">Giới Tính</label> <br />
                                <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender} style={{ display: 'flex', justifyContent: 'space-between', textAlign: "center" }}>
                                    <Radio.Button value="Men" style={{ flex: 1 }}>Nam</Radio.Button>
                                    <Radio.Button value="Women" style={{ flex: 1 }}>Nữ</Radio.Button>
                                    <Radio.Button value="EveryOne" style={{ flex: 1 }}>Giới Tính Khác</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item>
                                <label htmlFor="interests">Sở Thích</label> <br />
                                <button style={{ width: "220px", fontSize: "18px", border: "none", height: "35px", borderRadius: "10px" }} className="hov3"
                                    type="button" onClick={() => setModalVisible(true)}>Chọn Sở Thích</button>
                                <div style={{ width: "100%", display: "flex" }}>
                                    {selectedInterests.map((interest, index) => (
                                        <p key={index} style={{ fontSize: "18px",background:"white",
                                         border: "1px solid gray", borderRadius: "10px", padding: "0px 10px", marginLeft: "5px" }}>
                                            {interest}
                                        </p>
                                    ))}
                                </div>
                                <Modal
                                    title="Chọn Sở Thích"
                                    visible={modalVisible}
                                    onOk={() => {
                                        setModalVisible(false);
                                    }}
                                    onCancel={() => setModalVisible(false)}
                                  
                                    
                                >
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Chọn sở thích"
                                        value={selectedInterests}
                                        onChange={handleInterestsChange}
                                    >
                                        <Option value="Đọc sách">Đọc sách</Option>
                                        <Option value="Nấu ăn">Nấu ăn</Option>
                                        <Option value="Du lịch">Du lịch</Option>
                                        <Option value="Thể thao">Thể thao</Option>
                                        <Option value="Âm nhạc">Âm nhạc</Option>
                                    </Select>
                                </Modal>
                            </Form.Item>

                        </div>
                    </div>
                </div>
                <Divider />
                <div className="fl" style={{ padding: "70px" }}>
                    <Button type="button" className="hov4" onClick={handleFormSubmit} style={{ width: "200px", height: "80px", borderRadius: "20px", border: "none", fontSize: "20px", fontWeight: "700" }}>
                        Tiếp Tục
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default Profile;
