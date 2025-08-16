"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Eye, Download, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useLocale, Locale } from "@/app/LocaleContext";
import { useTranslations } from "next-intl";

export default function DocumentTranslator() {
  const { isSignedIn } = useUser();
  const { locale, toggleLocale } = useLocale();
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
     <section className="relative bg-gradient-to-br from-blue-50 to-blue-50 py-8 md:py-16">
  {/* Language Dropdown */}
  <div className="fixed 
  top-16        /* mobile phones */
  md:top-20     /* iPad / tablets */
  lg:top-6      /* desktop */
  right-4 md:right-6 
  z-50"
>
  <select
    value={locale}
    onChange={(e) => toggleLocale(e.target.value as Locale)}
    className="appearance-none bg-white border border-gray-300 text-gray-900 px-4 py-2 rounded shadow-md cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
  >
    <option value="en">English</option>
    <option value="zh">中文</option>
    <option value="ms">Malay</option>
    <option value="ta">Tamil</option>
    <option value="hi">Hindi</option>
  </select>
</div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
    <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
        {t("hero_title")}
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
        {t("hero_description")}
      </p>
      <Button asChild className="bg-[#0076D6] hover:bg-[#005bb5] text-white px-6 md:px-8 py-3 h-12 text-base">
        <a href="/translate">{t("upload_button")}</a>
      </Button>
    </div>
    <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
      <img
        src="/doc_trans1.jpg"
        alt="Document translator interface"
        className="rounded-lg shadow-lg w-full h-auto"
      />
    </div>
  </div>
</section>


      {/* How to translate cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            {t("how_to_translate")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 */}
            <Card className="text-center p-4 md:p-6">
              <CardContent className="pt-4 md:pt-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Upload className="w-6 h-6 md:w-8 md:h-8 text-[#0076D6]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t("step_view_title")}</h3>
                <p className="text-gray-600 text-sm md:text-base">{t("step_view_desc")}</p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-center p-4 md:p-6">
              <CardContent className="pt-4 md:pt-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Eye className="w-6 h-6 md:w-8 md:h-8 text-[#0076D6]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t("step_preview_title")}</h3>
                <p className="text-gray-600 text-sm md:text-base">{t("step_preview_desc")}</p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-center p-4 md:p-6">
              <CardContent className="pt-4 md:pt-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Download className="w-6 h-6 md:w-8 md:h-8 text-[#0076D6]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t("step_download_title")}</h3>
                <p className="text-gray-600 text-sm md:text-base">{t("step_download_desc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workspace Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <img src="/doc_save.jpg" alt="Translation workspace" className="rounded-lg shadow-lg w-full lg:w-1/2 h-auto" />
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">{t("workspace_title")}</h2>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">{t("workspace_desc")}</p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <img src="/trans_com.jpg" alt="Document editor" className="rounded-lg shadow-lg w-full lg:w-1/2 h-auto" />
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">{t("how_to_translate")}</h2>
              <div className="space-y-4 md:space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-3 md:gap-4 text-left">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#0076D6] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">{i}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{t(`process_step_${i}_title`)}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{t(`process_step_${i}_desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="bg-[#0076D6] hover:bg-[#005bb5] text-white mt-6 md:mt-8 h-12 px-6">
                <a href="/translate">{t("upload_button")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">{t("faq_title")}</h2>
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">{t("faq_word_doc")}</h3>
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base">{t("faq_word_doc_desc")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">{t("faq_cookies")}</h3>
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base">{t("faq_cookies_desc")}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button variant="outline" className="h-10 text-sm bg-transparent">{t("accept_cookies")}</Button>
                  <Button variant="outline" className="h-10 text-sm bg-transparent">{t("manage_cookies")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
