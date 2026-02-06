import axios from "axios";

const CHATBOT_API_URL = "https://n8n.imuii.id/webhook/portal-chatbot";
const SOURCE = "portal.imuii.id";

/**
 * Send message ke chatbot API
 * @param {string} message - User message
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Response dari API
 */
export async function sendChatMessage(message, sessionId) {
  try {
    const requestBody = [
      {
        message: message.trim(),
        session_id: sessionId,
        source: SOURCE,
      },
    ];

    const response = await axios.post(CHATBOT_API_URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Response format: [{ success, message, projects, ... }]
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0]; // Return first item
    }

    return response.data;
  } catch (error) {
    console.error("Chatbot API error:", error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error ||
                          `Server error: ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    } else {
      // Something else happened
      throw new Error(error.message || "Gagal mengirim pesan ke chatbot");
    }
  }
}
