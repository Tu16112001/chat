import React, { useEffect } from "react";
import axios from "axios";

const Test = () => {
    useEffect(() => {
        const token = "your_token_here";

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/auth/token/getId", {
                    token : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxdWFuZ3R1MTYxMTAxQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTcxMzg4NDA0MSwiZXhwIjoxNzEzOTcwNDQxfQ.HpyCd60qRo5jVWOY_LPRibazG87n9Z3Ya6Z6o-6TTT4"
                });
                console.log(response.data);
                // Xử lý dữ liệu phản hồi tại đây
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ display: "flex" }}>
            {/* Nội dung */}
        </div>
    );
};

export default Test;
