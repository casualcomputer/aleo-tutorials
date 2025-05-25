/**
 * AleoWorker.js - Web Worker for Aleo Operations
 * 
 * This Web Worker handles computationally intensive Aleo operations off the main thread.
 * Used in Tutorial 2 (Account Generation) and Tutorial 3 (Program Execution).
 * 
 * Key Concepts Demonstrated:
 * 1. Web Worker setup for blockchain operations
 * 2. Aleo SDK integration in worker context
 * 3. Thread pool initialization for performance
 * 4. Secure private key generation
 * 5. Program execution with cryptographic proofs
 * 
 * Learning Objectives:
 * - Understand why workers are needed for Aleo operations
 * - Learn proper SDK initialization patterns
 * - See how to handle async operations in workers
 * - Understand the message passing interface
 */

import {
  Account,
  initThreadPool,
  PrivateKey,
  ProgramManager,
} from "@provablehq/sdk";

// Worker initialization state
let isInitialized = false;

/**
 * Initialize the Aleo thread pool
 * This is required before any Aleo operations can be performed.
 * We do this lazily to avoid blocking worker startup.
 */
async function ensureInitialized() {
  if (!isInitialized) {
    console.log("🔧 Initializing Aleo thread pool...");
    await initThreadPool();
    isInitialized = true;
    console.log("✅ Aleo thread pool initialized");
  }
}

/**
 * Sample Aleo Program for Tutorial 3
 * This is a simple "hello world" program that adds two numbers.
 * In a real application, you would load programs from files or network.
 */
const hello_hello_program = `
program hello_hello.aleo;

function hello:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;`;

/**
 * Execute an Aleo program with given inputs
 * 
 * @param {string} program - The Leo program source code
 * @param {string} aleoFunction - The function name to execute
 * @param {string[]} inputs - Array of input values
 * @returns {Promise<string[]>} - Array of output values
 */
async function localProgramExecution(program, aleoFunction, inputs) {
  await ensureInitialized();
  
  console.log("🚀 Starting program execution...");
  console.log("Program:", program.split('\n')[0]); // Log program name
  console.log("Function:", aleoFunction);
  console.log("Inputs:", inputs);
  
  // Create a new program manager for this execution
  const programManager = new ProgramManager();

  // Create a temporary account for the execution
  // In production, you might use a persistent account
  const account = new Account();
  programManager.setAccount(account);

  try {
    // Execute the program and generate a proof
    const executionResponse = await programManager.run(
        program,
        aleoFunction,
        inputs,
        false, // Don't cache the execution
    );
    
    const outputs = executionResponse.getOutputs();
    console.log("✅ Program executed successfully");
    console.log("Outputs:", outputs);
    
    return outputs;
  } catch (error) {
    console.error("❌ Program execution failed:", error);
    throw error;
  }
}

/**
 * Generate a new Aleo private key
 * This creates a cryptographically secure private key for account creation.
 * 
 * @returns {Promise<string>} - The private key as a string
 */
async function getPrivateKey() {
  await ensureInitialized();
  
  console.log("🔑 Generating new private key...");
  
  try {
    const privateKey = new PrivateKey().to_string();
    console.log("✅ Private key generated successfully");
    // Don't log the actual private key for security
    console.log("Key length:", privateKey.length);
    
    return privateKey;
  } catch (error) {
    console.error("❌ Private key generation failed:", error);
    throw error;
  }
}

/**
 * Worker Message Handler
 * 
 * This function receives messages from the main thread and dispatches
 * them to the appropriate handler functions.
 * 
 * Message Types:
 * - "execute": Execute an Aleo program
 * - "key": Generate a new private key
 */
onmessage = async function (e) {
  console.log("📨 Worker received message:", e.data);
  
  try {
    if (e.data === "execute") {
      // Execute the sample program with default inputs
      const result = await localProgramExecution(
        hello_hello_program, 
        "hello", 
        ["5u32", "5u32"]
      );
      postMessage({
        type: "execute", 
        result: result,
        success: true
      });
      
    } else if (e.data === "key") {
      // Generate a new private key
      const result = await getPrivateKey();
      postMessage({
        type: "key", 
        result: result,
        success: true
      });
      
    } else {
      // Unknown message type
      console.warn("⚠️ Unknown message type:", e.data);
      postMessage({
        type: "error",
        result: "Unknown message type: " + e.data,
        success: false
      });
    }
    
  } catch (error) {
    // Handle any errors that occur during processing
    console.error("💥 Worker error:", error);
    postMessage({
      type: "error",
      result: error.message || "Unknown error occurred",
      success: false
    });
  }
};

/**
 * Worker Error Handler
 * Handle any uncaught errors in the worker
 */
onerror = function(error) {
  console.error("💥 Worker uncaught error:", error);
  postMessage({
    type: "error",
    result: "Worker error: " + error.message,
    success: false
  });
};

console.log("🎯 Aleo Worker initialized and ready");

/**
 * Tutorial Notes:
 * 
 * 1. WEB WORKERS:
 *    - Run on separate thread to avoid blocking UI
 *    - Essential for computationally intensive operations
 *    - Communicate via message passing (postMessage/onmessage)
 * 
 * 2. ALEO SDK:
 *    - Requires thread pool initialization before use
 *    - ProgramManager handles program execution
 *    - Account objects represent Aleo accounts
 * 
 * 3. SECURITY:
 *    - Private keys should never be logged in production
 *    - Always validate inputs before processing
 *    - Handle errors gracefully to prevent crashes
 * 
 * 4. PERFORMANCE:
 *    - Initialize SDK components lazily
 *    - Reuse objects when possible
 *    - Consider caching for repeated operations
 */ 