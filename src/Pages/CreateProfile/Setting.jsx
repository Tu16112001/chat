import React, { useState,useEffect } from "react";
import { Button, Form, Input, Select, Radio, Slider, message } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Setting = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [settings, setSetting] = useState({});
    const [location, setLocation] = useState("");
    const [distancePreference, setDistancePreference] = useState(1);
    const [lookingFor, setLookingFor] = useState("");
    const [agePreference, setAgePreference] = useState([16, 30]); // Thay đổi thành một mảng chứa giá trị tối thiểu và tối đa
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/setting/getId?id=${userId}`);
                setSetting(response.data);
                setLocation(response.data.result.location);
                setDistancePreference(response.data.result.distance_preference);
                setLookingFor(response.data.result.looking_for);
            } catch (error) {
                console.error('Lỗi khi lấy userId', error);
            }
        };
        fetchUserId();
    }, [userId]);
    const handleFormSubmit = async () => {
        // Kiểm tra xem tất cả các trường đã được điền vào chưa
        if (!location || !distancePreference || !lookingFor) {
            message.error('Vui lòng điền đầy đủ thông tin');
            return;
        }
    
        try {
            let response;
            if (settings && settings.code === 200) {
                response = await axios.post('http://localhost:8080/public/setting/update', {
                    id: settings.result.id,
                    location: location,
                    distance_preference: distancePreference,
                    looking_for: lookingFor,
                    min_age_preference: agePreference[0],
                    max_age_preference: agePreference[1]
                });
            } else if (settings && settings.code === 404) {
                response = await axios.post('http://localhost:8080/public/setting/create', {
                    user_id: userId,
                    location: location,
                    distance_preference: distancePreference,
                    looking_for: lookingFor,
                    min_age_preference: agePreference[0],
                    max_age_preference: agePreference[1]
                });
            } else {
                message.error('Vui lòng điền đầy đủ thông tin');
                return;
            }
    
            if (response.data.code === 200) {
                navigate("/Profile");
            } else {
                message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
                console.error('Lỗi khi tạo hoặc cập nhật cài đặt:', response.data.message);
            }
            localStorage.setItem("IdSetting", response.data.result.id);
        } catch (error) {
            message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
            console.error('Lỗi khi gửi biểu mẫu:', error);
        }
    };
    const provinces = [
        "Hà Giang",
        "Hà Nam",
        "Hà Nội",
        "Hà Tĩnh",
        "Hải Dương",
        "Hải Phòng",
        "Hậu Giang",
        "Hòa Bình",
        "Hồ Chí Minh",
        "Hưng Yên",
        "Khánh Hòa",
        "Kiên Giang",
        "Kon Tum",
        "Lai Châu",
        "Lâm Đồng",
        "Lạng Sơn",
        "Lào Cai",
        "Long An",
        "Nam Định",
        "Nghệ An",
        "Ninh Bình",
        "Ninh Thuận",
        "Phú Thọ",
        "Phú Yên",
        "Quảng Bình",
        "Quảng Nam",
        "Quảng Ngãi",
        "Quảng Ninh",
        "Quảng Trị",
        "Sóc Trăng",
        "Sơn La",
        "Tây Ninh",
        "Thái Bình",
        "Thái Nguyên",
        "Thanh Hóa",
        "Thừa Thiên Huế",
        "Tiền Giang",
        "Trà Vinh",
        "Tuyên Quang",
        "Vĩnh Long",
        "Vĩnh Phúc",
        "Yên Bái"
    ];
    
    return (
        <div>
            <Form style={{position:"relative"}}>
                <div className="fle">
                    <div style={{ width: "500px", height: "64vh" }}>
                        <div>
                        <Form.Item>
    <label htmlFor="location">Tỉnh / Thành phố</label> <br />
    <Select
        id="location"
        style={{ width: "100%" }}
        value={location}
        onChange={value => setLocation(value)}
    >
        {provinces.map(province => (
            <Select.Option key={province} value={province}>{province}</Select.Option>
        ))}
    </Select>
</Form.Item>
                            <Form.Item>
                                <label htmlFor="distancePreference">Khoảng cách ưa thích (km)</label> <br />
                                <Input id="distancePreference" type="number" style={{ height: "40px" }} value={distancePreference} onChange={event => setDistancePreference(event.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <label htmlFor="lookingFor">Muốn tìm kiếm</label> <br />
                                <Radio.Group onChange={(e) => setLookingFor(e.target.value)} value={lookingFor} style={{ display: 'flex', justifyContent: 'space-between', textAlign: "center" }}>
                                    <Radio.Button value="Men" style={{ flex: 1 }}>Nam</Radio.Button>
                                    <Radio.Button value="Women" style={{ flex: 1 }}>Nữ</Radio.Button>
                                    <Radio.Button value="EveryOne" style={{ flex: 1 }}>Mọi người</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item>
                                <label htmlFor="agePreference">Tuổi ưu tiên</label> <br />
                                <Slider
                                    range
                                    defaultValue={agePreference}
                                    min={16}
                                    max={100}
                                    onChange={value => setAgePreference(value)}
                                />
                            </Form.Item>
                            
                        </div>
                    </div>
                </div>
               
                <div className="fl" style={{ padding: "70px",position:"absolute",top:"67vh",width:"150%"}}>
                    <Button type="button" className="hov4" onClick={handleFormSubmit} style={{ width: "200px", height: "80px", borderRadius: "20px", border: "none", fontSize: "20px", fontWeight: "700" }}>
                        Tiếp Tục
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default Setting;
