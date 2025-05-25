/**
 * Tutorial2Worker.js - Account Generation Operations
 * 
 * Used in Tutorial 2: Generate Account
 * Handles basic account creation and key display
 */

import { Account } from "@provablehq/sdk";
import { ensureInitialized, createBaseMessageHandler, setupErrorHandler } from "./BaseAleoWorker.js";

/**
 * Generate a complete Aleo account
 */
async function generateAccount() {
  try {
    console.log("🔄 Tutorial 2: Starting account generation...");
    
    // Step 1: Ensure SDK is initialized
    console.log("🔄 Step 1: Initializing SDK...");
    await ensureInitialized();
    console.log("✅ Step 1: SDK initialized successfully");
    
    // Step 2: Create new account
    console.log("🔄 Step 2: Creating new Account()...");
    const account = new Account();
    console.log("✅ Step 2: Account created successfully");
    
    // Step 3: Extract keys one by one with detailed logging
    console.log("🔄 Step 3: Extracting private key...");
    const privateKey = account.privateKey().to_string();
    console.log("✅ Step 3: Private key extracted");
    
    console.log("🔄 Step 4: Extracting view key...");
    const viewKey = account.viewKey().to_string();
    console.log("✅ Step 4: View key extracted");
    
    console.log("🔄 Step 5: Extracting address...");
    const address = account.address().to_string();
    console.log("✅ Step 5: Address extracted");
    
    console.log("🔄 Step 6: Extracting compute key...");
    let computeKey;
    try {
      const computeKeyObj = account.computeKey();
      
      // The compute key might be a complex object in this SDK version
      // Let's try different approaches to get a meaningful representation
      if (typeof computeKeyObj === 'string') {
        computeKey = computeKeyObj;
      } else if (computeKeyObj && typeof computeKeyObj.toString === 'function') {
        const stringValue = computeKeyObj.toString();
        if (stringValue !== '[object Object]') {
          computeKey = stringValue;
        } else {
          // For educational purposes, show that compute key exists but needs special handling
          computeKey = "🔑 Compute Key (WASM Object) - Used for trustless program execution";
        }
      } else {
        computeKey = "🔑 Compute Key - Available for zero-knowledge operations";
      }
      
      console.log("✅ Step 6: Compute key handled:", computeKey);
    } catch (computeError) {
      console.warn("⚠️ Step 6: Compute key extraction failed:", computeError.message);
      computeKey = "Compute key not available in this SDK version";
    }
    
    const result = {
      privateKey,
      viewKey,
      address,
      computeKey
    };
    
    console.log("🎉 Tutorial 2: Account generation completed successfully");
    return result;
    
  } catch (error) {
    console.error("❌ Tutorial 2: Account generation failed:", error);
    console.error("❌ Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Return detailed error info
    throw new Error(`Account generation failed: ${error.message}`);
  }
}

// Custom message handler that sends the correct message type
onmessage = async function(e) {
  console.log("📨 Tutorial2Worker received message:", e.data);
  
  try {
    if (e.data.type === "generateAccount") {
      const result = await generateAccount();
      
      // Send response with type "account" to match frontend expectation
      postMessage({
        type: "account",
        result: result,
        success: true
      });
    } else {
      console.warn("⚠️ Unknown message type:", e.data.type);
      postMessage({
        type: "error",
        result: `Unknown message type: ${e.data.type}`,
        success: false
      });
    }
  } catch (error) {
    console.error("💥 Tutorial2Worker error:", error);
    postMessage({
      type: "error",
      result: error.message || "Unknown error occurred",
      success: false,
      error: error.message
    });
  }
};

setupErrorHandler();

console.log("🎯 Tutorial 2 Worker (Account Generation) initialized and ready"); 