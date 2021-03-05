import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.css";
import { LanguageContext } from "./shared/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import "./locale";

const Index: React.FC = () => {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(true);

  // This function only handles two languages.
  const toggleLanguage = useCallback(() => {
    if (!isRTL) {
      i18n.changeLanguage("fa_IR");
      setIsRTL(true);
    } else {
      i18n.changeLanguage("en_US");
      setIsRTL(false);
    }
  }, [i18n, isRTL]);

  const setRTL = useCallback(() => {
    setIsRTL(true);
  }, []);

  const setLTR = useCallback(() => {
    setIsRTL(false);
  }, []);

  return (
    <React.StrictMode>
      <LanguageContext.Provider
        value={{
          toggleLanguage: toggleLanguage,
          isRTL: isRTL,
          setRTL: setRTL,
          setLTR: setLTR,
        }}
      >
        <Router>
          <App />
        </Router>
      </LanguageContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
