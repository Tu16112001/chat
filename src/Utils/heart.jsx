// src/HeartLoading.js
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const HeartLoading = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const navigateTimer = setTimeout(() => {
        navigate('/profile');
      }, 1000);
  
      return () => clearTimeout(navigateTimer);
    }, [navigate]);
  
    return (
      <div className="spinner">
        <div className="blob blob-0"></div>
      </div>
    );
  };
  
  export default HeartLoading;
