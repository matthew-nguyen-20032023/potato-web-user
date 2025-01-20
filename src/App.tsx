import "flowbite";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/main/Main.tsx";
import { Login } from "./pages/login/Login.tsx";
import { NotFound } from "./pages/not-found/NotFound.tsx";
import { Register } from "./pages/register/Register.tsx";
import { Cart } from "./pages/cart/Cart.tsx";
import ProductDetail from "./components/ProductDetail.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product-detail/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
