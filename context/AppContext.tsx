import { AppContextType, CartItem, Product, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStroge from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

export const server = process.env.EXPO_PUBLIC_API_URL || "https://native-server.vercel.app";

const defaultContext: AppContextType = {
  user: null,
  isAuth: false,
  authLoading: true,
  btnLoading: false,
  token: null,
  loginUser: async () => {},
  registerUser: async () => {},
  logoutUser: async () => {},
  products: [],
  search: "",
  setSearch: () => {},
  category: "",
  setCategory: () => {},
  sortByPrice: "",
  setSortByPrice: () => {},
  fetchProducts: async () => {},
  productLoading: false,
  categories: [],
  cart: [],
  cartLoading: false,
  addToCart: async () => {},
  updateCart: async () => {},
  removeFromCart: async () => {},
  fetchCart: async () => {},
  quantity: 0,
};

const AppContext = createContext<AppContextType>(defaultContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    setName: any,
    setEmail: any,
    setPassword: any,
    router: any
  ) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });
      await AsyncStroge.setItem("token", data.token);
      setToken(data.token);
      setIsAuth(true);
      setUser(data.user);
      Toast.show({ type: "success", text1: data.message });
      setEmail("");
      setPassword("");
      setName("");
      fetchCart();
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message ?? "Failed to register",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  const loginUser = async (
    email: string,
    password: string,
    setEmail: any,
    setPassword: any,
    router: any
  ) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });
      await AsyncStroge.setItem("token", data.token);
      setToken(data.token);
      setIsAuth(true);
      setUser(data.user);
      Toast.show({ type: "success", text1: data.message });
      setEmail("");
      setPassword("");
      fetchCart();
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message ?? "Failed to login",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  async function logoutUser() {
    await AsyncStroge.removeItem("token");
    setUser(null);
    setIsAuth(false);
    setToken(null);
    Toast.show({ type: "success", text1: "Logged out successfully" });
  }

  // fetchProduct
  async function fetchProducts() {
    setProductLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/product/all`, {
        params: { search, category, sortByPrice },
      });

      setProducts(data.products);
      setCategories(data.categories || []);
    } catch (error: any) {
      Toast.show({ type: "error", text1: "Failed to load products" });
    } finally {
      setProductLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search, category, sortByPrice]);

  // cart
  async function fetchCart() {
    if (!token) return;
    setCartLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/cart/all`, {
        headers: { token },
      });

      setCart(Array.isArray(data) ? data : data.cart || []);
      setQuantity(data.sumofQuantities);
    } finally {
      setCartLoading(false);
    }
  }

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  async function addToCart(productId: string) {
    if (!token) {
      Toast.show({ type: "error", text1: "Login Required" });
      return;
    }

    try {
      await axios.post(
        `${server}/api/cart/add`,
        {
          product: productId,
        },
        {
          headers: { token },
        }
      );

      Toast.show({ type: "success", text1: "Added to cart" });
      fetchCart();
    } catch (error: any) {
      Toast.show({ type: "error", text1: error.response.data.message });
    }
  }

  async function updateCart(action: "inc" | "dec", cartItemId: string) {
    if (!token) {
      Toast.show({ type: "error", text1: "Login Required" });
      return;
    }

    try {
      await axios.post(
        `${server}/api/cart/update?action=${action}`,
        {
          id: cartItemId,
        },
        {
          headers: { token },
        }
      );

      fetchCart();
    } catch (error: any) {
      Toast.show({ type: "error", text1: error.response.data.message });
    }
  }

  async function removeFromCart(cartItemId: string) {
    await axios.get(`${server}/api/cart/remove/${cartItemId}`, {
      headers: {
        token,
      },
    });
    fetchCart();
  }

  async function loadUser() {
    setAuthLoading(true);
    try {
      const storedToken = await AsyncStroge.getItem("token");

      if (!storedToken) return;

      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: { token: storedToken },
      });

      setUser(data);
      setToken(storedToken);
      setIsAuth(true);
    } catch (error) {
      setUser(null);
      setIsAuth(false);
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuth,
        btnLoading,
        authLoading,
        token,
        loginUser,
        registerUser,
        logoutUser,
        productLoading,
        products,
        categories,
        category,
        setCategory,
        search,
        setSearch,
        sortByPrice,
        setSortByPrice,
        fetchProducts,
        cart,
        fetchCart,
        addToCart,
        removeFromCart,
        quantity,
        updateCart,
        cartLoading,
      }}
    >
      {children}
      <Toast />
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
