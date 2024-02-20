import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Checkout from "./components/Checkout.jsx";
import { ProductsContextProvider } from "./components/ProductsContextprovider.jsx";
const App = () => {
  return (
    <ProductsContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </ProductsContextProvider>
  );
};

export default App;
