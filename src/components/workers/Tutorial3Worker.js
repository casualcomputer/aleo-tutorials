/**
 * Tutorial3Worker.js - Program Execution Operations
 * 
 * Used in Tutorial 3: Execute Program
 * Handles Aleo program execution, proof generation, and program validation
 */

import { Account, ProgramManager, PrivateKey } from "@provablehq/sdk";
import { ensureInitialized, createBaseMessageHandler, setupErrorHandler } from "./BaseAleoWorker.js";

/**
 * Sample programs for Tutorial 3
 */
const TUTORIAL3_PROGRAMS = {
  hello: `
program hello_hello.aleo;

function hello:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;`,
    
  calculator: `
program calculator.aleo;

function multiply:
    input r0 as u32.public;
    input r1 as u32.public;
    mul r0 r1 into r2;
    output r2 as u32.public;`,
};

/**
 * Execute an Aleo program
 */
async function executeProgram({ program, functionName, inputs, privateKey }) {
  await ensureInitialized();
  
  console.log("🚀 Tutorial 3: Starting program execution...");
  console.log("Function:", functionName);
  console.log("Inputs:", inputs);
  
  try {
    const programManager = new ProgramManager();
    
    const account = privateKey 
      ? new Account({ privateKey: PrivateKey.from_string(privateKey) })
      : new Account();
      
    programManager.setAccount(account);

    const executionResponse = await programManager.run(
      program,
      functionName,
      inputs,
      false
    );
    
    const outputs = executionResponse.getOutputs();
    console.log("✅ Tutorial 3: Program executed successfully");
    
    return {
      outputs,
      account: account.address().to_string(),
      executionTime: Date.now(),
      tutorial: 3
    };
  } catch (error) {
    console.error("❌ Tutorial 3: Program execution failed:", error);
    throw error;
  }
}

/**
 * Execute sample program for Tutorial 3
 */
async function executeSample({ programName = "hello", inputs = ["5u32", "5u32"] }) {
  const program = TUTORIAL3_PROGRAMS[programName];
  if (!program) {
    throw new Error(`Tutorial 3: Sample program '${programName}' not found`);
  }
  
  return executeProgram({
    program,
    functionName: programName === "hello" ? "hello" : "multiply",
    inputs
  });
}

/**
 * Validate program syntax for Tutorial 3
 */
async function validateProgram({ program }) {
  await ensureInitialized();
  
  try {
    if (!program.includes("program ") || !program.includes("function ")) {
      throw new Error("Invalid program structure");
    }
    
    console.log("✅ Tutorial 3: Program syntax appears valid");
    return { valid: true, message: "Program syntax is valid", tutorial: 3 };
  } catch (error) {
    console.error("❌ Tutorial 3: Program validation failed:", error);
    return { valid: false, message: error.message, tutorial: 3 };
  }
}

// Message handlers for Tutorial 3
const handlers = {
  executeProgram,
  executeSample,
  validateProgram,
  // Legacy support
  execute: () => executeSample({ programName: "hello" })
};

onmessage = createBaseMessageHandler(handlers);
setupErrorHandler();

console.log("🎯 Tutorial 3 Worker (Program Execution) initialized and ready"); 