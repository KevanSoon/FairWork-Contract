"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Edit3,
  Copy,
  Share2,
  RotateCcw,
  CheckCircle,
  FileText,
  Languages,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Menu,
  X,
  Lock,
} from "lucide-react"
import Link from "next/link"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

export default function TranslationResultPage() {
  const [translatedText, setTranslatedText] =
    useState(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`)

  const [isEditing, setIsEditing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn } = useUser()

  const translationInfo = {
    originalLanguage: "English (Auto-detected)",
    targetLanguage: "Bahasa Melayu",
    fileName: "business-proposal.pdf",
    wordCount: 1247,
    translationTime: "2.3s",
  }

  const translatedDocumentUrl = "/business-proposal-bahasa-melayu.png"

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = translatedDocumentUrl
    link.download = `translated-${translationInfo.fileName}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`Translated document: ${translationInfo.fileName}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Translated Document",
        url: translatedDocumentUrl,
      })
    }
  }


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
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <Card className="max-w-lg mx-auto text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#0076D6] to-[#005bb5] rounded-full flex items-center justify-center shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              {/* Content */}
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Sign In Required</h2>
              <p className="text-gray-600 mb-2 leading-relaxed text-base md:text-lg">
                Access our powerful document translation tools
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Sign in to translate documents into Bahasa Melayu, Mandarin, Hindi, and Tamil
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <SignInButton mode="modal">
                  <Button className="w-full bg-[#0076D6] hover:bg-[#005bb5] text-white h-12 text-base font-medium transition-all duration-200 shadow-md hover:shadow-lg group">
                    Sign In to Continue
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SignInButton>

                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-3 text-sm text-gray-500">or</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                <Link href="/" className="block">
                  <Button
                    variant="outline"
                    className="w-full text-[#0076D6] border-[#0076D6] hover:bg-[#0076D6] hover:text-white h-11 text-base transition-all duration-200 bg-transparent"
                  >
                    Go to Home Page
                  </Button>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  New to FairWork Contract?{" "}
                  <SignUpButton mode="modal">
                    <button className="text-[#0076D6] hover:underline font-medium">Create an account</button>
                  </SignUpButton>
                </p>
              </div>
            </CardContent>
          </Card>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="mb-6 md:mb-8">
          <Link href="/translate">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors h-10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 md:mb-10">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Translation Complete!</h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your document has been successfully translated from{" "}
            <span className="font-semibold text-[#0076D6]">{translationInfo.originalLanguage}</span> to{" "}
            <span className="font-semibold text-[#0076D6]">{translationInfo.targetLanguage}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Translation Details Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-base md:text-lg font-semibold text-gray-900">Translation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="relative">
                  <img
                    src="/document-preview-contract.png"
                    alt="Document Preview"
                    className="w-full h-32 md:h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                      Preview
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{translationInfo.fileName}</p>
                      <p className="text-xs text-gray-500 mt-1">{translationInfo.wordCount.toLocaleString()} words</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Languages className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {translationInfo.originalLanguage} → {translationInfo.targetLanguage}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Completed in {translationInfo.translationTime}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    High Accuracy
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Document Summary Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-base md:text-lg font-semibold text-gray-900">Document Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Document Type</p>
                    <Badge variant="outline" className="text-xs border-gray-300">
                      Business Proposal
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2 md:mb-3">Key Topics</p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        Contract Terms
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        Payment
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        Deliverables
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Content Overview</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      This business proposal outlines project deliverables, payment terms, and contractual obligations
                      between parties. Contains standard legal clauses and project specifications.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-500">Complexity</p>
                        <p className="text-sm font-medium text-gray-900">Medium</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Confidence</p>
                        <p className="text-sm font-medium text-green-600">98%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleDownload}
                className="w-full bg-[#0076D6] hover:bg-[#005bb5] h-12 font-medium text-base"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Document
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleCopy} variant="outline" className="bg-white hover:bg-gray-50 h-10 text-sm">
                  <Copy className="w-4 h-4 mr-1" />
                  {copied ? "Copied!" : "Copy"}
                </Button>

                <Button onClick={handleShare} variant="outline" className="bg-white hover:bg-gray-50 h-10 text-sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>

              <Link href="/translate" className="block">
                <Button variant="outline" className="w-full bg-white hover:bg-gray-50 h-10 text-sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Translate Another
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 md:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">Translated Document</CardTitle>
                  <div className="flex gap-2 md:gap-3">
                    <Button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      variant="outline"
                      size="sm"
                      className="bg-white hover:bg-gray-50 text-xs md:text-sm h-9"
                    >
                      <Maximize2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      {isFullscreen ? "Exit" : "Fullscreen"}
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 text-xs md:text-sm h-9">
                      <Edit3 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-white" : "relative"}`}>
                  {isFullscreen && (
                    <div className="flex justify-between items-center p-4 md:p-6 border-b bg-white">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        Translated Document - {translationInfo.fileName}
                      </h3>
                      <Button onClick={() => setIsFullscreen(false)} variant="outline" size="sm" className="h-9">
                        Exit Fullscreen
                      </Button>
                    </div>
                  )}
                  <div className={isFullscreen ? "p-4 md:p-6 pt-0" : "p-4 md:p-6"}>
                    <iframe
                      src={translatedDocumentUrl}
                      className={`w-full border border-gray-200 rounded-lg shadow-sm ${
                        isFullscreen ? "h-[calc(100vh-140px)] md:h-[calc(100vh-180px)]" : "h-[400px] md:h-[600px]"
                      }`}
                      title="Translated Document"
                      sandbox="allow-same-origin allow-scripts"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="grid md:grid-cols-3 gap-8">{/* Additional content can be added here */}</div>
        </div>
      </div>
    </div>
  )
}
