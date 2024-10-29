import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './Router/Router';
import React, { useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./FireBase/config";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from './Redux/authActions';
import ProtectedRoute from './ProtectedRoute';// Import biểu tượng loading từ Ant Design

function App() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      dispatch(loginSuccess({ uid: storedUserId }));
    } else {
      if (user) {
        localStorage.setItem("userId", user.uid);
        dispatch(loginSuccess(user));
      } else {
        dispatch(loginFailure('User not authenticated'));
      }
    }
  }, [user, dispatch]);


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
       <div className="spinner">
        <div className="blob blob-0"></div>
      </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={
                route.path === '/' 
                  ? (isLoggedIn ? <Navigate to="/Heart" replace /> : <route.page />)
                  : (isLoggedIn ? <ProtectedRoute><route.page /></ProtectedRoute> : <Navigate to="/" replace />)
              } 
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
