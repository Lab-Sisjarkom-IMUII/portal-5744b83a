/**
 * Configuration Example File
 * 
 * Copy this file to config.js and update with your actual values.
 * 
 * cp src/config/config.example.js src/config/config.js
 */

const config = {
  // API Configuration
  api: {
    // Base URL for imuii-server API
    baseUrl: "https://api.imuii.id", // Change to your API URL
  },

  // SSO Configuration
  sso: {
    // Base URL for imuii-web (SSO provider)
    webBaseUrl: "https://imuii.id", // Change to your web URL
    
    // Base URL for this portal
    portalBaseUrl: "https://portal.imuii.id", // Change to your portal URL
  },

  // Feature Flags
  features: {
    // Use dummy data instead of real API (for development/testing)
    useDummyData: false, // Set to true for development with dummy data
  },
};

export default config;

export const API_BASE_URL = config.api.baseUrl;
export const WEB_BASE_URL = config.sso.webBaseUrl;
export const PORTAL_BASE_URL = config.sso.portalBaseUrl;
export const USE_DUMMY_DATA = config.features.useDummyData;

