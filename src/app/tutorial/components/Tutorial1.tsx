"use client";

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

export default function Tutorial1() {
    const { wallet, disconnect, publicKey, connecting, connected, wallets } = useWallet();
    const [walletError, setWalletError] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

    // Debug wallet availability
    useEffect(() => {
        console.log("=== WALLET DEBUG INFO ===");
        console.log("Available wallets:", wallets);
        console.log("Current wallet:", wallet);
        console.log("Connected:", connected);
        console.log("Connecting:", connecting);
        console.log("Public key:", publicKey);
        console.log("Window.aleo:", (window as any).aleo);
        console.log("Window.leo:", (window as any).leo);
        console.log("Window.puzzle:", (window as any).puzzle);
        
        // Additional Leo Wallet checks
        console.log("=== LEO WALLET SPECIFIC CHECKS ===");
        console.log("Window.leoWallet:", (window as any).leoWallet);
        console.log("Window.AleoWallet:", (window as any).AleoWallet);
        console.log("Document.querySelector leo-wallet:", document.querySelector('leo-wallet'));
        console.log("Navigator.userAgent:", navigator.userAgent);
        
        // Check if Leo extension is installed but not injected yet
        setTimeout(() => {
            console.log("=== DELAYED LEO WALLET CHECK (after 2s) ===");
            console.log("Window.leo (delayed):", (window as any).leo);
            console.log("Window.leoWallet (delayed):", (window as any).leoWallet);
        }, 2000);
        
        setDebugInfo({
            walletsCount: wallets?.length || 0,
            hasWindowAleo: !!(window as any).aleo,
            hasWindowLeo: !!(window as any).leo,
            hasWindowPuzzle: !!(window as any).puzzle,
            hasLeoWallet: !!(window as any).leoWallet,
            hasAleoWallet: !!(window as any).AleoWallet,
            currentWallet: wallet?.adapter?.name || 'none',
            connected,
            connecting
        });
    }, [wallets, wallet, connected, connecting, publicKey]);

    // Clear wallet error when wallet changes
    useEffect(() => {
        setWalletError(null);
    }, [wallet]);

    return (
        <div style={{ color: '#333' }}>
            <h2 style={{ color: '#1a1a1a', marginBottom: '15px', fontSize: '28px' }}>
                Tutorial 1: Wallet Connection
            </h2>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '25px' }}>
                Learn how to connect your Aleo wallet to this application.
                Limitation: Leo Wallet is not supported on some browsers.
            </p>
            
            {/* Debug Info */}
            {debugInfo && (
                <div style={{
                    backgroundColor: '#f8f9fa', 
                    border: '1px solid #e9ecef',
                    padding: '20px', 
                    borderRadius: '10px', 
                    margin: '25px 0',
                    fontSize: '14px',
                    textAlign: 'left',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    <h3 style={{ color: '#495057', marginBottom: '15px', fontSize: '18px' }}>
                        🔍 Debug Info:
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <p style={{ color: '#6c757d', margin: '4px 0' }}>
                            Wallets available: <strong style={{ color: '#28a745' }}>{debugInfo.walletsCount}</strong>
                        </p>
                        <p style={{ color: '#6c757d', margin: '4px 0' }}>
                            Window.aleo: {debugInfo.hasWindowAleo ? '✅' : '❌'}
                        </p>
                        <p style={{ color: '#6c757d', margin: '4px 0' }}>
                            Window.leo: {debugInfo.hasWindowLeo ? '✅' : '❌'}
                        </p>
                        <p style={{ color: '#6c757d', margin: '4px 0' }}>
                            Window.leoWallet: {debugInfo.hasLeoWallet ? '✅' : '❌'}
                        </p>
                        <p style={{ color: '#6c757d', margin: '4px 0' }}>
                            Window.AleoWallet: {debugInfo.hasAleoWallet ? '✅' : '❌'}
                        </p>
                        <p style={{ color: '#6c757d', margin: '4px 0' }}>
                            Window.puzzle: {debugInfo.hasWindowPuzzle ? '✅' : '❌'}
                        </p>
                        <p style={{ color: '#6c757d', margin: '4px 0' }}>
                            Current wallet: <strong style={{ color: '#0070f3' }}>{debugInfo.currentWallet}</strong>
                        </p>
                        <p style={{ color: '#6c757d', margin: '4px 0' }}>
                            Connected: {debugInfo.connected ? '✅' : '❌'}
                        </p>
                        <p style={{ color: '#6c757d', margin: '4px 0' }}>
                            Connecting: {debugInfo.connecting ? '✅' : '❌'}
                        </p>
                    </div>
                </div>
            )}

            {/* Collapsible Technical Details Section */}
            <div style={{
                backgroundColor: '#f8f9fa', 
                border: '1px solid #e9ecef',
                borderRadius: '10px', 
                margin: '25px 0',
                overflow: 'hidden'
            }}>
                <button
                    onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                    style={{
                        width: '100%',
                        padding: '15px 20px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#495057',
                        transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <span>🔧 Show Technical Details - How Wallet Integration Works</span>
                    <span style={{ 
                        fontSize: '20px', 
                        transform: showTechnicalDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }}>
                        ▼
                    </span>
                </button>
                
                {showTechnicalDetails && (
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        borderTop: '1px solid #e9ecef',
                        animation: 'slideDown 0.3s ease-out'
                    }}>
                        <h4 style={{ color: '#0056b3', marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>
                            🔗 Component Architecture Flow
                        </h4>
                        
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '15px',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            {/* Step 1 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px',
                                backgroundColor: '#e7f3ff',
                                borderRadius: '8px',
                                border: '1px solid #b3d9ff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{
                                    backgroundColor: '#0070f3',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                }}>1</div>
                                <div>
                                    <strong style={{ color: '#0056b3' }}>layout.tsx</strong>
                                    <br />
                                    <span style={{ color: '#6c757d', fontSize: '13px' }}>
                                        Wraps entire app with &lt;WalletWrapper&gt;
                                    </span>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div style={{ textAlign: 'center', color: '#0070f3', fontSize: '20px' }}>↓</div>

                            {/* Step 2 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                padding: '15px',
                                backgroundColor: '#d4edda',
                                borderRadius: '8px',
                                border: '1px solid #c3e6cb',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    flexShrink: 0,
                                    marginTop: '2px'
                                }}>2</div>
                                <div>
                                    <strong style={{ color: '#155724' }}>WalletWrapper.jsx</strong>
                                    <br />
                                    <div style={{ color: '#155724', fontSize: '13px', lineHeight: '1.4' }}>
                                        ↓ Provides WalletProvider context<br />
                                        ↓ Provides WalletModalProvider context<br />
                                        ↓ Configures wallet adapters (Puzzle, Leo, etc.)<br />
                                        ↓ Loads wallet UI styles
                                    </div>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div style={{ textAlign: 'center', color: '#0070f3', fontSize: '20px' }}>↓</div>

                            {/* Step 3 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                padding: '15px',
                                backgroundColor: '#fff3cd',
                                borderRadius: '8px',
                                border: '1px solid #ffeaa7',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{
                                    backgroundColor: '#856404',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    flexShrink: 0,
                                    marginTop: '2px'
                                }}>3</div>
                                <div>
                                    <strong style={{ color: '#856404' }}>Tutorial1.tsx (This Page)</strong>
                                    <br />
                                    <div style={{ color: '#856404', fontSize: '13px', lineHeight: '1.4' }}>
                                        ↓ Uses useWallet() hook <span style={{ color: '#dc3545', fontWeight: 'bold' }}>← DEPENDS ON WALLETWRAPPER</span><br />
                                        ↓ Uses WalletMultiButton <span style={{ color: '#dc3545', fontWeight: 'bold' }}>← DEPENDS ON WALLETWRAPPER</span><br />
                                        ↓ Accesses wallet state <span style={{ color: '#dc3545', fontWeight: 'bold' }}>← DEPENDS ON WALLETWRAPPER</span><br />
                                        ↓ Shows debug info <span style={{ color: '#dc3545', fontWeight: 'bold' }}>← DEPENDS ON WALLETWRAPPER</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Key Insight Box */}
                        <div style={{
                            marginTop: '25px',
                            padding: '15px',
                            backgroundColor: '#f8d7da',
                            borderRadius: '8px',
                            border: '1px solid #f5c6cb',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: '#721c24', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                                💡 Key Insight: Without WalletWrapper, this tutorial page wouldn't work!
                            </p>
                            <p style={{ color: '#721c24', margin: '8px 0 0 0', fontSize: '12px' }}>
                                Try commenting out the WalletWrapper in layout.tsx to see what happens.
                            </p>
                        </div>

                        {/* Code Examples */}
                        <div style={{ marginTop: '20px' }}>
                            <h5 style={{ color: '#495057', marginBottom: '10px' }}>📝 Code Examples:</h5>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <strong style={{ color: '#0056b3', fontSize: '13px' }}>In layout.tsx:</strong>
                                <div style={{
                                    backgroundColor: '#2d3748',
                                    color: '#e2e8f0',
                                    padding: '10px',
                                    borderRadius: '6px',
                                    fontFamily: 'monospace',
                                    fontSize: '12px',
                                    marginTop: '5px'
                                }}>
                                    &lt;WalletWrapper&gt;{'{children}'}&lt;/WalletWrapper&gt;
                                </div>
                            </div>

                            <div>
                                <strong style={{ color: '#0056b3', fontSize: '13px' }}>In this tutorial:</strong>
                                <div style={{
                                    backgroundColor: '#2d3748',
                                    color: '#e2e8f0',
                                    padding: '10px',
                                    borderRadius: '6px',
                                    fontFamily: 'monospace',
                                    fontSize: '12px',
                                    marginTop: '5px'
                                }}>
                                    const {'{wallet, connected}'} = useWallet();
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add CSS for animation */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            {/* Centered Wallet Buttons */}
            <div style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '15px',
                margin: '20px 0'
            }}>
                {/* Main Wallet Button - Centered */}
                <div style={{zIndex: 1000, position: 'relative'}}>
                    <WalletMultiButton />
                </div>

                {/* Status Display */}
                <div style={{
                    padding: '15px 30px',
                    fontSize: '16px',
                    backgroundColor: connected ? '#d4edda' : '#f8f9fa',
                    color: connected ? '#155724' : '#6c757d',
                    border: `1px solid ${connected ? '#c3e6cb' : '#dee2e6'}`,
                    borderRadius: '8px',
                    minWidth: '200px',
                    textAlign: 'center'
                }}>
                    {connecting ? '🔄 Connecting...' : connected ? '✅ Wallet Connected!' : '📱 Use "Select Wallet" above'}
                </div>
            </div>

            {/* Error Display */}
            {walletError && (
                <div style={{
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    padding: '15px',
                    borderRadius: '8px',
                    margin: '20px 0'
                }}>
                    ❌ Error: {walletError}
                </div>
            )}

            {connecting && (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    borderRadius: '8px',
                    margin: '20px 0'
                }}>
                    <p style={{ color: '#856404', margin: 0, fontSize: '16px' }}>
                        🔄 Connecting to wallet...
                    </p>
                </div>
            )}

            {connected && publicKey && (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#d4edda',
                    border: '1px solid #c3e6cb',
                    borderRadius: '8px',
                    margin: '20px 0'
                }}>
                    <p style={{ color: '#155724', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                        ✅ Connected wallet: {publicKey.slice(0, 20)}...{publicKey.slice(-10)}
                    </p>
                </div>
            )}

            {!connected && !connecting && (
                <div style={{
                    fontSize: '15px', 
                    color: '#495057', 
                    marginTop: '25px',
                    padding: '20px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '10px',
                    border: '1px solid #dee2e6'
                }}>
                    <p style={{ color: '#495057', marginBottom: '15px', fontWeight: 'bold' }}>
                        📝 To connect a wallet, you need to install:
                    </p>
                    <ul style={{textAlign: 'left', paddingLeft: '25px', color: '#6c757d'}}>
                        <li style={{ marginBottom: '8px' }}>
                            <a href="https://leo.app/" target="_blank" rel="noopener noreferrer" 
                               style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>
                                Leo Wallet
                            </a> (Chrome Extension)
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <a href="https://puzzle.online/" target="_blank" rel="noopener noreferrer"
                               style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>
                                Puzzle Wallet
                            </a> (Chrome Extension)
                        </li>
                    </ul>
                    <p style={{ color: '#6c757d', marginTop: '15px', marginBottom: 0 }}>
                        After installation, refresh this page and click "Select Wallet"
                    </p>
                </div>
            )}
        </div>
    );
} 