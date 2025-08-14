"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Step 1: Define supported locales
export type Locale = "en" | "zh" | "hi" | "ta" | "ms";

// Step 2: Update context type to accept newLocale argument
interface LocaleContextType {
  locale: Locale;
  toggleLocale: (newLocale: Locale) => void;
}

// Step 3: Create context
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Step 4: LocaleProvider component
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// Step 5: Custom hook to use locale
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
