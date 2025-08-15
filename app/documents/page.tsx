"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Eye, Calendar, Globe, X, Menu } from "lucide-react"
import { SignInButton, SignUpButton, UserButton, useUser, useAuth } from "@clerk/nextjs"
import { PDFDocument } from "pdf-lib"

export default function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn } = useUser()
  
  //integrate usestates
  type Document = {
  id: string
  name?: string | null
  type?: string | null
  size?: string | null
  signed_url?: string | null
}
  const [loading, setLoading] = useState(true)
  const [savedDocuments, setSavedDocuments] = useState<Document[]>([])
  const { getToken } = useAuth()
  //end of integrated usestates
  

  // Placeholder documents data
  const documents = [
    {
      id: 1,
      name: "Business Proposal - Spanish Translation",
      originalLanguage: "English",
      translatedLanguage: "Spanish",
      dateTranslated: "2024-01-15",
      fileSize: "2.4 MB",
      pages: 12,
      status: "Completed",
      previewUrl: "/spanish-business-proposal.png",
    },
    {
      id: 2,
      name: "Legal Contract - French Translation",
      originalLanguage: "English",
      translatedLanguage: "French",
      dateTranslated: "2024-01-14",
      fileSize: "1.8 MB",
      pages: 8,
      status: "Completed",
      previewUrl: "/document-preview-contract.png",
    },
    {
      id: 3,
      name: "Technical Manual - German Translation",
      originalLanguage: "English",
      translatedLanguage: "German",
      dateTranslated: "2024-01-13",
      fileSize: "5.2 MB",
      pages: 24,
      status: "Completed",
      previewUrl: "/document-translation-workspace.png",
    },
    {
      id: 4,
      name: "Marketing Brochure - Italian Translation",
      originalLanguage: "English",
      translatedLanguage: "Italian",
      dateTranslated: "2024-01-12",
      fileSize: "3.1 MB",
      pages: 6,
      status: "Processing",
      previewUrl: "/document-editor-translation.png",
    },
  ]


  //integrated functions
   useEffect(() => {
    if (!isSignedIn) return

    async function fetchDocuments() {
      try {
        const token = await getToken()

        if (!token) {
          console.error("No Clerk token found")
          setSavedDocuments([])
          return
        }

        const res = await fetch("https://kevansoon-backend.hf.space/api/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch documents. Status: ${res.status}`)
        }

        const data: Document[] = await res.json()
        setSavedDocuments(data)
      } catch (error) {
        console.error("Fetch error:", error)
        setSavedDocuments([])
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [isSignedIn, getToken])


  const handleDownload = async (doc: Document) => {
    if (!doc.signed_url) {
      alert("No signed URL available for download")
      return
    }

    try {
      const response = await fetch(doc.signed_url)
      if (!response.ok) {
        throw new Error("Failed to fetch file")
      }

      const blob = await response.blob()
      let pdfBlob: Blob

      if (blob.type === "application/pdf") {
        // Already a PDF
        pdfBlob = blob
      } else if (blob.type.startsWith("image/")) {
        // Convert image to PDF
        const arrayBuffer = await blob.arrayBuffer()
        const pdfDoc = await PDFDocument.create()

        let image
        if (blob.type === "image/png") {
          image = await pdfDoc.embedPng(arrayBuffer)
        } else if (blob.type === "image/jpeg") {
          image = await pdfDoc.embedJpg(arrayBuffer)
        } else {
          throw new Error("Unsupported image type")
        }

        const { width, height } = image.scale(1)
        const page = pdfDoc.addPage([width, height])
        page.drawImage(image, { x: 0, y: 0, width, height })

        const pdfBytes = await pdfDoc.save()

        // Robust fix: manually copy into a new ArrayBuffer-backed Uint8Array
        const buffer = new ArrayBuffer(pdfBytes.length)
        const view = new Uint8Array(buffer)
        view.set(pdfBytes)
        pdfBlob = new Blob([view], { type: "application/pdf" })
      } else {
        throw new Error("Unsupported file type")
      }

      // Create URL and trigger download
      const blobUrl = URL.createObjectURL(pdfBlob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = "document.pdf" // Customize filename if needed
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(blobUrl)
      document.body.removeChild(a)
    } catch (err) {
      console.error("Error downloading file:", err)
      alert("Unable to load document for download.")
    }
  }


  const handleSaveAsImage = async (doc: Document, type: "png" | "jpeg") => {
    if (!doc.signed_url) {
      alert("No signed URL available for download")
      return
    }

    try {
      // Fetch the file to avoid potential CORS or download issues
      const response = await fetch(doc.signed_url)
      if (!response.ok) throw new Error("Failed to fetch file")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      const baseName = doc.name?.split(".")[0] ?? "document"
      link.href = url
      link.download = `${baseName}.${type}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url) // clean up
    } catch (err) {
      console.error("Download error:", err)
      alert("Failed to download the image. Please try again.")
    }
  }

  //end of integrated functions

  if (!isSignedIn) {
    return (
       <div className="min-h-screen bg-gray-50">
         
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        

        {/* Loading Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4">
          <div className="text-center max-w-md mx-auto">
            {/* Animated Logo/Icon */}
            <div className="relative mb-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#0076D6] to-[#005bb5] rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Loading Text with Animation */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Loading Your Documents
              <span className="inline-flex ml-1">
                <span className="animate-pulse delay-0">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
              </span>
            </h2>

            <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              We're gathering all your translated documents and preparing them for you.
            </p>

            {/* Progress Indicator */}
            <div className="w-full max-w-xs mx-auto mb-6">
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#0076D6] to-[#005bb5] h-full rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Additional Context */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>✓ Checking document status</p>
              <p>✓ Preparing previews</p>
              <p>✓ Loading translations</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Documents</h1>
          <p className="text-gray-600 text-sm md:text-base">View and manage all your translated documents</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"></div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {savedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Document Preview */}
              <div className="relative h-40 md:h-48 bg-gray-100">
                <img src={doc.signed_url || "/placeholder.svg"}  className="w-full h-full object-cover" />
                <div className="absolute top-2 md:top-3 right-2 md:right-3">
                  {/* <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {doc.status}
                  </span> */}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 
                    `}
                  >
                    Completed
                  </span>
                </div>
              </div>

              {/* Document Info */}
              <div className="p-4 md:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">{doc.name}</h3>
{/* 
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs md:text-sm text-gray-600">
                    <Globe className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {doc.originalLanguage} → {doc.translatedLanguage}
                    </span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-gray-600">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                    {new Date(doc.dateTranslated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
                    <span>{doc.pages} pages</span>
                    <span>{doc.fileSize}</span>
                  </div>
                </div> */}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Preview Button */}
                  <button
                    onClick={() => setSelectedDocument(doc)}
                    className="w-full flex items-center justify-center px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors h-10"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </button>

                  {/* Download Options */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Download as:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleDownload(doc)}
                        // disabled={doc.status !== "Completed"}
                        className="flex items-center justify-center px-2 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed h-9 border border-red-200"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        PDF
                      </button>
                      <button
                        onClick={() => handleSaveAsImage(doc, "jpeg")}
                        // disabled={doc.status !== "Completed"}
                        className="flex items-center justify-center px-2 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed h-9 border border-blue-200"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        JPEG
                      </button>
                      <button
                        onClick={() => handleSaveAsImage(doc, "png")}
                        // disabled={doc.status !== "Completed"}
                        className="flex items-center justify-center px-2 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed h-9 border border-green-200"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        PNG
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Preview Modal */}
      {selectedDocument && (
     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-[95vw] max-h-[95vh] w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">{selectedDocument.name}</h3>
          <button
            onClick={() => setSelectedDocument(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-4">
          <img
            src={selectedDocument.signed_url || "/placeholder.svg"}
            alt={selectedDocument.name}
            className="max-w-full max-h-full object-contain shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
    </div>
      )}
    </div>
  )
}
