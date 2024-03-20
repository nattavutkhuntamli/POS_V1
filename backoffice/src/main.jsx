import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider,  Navigate } from 'react-router-dom';  

import dashboard  from './pages/dashboard/dashboard.jsx'
import Reportmember from './pages/ReportMember/Reportmember.jsx';
import ReportChangePackage from './pages/ReportChangePackage/ReportChangePackage.jsx';

const ProtectedRoute = ({ element:Element, ...rest}) => {
  const isLoginBackend = localStorage.getItem('isLoginBackend')
  if (isLoginBackend === null) {
    return <Navigate to="/" />;
  } else {
    // Render the protected route
    return <Element {...rest} />;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={dashboard} />
  },
  {
    path: "/Reportmember",
    element: <ProtectedRoute element={Reportmember} />
  },
  {
    path:"/ReportChangePackage",
    element: <ProtectedRoute element={ReportChangePackage} />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>,
)
