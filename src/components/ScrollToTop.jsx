import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Scroll ke bagian atas halaman setiap kali route berubah
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke atas dengan smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // 'instant' untuk scroll langsung tanpa animasi
    });
  }, [pathname]);

  return null;
}

