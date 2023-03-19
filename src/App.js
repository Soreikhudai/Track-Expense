import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reset from "./components/auth/Reset";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/resetpassword" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
