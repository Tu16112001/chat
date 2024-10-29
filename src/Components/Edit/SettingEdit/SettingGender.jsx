import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Radio } from "antd";
import axios from 'axios';

export const SettingGender = () => {
    const navigate = useNavigate();
    const [looking_for, setLookingFor] = useState(""); // State for managing the selected option
    const userId = localStorage.getItem("userId");
    const IdSetting = localStorage.getItem("IdSetting");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await axios.get(`http://localhost:8080/public/setting/getId?id=${userId}`);
                if (profileResponse.data) {
                    setLookingFor(profileResponse.data.result.looking_for); // Set the selected option to state
                }
            } catch (error) {
                console.error("Error fetching profile data: ", error);
                // Handle error gracefully
            }
        };

        fetchData(); // Call the function to fetch data
    }, [userId]);

    const handleGenderChange = (e) => {
        setLookingFor(e.target.value); // Update state on radio button change
    };

    const handleUpdateGender = async () => {
        try {
            await axios.post('http://localhost:8080/public/setting/update', {
                id: IdSetting,
                looking_for: looking_for, // Correct field name for the API
            });
            navigate("/Profile"); // Navigate to profile page after successful update
        } catch (error) {
            console.error("Error updating gender preference: ", error);
            // Handle error gracefully
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <h3 className="Setting">Tìm Kiếm Đối Tượng</h3>
            <div className="fl">
                <Radio.Group
                    className="fle"
                    onChange={handleGenderChange} 
                    value={looking_for}
                    style={{ width: "95%", marginBottom: "25px" ,marginTop:"30px"}}
                >
                    <Radio value="Men">Nam</Radio>
                    <Radio value="Women">Nữ</Radio>
                    <Radio value="Everyone">Mọi người</Radio>
                </Radio.Group>
            </div>
            <div className="fl">
                <Button 
                    style={{ width: "90%", height: "40px" }} 
                    onClick={handleUpdateGender} // Update gender preference on button click
                >
                    Xong
                </Button>
            </div>
        </div>
    );
};
