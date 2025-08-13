"use client"

import type React from "react"
import Link from "next/link"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Languages, ArrowRight, Menu, X, CheckCircle } from "lucide-react"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

export default function TranslatePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [targetLanguage, setTargetLanguage] = useState("")
  const [originalText, setOriginalText] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn } = useUser()

  const languages = [
    { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
    { code: "zh", name: "Mandarin", flag: "🇨🇳" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Simulate reading file content
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setOriginalText(content.slice(0, 1000)) // Limit for demo
      }
      reader.readAsText(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      setSelectedFile(file)
      // Simulate reading file content
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setOriginalText(content.slice(0, 1000))
      }
      reader.readAsText(file)
    }
  }

  const canTranslate = selectedFile && targetLanguage


   if (!isSignedIn) {
    return (
       <div className="min-h-screen bg-gray-50">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: "#e74f4f" }}
          >
            
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#4B4B4B" }}>
            Sign In Required
          </h2>
          <p className="text-gray-600 mb-6">Please sign in to access the document translation feature.</p>
          <Link href="/">
            <Button className="text-white hover:opacity-90" style={{ backgroundColor: "#e74f4f" }}>
              Go to Home Page
            </Button>
          </Link>
        </div>
      </div>
       </div>
     
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Document Translator</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload your document and we'll automatically detect the language and translate it instantly with AI
            precision.
          </p>
        </div>

        {/* Main Upload Card */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl md:text-2xl text-gray-900">
              <div className="w-8 h-8 bg-[#0076D6] rounded-lg flex items-center justify-center">
                <Upload className="w-4 h-4 text-white" />
              </div>
              Upload Your Document
            </CardTitle>
            <p className="text-gray-600 mt-2">We support PDF, Word, PowerPoint, and text files up to 10MB</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* File Upload Zone */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-200 ${
                selectedFile
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 hover:border-[#0076D6] hover:bg-blue-50"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".txt,.doc,.docx,.pdf,.ppt,.pptx"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                {selectedFile ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <div>
                      <p className="text-xl font-semibold text-green-700 mb-2">{selectedFile.name}</p>
                      <p className="text-sm text-green-600">
                        File uploaded successfully • {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 text-[#0076D6] border-[#0076D6] hover:bg-[#0076D6] hover:text-white bg-transparent"
                        onClick={(e) => {
                          e.preventDefault()
                          setSelectedFile(null)
                          setOriginalText("")
                        }}
                      >
                        Choose Different File
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-xl font-semibold text-gray-900 mb-2">Drop your file here or click to browse</p>
                      <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, PPT, PPTX, TXT files</p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            {/* Language Detection & Selection */}
            {selectedFile && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Languages className="w-4 h-4 text-[#0076D6]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Language Auto-Detection</p>
                      <p className="text-sm text-gray-600">We'll automatically detect your document's language</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-base font-semibold text-gray-900">Translate to:</label>
                  <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger className="h-14 text-base border-2 hover:border-[#0076D6] transition-colors">
                      <SelectValue placeholder="Select target language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code} className="text-base py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Translate Button */}
            <div className="pt-4">
              {canTranslate ? (
                <Link href="/translate/result" className="block">
                  <Button className="w-full bg-[#0076D6] hover:bg-[#005bb5] text-white h-14 text-lg font-semibold transition-all duration-200 hover:shadow-lg">
                    <Languages className="w-5 h-5 mr-3" />
                    Translate Document
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 h-14 text-lg font-semibold cursor-not-allowed"
                >
                  <Languages className="w-5 h-5 mr-3" />
                  {!selectedFile ? "Upload a document first" : "Select target language"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            Why Choose Our Translator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Languages className="w-8 h-8 text-[#0076D6]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">134+ Languages</h3>
                <p className="text-gray-600 leading-relaxed">
                  Support for over 134 languages with AI-powered accuracy and context understanding.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Multiple Formats</h3>
                <p className="text-gray-600 leading-relaxed">
                  Translate documents in PDF, Word, PowerPoint, and text formats while preserving formatting.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Instant Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get your translated documents instantly with automatic language detection and one-click download.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
