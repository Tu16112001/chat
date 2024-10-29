import React, { useState } from 'react';
import axios from 'axios';
import { db } from '../../FireBase/config'; // Import Firebase SDK config
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Report = ({ user_report, user_accused,onClose }) =>{
    const [reportContent, setReportContent] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const handleReportSubmit = async () => {
        onClose(); 
        try {
           
            await axios.post('http://localhost:8080/public/report/create', {
                content: reportContent,
                user_report,
                user_accused
            });
            
            await axios.post('http://localhost:8080/public/follower/unmatched', {
              
                u_id1:user_report,
                u_id2:user_accused
            });
            const chatMessagesRef = db.collection('chats').doc(id);
       
            await chatMessagesRef.delete();
            alert('Báo cáo đã được gửi thành công!');
            navigate("/Recs")
        } catch (error) {
          
            alert('Đã xảy ra lỗi khi gửi báo cáo!');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <textarea
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                placeholder="Nhập nội dung báo cáo"
                style={{ width: '92%', minHeight: '150px',  fontSize: '16px', marginTop: '30px',padding:"15px" }}
            />
            <button onClick={handleReportSubmit} className='text-report'>
                Gửi báo cáo
            </button>
        </div>
    )
}
export default Report