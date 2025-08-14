"use client"


import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function Navbar() {
const { isSignedIn } = useUser()
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

const pathname = usePathname()

  const getLinkClass = (path: string) => {
    return pathname === path ? "text-[#0076D6] font-medium" : "text-gray-700 hover:text-gray-900"
  }

  return (
     <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-4 md:space-x-8">
              <a href="/" className="cursor-pointer">
              <img src="/fairwork-logo-new.png" alt="FairWork Contract" className="h-20 md:h-32" href="/"/>
              </a>
              <nav className="hidden md:flex space-x-6">
                <a href="/" className={getLinkClass("/")}>
                  Home
                </a>
                {isSignedIn && (
                <a href="/translate" className={getLinkClass("/translate")}>
                  Translate
                </a>
                )}
                {isSignedIn && (
                <a href="/documents" className={getLinkClass("/documents")}>
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
                  className={`${getLinkClass("/")} px-4 py-2 text-base`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                {isSignedIn && (
                <a
                  href="/translate"
                  className={`${getLinkClass("/translate")} px-4 py-2 text-base`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Translate
                </a>
                 )}
                 {isSignedIn && (
                <a
                  href="/documents"
                  className={`${getLinkClass("/documents")} px-4 py-2 text-base`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Documents
                </a>
                 )}
              </nav>
            </div>
          )}
        </div>
      </nav>
  )
}
