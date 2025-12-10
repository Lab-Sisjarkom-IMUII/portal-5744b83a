import { getAuthToken } from "../utils/cookie";
import { WEB_BASE_URL, PORTAL_BASE_URL } from "../config/config";

/**
 * Redirect to imuii-web login page with redirect parameter
 * @param {string} returnUrl - URL to redirect back after login (optional)
 */
export function redirectToLogin(returnUrl = null) {
  // Construct callback URL for portal
  const callbackUrl = `${PORTAL_BASE_URL}/auth/callback`;
  
  // If returnUrl is provided, add it as a query param to callback
  let finalCallbackUrl = callbackUrl;
  if (returnUrl) {
    const encodedReturnUrl = encodeURIComponent(returnUrl);
    finalCallbackUrl = `${callbackUrl}?redirect=${encodedReturnUrl}`;
  }
  
  // Redirect to imuii-web login with portal callback URL
  // Note: imuii-web uses /login route, not /auth/login
  const encodedCallbackUrl = encodeURIComponent(finalCallbackUrl);
  const loginUrl = `${WEB_BASE_URL}/login?redirect=${encodedCallbackUrl}`;
  
  window.location.href = loginUrl;
}

/**
 * Handle login callback after redirect from imuii-web
 * @returns {string|null} Return URL or null
 */
export function handleLoginCallback() {
  // Check if token exists in cookie after redirect
  const token = getAuthToken();
  
  if (!token) {
    console.warn("No token found after login callback");
    return null;
  }
  
  // Get returnUrl from URL params or default to home
  const urlParams = new URLSearchParams(window.location.search);
  const returnUrl = urlParams.get("redirect") || "/";
  
  // Decode returnUrl
  try {
    const decodedUrl = decodeURIComponent(returnUrl);
    // Validate that it's a relative path
    if (decodedUrl.startsWith("/") && !decodedUrl.includes("..")) {
      return decodedUrl;
    }
  } catch (error) {
    console.error("Failed to decode return URL:", error);
  }
  
  return "/";
}

