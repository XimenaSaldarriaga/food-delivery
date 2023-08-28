import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = ({ isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated ? <Outlet /> : <Navigate to={'/'} />}
    </div>
  );
};

export default PrivateRouter;
