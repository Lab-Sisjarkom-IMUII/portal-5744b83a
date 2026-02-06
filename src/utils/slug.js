/**
 * Utility functions untuk generate dan handle URL slugs
 */

/**
 * Generate URL-friendly slug dari string
 * @param {string} text - Text yang akan di-convert ke slug
 * @returns {string} URL-friendly slug
 */
export function generateSlug(text) {
  if (!text) return "";
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace spaces dengan hyphens
    .replace(/\s+/g, "-")
    // Remove special characters kecuali hyphens
    .replace(/[^\w\-]+/g, "")
    // Replace multiple hyphens dengan single hyphen
    .replace(/\-\-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/**
 * Check apakah string adalah UUID format
 * @param {string} str - String yang akan di-check
 * @returns {boolean} True jika UUID format
 */
export function isUUID(str) {
  if (!str) return false;
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

/**
 * Check apakah string adalah slug format (bukan UUID)
 * @param {string} str - String yang akan di-check
 * @returns {boolean} True jika slug format
 */
export function isSlug(str) {
  if (!str) return false;
  return !isUUID(str) && /^[a-z0-9-]+$/.test(str.toLowerCase());
}
