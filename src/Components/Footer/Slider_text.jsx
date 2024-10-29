import React from "react"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Footer from "./Footer"
import { Divider } from "antd"


const SliderText = () => {
  const [sliderRef] = useKeenSlider(

    {
      loop: true,
      slidesPerView: 3,

    },

    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  return (
    <div style={{ marginTop: '30px', width: '90%', zIndex: "-1" }}>
      <div ref={sliderRef} className="keen-slider" >
        <div className="keen-slider__slide number-slide1 ">
          <div className="fle " >
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Magdalena & Annie</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>Nhờ Tinder, tôi tìm được tình yêu của đời và chúng tôi sắp kết hôn.

                Sau những những buổi hẹn hò và vài buổi tối vui vẻ, tôi tình cờ gặp Miranda.
                Sau khi đọc hồ sơ, tôi đã quẹt phải không do dự ngay khi đọc câu chốt… 'Đang tìm nửa còn lại của đời mình.' Sau khi chat với nhau được khoảng một tuần,
                chúng tôi gặp mặt đầu tiên và tôi đã biết cô ấy có điều gì đó rất đặc biệt!</p>
            </div>
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Hoàng và Linh</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>Gửi tất cả những ai đang độc thân, đặc biệt là những người hướng nội như chúng tôi: đừng ngại vượt ra ngoài vùng an toàn của các bạn. Đó là nơi bạn sẽ tạo được một mối liên kết chân thành. Tinder đã đưa chúng tôi đến với nhau và tôi mãi mãi biết ơn vì điều đó. ❤</p>
            </div>
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Hạnh</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>CẢM ƠN TINDER vì đã giúp tôi gặp được tri kỷ của mình. Chỉ năm phút sau khi bắt đầu nói chuyện, cô ấy, người hiện là bà xã của tôi đã nói về chuyện chúng tôi sẽ có một đám cưới tuyệt thế nào.</p>
            </div>
           </div>
        </div>
        <div className="keen-slider__slide number-slide1 ">
          <div className="fle " >
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Bình</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>Tôi tìm được tình yêu của đời và chúng tôi sắp kết hôn.

                Sau những những buổi hẹn hò và vài buổi tối vui vẻ, tôi tình cờ gặp Hải.
                </p>
            </div>
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Linh</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>Gửi tất cả những ai đang độc thân, đặc biệt là những người hướng nội như chúng tôi: đừng ngại vượt ra ngoài vùng an toàn của các bạn. Đó là nơi bạn sẽ tạo được một mối liên kết chân thành.
               Tinder đã đưa chúng tôi đến với nhau và tôi mãi mãi biết ơn vì điều đó. ❤</p>
            </div>
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Hạnh</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>CẢM ƠN TINDER vì đã giúp tôi gặp được tri kỷ của mình. Chỉ năm phút sau khi bắt đầu nói chuyện, cô ấy, người hiện là bà xã của tôi đã nói về chuyện chúng tôi sẽ có một đám cưới tuyệt thế nào.</p>
            </div>
           </div>
        </div>
        <div className="keen-slider__slide number-slide1 ">
          <div className="fle " >
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Magdalena & Annie</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>Nhờ Tinder, tôi tìm được tình yêu của đời và chúng tôi sắp kết hôn.

                Sau những những buổi hẹn hò và vài buổi tối vui vẻ, tôi tình cờ gặp Miranda.
                Sau khi đọc hồ sơ, tôi đã quẹt phải không do dự ngay khi đọc câu chốt… 'Đang tìm nửa còn lại của đời mình.' Sau khi chat với nhau được khoảng một tuần,
                chúng tôi gặp mặt đầu tiên và tôi đã biết cô ấy có điều gì đó rất đặc biệt!</p>
            </div>
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Hoàng và Linh</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>Gửi tất cả những ai đang độc thân, đặc biệt là những người hướng nội như chúng tôi: đừng ngại vượt ra ngoài vùng an toàn của các bạn. Đó là nơi bạn sẽ tạo được một mối liên kết chân thành. Tinder đã đưa chúng tôi đến với nhau và tôi mãi mãi biết ơn vì điều đó. ❤</p>
            </div>
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Hạnh</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>CẢM ƠN TINDER vì đã giúp tôi gặp được tri kỷ của mình. Chỉ năm phút sau khi bắt đầu nói chuyện, cô ấy, người hiện là bà xã của tôi đã nói về chuyện chúng tôi sẽ có một đám cưới tuyệt thế nào.</p>
            </div>
           </div>
        </div>
        <div className="keen-slider__slide number-slide1 ">
          <div className="fle " >
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Magdalena & Annie</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>Nhờ Tinder, tôi tìm được tình yêu của đời và chúng tôi sắp kết hôn.

                Sau những những buổi hẹn hò và vài buổi tối vui vẻ, tôi tình cờ gặp Miranda.
                Sau khi đọc hồ sơ, tôi đã quẹt phải không do dự ngay khi đọc câu chốt… 'Đang tìm nửa còn lại của đời mình.' Sau khi chat với nhau được khoảng một tuần,
                chúng tôi gặp mặt đầu tiên và tôi đã biết cô ấy có điều gì đó rất đặc biệt!</p>
            </div>
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Hoàng và Linh</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>Gửi tất cả những ai đang độc thân, đặc biệt là những người hướng nội như chúng tôi: đừng ngại vượt ra ngoài vùng an toàn của các bạn. Đó là nơi bạn sẽ tạo được một mối liên kết chân thành. Tinder đã đưa chúng tôi đến với nhau và tôi mãi mãi biết ơn vì điều đó. ❤</p>
            </div>
            <div className="number_chat">
              <div className="fle">
                <div style={{width:"70%",marginTop:"17px"}}>
                  <h4 style={{ fontSize: "17px",margin:"0 0 0 20px" }}>Hạnh</h4>
              <Divider /></div>
                <div style={{width:"30%"}}><p style={{margin:"0",fontSize:"100px",textAlign:"center"}}>❝</p></div>
              </div>
              <p style={{ fontSize: "15px",padding:"0 18px 0 18px",margin:"0"}}>CẢM ƠN TINDER vì đã giúp tôi gặp được tri kỷ của mình. Chỉ năm phút sau khi bắt đầu nói chuyện, cô ấy, người hiện là bà xã của tôi đã nói về chuyện chúng tôi sẽ có một đám cưới tuyệt thế nào.</p>
            </div>
           </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default SliderText