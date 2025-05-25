"use client";

import { useEffect, useRef, useState } from "react";

export default function Tutorial2() {
    const [account, setAccount] = useState(null);
    const workerRef = useRef<Worker | null>(null);

    interface AleoWorkerMessageEvent {
        type: string;
        result: any;
    }

    useEffect(() => {
        try {
            workerRef.current = new Worker(new URL("../../../components/workers/AleoWorker.js", import.meta.url));
            workerRef.current.onmessage = (
                event: MessageEvent<AleoWorkerMessageEvent>
            ) => {
                if (event.data.type === "key") {
                    setAccount(event.data.result);
                }
                alert(`WebWorker Response => ${event.data.result}`);
            };
            workerRef.current.onerror = (error) => {
                console.error("Worker error:", error);
                alert("Worker error: " + error.message);
            };
        } catch (error) {
            console.error("Failed to create worker:", error);
            alert("Failed to create worker: " + error);
        }
        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const generateAccount = async () => {
        workerRef.current?.postMessage("key");
    };

    return (
        <div style={{ color: '#333' }}>
            <h2 style={{ color: '#1a1a1a', marginBottom: '15px', fontSize: '28px' }}>
                Tutorial 2: Generate Account
            </h2>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '25px' }}>
                Create a new Aleo account and manage your private keys.
            </p>
            
            <div style={{textAlign: 'center', margin: '30px 0'}}>
                <button 
                    onClick={generateAccount}
                    style={{
                        padding: '15px 30px',
                        fontSize: '16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        minWidth: '250px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#218838';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#28a745';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    {account ? `Account Generated!` : `Click to generate account`}
                </button>
                
                {account && (
                    <div style={{
                        marginTop: '20px',
                        padding: '20px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        borderRadius: '10px',
                        wordBreak: 'break-all',
                        fontSize: '12px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        <h4 style={{ color: '#495057', marginBottom: '10px' }}>
                            🔑 Generated Private Key:
                        </h4>
                        <div style={{
                            backgroundColor: '#e9ecef',
                            padding: '15px',
                            borderRadius: '8px',
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            color: '#495057',
                            border: '1px solid #dee2e6'
                        }}>
                            {JSON.stringify(account)}
                        </div>
                        <p style={{ 
                            color: '#dc3545', 
                            fontSize: '13px', 
                            marginTop: '10px',
                            fontWeight: 'bold'
                        }}>
                            ⚠️ Keep this private key secure! Never share it with anyone.
                        </p>
                    </div>
                )}
            </div>

            {/* Information Section */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#e7f3ff',
                border: '1px solid #b3d9ff',
                borderRadius: '10px'
            }}>
                <h4 style={{ color: '#0056b3', marginBottom: '15px' }}>
                    📚 About Aleo Accounts
                </h4>
                <ul style={{ color: '#495057', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '8px' }}>
                        Each Aleo account has a unique private key and corresponding public address
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        Private keys are used to sign transactions and prove ownership
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        Public addresses can be shared safely to receive transactions
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        Always keep your private keys secure and backed up
                    </li>
                </ul>
            </div>
        </div>
    );
} 