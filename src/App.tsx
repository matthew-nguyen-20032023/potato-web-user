import "flowbite";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/main/Main.tsx";
import { Login } from "./pages/login/Login.tsx";
import { NotFound } from "./pages/not-found/NotFound.tsx";
import { Register } from "./pages/register/Register.tsx";
import ProductDetail from "./components/ProductDetail.tsx";
import { ProductList } from "./pages/product-list/ProductList.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { Cart } from "./pages/cart/Cart.tsx";
import { AboutUs } from "./pages/about-us/AboutUs.tsx";
import { FAQ } from "./pages/faq/FAQ.tsx";
import { Contact } from "./pages/contact/Contact.tsx";
import { VerifyEmail } from "./pages/verify-email/VerifyEmail.tsx";

function App() {
  return (
    <CartProvider>
      <Cart />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="products" element={<ProductList />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="FAQ" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product-detail/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
