import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import axios from 'axios';

export const SettingFullname= () => {
    const navigate = useNavigate();
    const [fullname, setPhoneNumber] = useState(""); // State for managing the phone number
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                if (profileResponse.data) {
                    setPhoneNumber(profileResponse.data.result.fullname); // Set phone number to state
                }
            } catch (error) {
                console.error("Error fetching profile data: ", error);
                // Handle error gracefully
            }
        };

        fetchData(); // Call the function to fetch data
    }, [userId]);

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value); // Update state on input change
    };

    const handleUpdatePhoneNumber = async () => {
        try {
            await axios.post('http://localhost:8080/public/profile/update/user', {
                id: userId,
                fullname: fullname,
            });
            navigate("/Profile"); // Navigate to profile page after successful update
        } catch (error) {
            console.error("Error updating phone number: ", error);
            // Handle error gracefully
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <h3 className="Setting">Tên Hiển Thị</h3>
            <div className="fl">
                <Input 
                    style={{ width: "95%", marginBottom: "18px" }} 
                    value={fullname} // Display phone number in input field
                    onChange={handlePhoneNumberChange} // Handle input change
                />
            </div>
            <div className="fl">
                <Button 
                    style={{ width: "90%", height: "40px" }} 
                    onClick={handleUpdatePhoneNumber} // Update phone number on button click
                >
                    Xong
                </Button>
            </div>
        </div>
    );
};
