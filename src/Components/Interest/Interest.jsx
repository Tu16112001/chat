import React, { useState,useEffect } from "react";
import { HeartFilled } from '@ant-design/icons';

import { PiCaretRightBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { Col, Slider } from 'antd';
import { Switch } from 'antd';
import { AiOutlineExport } from "react-icons/ai";
import {  asyncLogout } from '../../Redux/authActions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const Interest = () => {
    const [inputValue, setInputValue] = useState([12]);
    const onChange = (newValue) => {
        setInputValue(newValue);
        console.log(`switch to ${newValue}`);
    };
    const [ageRange, setAgeRange] = useState([16, 30]);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleLogout = async () => {
        localStorage.removeItem('IdProfile');
        localStorage.removeItem('IdSetting');
        localStorage.removeItem('isVipTinder');
        localStorage.removeItem('token');
        await dispatch(asyncLogout());
        navigate("/");
    };
    const userId = localStorage.getItem("userId");
    const IdSetting = localStorage.getItem("IdSetting");
    const [Setting, setSetting] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
               
                const profileResponse = await axios.get(`http://localhost:8080/public/setting/getId?id=${userId}`);
                localStorage.setItem('IdSetting', profileResponse.data.result.id);
                if (profileResponse.data) {
                    setSetting(profileResponse.data.result); // Set phone number to state
                }
            } catch (error) {
                console.error("Error fetching profile data: ", error);
                // Handle error gracefully
            }
        };

        fetchData(); // Call the function to fetch data
    }, [userId]);
    const translateLookingFor = (lookingFor) => {
        switch (lookingFor) {
            case 'Women':
                return 'Nữ';
            case 'Men':
                return 'Nam';
            case 'Everyone':
                return 'Mọi người';
            default:
                return lookingFor;
        }
    };
    useEffect(() => {
        if (IdSetting) {
            axios.post('http://localhost:8080/public/setting/update', {
                distance_preference: inputValue,
                id: IdSetting
            })
            .then(response => {
                console.log('Settings updated:', response.data);
            })
            .catch(error => console.error('Error updating settings:', error));
        }
    }, [inputValue, IdSetting]);

    const onChangeAgeRange = (value) => {
        setAgeRange(value);
    };
    useEffect(() => {
        if (IdSetting) {
            axios.post('http://localhost:8080/public/setting/update', {
                min_age_preference: ageRange[0],
                max_age_preference: ageRange[1],
                id: IdSetting
            })
            .then(response => {
                console.log('Settings updated:', response.data);
            })
            .catch(error => console.error('Error updating settings:', error));
        }
    }, [IdSetting,ageRange]);
    return (
        <div style={{ width: "100%", display: "flex", alignItems: 'center', flexDirection: 'column'}}>
            <div style={{ width: "88%" }}>
                <div>
                <button className="buy-package" onClick={()=>navigate("/Loaded")}>
                    <h2 style={{ fontWeight: "bold" }}>
                        <HeartFilled /> LOVE</h2>
                    <p>Tăng cấp mọi hành động bạn thực hiện trong Tình yêu</p></button>
               
                <button className="buy-package"  onClick={()=>navigate("/Loaded")}>
                    <h2 style={{ fontWeight: "bold" }}>
                        <i style={{ color: 'red' }}><HeartFilled /></i> LOVE</h2>
                    <p>
                        Lượt thích không giới hạn và hơn thế nữa!</p></button>
                </div>
                
            </div>
           
            <div style={{ width: '100%'}}>
                <h4 className="Setting">Cài Đặt Tài Khoản</h4>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Email</p>
                        <div className="fle">
                            <p style={{ width: "110px", overflow: "hidden", textOverflow: "ellipsis" }}></p>
                            <a className="fle ic" onClick={()=>{navigate("/Settings")}}><PiCaretRightBold /></a>
                        </div>
                    </div>
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Số Điện Thoại</p>
                        <div className="fle">
                            <p style={{ width: "110px", overflow: "hidden", textOverflow: "ellipsis" }}></p>
                            <a className="fle ic" onClick={()=>{navigate("/Settings1")}}><PiCaretRightBold /></a>
                        </div>
                    </div>
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Tên Hiển Thị</p>
                        <a className="fle ic" onClick={()=>{navigate("/Settings2")}}><PiCaretRightBold /></a>
                    </div>
                </div>

                <p className="Setting" style={{paddingRight:"10px"}}>Số Điện Thoại và Email đã xác minh giúp bảo mật tài khoản của bạn.</p>
                <h4 className="Setting pad">Cài đặt Tìm Kiếm</h4>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Địa Điểm </p>
                        <p className="ic">{Setting.location}</p>
                    </div>
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Khoảng cách Ưu tiên</p>
                        <p style={{ width: "50px" }}><Col span={4}>
                            <div>
                                {Setting.distance_preference}Km
                            </div>
                        </Col></p>

                    </div>
                    <Col className="Setting" span={22}>
                        <Slider
                            className="slider"
                            min={1}
                            max={200}
                            onChange={onChange}
                            value={inputValue}
                            marks={{ [Setting.distance_preference]: `${inputValue}`
                        }}
                        />

                    </Col>
                   
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Đang tìm kiếm</p>
                        <a className="fle ic" onClick={()=>{navigate("/Settings3")}}>{translateLookingFor(Setting.looking_for)} <PiCaretRightBold /></a>
                    </div>
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Độ tuổi Ưu tiên</p>
                        <p style={{ width: "100px" }}><Col span={4}>
                                <div className="fle" style={{ width: "78px" }}>
                                    <p>{ageRange[0]}</p> - <p>{ageRange[1]} Tuổi</p>
                                </div>
                            </Col></p>

                    </div>
                    <Col className="Setting" span={22} style={{ paddingBottom: "25px" }}>
                        <Slider
                            range
                            min={16}
                            max={99}
                            value={ageRange}
                            onChange={onChangeAgeRange}
                            marks={{
                                [ageRange[0]]: `${ageRange[0]}`,
                                [ageRange[1]]: `${ageRange[1]}`
                            }}
                        />
                    </Col>
                   
                </div>
                <div className="boder">
               
                    </div>

                    <p style={{width:"95%"}} className="Setting fle">Mở ra chế độ toàn cầu sẽ tạo cơ hội để bạn gặp gỡ mọi người khắp nơi trên thế giới sau khi đã hết tương hợp tiềm năng ở xung quanh.</p>
                    <h4 className="Setting pad">Kiểm soát ai bạn sẽ thấy</h4>
                    <div className="boder">
                    <div className="Setting">
                        <p>Đề xuất đối tượng chọn lọc</p>
                        <p style={{fontSize:"13px"}}>Xem những người phù hợp với bạn nhất <br /> (cài đặt mặc định)</p>
                    </div>
                </div>
               
               
                <h4 className="Setting pad">Bật chế độ Tìm kiếm</h4>
                <div className="boder">
                <div className="Setting fle">
                        <p>Bật chế độ Tìm kiếm</p>
                        <Switch
                            style={{ marginRight: "15px",backgroundColor: "#ff4458" }}
                            defaultChecked onChange={onChange} />
                    </div>
                    </div>
                    <p style={{width:"95%"}} className="Setting fle">Khi tắt, hồ sơ của bạn sẽ không hiển thị trong bộ thẻ đại diện và chế độ Tìm kiếm sẽ được tắt. Những người bạn đã Thích có thể vẫn thấy hồ sơ và tương hợp với bạn.</p>
                    <div className="boder">
                    <div className="Setting fle">
                        <p>Chặn liên hệ</p>
                        <a className="fle ic" href="/Security" target="_blank" rel="noopener noreferrer"><PiCaretRightBold /></a>
                    </div>
                </div>
 
                <h4 className="Setting pad">Tùy chọn Hiển thị</h4>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Ngôn ngữ</p>
                        <p className="fle mar"> Tiếng việt <p className="fle ic"><PiCaretRightBold /></p></p>
                    </div>
                </div>
                <h4 className="Setting pad">Trợ giúp & Hỗ trợ</h4>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Trợ giúp & Hỗ trợ</p>
                        <a className="fle ic" href="/Security" target="_blank" rel="noopener noreferrer"><AiOutlineExport /></a>
                    </div>
                </div>
                <h4 className="Setting pad">An Toàn</h4>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Quy tắc Cộng đồng</p>
                        <a className="fle ic" href="/Security" target="_blank" rel="noopener noreferrer"><AiOutlineExport /></a>
                    </div>
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>An toàn & Chính sách</p>
                        <a className="fle ic" href="/Security" target="_blank" rel="noopener noreferrer"><AiOutlineExport /></a>
                    </div>
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Bí quyết An toàn</p>
                        <a className="fle ic" href="/Security" target="_blank" rel="noopener noreferrer"><AiOutlineExport /></a>
                    </div>
                </div>
                <h4 className="Setting pad">Pháp Lý</h4>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Cài đặt Quyền Riêng Tư</p>
                        <a className="fle ic" href="/Security" target="_blank" rel="noopener noreferrer"><AiOutlineExport /></a>
                    </div>
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Chính sách Cookie</p>
                        <a className="fle ic" href="/Security" target="_blank" rel="noopener noreferrer"><AiOutlineExport /></a>
                    </div>
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Chính sách Quyền Riêng Tư</p>
                        <a className="fle ic" href="/Security" target="_blank" rel="noopener noreferrer"><AiOutlineExport /></a>
                    </div>
                </div>
                <div className="boder">
                    <div className="Setting fle">
                        <p>Điều khoản Dịch vụ</p>
                        <a className="fle ic" href="/Security" target="_blank" rel="noopener noreferrer"><AiOutlineExport /></a>
                    </div>
                </div>
                <br />
                <div style={{textAlign:'center',cursor:"pointer"}} className="boder">
                    
                        <p >Chia Sẻ Love </p>
                       
                    
                </div>
                <br />
                <div style={{textAlign:'center',cursor:"pointer"}} className="boder">
                    
                        <p onClick={handleLogout}>Đăng Xuất</p>
                       
                    
                </div>
                
                <div style={{textAlign:'center'}} className="pad">
                <i style={{ color: '#ff4458',fontSize:'25px' }}>
                    <HeartFilled /> </i>
                <p >Phiên Bản</p>
                       
                    
                </div>
                
                <br />
                <br />
            </div>
        </div>
    )
}
export default Interest