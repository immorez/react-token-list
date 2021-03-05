import { createContext } from "react";

interface ILanguageContext {
  isRTL: boolean;
  toggleLanguage: () => void;
  setRTL: () => void;
  setLTR: () => void;
}

export const LanguageContext = createContext<ILanguageContext>({
  isRTL: true,
  toggleLanguage: () => {},
  setRTL: () => {},
  setLTR: () => {},
});
