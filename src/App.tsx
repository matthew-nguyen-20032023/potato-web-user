import "flowbite";
import "@/App.css";

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
import ProductDetail from "@/components/ProductDetail.tsx";
import { ProductList } from "@/pages/product-list/ProductList.tsx";
import { VerifyEmail } from "@/pages/verify-email/VerifyEmail.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivacyPolicy } from "@/pages/privacy-policy/PrivacyPolicy.tsx";
import { TermCondition } from "@/pages/terms-condition/TermCondition.tsx";
import { ShippingReturn } from "@/pages/shiping-return/ShippingReturn.tsx";
import { ForgotPassword } from "@/pages/forgot-password/ForgotPassword.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "FAQ", element: <FAQ /> },
      { path: "order", element: <Order /> },
      { path: "login", element: <Login /> },
      { path: "contact", element: <Contact /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "my-order", element: <MyOrder /> },
      { path: "register", element: <Register /> },
      { path: "products", element: <ProductList /> },
      { path: "forgot", element: <ForgotPassword /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-conditions", element: <TermCondition /> },
      { path: "shipping-return", element: <ShippingReturn /> },
      { path: "product-detail/:id", element: <ProductDetail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Cart />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
