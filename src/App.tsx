import "flowbite";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import store from "@/app/store.ts";
import { Provider } from "react-redux";
import { FAQ } from "@/pages/faq/FAQ.tsx";
import { Main } from "@/pages/main/Main.tsx";
import { Cart } from "@/pages/cart/Cart.tsx";
import { Login } from "@/pages/login/Login.tsx";
import { Order } from "@/pages/order/Order.tsx";
import { Contact } from "@/pages/contact/Contact.tsx";
import { AboutUs } from "@/pages/about-us/AboutUs.tsx";
import { MyOrder } from "@/pages/my-order/MyOrder.tsx";
import { Register } from "@/pages/register/Register.tsx";
import { NotFound } from "@/pages/not-found/NotFound.tsx";
import { CartProvider } from "@/contexts/CartContext.tsx";
import ProductDetail from "@/components/ProductDetail.tsx";
import { ProductList } from "@/pages/product-list/ProductList.tsx";
import { VerifyEmail } from "@/pages/verify-email/VerifyEmail.tsx";
import { PrivacyPolicy } from "@/pages/privacy-policy/PrivacyPolicy.tsx";
import { TermCondition } from "@/pages/terms-condition/TermCondition.tsx";
import { ShippingReturn } from "@/pages/shiping-return/ShippingReturn.tsx";
import { ForgotPassword } from "@/pages/forgot-password/ForgotPassword.tsx";

function App() {
  return (
    <Provider store={store}>
      <CartProvider>
        <Cart />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="FAQ" element={<FAQ />} />
              <Route path="order" element={<Order />} />
              <Route path="login" element={<Login />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="my-order" element={<MyOrder />} />
              <Route path="register" element={<Register />} />
              <Route path="products" element={<ProductList />} />
              <Route path="forgot" element={<ForgotPassword />} />
              <Route path="verify-email" element={<VerifyEmail />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-conditions" element={<TermCondition />} />
              <Route path="shipping-return" element={<ShippingReturn />} />
              <Route path="product-detail/:id" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </Provider>
  );
}

export default App;
