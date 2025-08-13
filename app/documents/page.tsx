"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Eye, Calendar, Globe, X, Menu } from "lucide-react"

export default function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const handleDownload = (doc: any, format: string) => {
    // Simulate download
    console.log(`Downloading ${doc.name} as ${format}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-4 md:space-x-8">
              <Link href="/" className="flex items-center">
                <img src="/fairwork-logo-new.png" alt="FairWork Contract" className="h-20 md:h-32" />
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-[#0076D6] transition-colors">
                  Home
                </Link>
                <Link href="/translate" className="text-gray-600 hover:text-[#0076D6] transition-colors">
                  Translate
                </Link>
                <Link href="/documents" className="text-[#0076D6] font-medium">
                  Documents
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="text-gray-600 hover:text-[#0076D6] transition-colors text-sm md:text-base px-2 md:px-4">
                Sign In
              </button>
              <button className="bg-[#0076D6] text-white px-3 md:px-6 py-2 rounded-lg hover:bg-[#005bb5] transition-colors text-sm md:text-base">
                Sign Up
              </button>
              <button
                className="md:hidden p-2 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-[#0076D6] transition-colors px-4 py-2 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/translate"
                  className="text-gray-600 hover:text-[#0076D6] transition-colors px-4 py-2 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Translate
                </Link>
                <Link
                  href="/documents"
                  className="text-[#0076D6] font-medium px-4 py-2 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Documents
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

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
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Document Preview */}
              <div className="relative h-40 md:h-48 bg-gray-100">
                <img src={doc.previewUrl || "/placeholder.svg"} alt={doc.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 md:top-3 right-2 md:right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              </div>

              {/* Document Info */}
              <div className="p-4 md:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">{doc.name}</h3>

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
                </div>

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
                        onClick={() => handleDownload(doc, "PDF")}
                        disabled={doc.status !== "Completed"}
                        className="flex items-center justify-center px-2 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed h-9 border border-red-200"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        PDF
                      </button>
                      <button
                        onClick={() => handleDownload(doc, "JPEG")}
                        disabled={doc.status !== "Completed"}
                        className="flex items-center justify-center px-2 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed h-9 border border-blue-200"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        JPEG
                      </button>
                      <button
                        onClick={() => handleDownload(doc, "PNG")}
                        disabled={doc.status !== "Completed"}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate pr-4">
                {selectedDocument.name}
              </h3>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <iframe src={selectedDocument.previewUrl} className="w-full h-full" title={selectedDocument.name} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
