"use client"

import type React from "react"

import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { use, useState } from "react"
import { Menu, X, LayoutDashboard, ListChecks, Briefcase, Users, BarChart2 } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
 
  const navItems = [
    { href: "/tasks", label: "Tasks", icon: <ListChecks className="h-4 w-4" /> },
    { href: "/projects", label: "Projects", icon: <Briefcase className="h-4 w-4" /> },
    { href: "/clients", label: "Clients", icon: <Users className="h-4 w-4" /> },
    { href: "/analytics", label: "Analytics", icon: <BarChart2 className="h-4 w-4" /> },
  ]

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">
              <span className="text-blue-600">Freelance</span>Dashboard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="ml-4">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8 border border-gray-200",
                  },
                }}
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <MobileNavLink key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </MobileNavLink>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center px-3 py-2">
                <UserButton afterSignOutUrl="/" />
                <span className="ml-3 text-gray-700">Account</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

// Desktop NavLink Component
function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
   const pathname = usePathname()
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium ${pathname === href ? "bg-gray-50 text-blue-600" : "text-gray-600"} rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors`}
    >
      {icon}
      {children}
    </Link>
  )
}

// Mobile NavLink Component
function MobileNavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-blue-600"
    >
      {icon}
      {children}
    </Link>
  )
}
