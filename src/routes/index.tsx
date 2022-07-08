import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        {
          path: 'app-user',
          children: [{ path: 'list', element: <AppUserList /> }],
        },
        {
          path: 'warehouse',
          children: [{ path: 'list', element: <WarehouseList /> }],
        },
        {
          path: 'customer',
          children: [{ path: 'list', element: <CustomerList /> }],
        },
        {
          path: 'category',
          children: [{ path: 'list', element: <CategoryList /> }],
        },
        {
          path: 'product',
          children: [{ path: 'list', element: <ProductList /> }],
        },
        {
          path: 'beginning-voucher',
          children: [{ path: 'list', element: <BeginningVoucherList /> }],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <DashboardLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <Navigate to={PATH_AFTER_LOGIN} />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD
// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/generalApp/GeneralApp')));

// APP USER
const AppUserList = Loadable(lazy(() => import('../pages/dashboard/appUser/AppUserList')));

// WAREHOUSE
const WarehouseList = Loadable(lazy(() => import('../pages/dashboard/warehouse/WarehouseList')));

// CUSTOMER
const CustomerList = Loadable(lazy(() => import('../pages/dashboard/customer/CustomerList')));

// CATEGORY
const CategoryList = Loadable(lazy(() => import('../pages/dashboard/category/CategoryList')));

// PRODUCT
const ProductList = Loadable(lazy(() => import('../pages/dashboard/product/ProductList')));

// BEGINNING VOUCHER
const BeginningVoucherList = Loadable(
  lazy(() => import('../pages/dashboard/beginningVoucher/BeginningVoucherList'))
);

// MAIN
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
