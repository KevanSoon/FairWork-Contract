"use client"; // <-- important

import { ReactNode } from "react";
import { useLocale } from "./LocaleContext";
import { IntlProvider } from "next-intl";

export default function LocaleWrapper({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const messages = require(`../locales/${locale}.json`);

  return <IntlProvider locale={locale} messages={messages}>{children}</IntlProvider>;
}
