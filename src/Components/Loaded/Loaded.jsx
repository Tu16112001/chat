import React, { useState, useEffect } from "react";
import axios from 'axios';
import { HeartFilled } from '@ant-design/icons';
import { GiCheckMark } from "react-icons/gi";
import {useNavigate} from 'react-router-dom'
const Loaded = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [error, setError] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8080/public/payment/get-all/tinder/packages')
            .then(response => {
                const data = response.data;
                if (data && Array.isArray(data.result)) {
                    setPackages(data.result);
                } else {
                    console.error('Data is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching packages:', error));
    }, []);

    const selectButton = (buttonIndex, packageId) => {
        const buttons = document.querySelectorAll('.checkloaded');
        buttons.forEach((button) => {
            button.classList.remove('selected');
        });
        buttons[buttonIndex - 1].classList.add('selected');
        setSelectedPackageId(packageId); // Set selectedPackageId here
    };

    const handleContinue = () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User ID is missing from localStorage');
            return;
        }
        if (!selectedPackageId) {
            setError('Please select a package');
            return;
        }
    
        axios.get(`http://localhost:8080/public/payment/create-payment?code=${selectedPackageId}&idUser=${userId}`)
            .then(response => {
                const  link  = response.data;
                if (link) {
                    // Chuyển hướng người dùng đến link trả về từ API trên cùng tab
                    window.location.href = link;
                } else {
                    console.error('No link returned from API:', response.data);
                }
            })
            .catch(error => console.error('Error creating payment:', error));
    };
    
    return (
        <div className="Loaded">
           <div style={{width:"100%",display:'flex'}}>
            <div className="fl" style={{width:"60%"}}>
               <div  style={{width:"100%"}}>
               <div style={{borderRadius:"10px"}} className="buy-package-content">
                    <h2 style={{padding:"25px"}}><HeartFilled/>Love</h2>
                </div>
                <div style={{height:"85vh",width:"100%",overflowX:"hidden"}}>
                <div  className="buy-package-contents">
                    <div style={{border:"0.1px solid rgb(0, 0,0, 0.2)",borderRadius:"3px"}}>
                    <span className="spanTop">Nâng cấp lượt Thích</span>
                        <h4 className="Setting" style={{display:"flex"}}><GiCheckMark fontSize={23}/> <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Đăng ký không giới hạn</h4></h4>
                        <h4 className="Setting" style={{display:"flex"}}><GiCheckMark fontSize={23}/> <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Xem ai Thích bạn</h4></h4>
                        
                       
                        <div className="Setting">
                        <h4 style={{display:"flex"}}><GiCheckMark fontSize={23}/> <div>
                        <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Lượt Thích ưu tiên</h4>
                        <p style={{fontSize:"12px",margin:"0 0 25px 12px"}} className="mar">
                            Lượt Thích của bạn sẽ được nhìn thấy sớm hơn với Lượt Thích Được Ưu Tiên.</p>
                            </div></h4>
                       
                        </div>
                    </div>
                </div>
                <div  className="buy-package-contents">
                    <div style={{border:"0.1px solid rgb(0, 0,0, 0.2)",borderRadius:"3px"}}>
                    <span className="spanTop1">Nâng cấp trải nghiệm của bạn</span>
                        <h4 className="Setting" style={{display:"flex"}}><GiCheckMark fontSize={23}/> <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Quay lại không giới hạn</h4></h4>
                         <div className="Setting">
                        <h4 style={{display:"flex"}}><GiCheckMark fontSize={23}/> <div>
                        <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>1 lượt Tăng tốc miễn phí mỗi tháng</h4>
                        <p style={{fontSize:"12px",margin:"0 0 25px 12px"}} className="mar">
                        Tăng Tốc miễn phí hàng tháng chỉ dành cho gói đăng ký từ 1 tháng trở lên.</p>
                            </div></h4>
                       
                        </div>
                        <h4 className="Setting" style={{display:"flex"}}><GiCheckMark fontSize={23}/> <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>5 lượt Siêu Thích miễn phí mỗi tuần</h4></h4>
                       
                        <div className="Setting">
                        <h4 style={{display:"flex"}}><GiCheckMark fontSize={23}/> <div>
                        <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Nhắn tin trước khi tương hợp</h4>
                        <p style={{fontSize:"12px",margin:"0 0 25px 12px"}} className="mar">
                        Thêm lời nhắn gửi cùng lượt Siêu Thích của bạn.</p>
                            </div></h4>
                       
                        </div>
                    </div>
                </div>
                <div  className="buy-package-contents">
                    <div style={{border:"0.1px solid rgb(0, 0,0, 0.2)",borderRadius:"3px"}}>
                    <span className="spanTop2">Tìm Kiếm Cao Cấp</span>
                        <div className="Setting">
                        <h4 style={{display:"flex"}}><GiCheckMark fontSize={23}/> <div>
                        <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Hộ chiếu</h4>
                        <p style={{fontSize:"12px",margin:"0 0 25px 12px"}} className="mar">
                        Tương hợp với các thành viên ở bất kỳ đâu trên thế giới.</p>
                            </div></h4>
                       
                        </div>
                    </div>
                </div>
                <div  className="buy-package-contents">
                    <div style={{border:"0.1px solid rgb(0, 0,0, 0.2)",borderRadius:"3px"}}>
                    <span className="spanTop3">Nắm quyền kiểm soát</span>
                         <div className="Setting">
                        <h4 style={{display:"flex"}}><GiCheckMark fontSize={23}/> <div>
                        <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Kiểm soát Hồ sơ của bạn</h4>
                        <p style={{fontSize:"12px",margin:"0 0 25px 12px"}} className="mar">
                        Chỉ hiện những gì bạn muốn họ biết.</p>
                            </div></h4>
                       
                        </div>
                        <div className="Setting">
                        <h4 style={{display:"flex"}}><GiCheckMark fontSize={23}/> <div>
                        <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Kiểm soát việc ai nhìn thấy bạn</h4>
                        <p style={{fontSize:"12px",margin:"0 0 25px 12px"}} className="mar">
                        Kiểm soát việc ai nhìn thấy bạn.</p>
                            </div></h4>
                       
                        </div>
                        <div className="Setting">
                        <h4 style={{display:"flex"}}><GiCheckMark fontSize={23}/> <div>
                        <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Kiểm soát việc bạn nhìn thấy ai</h4>
                        <p style={{fontSize:"12px",margin:"0 0 25px 12px"}} className="mar">
                        Chọn mẫu người bạn muốn tương tác trên Tinder.</p>
                            </div></h4>
                       
                        </div>
                        <h4 className="Setting" style={{display:"flex"}}><GiCheckMark fontSize={23}/> <h4 className="mar" 
                        style={{paddingLeft:"10px"}}>Ẩn quảng cáo</h4></h4>
                       
                        
                    </div>
                </div>
                </div>
               
                
               </div>
            </div>
            <div className="fl" style={{width:"40%"}}>
                <div className="fl" style={{width:"100%"}} >
                   <div style={{width:"100%",height:"100vh",overflowX:"hidden",textAlign:"center"}}>
                   <h2 style={{margin:"20px 0 0 0"}}>Đăng ký Love Platinum™</h2>
                   <p style={{fontSize:"14px"}}>Trải nghiệm hẹn hò thú vị bậc nhất</p>
                    <div>
                    <div className="checkloaded-container">
                    {packages.map((pkg, index) => (
                                    <button key={pkg.id} className="checkloaded" onClick={() => selectButton(index + 1, pkg.id)}>
                                        <span className="check"> <span className="check1"></span></span>
                                        <div>
                                            <h2  className="mar">{pkg.name}</h2>
                                            <h3 style={{fontWeight:"100"}}>{pkg.price.toLocaleString('vi-VN')} VNĐ</h3>
                                        </div>
                                    </button>
                                ))}
                    </div>
                    <div className="fl">
                        <p style={{fontSize:"12px",width:"70%"}}>
                            Khi nhấn Tiếp tục, bạn sẽ được tính phí và gói đăng ký của bạn sẽ gia hạn với cùng mức giá và thời lượng cho đến
                            khi bạn hủy bỏ thông qua phần Cài đặt Tài khoản, và bạn đồng thời chấp thuận <a href="">Điều Khoản</a> của chúng tôi.
                        </p>
                    </div>
                    <div className="fl">
                    <button className="checkloaded-contine checkloaded-bg" onClick={() => handleContinue(selectedPackageId)}>Tiếp Tục</button>
                        <button className="checkloaded-contine checkloaded-bgn" onClick={()=>navigate("/Profile")}>Không, Cảm ơn</button>
                    </div>
                    </div>
                   </div>
                </div>
            </div>
           </div>
        </div>
    );
};

export default Loaded;
