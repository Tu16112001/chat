import React, { useEffect, useState } from "react";
import { BackGroundHeader } from "../../Style/Background";
import Logo from '../../Image/Lovepik_com-380607142-free-printable-heart-vector-cartoon-in-the-style-of-crimson-and-beige-cartoon-sticker.png'
import { TranslationOutlined } from '@ant-design/icons'
import Register from '../../Pages/Login/Register'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const [isFixed, setIsFixed] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loginPosition, setLoginPosition] = useState("fixed");
    const [createDisplay, setCreateDisplay] = useState("block");
    const navigate = useNavigate();
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const triggerHeight = viewportHeight * 0.82; // 80% chiều cao của viewport

            if (scrollPosition >= triggerHeight) {
                setIsFixed(false);
            } else {
                setIsFixed(true);
            }

            // Tính toán độ trong suốt dựa trên vị trí cuộn
            const maxScroll = viewportHeight; // Cuộn hết một viewport height (100vh)
            const fadeOutStart = 0.1 * maxScroll; // Điểm bắt đầu mờ dần (70% của viewport height)
            const fadeOutEnd = 0.5 * maxScroll; // Cuộn hết một viewport height (100vh)
            const distance = Math.min(Math.max(scrollPosition - fadeOutStart, 0), fadeOutEnd - fadeOutStart);
            const opacity = 1 - distance / (fadeOutEnd - fadeOutStart);

            setOpacity(opacity);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        setLoginPosition(isLoginOpen ? "absolute" : "fixed");
        setCreateDisplay(isLoginOpen ? "none" : "flex");
    }, [isLoginOpen]);
    return (
        <BackGroundHeader>
            <div style={{
                display: 'flex', justifyContent: 'space-between', width: '100%'
                , position: loginPosition, transition: "top 0.5s ease-in-out",
                top: isFixed ? "0" : "-150px"
            }}>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <div className="Setting logo-container">
                        <img src={Logo} alt="Logo" />
                        <h1 style={{margin:"8px 0 0 0 "}}>LOVE</h1>
                    </div>
                    <div className="menu-container">
                        <nav>
                            <ul>
                                <li><a href="/Security">Sản phẩm</a></li>
                                <li><a href="/Security">Tìm hiểu</a></li>
                                <li><a  href="/Security">An toàn</a></li>
                                <li><a href="/ABC">Tải về</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="login-container">
                    <a style={{ fontSize: '20px', fontWeight: "900", color: "white", margin: '0 15px 0 0' }}><TranslationOutlined /> Ngôn ngữ</a>
                    <button onClick={() => setIsLoginOpen(true)}>Đăng nhập</button>
                </div>
            </div>
            {isLoginOpen && (
                <div className="fixed-background">
                    
                    <div className="login-window">
                    <a style={{float:"inline-end"}} onClick={() => setIsLoginOpen(false)}>X</a>
                        <Register />
                       
                    </div>
                </div>
            )}
            <div className="ceate" style={{
                paddingTop: "22%", display: "flex", alignItems: "center", flexDirection: 'column', opacity,display: createDisplay
            }}>
                <div style={{ fontSize: "100px", fontWeight: "700", color: 'white', cursor: "pointer",zIndex:"2" }} >
                    Quẹt Phải
                </div>
                <button style={{zIndex:"2"}} onClick={() => setIsLoginOpen(true)}>Tạo tài khoản </button>
            </div>
           
        </BackGroundHeader>
    )
}

export default Header;
