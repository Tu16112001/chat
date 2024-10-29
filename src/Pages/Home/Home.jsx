import React from "react";
import SliderText from "../../Components/Footer/Slider_text";
import Header from "../../Components/Header/Header";


const Home = () => {

    return(
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
            <Header/>
            <SliderText/>
        </div>
    )
}
export default Home