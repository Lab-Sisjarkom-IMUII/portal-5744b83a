import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";

/**
 * Layout component - wrapper untuk semua pages
 * @param {React.ReactNode} children - Page content
 */
export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {children}
        </div>
      </main>
      <Footer />
      {/* Chatbot - Always accessible, z-index 60 (above modals z-50) */}
      <Chatbot />
    </div>
  );
}

