import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import Dashboard from '@/pages/Dashboard';
import ProductsTable from '@/pages/ProductsTable';
import LocalUsersTable from '@/pages/LocalUsersTable';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import SignIn from '@/pages/SignIn';
import NotFound from '@/pages/NotFound';
import { ROUTES } from '@/constants/routes.constant';

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path={ROUTES.DASHBOARD} element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          } />
          <Route path={ROUTES.USERS_LIST} element={
            <AdminLayout>
              <ProductsTable />
            </AdminLayout>
          } />
          <Route path={ROUTES.LOCAL_USERS} element={
            <AdminLayout>
              <LocalUsersTable />
            </AdminLayout>
          } />
          <Route path="/profile" element={
            <AdminLayout>
              <Profile />
            </AdminLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;

