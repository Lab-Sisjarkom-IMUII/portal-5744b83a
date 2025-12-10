/**
 * JWT utility functions
 */

/**
 * Decode JWT token payload (without verification)
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null if invalid
 */
export function decodeToken(token) {
  if (!token) return null;
  
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }
    
    // Decode base64 payload (second part)
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired, false otherwise
 */
export function isTokenExpired(token) {
  if (!token) return true;
  
  const decoded = decodeToken(token);
  if (!decoded) return true;
  
  // Check if token has exp field
  if (!decoded.exp) return false; // No expiration, consider valid
  
  // Compare expiration time with current time
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}

/**
 * Validate token (exists and not expired)
 * @param {string} token - JWT token
 * @returns {boolean} True if valid, false otherwise
 */
export function isTokenValid(token) {
  if (!token) return false;
  return !isTokenExpired(token);
}

