import styled from "styled-components";
import Banner1 from '../Image/744fe6d80266616aba687006b7d764ad.webp';
import banner2 from '../Image/background-image-3762450_1920.jpg'
import banner3 from '../Image/mom-616363_1920.jpg'
export const BackGroundHeader = styled.div`
    background-image: url(${Banner1});
    background-size: 100% 100%;
    background-position: center;
    width: 100%;
    height: 100vh;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Màu đen với độ mờ 50% */
    }`


    export const BackGroundHeader2 = styled.div`
    background-image: url(${banner2});
    background-size: 100% 105%;
    background-position: center;
    width: 100%;
    height: 100vh;
  `
  export const BackGroundHeader3 = styled.div`
  background-image: url(${banner3});
  background-size: 100% 105%;
  background-position: center;
  width: 100%;
  height: 100vh;
`
export const BackGroundHeader4 = styled.div`
background-image: url(${banner3});
background-size: 148% 148%;
background-position: center;
width: 100%;
height: 100vh;
`