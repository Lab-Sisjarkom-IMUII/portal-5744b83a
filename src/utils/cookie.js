/**
 * Cookie utility functions
 */

/**
 * Get cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export function getCookie(name) {
  if (typeof document === "undefined") return null;
  
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  
  return null;
}

/**
 * Set cookie with expiration
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiration days (default: 7)
 */
export function setCookie(name, value, days = 7) {
  if (typeof document === "undefined") return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  const secure = window.location.protocol === "https:" ? "Secure;" : "";
  const sameSite = "SameSite=Lax;";
  
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;${secure}${sameSite}`;
}

/**
 * Delete cookie
 * @param {string} name - Cookie name
 */
export function deleteCookie(name) {
  if (typeof document === "undefined") return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Get authentication token from cookie
 * @returns {string|null} JWT token or null
 */
export function getAuthToken() {
  return getCookie("imuii-token");
}

