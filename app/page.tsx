"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Edit, Download, Smartphone, ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

export default function DocumentTranslator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn } = useUser()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-4 md:space-x-8">
              <img src="/fairwork-logo-new.png" alt="FairWork Contract" className="h-20 md:h-32" />
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-[#0076D6] font-medium">
                  Home
                </a>
                {isSignedIn && (
                <a href="/translate" className="text-gray-700 hover:text-gray-900">
                  Translate
                </a>
                )}
                {isSignedIn && (
                <a href="/documents" className="text-gray-700 hover:text-gray-900">
                  Documents
                </a>
                )}
              </nav>
            </div>
             {isSignedIn ? (
              <div className="flex items-center space-x-2 md:space-x-4">
                <UserButton afterSignOutUrl="/" />
                  <button
                className="md:hidden p-2 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              </div>
           
              
            ) : (
            <div className="flex items-center space-x-2 md:space-x-4">
              <SignInButton mode="modal">
              <Button variant="ghost" className="text-gray-700 text-sm md:text-base px-2 md:px-4">
                Sign in
              </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-[#0076D6] hover:bg-[#005bb5] text-white text-sm md:text-base px-3 md:px-4">
                Sign up
              </Button>
              </SignUpButton>
              <button
                className="md:hidden p-2 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
             )}
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="/"
                  className="text-[#0076D6] font-medium px-4 py-2 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                {isSignedIn && (
                <a
                  href="/translate"
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Translate
                </a>
                 )}
                 {isSignedIn && (
                <a
                  href="/documents"
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Documents
                </a>
                 )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-50 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Online Document Translator
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
                Make your content accessible to everyone. Translate any page into multiple languages using our online
                document translator then print exciting offline elements for more professional results. Try it online
                for free on FairWork Contract.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-sm mx-auto lg:mx-0">
                <Button asChild className="bg-[#0076D6] hover:bg-[#005bb5] text-white px-6 md:px-8 py-3 h-12 text-base">
                  <a href="/translate">Upload your file</a>
                </Button>
                <Button variant="outline" className="px-6 md:px-8 py-3 h-12 bg-transparent text-base">
                  Start a design
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-md lg:max-w-none">
                <img
                  src="/document-translation-interface-mockup.png"
                  alt="Document translator interface"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to translate section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            How to translate a document
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center p-4 md:p-6">
              <CardContent className="pt-4 md:pt-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Upload className="w-6 h-6 md:w-8 md:h-8 text-[#0076D6]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Upload your file</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Select the "Upload your file" button or easily drag and drop your files into the section.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 md:p-6">
              <CardContent className="pt-4 md:pt-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Edit className="w-6 h-6 md:w-8 md:h-8 text-[#0076D6]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Edit your document</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Translate pages or select text from a page using the Translate app in our online editor.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 md:p-6">
              <CardContent className="pt-4 md:pt-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Download className="w-6 h-6 md:w-8 md:h-8 text-[#0076D6]" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Download your document</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Finally, download your translated document once for free as a high-quality PDF file.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Connect to global audience */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <img
                src="/global-team-collaboration.png"
                alt="Global collaboration"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                Connect to a global audience
              </h2>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Expand your reach without breaking a sweat. Translate your content into multiple languages and connect
                with people from all over the world. Our built-in AI-powered document translator app can instantly
                convert your text into 134 languages. Auto-translate to English, French, German, and more to keep your
                teams in the loop, grow or recruit, and have your documents ready for a global audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All translation work in one place */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="lg:w-1/2">
              <img
                src="/document-translation-workspace.png"
                alt="Translation workspace"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                All your translation work in one place
              </h2>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Teaching or collaborating with a new language? Turn language barriers into learning opportunities when
                you translate texts materials into your students' native language. Try it once for free on FairWork
                Contract. Streamline your document translation process and convert articles and reports—without having
                to switch between different apps. With our document translator, you can communicate with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Make content compelling */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative flex justify-center">
                <div className="w-48 h-72 md:w-64 md:h-96 relative">
                  <Smartphone className="w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/mobile-app-interface.png"
                      alt="Mobile interface"
                      className="rounded-lg max-w-[80%] h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                Make your translated content more compelling
              </h2>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Breathe life into your translated documents with the help of visuals. Use FairWork Contract's document
                translator once for free, then sign up for FairWork Contract Pro to access our premium stock library.
                Browse through millions of photos, graphics, videos, audio, and GIFs. Make your content with compelling
                images and design elements from our library. Recreate existing logos, publish documents in a flash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to translate steps */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="lg:w-1/2">
              <img
                src="/document-editor-translation.png"
                alt="Document editor"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">How to translate a document</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4 text-left">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#0076D6] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Open FairWork Contract</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Launch FairWork Contract to access our document translator online.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4 text-left">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#0076D6] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Upload your document</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Select and upload the document you want to translate.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4 text-left">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#0076D6] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Translate your document</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Use our AI-powered translator to convert your content.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4 text-left">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#0076D6] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Make further edits</h3>
                    <p className="text-gray-600 text-sm md:text-base">Fine-tune your translated document as needed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4 text-left">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#0076D6] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Download and share</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Export your translated document and share it with others.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="bg-[#0076D6] hover:bg-[#005bb5] text-white mt-6 md:mt-8 h-12 px-6">
                <a href="/translate">Upload your file</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">
                    How to translate a Word document?
                  </h3>
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base">
                  First, upload your document by clicking the Upload button on the homepage. Select your document to
                  open it in FairWork Contract's editor. Use the Translate tool to translate words from the original
                  language into your desired output.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">But first, cookies 🍪</h3>
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base">
                  We use essential cookies to make our site work. We'd like to use other cookies to improve and
                  personalize your visit, and to show you relevant FairWork Contract ads on other sites. You can choose
                  to Accept all or Manage cookies to learn about your choices. Learn more in our cookie policy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button variant="outline" className="h-10 text-sm bg-transparent">
                    Accept all cookies
                  </Button>
                  <Button variant="outline" className="h-10 text-sm bg-transparent">
                    Manage cookies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
