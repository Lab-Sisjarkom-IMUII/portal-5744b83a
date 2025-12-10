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

  // Supabase Configuration (for file uploads)
  supabase: {
    // Supabase project URL
    url: "https://mjgoqvpqwgwicrkbidyj.supabase.co",
    
    // Supabase anonymous/public key
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ29xdnBxd2d3aWNya2JpZHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MDg1ODMsImV4cCI6MjA3Nzk4NDU4M30.XHw8qnxUsrc8picYeAtRo2LUrL45QNMEg32eAXHn2so",
    
    // Storage bucket name for uploads
    bucketName: "thumbnails", // Default bucket name, bisa diubah sesuai kebutuhan
  },
};

// Export configuration
export default config;

// Export individual configs for convenience
export const API_BASE_URL = config.api.baseUrl;
export const WEB_BASE_URL = config.sso.webBaseUrl;
export const PORTAL_BASE_URL = config.sso.portalBaseUrl;
export const USE_DUMMY_DATA = config.features.useDummyData;
export const SUPABASE_URL = config.supabase.url;
export const SUPABASE_ANON_KEY = config.supabase.anonKey;
export const SUPABASE_BUCKET_NAME = config.supabase.bucketName;

