import "flowbite";
import "@/App.css";

import store from "@/app/store.ts";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import Main from "@/pages/main/Main.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const FAQ = lazy(() => import("@/pages/faq/FAQ.tsx"));
const Login = lazy(() => import("@/pages/login/Login.tsx"));
const Order = lazy(() => import("@/pages/order/Order.tsx"));
const Contact = lazy(() => import("@/pages/contact/Contact.tsx"));
const AboutUs = lazy(() => import("@/pages/about-us/AboutUs.tsx"));
const MyOrder = lazy(() => import("@/pages/my-order/MyOrder.tsx"));
const Register = lazy(() => import("@/pages/register/Register.tsx"));
const NotFound = lazy(() => import("@/pages/not-found/NotFound.tsx"));
const ProductDetail = lazy(() => import("@/components/ProductDetail.tsx"));
const ProductList = lazy(() => import("@/pages/product-list/ProductList.tsx"));
const VerifyEmail = lazy(() => import("@/pages/verify-email/VerifyEmail.tsx"));
const PrivacyPolicy = lazy(
  () => import("@/pages/privacy-policy/PrivacyPolicy.tsx")
);
const TermCondition = lazy(
  () => import("@/pages/terms-condition/TermCondition.tsx")
);
const ShippingReturn = lazy(
  () => import("@/pages/shiping-return/ShippingReturn.tsx")
);
const ForgotPassword = lazy(
  () => import("@/pages/forgot-password/ForgotPassword.tsx")
);

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
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
