import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { DashboardLayout } from '@/layouts/dashboard/DashboardLayout';
import DashboardPage from '@/pages/dashboard';
import UsersPage from '@/pages/users';
import ProfileManagementPage from './pages/profile-management';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Add other routes as we create them */}
          <Route
            path="/products"
            element={<div>Products Page (Coming Soon)</div>}
          />
          <Route path="/stock" element={<div>Stock Page (Coming Soon)</div>} />
          <Route path="/users" element={<UsersPage />} />
          <Route
            path="/profile-management"
            element={<ProfileManagementPage></ProfileManagementPage>}
          />
          <Route
            path="/settings"
            element={<div>Settings Page (Coming Soon)</div>}
          />
        </Route>
      </Routes>
    </Router>
  );
}
