import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ActivityLogs from "./pages/ActivityLogs";
import LowStock from "./pages/LowStock";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Layout from "./components/Layout";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />
          <Route
  path="/register"
  element={<Register />}
/>

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Layout>
                <Dashboard />
              </Layout>

            </ProtectedRoute>
          }
        />


        {/* Products */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>

              <Layout>
                <Products />
              </Layout>

            </ProtectedRoute>
          }
        />


        {/* Add Product - StoreAdmin only */}

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>

              <RoleRoute allowedRole="StoreAdmin">

                <Layout>
                  <AddProduct />
                </Layout>

              </RoleRoute>

            </ProtectedRoute>
          }
        />


        {/* Edit Product - StoreAdmin only */}

        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>

              <RoleRoute allowedRole="StoreAdmin">

                <Layout>
                  <EditProduct />
                </Layout>

              </RoleRoute>

            </ProtectedRoute>
          }
        />


        {/* Activity Logs */}

        <Route
          path="/activity-logs"
          element={
            <ProtectedRoute>

              <Layout>
                <ActivityLogs />
              </Layout>

            </ProtectedRoute>
          }
        />


        {/* Low Stock */}

        <Route
          path="/low-stock"
          element={
            <ProtectedRoute>

              <Layout>
                <LowStock />
              </Layout>

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;