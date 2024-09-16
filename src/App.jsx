import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import DefaultLayout from './layout/DefaultLayout';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import AddMoney from './components/Wallet/AddMoney/AddMoney';
import ApplyAdManager from './pages/Ad/ApplyAdManager/ApplyAdManager';
// import SignUp from './pages/Authentication/SignUp'; // Uncomment if SignUp component exists

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Inventory Dashboard " />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Inventory Dashboard " />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/wallet/add-money"
          element={
            <>
              <PageTitle title="Add Money " />
              {/* Uncomment the next line if you have a SignUp component */}
              <AddMoney />
            </>
          }
        />
        <Route
          path="/ad/apply"
          element={
            <>
              <PageTitle title="Apply for ad manager " />
              {/* Uncomment the next line if you have a SignUp component */}
              <ApplyAdManager />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              {/* Uncomment the next line if you have a SignUp component */}
              {/* <SignUp /> */}
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
