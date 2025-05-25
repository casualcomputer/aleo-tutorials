/**
 * Tutorial2Worker.js - Account Generation Operations
 * 
 * Used in Tutorial 2: Generate Account
 * Handles account creation, key generation, and account management
 */

import { Account, PrivateKey } from "@provablehq/sdk";
import { ensureInitialized, createBaseMessageHandler, setupErrorHandler } from "./BaseAleoWorker.js";

/**
 * Generate a complete Aleo account
 */
async function generateAccount() {
  await ensureInitialized();
  console.log("🔑 Tutorial 2: Generating complete Aleo account...");
  
  try {
    const account = new Account();
    
    return {
      privateKey: account.privateKey().to_string(),
      viewKey: account.viewKey().to_string(),
      address: account.address().to_string(),
      // Handle computeKey safely
      computeKey: (() => {
        try {
          return account.computeKey().to_string();
        } catch {
          return "Not available in this SDK version";
        }
      })()
    };
  } catch (error) {
    console.error("❌ Tutorial 2: Account generation failed:", error);
    throw error;
  }
}

/**
 * Generate just a private key
 */
async function generatePrivateKey() {
  await ensureInitialized();
  console.log("🔑 Tutorial 2: Generating private key...");
  
  try {
    const privateKey = new PrivateKey().to_string();
    console.log("✅ Tutorial 2: Private key generated successfully");
    return privateKey;
  } catch (error) {
    console.error("❌ Tutorial 2: Private key generation failed:", error);
    throw error;
  }
}

/**
 * Generate account from existing private key
 */
async function generateFromPrivateKey(privateKeyString) {
  await ensureInitialized();
  console.log("🔑 Tutorial 2: Generating account from private key...");
  
  try {
    const privateKey = PrivateKey.from_string(privateKeyString);
    const account = new Account({ privateKey });
    
    return {
      privateKey: account.privateKey().to_string(),
      viewKey: account.viewKey().to_string(),
      address: account.address().to_string(),
    };
  } catch (error) {
    console.error("❌ Tutorial 2: Account generation from private key failed:", error);
    throw error;
  }
}

// Message handlers for Tutorial 2
const handlers = {
  generateAccount,
  generatePrivateKey,
  generateFromPrivateKey,
  // Legacy support
  key: generatePrivateKey
};

onmessage = createBaseMessageHandler(handlers);
setupErrorHandler();

console.log("🎯 Tutorial 2 Worker (Account Generation) initialized and ready"); 