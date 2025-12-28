import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "./Button";
import { useAuth } from "../hooks/useAuth";
import { redirectToLogin } from "../services/authService";
import { clearAuthToken } from "../utils/auth";

/**
 * Navbar component dengan responsive mobile menu
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const isActive = (path) => location.pathname === path;

  const publicNavLinks = [
    { path: "/", label: "Showcase" },
    { path: "/events", label: "Events" },
    { path: "/faq", label: "FAQ" },
  ];

  const authenticatedNavLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { path: "/", label: "Showcase" },
    { path: "/events", label: "Events" },
    { path: "/faq", label: "FAQ" },
  ];
  
  const handleLogin = () => {
    redirectToLogin(window.location.pathname);
  };
  
  const handleLogout = () => {
    clearAuthToken();
    logout();
    setIsMobileMenuOpen(false);
  };

  const navLinks = isAuthenticated ? authenticatedNavLinks : publicNavLinks;
  
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
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                  ${isActive(link.path)
                    ? "text-[var(--primary)] bg-[var(--primary)]/10"
                    : "text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                  }
                `}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            
            {/* User Info & Logout (when authenticated) */}
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm text-[var(--foreground)]/80">
                  {user?.name || user?.email || "User"}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
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
                    px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                    ${isActive(link.path)
                      ? "text-[var(--primary)] bg-[var(--primary)]/10"
                      : "text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                    }
                  `}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-[var(--foreground)]/80 mt-2">
                    {user?.name || user?.email || "User"}
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

