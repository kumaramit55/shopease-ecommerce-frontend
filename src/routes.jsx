import { Routes, Route, Navigate } from "react-router";
import AuthGuard from "./auth/compoent/authGurad";

import MainLayout from "./layout/MainLayout";

/* PAGES */
import Login from "./auth/pages/login";
import UserLanding from "./user/landing-Page";
import ProductList from "./user/product-List";
import ProductDetail from "./user/productDetail";
import Cart from "./user/cart";
import Checkout from "./user/chekout";
import OrderSuccess from "./user/orderSucces";
import MyOrders from "./user/myorder";

/* ADMIN */
import AdminDashboard from "./admin/pages/admin-dashboard";
import AdminProductList from "./admin/products/productList";
import AddEditProduct from "./admin/products/ProductForm";
import AdminOrders from "./admin/products/orderHistory";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* USER LAYOUT */}
      <Route
        element={
          <AuthGuard allowedRoles={["USER"]}>
            <MainLayout />
          </AuthGuard>
        }>
        <Route path="/" element={<UserLanding />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Route>

      {/* ADMIN ROUTES (NO FOOTER) */}
      <Route
        path="/admin"
        element={
          <AuthGuard allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </AuthGuard>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AuthGuard allowedRoles={["ADMIN"]}>
            <AdminProductList />
          </AuthGuard>
        }
      />

      <Route
        path="/admin/products/add"
        element={
          <AuthGuard allowedRoles={["ADMIN"]}>
            <AddEditProduct />
          </AuthGuard>
        }
      />

      <Route
        path="/admin/products/edit/:id"
        element={
          <AuthGuard allowedRoles={["ADMIN"]}>
            <AddEditProduct />
          </AuthGuard>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AuthGuard allowedRoles={["ADMIN"]}>
            <AdminOrders />
          </AuthGuard>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
