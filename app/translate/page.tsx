"use client"

import type React from "react"
import Link from "next/link"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Upload, FileText, Languages, ArrowRight, Menu, X, CheckCircle } from "lucide-react"
import {
  RefreshCw,
  Upload,
  Download,
  Edit3,
  Copy,
  Share2,
  RotateCcw,
  CheckCircle,
  FileText,
  Languages,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Menu,
  X,
  Lock,
} from "lucide-react"
import { SignInButton, SignUpButton, UserButton, useUser, useAuth } from "@clerk/nextjs"
import html2canvas from "html2canvas" 

export default function TranslatePage() {

  // const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [targetLanguage, setTargetLanguage] = useState("")
  const [originalText, setOriginalText] = useState("")

  const { isSignedIn } = useUser()
  

  // integrated usestates
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [translatedHtml, setTranslatedHtml] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [iframeHeight, setIframeHeight] = useState<number | string>("auto")
  const [zoomLevel, setZoomLevel] = useState(1) // New state for zoom level
  const [isLoading, setIsLoading] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { getToken } = useAuth()
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null)
  const [contractAnalysisLoading, setContractAnalysisLoading] = useState(false)
  const [contractAnalysis, setContractAnalysis] = useState<{
    language: string
    extracted_data: Record<string, { text: string; summary: string }>
    summary_sheet_html: string
    debug_visualization_html: string
  } | null>(null)

  //from translate/results
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  //end of integrated usestates

  const languages = [
    { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
    { code: "zh", name: "Mandarin", flag: "🇨🇳" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
  ]

   // integrated functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Simulate reading file content
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setOriginalText(content.slice(0, 1000)) // Limit for demo
      }
      reader.readAsText(file)
     
      setTranslatedHtml(null)
      setErrorMessage(null)
      setIframeHeight("auto")
      setZoomLevel(1) // Reset zoom level on new file upload
      // The useEffect will handle setting originalImageSrc
    }
  }

    const translationInfo = {
    originalLanguage: "English (Auto-detected)",
    targetLanguage: "Bahasa Melayu",
    fileName: "business-proposal.pdf",
    wordCount: 1247,
    translationTime: "2.3s",
  }

  const translatedDocumentUrl = "/business-proposal-bahasa-melayu.png"

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

  const handleTranslate = async () => {
    if (!uploadedFile) {
      setErrorMessage("Please upload a file to translate.")
      return
    }
    setIsLoading(true)
    setTranslatedHtml(null)
    setErrorMessage(null)
    setIframeHeight("auto")

    const formData = new FormData()
    formData.append("target_language", targetLanguage)
    formData.append("file", uploadedFile)

    try {
      const response = await fetch("https://kevansoon-backend.hf.space/api/translate_file_dual_ocr", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        let errorDetail = "Translation failed due to a server error."
        try {
          const errorData = await response.json()
          errorDetail = errorData.detail || errorDetail
        } catch (jsonError) {
          errorDetail = response.statusText
        }
        throw new Error(errorDetail)
      }
      const htmlContent = await response.text()
      setTranslatedHtml(htmlContent)
      handleContractAnalyze(htmlContent)
      
    } catch (error) {
      console.error("Error translating document:", error)
      if (error instanceof TypeError) {
        setErrorMessage("Could not connect to the server. Is it running on http://localhost:8000?")
      } else {
        setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }

   const handleSaveAsImage = async () => {
    if (!iframeRef.current) return
    const iframe = iframeRef.current
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!iframeDoc || !iframeDoc.body) {
      alert("Iframe content not available.")
      return
    }

    try {
      const token = await getToken()
      if (!token) {
        alert("User not authenticated.")
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 500))

      const canvas = await html2canvas(iframeDoc.body, {
        backgroundColor: "#ffffff",
        useCORS: true,
        scale: 2,
      })

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), "image/png"))

      if (!blob) {
        alert("Failed to generate image.")
        return
      }

      const formData = new FormData()
      formData.append("file", new File([blob], "translated.png", { type: "image/png" }))

      const res = await fetch("https://kevansoon-backend.hf.space/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result = await res.json()
      alert(res.ok ? `✅ Uploaded Translated Document Successfully!` : `❌ Error: ${result.detail || "Upload failed"}`)
    } catch (error: any) {
      console.error("Save as image failed:", error)
      alert(`❌ Unexpected error: ${error.message}`)
    }
  }


    // Effect to create and revoke object URL for the uploaded image
  useEffect(() => {
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(uploadedFile)
      setOriginalImageSrc(objectUrl)

      return () => {
        URL.revokeObjectURL(objectUrl)
        setOriginalImageSrc(null)
      }
    } else {
      setOriginalImageSrc(null)
    }
  }, [uploadedFile])


 const handleContractAnalyze = async (htmlContent: string) => {
  try {
    setContractAnalysisLoading(true)
    setContractAnalysis(null)

    const htmlBlob = new Blob([htmlContent], { type: "text/html" })
    const htmlFile = new File([htmlBlob], "contract.html", { type: "text/html" })

    const formData = new FormData()
    formData.append("file", htmlFile)

    const response = await fetch("https://kevansoon-backend.hf.space/api/analyze_contract", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || "Contract analysis failed.")
    }

    const result = await response.json()

    // Store full result in state (so you can still use other data later)
    setContractAnalysis(result)

  } catch (error) {
    console.error("Contract analysis error:", error)
    setContractAnalysis(null)
  } finally {
    setContractAnalysisLoading(false)
  }
}


  //end of integrated functions

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      setUploadedFile(file)
      // Simulate reading file content
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setOriginalText(content.slice(0, 1000))
      }
      reader.readAsText(file)
    }
  }

  const canTranslate = uploadedFile && targetLanguage


   if (!isSignedIn) {
    return (
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
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoading && !translatedHtml && !errorMessage && (
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
                uploadedFile
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
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                {uploadedFile ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <div>
                      <p className="text-xl font-semibold text-green-700 mb-2">{uploadedFile.name}</p>
                      <p className="text-sm text-green-600">
                        File uploaded successfully • {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 text-[#0076D6] border-[#0076D6] hover:bg-[#0076D6] hover:text-white bg-transparent"
                        onClick={(e) => {
                          e.preventDefault()
                          setUploadedFile(null)
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
            {uploadedFile && (
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
                        <SelectItem key={lang.code} value={lang.name} className="text-base py-3">
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
                
                  <Button
                  onClick={handleTranslate} 
                  className="w-full bg-[#0076D6] hover:bg-[#005bb5] text-white h-14 text-lg font-semibold transition-all duration-200 hover:shadow-lg">
                    <Languages className="w-5 h-5 mr-3" />
                    Translate Document
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </Button>
                
              ) : (
                <Button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 h-14 text-lg font-semibold cursor-not-allowed"
                >
                  <Languages className="w-5 h-5 mr-3" />
                  {!uploadedFile ? "Upload a document first" : "Select target language"}
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
      )}
    {/*loading page*/}
    {isLoading && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0076D6] to-[#005bb5] rounded-full flex items-center justify-center shadow-lg">
                      <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#FFC93C] rounded-full flex items-center justify-center shadow-md">
                      <Languages className="w-3 h-3 text-gray-800" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Processing Your Document</h3>
                    <p className="text-base md:text-lg text-gray-600 font-medium">
                      Our AI is analyzing and translating your content...
                    </p>
                    <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                      This may take up to 5 minutes for as its on free hosting. Please don't close this window.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="w-2 h-2 bg-[#0076D6] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#0076D6] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#0076D6] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error State Display */}
            {errorMessage && (
              <div
                className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-lg p-6"
                role="alert"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-800 mb-1">Translation Error</h3>
                    <p className="text-red-700 leading-relaxed">{errorMessage}</p>
                    <Button
                      onClick={() => setErrorMessage("")}
                      variant="outline"
                      className="mt-4 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 bg-transparent"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            )}

    {/* result page */}
    {translatedHtml && (
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {/* <div className="mb-6 md:mb-8">
          <Link href="/translate">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors h-10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </Button>
          </Link>
        </div> */}

        <div className="text-center mb-8 md:mb-10">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Translation Complete!</h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your document has been successfully translated to{" "}
            {/* <span className="font-semibold text-[#0076D6]">{translationInfo.originalLanguage}</span> to{" "} */}
            <span className="font-semibold text-[#0076D6]">{targetLanguage}</span>
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
                 
                 {uploadedFile?.type.startsWith("image/") && originalImageSrc ? (
                    <img
                      src={originalImageSrc || "/placeholder.svg"}
                      alt="Document Preview"
                      className="w-full h-32 md:h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                  ) : null}
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
                      <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile?.name}</p>
                      {/* <p className="text-xs text-gray-500 mt-1">{translationInfo.wordCount.toLocaleString()} words</p> */}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Languages className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        → {targetLanguage}
                      </p>
                      {/* <p className="text-xs text-gray-500 mt-1">Completed in {translationInfo.translationTime}</p> */}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    Successful
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Document Summary Card */}
            {/* <Card className="shadow-sm hover:shadow-md transition-shadow">
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
            </Card> */}

      {/* Document Summary     */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-base md:text-lg font-semibold text-gray-900">
            Document Summary
          </CardTitle>
        </CardHeader>

        <CardContent>
          {contractAnalysisLoading ? (
            <p className="text-sm text-gray-500">Analyzing contract...</p>
          ) : contractAnalysis?.summary_sheet_html ? (
            <iframe
              src={URL.createObjectURL(
                new Blob(
                  [
                    `
                    <html>
                      <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                          body {
                            margin: 0;
                            padding: 1rem;
                            font-family: sans-serif;
                            max-width: 100%;
                          }
                          img, table {
                            max-width: 100%;
                            height: auto;
                          }
                          * {
                            box-sizing: border-box;
                          }
                        </style>
                      </head>
                      <body>
                        ${contractAnalysis.summary_sheet_html}
                      </body>
                    </html>
                    `
                  ],
                  { type: "text/html" }
                )
              )}
              className="w-full h-96 rounded border"
            />
          ) : (
            <p className="text-sm text-gray-500">Upload a document to see the summary.</p>
          )}
        </CardContent>
      </Card>

        {/* Debug Visualization Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow mt-6">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-base md:text-lg font-semibold text-gray-900">
              Document Summmary Visualization
            </CardTitle>
          </CardHeader>

          <CardContent>
            {contractAnalysisLoading ? (
              <p className="text-sm text-gray-500">Generating visualization...</p>
            ) : contractAnalysis?.debug_visualization_html ? (
              <iframe
                src={URL.createObjectURL(
                  new Blob(
                    [
                      `
                      <html>
                        <head>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            body {
                              margin: 0;
                              padding: 1rem;
                              font-family: sans-serif;
                              max-width: 100%;
                            }
                            img, table {
                              max-width: 100%;
                              height: auto;
                            }
                            * {
                              box-sizing: border-box;
                            }
                          </style>
                        </head>
                        <body>
                          ${contractAnalysis.debug_visualization_html}
                        </body>
                      </html>
                      `
                    ],
                    { type: "text/html" }
                  )
                )}
                className="w-full h-96 rounded border"
              />
            ) : (
              <p className="text-sm text-gray-500">No visualization available.</p>
            )}
          </CardContent>
        </Card>


            <div className="space-y-3">
              <Button
                onClick={handleSaveAsImage}
                className="w-full bg-[#0076D6] hover:bg-[#005bb5] h-12 font-medium text-base"
              >
                <Download className="w-4 h-4 mr-2" />
                Save to Documents
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
                    {/* <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 text-xs md:text-sm h-9">
                      <Edit3 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Edit
                    </Button> */}
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
                      ref={iframeRef}
                      srcDoc={translatedHtml}
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
    )}
    </div>

    



  )
}
