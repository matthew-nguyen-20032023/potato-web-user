import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { showMessageSuccess } from "@/alerts/alert.ts";

type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  img: string;
};

type CartContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  clearAll: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const cacheKey = "cart";

  useEffect(() => {
    const productsCache = localStorage.getItem(cacheKey);
    if (productsCache) {
      setProducts(JSON.parse(productsCache));
    }
  }, []);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => {
      const existing = prev.find((p) => p.id === newProduct.id);
      if (existing) {
        const updatedList = prev.map((p) =>
          p.id === newProduct.id
            ? { ...p, quantity: p.quantity + newProduct.quantity }
            : p
        );
        localStorage.setItem(cacheKey, JSON.stringify(updatedList));
        return updatedList;
      }
      localStorage.setItem(
        cacheKey,
        JSON.stringify([
          ...prev,
          { ...newProduct, quantity: newProduct.quantity },
        ])
      );
      return [...prev, { ...newProduct, quantity: newProduct.quantity }];
    });
    showMessageSuccess("Product added!");
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => {
      const updatedList = prev.filter((p) => p.id !== id);
      localStorage.setItem(cacheKey, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const clearAll = () => {
    setProducts([]);
    localStorage.setItem(cacheKey, JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      value={{ products, addProduct, removeProduct, clearAll }}
    >
      {children}
    </CartContext.Provider>
  );
};
