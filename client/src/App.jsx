import './app.css';
import { Route, Routes } from "react-router-dom"
import NoteFound from './components/not-found';
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminProducts from "./pages/admin-view/products"
import AdminOrders from "./pages/admin-view/orders"
import AdminFeatures from "./pages/admin-view/features"
import ShoppingLayout from './components/shopping-view/layout';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingAccount from './pages/shopping-view/account';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckout from './pages/shopping-view/checkout';
import CheckAuth from './components/common/check-auth';
import UnAuthorized from './components/not-access';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slices';
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from './pages/shopping-view/paypal-return';
import PaymentSuccessPage from './pages/shopping-view/payment-success';
import SearchProducts from './pages/shopping-view/search';


function App() {

  // const isAuthenticated = false;
  // const user = null;

  const {user , isAuthenticated , isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])

  if(isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common components */}


      {/* routes */}
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<h1>HOME PAGE</h1>}></Route>
        {/* auth */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        {/* admin-view */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        {/* shopping-view */}
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage/>} />
          <Route path="payment-success" element={<PaymentSuccessPage/>} />
          <Route path="search" element={<SearchProducts/>} />
        </Route>
        {/* PAGE NOT FOUND */}
        <Route path="*" element={<NoteFound />}></Route>
        {/* No Access Denine */}
        <Route path="/unauth-page" element={<UnAuthorized />}></Route>
      </Routes>
    </div>
  )
}

export default App;
