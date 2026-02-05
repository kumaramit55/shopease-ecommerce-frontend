import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";
import { AuthProvider } from "./auth/context/authProvider";
import { CartProvider } from "./auth/store/cartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
