import React from "react"
import { Divider } from 'antd'
import {
    FacebookOutlined, TwitterOutlined, InstagramOutlined, TikTokOutlined,
    YoutubeOutlined
} from '@ant-design/icons'
import appPlay from '../../Image/png-clipart-app-store-apple-google-play-iphone-mid-autumn-lantern-text-logo.png'
import Play from '../../Image/png-clipart-google-play-text-google-play-android-app-store-google-play-text-logo.png'

const Footer = () => {



    return (
            <div style={{width:'100%'}}>
            <div style={{ marginTop: "30px", width: "90%", display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "23%" }}>
                    {/* Mục thứ nhất: Pháp lý */}
                    <h3>Pháp lý</h3>

                    <li style={{ padding: '5px' }}><a href="/Security" className="a_color ">Chính sách bảo mật</a></li>
                    <li style={{ padding: '5px' }}><a href="/Security"  className="a_color ">Điều khoản sử dụng</a></li>
                    <li style={{ padding: '5px' }}><a href="/Security"  className="a_color ">Quy định và điều kiện</a></li>

                </div>
                <div style={{ width: "23%" }}>
                    {/* Mục thứ hai: Nghề nghiệp */}
                    <h3>Nghề nghiệp</h3>

                    <li style={{ padding: '5px' }}><a href="/Security"  className="a_color ">Tuyển dụng</a></li>
                    <li style={{ padding: '5px' }}><a href="/Security"  className="a_color ">Thực tập</a></li>
                    <li style={{ padding: '5px' }}><a href="/Security"  className="a_color ">Liên hệ</a></li>

                </div>
                <div style={{ width: "23%" }}>
                    {/* Mục thứ ba: Mạng xã hội */}
                    <h3>Mạng xã hội</h3>

                    <div style={{ display: 'flex' }}>
                        <li style={{ padding: '5px' }}><a href="/Security"  className="a_color a1"><FacebookOutlined /></a></li>
                        <li style={{ padding: '5px' }}><a href="/Security" className="a_color a1"><TikTokOutlined /></a></li>
                        <li style={{ padding: '5px' }}><a href="/Security" className="a_color a1"><YoutubeOutlined /></a></li>
                        <li style={{ padding: '5px' }}><a href="/Security" className="a_color a1"><TwitterOutlined /></a></li>
                        <li style={{ padding: '5px' }}><a href="/Security" className="a_color a1"><InstagramOutlined /></a></li>
                    </div>

                </div>
                <div style={{ width: "23%" }}>
                    {/* Mục thứ tư: Bảo mật */}

                    <ul>
                        <li style={{ padding: '5px' }}><a href="/Security" className="a_color ">Biện pháp bảo mật</a></li>
                        <li style={{ padding: '5px' }}><a href="/Security" className="a_color">Báo cáo lỗ hổng bảo mật</a></li>
                        <li style={{ padding: '5px' }}><a href="/Security" className="a_color">Chính sách cookie</a></li>
                    </ul>
                </div>

            </div>
            <Divider></Divider>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>Tải ứng dụng!</h3>
                <a href="/Security" style={{ marginLeft: '30px' }}>
                    <img src={appPlay} alt="Download on AppStore" style={{ width: '100%', height: '45px', borderRadius: '6px' }} />
                </a>
                <a href="/Security" style={{ marginLeft: '30px' }}>
                    <img src={Play} alt="Download on Google Play" style={{ width: '100%', height: '45px', borderRadius: '6px' }} />

                </a>
            </div>
            <p style={{ fontSize: "14px" }}>
                Gửi những ai còn độc thân: Nếu bạn đang tìm kiếm người yêu, muốn bắt đầu hẹn hò, hay chỉ đơn giản là muốn có thêm bạn, bạn cần có mặt trên Tinder. Với hơn 55 tỷ lượt tương hợp thành công, Tinder chính là nơi để gặp gỡ tương hợp tốt nhất tiếp theo của bạn. Chân thành mà nói, môi trường hẹn hò ngày nay không còn giống như xưa nữa, giờ đây hầu hết mọi người đang gặp gỡ trực tuyến. Với Tinder, ứng dụng hẹn hò miễn phí phổ biến nhất trên thế giới, hàng triệu người độc thân tuyệt vời khác luôn nằm trong tầm tay bạn. Không những thế họ luôn sẵn sàng gặp gỡ những người mới như bạn. Dù bạn thẳng hay thuộc cộng đồng LGBTQIA, Tinder luôn sẵn sàng mang đến cho bạn các cơ hội gặp gỡ.
                <br /><br />

                Sẽ luôn có điều gì đó phù hợp cho mọi người trên Tinder. Bạn muốn có một mối quan hệ? Sẽ có. Bạn muốn tìm thêm bạn bè? Cũng sẽ có. Bạn mới tới ký túc xá và muốn trải nghiệm học đại học của mình tuyệt nhất? Tinder U sẽ giúp bạn. Tinder không phải là trang hẹn hò thường thường bậc trung — Tinder là ứng dụng hẹn hò đa dạng nhất, nơi những con người trưởng thành thuộc mọi tầng lớp xã hội với những trải nghiệm phong phú khác nhau được khuyến khích tạo dựng các kết nối, kỷ niệm, hay những điều tương tự.
            </p>
            <Divider></Divider>
            <div style={{ display: "flex", justifyContent: 'space-between', width: '100%', height: '50px' }}>
                <div>
                    <a href="/Security" >Câu Hỏi Thường Gặp</a>/
                    <a href="/Security" >Bí quyết An toàn</a>/
                    <a href="/Security" >Điều khoản</a>/
                    <a href="/Security" >Chính sách Cookie</a>/
                    <a href="/Security" >Cài đặt Quyền Riêng Tư</a>
                </div>
                <div>

                    @2024 Eproject Mathes

                </div>
            </div>
            </div>
            )
}
            export default Footer