import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Navigation Component - ELLE Magazine Style
 * 
 * Clean, minimal navigation inspired by ELLE magazine:
 * - Three-column layout: empty left, centered logo, CTA button right
 * - Black and white color scheme
 * - Bottom navigation bar with categories
 * - Mobile hamburger menu
 */

interface NavigationProps {
  // No props needed currently, but interface kept for future extensibility
}

export default function Navigation(_props: NavigationProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu items for the bottom navigation bar
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Magazine", href: "/magazine" },
    { label: "Business Club", href: "/business-club" },
    { label: "Events", href: "/events" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/10">
      {/* Main Header - ELLE Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center justify-end h-16 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-black hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop: Three-column layout */}
        <div className="hidden md:grid md:grid-cols-3 items-center py-6">
          {/* Left: Empty spacer */}
          <div></div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <Link to="/" className="text-center">
              <img
                src="/assets/logo.jpeg"
                alt="SPA & SALON AFRICA"
                className="h-24 md:h-32 object-contain"
              />
                 {/* <div className="font-display text-3xl md:text-4xl font-bold text-black tracking-tight">
                SPA & SALON AFRICA
              </div> */}
            </Link>
          </div>

          {/* Right: CTA Button */}
          <div className="flex justify-end">
            <Link
              to="/business-club-questionnaire"
              className="px-6 py-2 bg-black text-white uppercase text-sm font-semibold tracking-wider hover:bg-black/90 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Join our business club
            </Link>
          </div>
        </div>

        {/* Mobile: Logo and Button Stack */}
        <div className="md:hidden py-6 space-y-4">
          <div className="flex justify-center">
            <Link to="/" className="text-center">
              <img
                src="/assets/logo.jpeg"
                alt="SPA & SALON AFRICA"
                className="h-18 md:h-24 object-contain"
              />
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              to="/business-club-questionnaire"
              className="px-6 py-2 bg-black text-white uppercase text-xs font-semibold tracking-wider hover:bg-black/90 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Join our business club
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar - Desktop */}
      <div className="hidden md:block border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-black/70 hover:text-black uppercase tracking-wider transition-all duration-200 hover:scale-105"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-sm font-medium text-black/70 hover:text-black uppercase tracking-wider text-center transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
