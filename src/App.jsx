import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import DefaultLayout from './layout/DefaultLayout';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import AddMoney from './components/Wallet/AddMoney/AddMoney';
import ApplyAdManager from './pages/Ad/ApplyAdManager/ApplyAdManager';
import NotAuthorized from './pages/NotAuthorized/NotAuthorized';
import PrivateRoute from './hooks/PrivateRoute';
import auth from './firebaseInit';

function App() {
  const [user, loading] = useAuthState(auth); // Use the auth object
  const [isLoading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Authentication Route */}
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* Protected Routes */}
      <Route
        path="*"
        element={
          <PrivateRoute>
            <DefaultLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/wallet/add-money" element={<AddMoney />} />
                <Route path="/ad/apply" element={<ApplyAdManager />} />
                {/* Additional Routes can go here... */}
              </Routes>
            </DefaultLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
