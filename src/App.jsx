import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { IntlProvider } from "react-intl";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Switch } from "@mui/material";
import { SignInPage } from "./pages/LogIn-SignIn-Pages/SignInPage";
import { RegisterPage } from "./pages/LogIn-SignIn-Pages/RegisterPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MainPage } from "./pages/MainPage";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { createContext } from "react";

export const MyContext = createContext("");
function App() {
  const [userId, setUserId] = useState("");
  return (
    <MyContext.Provider value={{ userId, setUserId }}>
      <IntlProvider messages={{}} locale="tr" defaultLocale="tr">
        <Router>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
          </Routes>
        </Router>
      </IntlProvider>
    </MyContext.Provider>
  );
}

export default App;
