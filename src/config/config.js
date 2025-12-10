/**
 * Application Configuration
 * 
 * Edit this file to configure your deployment settings.
 * This file is easier to manage than .env files, especially on VPS.
 * 
 * IMPORTANT: Do NOT commit sensitive data to version control.
 * For production, create a separate config.js file outside of src/ if needed.
 */

const config = {
  // API Configuration
  api: {
    // Base URL for imuii-server API
    // Production: "https://api.imuii.id"
    // Development: "http://localhost:8080"
    baseUrl: "https://api.imuii.id",
  },

  // SSO Configuration
  sso: {
    // Base URL for imuii-web (SSO provider)
    // Production: "https://imuii.id"
    // Development: "http://localhost:3000"
    webBaseUrl: "https://imuii.id",
    
    // Base URL for this portal
    // Production: "https://portal.imuii.id"
    // Development: "http://localhost:5173"
    portalBaseUrl: "https://portal.imuii.id",
  },

  // Feature Flags
  features: {
    // Use dummy data instead of real API (for development/testing)
    // Set to true to use dummy data, false to use real API
    useDummyData: false,
  },
};

// Export configuration
export default config;

// Export individual configs for convenience
export const API_BASE_URL = config.api.baseUrl;
export const WEB_BASE_URL = config.sso.webBaseUrl;
export const PORTAL_BASE_URL = config.sso.portalBaseUrl;
export const USE_DUMMY_DATA = config.features.useDummyData;

