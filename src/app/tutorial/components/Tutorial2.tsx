"use client";

import { useEffect, useRef, useState } from "react";

interface AccountData {
    privateKey: string;
    viewKey: string;
    computeKey: string;
    address: string;
}

interface AleoWorkerMessageEvent {
    type: string;
    result: AccountData | string;
    success: boolean;
    error?: string;
}

export default function Tutorial2() {
    const [account, setAccount] = useState<AccountData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showKeys, setShowKeys] = useState(false);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        try {
            workerRef.current = new Worker(
                new URL("../../../components/workers/Tutorial2Worker.js", import.meta.url)
            );
            
            workerRef.current.onmessage = (event: MessageEvent<AleoWorkerMessageEvent>) => {
                setLoading(false);
                
                if (event.data.success && event.data.type === "account") {
                    setAccount(event.data.result as AccountData);
                    setError(null);
                } else {
                    setError(event.data.error || "Failed to generate account");
                    setAccount(null);
                }
            };
            
            workerRef.current.onerror = (error) => {
                console.error("Worker error:", error);
                setError("Worker initialization failed");
                setLoading(false);
            };
        } catch (error) {
            console.error("Failed to create Tutorial 2 worker:", error);
            setError("Failed to initialize account generator");
        }
        
        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const generateAccount = async () => {
        workerRef.current?.postMessage({ type: "generateAccount" });
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`${label} copied to clipboard!`);
        }).catch(() => {
            alert("Failed to copy to clipboard");
        });
    };

    return (
        <div style={{ color: '#333' }}>
            <h2 style={{ color: '#1a1a1a', marginBottom: '15px', fontSize: '28px' }}>
                Tutorial 2: Generate Account
            </h2>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '25px' }}>
                Learn how to create secure Aleo accounts using the official SDK. Each account contains 
                four essential components: private key, view key, compute key, and address.
            </p>

            {/* Code Example */}
            <div style={{
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '10px',
                fontFamily: 'monospace'
            }}>
                <h4 style={{ color: '#495057', marginBottom: '15px', fontFamily: 'inherit' }}>
                    📝 SDK Implementation:
                </h4>
                <pre style={{ 
                    margin: 0, 
                    fontSize: '14px', 
                    color: '#495057',
                    lineHeight: '1.5'
                }}>
{`import { Account } from '@provablehq/sdk';

const account = new Account();

// Individual keys can be accessed through these methods:
const privateKey = account.privateKey();
const viewKey = account.viewKey();
const computeKey = account.computeKey();
const address = account.address();`}
                </pre>
            </div>
            
            {/* Generate Button */}
            <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <button 
                    onClick={generateAccount}
                    disabled={loading}
                    style={{
                        padding: '15px 40px',
                        fontSize: '18px',
                        backgroundColor: loading ? '#6c757d' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        minWidth: '250px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.currentTarget.style.backgroundColor = '#218838';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) {
                            e.currentTarget.style.backgroundColor = '#28a745';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }
                    }}
                >
                    {loading ? '🔄 Generating Account...' : '🚀 Generate New Account'}
                </button>
            </div>

            {/* Error Display */}
            {error && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#f8d7da',
                    border: '1px solid #f5c6cb',
                    borderRadius: '8px',
                    color: '#721c24'
                }}>
                    <strong>❌ Error:</strong> {error}
                </div>
            )}
            
            {/* Account Display */}
            {account && (
                <div style={{
                    marginTop: '30px',
                    padding: '25px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #28a745',
                    borderRadius: '15px',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                        <h3 style={{ color: '#28a745', marginBottom: '10px' }}>
                            🎉 Account Successfully Generated!
                        </h3>
                        <button
                            onClick={() => setShowKeys(!showKeys)}
                            style={{
                                padding: '8px 16px',
                                fontSize: '14px',
                                backgroundColor: showKeys ? '#dc3545' : '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            {showKeys ? '🙈 Hide Sensitive Keys' : '👁️ Show All Keys'}
                        </button>
                    </div>
                    
                    {/* Address - Always Visible */}
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h5 style={{ color: '#28a745', margin: 0 }}>
                                📍 Public Address (Safe to Share)
                            </h5>
                            <button
                                onClick={() => copyToClipboard(account.address, 'Address')}
                                style={{
                                    padding: '4px 8px',
                                    fontSize: '12px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                📋 Copy
                            </button>
                        </div>
                        <div style={{
                            backgroundColor: '#d4edda',
                            padding: '12px',
                            borderRadius: '6px',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            wordBreak: 'break-all',
                            border: '1px solid #c3e6cb'
                        }}>
                            {account.address}
                        </div>
                    </div>

                    {showKeys && (
                        <>
                            {/* Private Key */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h5 style={{ color: '#dc3545', margin: 0 }}>
                                        🔐 Private Key (Keep Secret!)
                                    </h5>
                                    <button
                                        onClick={() => copyToClipboard(account.privateKey, 'Private Key')}
                                        style={{
                                            padding: '4px 8px',
                                            fontSize: '12px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                                <div style={{
                                    backgroundColor: '#fff3cd',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    fontFamily: 'monospace',
                                    fontSize: '11px',
                                    wordBreak: 'break-all',
                                    border: '2px solid #ffeaa7'
                                }}>
                                    {account.privateKey}
                                </div>
                            </div>

                            {/* View Key */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h5 style={{ color: '#6f42c1', margin: 0 }}>
                                        👁️ View Key (For Reading Encrypted Data)
                                    </h5>
                                    <button
                                        onClick={() => copyToClipboard(account.viewKey, 'View Key')}
                                        style={{
                                            padding: '4px 8px',
                                            fontSize: '12px',
                                            backgroundColor: '#6f42c1',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                                <div style={{
                                    backgroundColor: '#e7e3ff',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    fontFamily: 'monospace',
                                    fontSize: '11px',
                                    wordBreak: 'break-all',
                                    border: '1px solid #d1c4e9'
                                }}>
                                    {account.viewKey}
                                </div>
                            </div>

                            {/* Compute Key */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h5 style={{ color: '#fd7e14', margin: 0 }}>
                                        ⚡ Compute Key (For Program Execution)
                                    </h5>
                                    <button
                                        onClick={() => copyToClipboard(account.computeKey, 'Compute Key')}
                                        style={{
                                            padding: '4px 8px',
                                            fontSize: '12px',
                                            backgroundColor: '#fd7e14',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                                <div style={{
                                    backgroundColor: '#fff3e0',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    fontFamily: 'monospace',
                                    fontSize: '11px',
                                    wordBreak: 'break-all',
                                    border: '1px solid #ffcc80'
                                }}>
                                    {account.computeKey}
                                </div>
                            </div>

                            {/* Security Warning */}
                            <div style={{
                                backgroundColor: '#f8d7da',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '1px solid #f5c6cb',
                                marginTop: '20px'
                            }}>
                                <p style={{ 
                                    color: '#721c24', 
                                    fontSize: '14px', 
                                    margin: 0,
                                    fontWeight: 'bold'
                                }}>
                                    ⚠️ Security Notice: This is for educational purposes only. 
                                    In production applications, never display private keys in the UI and always use secure storage methods.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Educational Information */}
            <div style={{
                marginTop: '30px',
                padding: '25px',
                backgroundColor: '#e7f3ff',
                border: '1px solid #b3d9ff',
                borderRadius: '12px'
            }}>
                <h4 style={{ color: '#0056b3', marginBottom: '20px' }}>
                    📚 Understanding Aleo Account Components
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                    <div>
                        <h5 style={{ color: '#495057', marginBottom: '15px' }}>🔑 Key Components:</h5>
                        <div style={{ color: '#495057', fontSize: '14px' }}>
                            <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <strong>Private Key:</strong> Master key that controls the entire account. Used for signing transactions and proving ownership.
                            </div>
                            <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <strong>View Key:</strong> Allows reading encrypted transaction data without spending permissions.
                            </div>
                            <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <strong>Compute Key:</strong> Used for program execution and zero-knowledge proof generation.
                            </div>
                            <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <strong>Address:</strong> Public identifier for receiving transactions and interacting with programs.
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h5 style={{ color: '#495057', marginBottom: '15px' }}>🛡️ Security Best Practices:</h5>
                        <div style={{ color: '#495057', fontSize: '14px' }}>
                            <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <strong>Never share private keys</strong> - They provide full control over your account
                            </div>
                            <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <strong>Use hardware wallets</strong> for storing large amounts securely
                            </div>
                            <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <strong>Backup keys securely</strong> in multiple safe locations
                            </div>
                            <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <strong>Verify addresses</strong> before sending transactions
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Implementation */}
            <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#f1f3f4',
                border: '1px solid #dadce0',
                borderRadius: '10px'
            }}>
                <h5 style={{ color: '#495057', marginBottom: '15px' }}>
                    🔧 Technical Implementation Details
                </h5>
                <p style={{ color: '#6c757d', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    This tutorial demonstrates the official Aleo SDK pattern for account creation. 
                    The <code style={{ backgroundColor: '#e9ecef', padding: '2px 4px', borderRadius: '3px' }}>new Account()</code> constructor 
                    generates a cryptographically secure account with all four key components. The generation process 
                    runs in a Web Worker to prevent UI blocking during the computationally intensive cryptographic operations. 
                    Each component serves a specific purpose in Aleo's privacy-preserving blockchain architecture.
                </p>
            </div>
        </div>
    );
} 