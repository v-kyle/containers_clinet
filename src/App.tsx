import React, { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from './stores/UserStore';
import './assets/styles/common.scss';
import Main from './pages/Main';
import Auth from './pages/Auth';
import ClusterPage from './pages/ClusterPage';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    if (userStore.isAuth) return;

    navigate('/auth');
  }, [userStore.isAuth, location.pathname]);

  return (
    <div className="content-layout">
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cluster/:id" element={<ClusterPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default observer(App);
