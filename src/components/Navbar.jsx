import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { useAuth } from "../hooks/useAuth";
import { redirectToLogin } from "../services/authService";
import { clearAuthToken } from "../utils/auth";

/**
 * Navbar component dengan responsive mobile menu
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const isActive = (path) => location.pathname === path;

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);
  
  const navLinks = [
    { path: "/", label: "Showcase" },
    { path: "/events", label: "Events" },
  ];
  
  const handleLogin = () => {
    redirectToLogin(window.location.pathname);
  };
  
  const handleLogout = () => {
    clearAuthToken();
    logout();
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/MainLogo.png" 
              alt="IMUII Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-[var(--foreground)]">
              IMUII Portal
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive(link.path)
                    ? "text-[var(--primary)] bg-[var(--primary)]/10"
                    : "text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--muted)] hover:bg-[var(--card)] transition-colors"
                >
                  <User className="h-4 w-4 text-[var(--foreground)]/60" />
                  <span className="text-sm text-[var(--foreground)]">
                    {user?.name || user?.email || "User"}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-[var(--foreground)]/60 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                          isActive("/dashboard")
                            ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                            : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                        }`}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      {/* Profile link - future */}
                      {/* <Link
                        to={`/user/${user?.id}`}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link> */}
                      <div className="border-t border-[var(--border)] my-1" />
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="accent"
                size="sm"
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[var(--foreground)]" />
            ) : (
              <Menu className="h-6 w-6 text-[var(--foreground)]" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.path)
                      ? "text-[var(--primary)] bg-[var(--primary)]/10"
                      : "text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive("/dashboard")
                        ? "text-[var(--primary)] bg-[var(--primary)]/10"
                        : "text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </div>
                  </Link>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--muted)] mt-2">
                    <User className="h-4 w-4 text-[var(--foreground)]/60" />
                    <span className="text-sm text-[var(--foreground)]">
                      {user?.name || user?.email || "User"}
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="accent"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogin();
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

