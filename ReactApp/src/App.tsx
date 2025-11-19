import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import AuthChecker from '@/components/AuthChecker';
import ThemeProvider from '@/components/ThemeProvider';
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import ProductsTable from '@/pages/ProductsTable';
import LocalUsersTable from '@/pages/LocalUsersTable';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import SignIn from '@/pages/SignIn';
import NotFound from '@/pages/NotFound';
import { ROUTES } from '@/constants/routes.constant';

function App() {
  return (
    <ThemeProvider>
      <AuthChecker>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path={ROUTES.DASHBOARD} element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path={ROUTES.USERS_LIST} element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductsTable />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path={ROUTES.LOCAL_USERS} element={
          <ProtectedRoute>
            <RoleProtectedRoute requiredRole="admin">
              <AdminLayout>
                <LocalUsersTable />
              </AdminLayout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <AdminLayout>
              <Profile />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <AdminLayout>
              <Settings />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </AuthChecker>
    </ThemeProvider>
  );
}

export default App;

