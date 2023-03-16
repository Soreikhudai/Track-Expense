//import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";

//import EmailButtonPage from "./pages/EmailButtonPage";

//import CartContext from "./store/cart-context";

const App = () => {
  //const Data = useContext(CartContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/aboutus" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/updateprofilepage" element={<UpdateProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
