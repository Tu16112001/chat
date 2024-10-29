import React, { useState, useEffect } from "react";
import axios from 'axios';
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";

const ListImage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]); // State to store images
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        // Fetch user data from the API
        axios.get(`http://localhost:8080/public/profile/getId?id=${userId}`)
            .then(response => {
                // Extract images from the API response
                const { result } = response.data;
                const userImages = result.images.split(',');
                setImages(userImages);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to run the effect only once

    const handleNextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
    };

    const handlePrevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
    };

    return (
        <div>
            {/* Render the current image */}
            <img src={images[currentIndex]} alt="" width={375} height={468.75} style={{ objectFit: "cover"}} />
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", position: "relative", bottom: 472.25 }}>
            <button onClick={handlePrevImage} className="backimage"> <PiCaretLeftBold className="next" /></button>
             <button onClick={handleNextImage} className="backimage"> < PiCaretRightBold className="next2"/></button>
            </div>
        </div>
    );
};

export default ListImage;
