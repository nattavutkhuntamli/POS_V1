import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,  Navigate } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Product from './pages/Product.jsx';
import User from './pages/User.jsx';
import Sale from './pages/Sale.jsx';
import BillSales from './pages/BillSales.jsx';
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isLoginMember = localStorage.getItem('isLoginMember');
  if (isLoginMember === null) {
    return <Navigate to="/login" />;
  } else {
    // Render the protected route
    return <Element {...rest} />;
  }
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: <ProtectedRoute element={Home} />
  },
  {
    path: "/about",
    element: <ProtectedRoute element={About} />
  },
  {
    path: "/product",
    element: <ProtectedRoute element={Product} />
  },
  {
    path: "/user",
    element: <ProtectedRoute element={User} />
  },
  {
    path: "/sale",
    element: <ProtectedRoute element={Sale} />
  },
  {
    path: "/billsale",
    element: <ProtectedRoute element={BillSales} />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
