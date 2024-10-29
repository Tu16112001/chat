import React from "react";
import Logo from "../../Image/Lovepik_com-380607142-free-printable-heart-vector-cartoon-in-the-style-of-crimson-and-beige-cartoon-sticker.png";
import Play from '../../Image/png-clipart-google-play-text-google-play-android-app-store-google-play-text-logo.png';
import appPlay from '../../Image/png-clipart-app-store-apple-google-play-iphone-mid-autumn-lantern-text-logo.png';
import {  Button, Typography, message } from 'antd';
import { auth, firebase } from '../../FireBase/config';
import { useNavigate } from "react-router-dom";
import { addDocument } from '../../FireBase/services';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { loginFailure } from '../../Redux/authActions';// Import saveProfileId từ reducer
const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo?.isNewUser) {
        await addDocument('users', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          providerId: additionalUserInfo.providerId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
     
      const response = await axios.post('http://localhost:8080/auth/signin/social', {
        name: user.displayName,
        email: user.email
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isVipTinder', response.data.isVipTinder);
      if (response.data.statusCode === 200) {
        const getIdResponse = await axios.post('http://localhost:8080/auth/token/getId', {
          token: response.data.token
          
        });
       
        localStorage.setItem('userId', getIdResponse.data.result.id);

        if(!response.data.isHasProfile) {
         
          navigate("/CreateProfile");
        } else {
          // Nếu chưa có profile, chuyển hướng đến trang CreateProfile
          navigate("/Heart");
        }
      } else {
        dispatch(loginFailure(response.data.message));
        message.error("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      message.error('Tài khoản đã tồn tại với các thông tin đăng nhập khác. Vui lòng đăng nhập bằng phương thức đã sử dụng trước đó.');
    }
  };

    return (
        <div style={{ width: "320px", height: "450px", display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <img src={Logo} alt="Heart Logo" width={50} height={50} />
            <h1>Bắt Đầu</h1>
            
            <p style={{ width: "230px", fontSize: "12px" }}>
                Bạn có đồng ý với <a style={{ fontSize: '13px', color: 'blue' }} href="#">điều khoản</a>{" "}
                và <a style={{ fontSize: '13px', color: 'blue' }} href="#">Chính sách bảo mật</a> của chúng tôi?
            </p>
            <div className="Setting">
       
          <Button
            style={{  width: '240px',display:"flex",alignItems:"center",justifyContent:"space-around", marginBottom: 15 }}
            onClick={() => handleLogin(googleProvider)}
          >
            <FcGoogle fontSize={18} />
            Đăng nhập bằng Google
          </Button>
          <Button
          
            style={{ width: '240px',display:"flex",alignItems:"center",justifyContent:"space-around" }}
            onClick={() => handleLogin(fbProvider)}
          >
            <FaFacebook fontSize={18}/>
            Đăng nhập bằng Facebook
          </Button>
          
            </div>
            
            <div style={{ display: 'flex', flexDirection: "column", width: '220px', marginTop: "20px" }}>
                <a style={{ fontSize: '13px', color: 'blue' }} href="#">Sự cố khi đăng nhập?</a>
            </div>
            <h4 style={{ marginTop: '30px' }}>Tải ứng dụng!</h4>
            <div>
                <a href="#">
                    <img src={appPlay} alt="Download on AppStore" style={{ width: '100px', height: '35px', borderRadius: '6px' }} />
                </a>
                <a href="#" style={{ marginLeft: '30px' }}>
                    <img src={Play} alt="Download on Google Play" style={{ width: '100px', height: '35px', borderRadius: '6px' }} />
                </a>
            </div>
        </div>
    );
};

export default Register;
