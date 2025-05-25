"use client";

import React, { useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { PROGRAM_ID } from "../core/constants.js";
import {
    PuzzleWalletAdapter,
    FoxWalletAdapter,
    SoterWalletAdapter,
} from "aleo-adapters";
import {
    DecryptPermission,
    WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

/**
 * WalletWrapper Component
 * 
 * This component demonstrates how to set up Aleo wallet integration in a React application.
 * It serves as the foundation for Tutorial 1: Wallet Connection.
 * 
 * Key Features Demonstrated:
 * - Multiple wallet adapter support (Puzzle, Leo, Fox, Soter)
 * - Network configuration (Testnet/Mainnet)
 * - Permission management for decryption
 * - Auto-connect functionality
 * - Program ID permissions for specific wallets
 * 
 * Tutorial Learning Objectives:
 * 1. Understand wallet adapter architecture
 * 2. Learn how to configure multiple wallet types
 * 3. Set up proper permissions and network settings
 * 4. Implement wallet provider context for the entire app
 */
export const WalletWrapper = ({ children }) => {
    // Initialize wallets with configuration for tutorial demonstration
    const wallets = useMemo(
        () => [
            // Puzzle Wallet - Most commonly used Aleo wallet
            new PuzzleWalletAdapter({
                programIdPermissions: {
                    // Configure permissions for both networks
                    ["AleoMainnet"]: [PROGRAM_ID],
                    ["AleoTestnet"]: [PROGRAM_ID],
                },
                appName: "Aleo Tutorial App",
                appDescription: "Learn Aleo development step by step",
            }),
            
            // Leo Wallet - Official Aleo wallet
            new LeoWalletAdapter({
                appName: "Aleo Tutorial App",
            }),
            
            // Additional wallets for comprehensive tutorial coverage
            // Uncomment these as needed for advanced tutorials
            /*
            new FoxWalletAdapter({
                appName: "Aleo Tutorial App",
            }),
            new SoterWalletAdapter({
                appName: "Aleo Tutorial App",
            }),
            */
        ],
        []
    );

    return (
        <WalletProvider
            wallets={wallets}
            decryptPermission={DecryptPermission.UponRequest}
            network={WalletAdapterNetwork.TestnetBeta} // Using Testnet for tutorial safety
            autoConnect // Automatically attempt to reconnect on page load
        >
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    );
};

/**
 * Tutorial Notes:
 * 
 * 1. WALLET ADAPTERS:
 *    - Each wallet type requires its own adapter
 *    - Adapters handle wallet-specific communication protocols
 *    - Multiple adapters can be configured simultaneously
 * 
 * 2. NETWORK CONFIGURATION:
 *    - TestnetBeta: Safe for learning and development
 *    - MainnetBeta: Production network (use with caution)
 * 
 * 3. PERMISSIONS:
 *    - DecryptPermission.UponRequest: Ask user before decrypting
 *    - Program permissions: Control which programs can interact with wallet
 * 
 * 4. PROVIDER PATTERN:
 *    - WalletProvider: Core wallet functionality
 *    - WalletModalProvider: UI components for wallet selection
 * 
 * 5. INTEGRATION:
 *    - Wrap your entire app with this component
 *    - Access wallet state using useWallet() hook in child components
 */ 