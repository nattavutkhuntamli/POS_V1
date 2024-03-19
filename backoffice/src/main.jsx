import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider,  Navigate } from 'react-router-dom';  

import dashboard  from './pages/dashboard/dashboard.jsx'

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
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>,
)
