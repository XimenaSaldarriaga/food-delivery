import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? <Outlet /> : <Navigate to={'/'} />}
    </div>
  );
};

export default PrivateRouter;
