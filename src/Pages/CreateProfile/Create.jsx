import React, { useState, useEffect } from "react";
import { Button, Form, Divider } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Create = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post('http://localhost:8080/auth/token/getId', {
                    token: token
                });
                if (response.data.result && response.data.result.phone_number) {
                    setPhone(response.data.result.phone_number);
                }
            } catch (error) {
                console.error('Lỗi khi lấy userId', error);
            }
        };
        fetchUserId();
    }, []);

    const handlePhoneNumberChange = (value) => {
        setPhone(value);
    };

    const handleFormSubmit = async () => {
        
        const formData = {
            id: userId,
            phone_number: phone,
            latitude: 1234567,
            longitude:1234567
        };

        try {
            const response = await axios.post('http://localhost:8080/public/profile/update/user', formData);

            if (response.data.code === 200) {
                navigate("/CreateProfiles");
            }
            // Handle success, e.g., show a success message to the user
        } catch (error) {
            console.error('Lỗi khi gửi biểu mẫu', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <div>
            <Form onFinish={handleFormSubmit}>
                <div className="fle">
                    <div style={{ width: "500px", height: "40vh" }}>
                        <div>
                            <Form.Item
                                name="phone_number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                    {
                                        pattern: /^[0-9]{10}$/,
                                        message: 'Số điện thoại phải có 10 chữ số!',
                                    },
                                ]}
                            >
                                <label htmlFor="Sdt">Số Điện Thoại</label>
                                <PhoneInput
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                    }}
                                    inputStyle={{
                                        width: "100%",
                                        height: "40px",
                                        fontSize: "16px",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                    country={'vn'}
                                    value={phone}
                                    onChange={handlePhoneNumberChange}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="fl" style={{ padding: "70px" }}>
                    <Button type="button" className="hov4" onClick={handleFormSubmit} style={{ width: "200px", height: "80px",
                         borderRadius: "20px", border: "none", fontSize: "20px", fontWeight: "700" }}>
                        Tiếp Tục
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Create;
