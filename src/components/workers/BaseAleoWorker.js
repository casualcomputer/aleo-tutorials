/**
 * BaseAleoWorker.js - Foundation for all Aleo operations
 * 
 * This provides the basic initialization and message handling
 * that all Aleo workers need. Other workers extend this.
 */

import { initThreadPool } from "@provablehq/sdk";

// Shared initialization state
let isInitialized = false;

/**
 * Initialize the Aleo thread pool (required for all operations)
 */
export async function ensureInitialized() {
  if (!isInitialized) {
    console.log("🔧 Initializing Aleo thread pool...");
    await initThreadPool();
    isInitialized = true;
    console.log("✅ Aleo thread pool initialized");
  }
}

/**
 * Base message handler that all workers can extend
 */
export function createBaseMessageHandler(handlers) {
  return async function(e) {
    console.log("📨 Worker received message:", e.data);
    
    try {
      const messageType = e.data.type || e.data;
      const handler = handlers[messageType];
      
      if (handler) {
        const result = await handler(e.data);
        postMessage({
          type: messageType,
          result: result,
          success: true
        });
      } else {
        console.warn("⚠️ Unknown message type:", messageType);
        postMessage({
          type: "error",
          result: `Unknown message type: ${messageType}`,
          success: false
        });
      }
    } catch (error) {
      console.error("💥 Worker error:", error);
      postMessage({
        type: "error",
        result: error.message || "Unknown error occurred",
        success: false,
        error: error.message
      });
    }
  };
}

/**
 * Standard error handler for all workers
 */
export function setupErrorHandler() {
  onerror = function(error) {
    console.error("💥 Worker uncaught error:", error);
    postMessage({
      type: "error",
      result: "Worker error: " + error.message,
      success: false
    });
  };
} 