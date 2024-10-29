import React from "react";
import Footer from "../../Components/Footer/Footer";


const ABC = () => {

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ background: 'linear-gradient(to right, #fe004d, rgb(248, 163, 4))', width: "100%", height: "95vh", position: "absolute", zIndex: "-1" }}>
            </div>
            <div style={{ width: "90%" }}>
                <div style={{
                    width: "100%", height: "140vh", display: "flex"
                    , alignItems: 'center', flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: "65%", marginTop: "5%", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                <img src="" alt="" />
                                <h1>
                                    asd
                                </h1>
                            </div>
                            <h2>
                                sdfhjg
                            </h2>
                            <button>tai</button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <img src="https://tinder.com/static/build/build-ssg/static/phone-frame-4b7178071dd47f185c13d14c95f05b24.webp" width={370} height={740} style={{ position: "absolute", zIndex: "2" }}
                            />
                            <img src="https://tinder.com/static/build/build-ssg/static/sabrina-84e7308be9589d5c1f840ae6dd114c8f.webp" width={330} height={690} style={{ position: "relative", zIndex: "1", left: "20px", top: "23px" }} />
                        </div>
                    </div>
                    <div style={{marginTop:"50px",width:"75%"}}>
                        <h1>Các Nền tảng và Thiết bị được hỗ trợ</h1>
                        <p>Tinder hiện có trên các thiết bị iOS, Android, và HarmonyOS. Ngoài ứng dụng di động, bạn có thể truy cập Tinder.com để sử dụng Tinder phiên bản Web.</p>
                        <p>Chúng tôi cũng cung cấp phiên bản gọn nhẹ của Tinder để bạn có thể sử dụng thuận tiện ở mọi nơi - tải Tinder Lite từ Google Play store.</p>
                        <p>Tinder currently supports iOS 15.0 and up, Android 7.0 and up, and the latest versions of all major web browsers (Chrome, Firefox, Safari, Edge, etc.).</p>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
export default ABC