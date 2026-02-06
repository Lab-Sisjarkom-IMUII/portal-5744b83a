/**
 * Session utility functions untuk chatbot
 * Session ID tidak persist, hilang saat refresh page
 */

/**
 * Generate random session ID untuk chatbot
 * Format: chatbot-{timestamp}-{random}
 * @returns {string} Session ID
 */
export function generateSessionId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `chatbot-${timestamp}-${random}`;
}

/**
 * Get or create session ID
 * Session ID disimpan di memory, tidak persist
 * Akan regenerate setiap refresh page
 */
let sessionId = null;

/**
 * Get current session ID or create new one
 * @returns {string} Session ID
 */
export function getSessionId() {
  if (!sessionId) {
    sessionId = generateSessionId();
  }
  return sessionId;
}

/**
 * Reset session ID (untuk testing atau reset)
 */
export function resetSessionId() {
  sessionId = null;
}
