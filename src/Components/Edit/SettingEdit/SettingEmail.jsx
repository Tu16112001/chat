import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import axios from 'axios';

export const SettingEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // State for managing the email
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`);
                if (profileResponse.data) {
                    setEmail(profileResponse.data.result.email); // Set email to state
                }
            } catch (error) {
                console.error("Error fetching profile data: ", error);
                // Handle error gracefully
            }
        };

        fetchData(); // Call the function to fetch data
    }, [userId]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value); // Update state on input change
    };

    return (
        <div style={{ width: "100%" }}>
            <h3 className="Setting">Email</h3>
            <div className="fl">
                <Input 
                    style={{ width: "95%", marginBottom: "18px" }} 
                    value={email} // Display email in input field
                    onChange={handleEmailChange} // Handle input change
                />
            </div>
            <div className="fl">
                <Button 
                    style={{ width: "90%", height: "40px" }} 
                    onClick={() => navigate("/Profile")}
                >
                    Xong
                </Button>
            </div>
        </div>
    );
};
