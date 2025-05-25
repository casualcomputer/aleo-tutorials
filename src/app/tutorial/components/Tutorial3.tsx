"use client";

import { useEffect, useRef, useState } from "react";

export default function Tutorial3() {
    const [executing, setExecuting] = useState(false);
    const [executionResult, setExecutionResult] = useState<string | null>(null);
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
                if (event.data.type === "execute") {
                    setExecuting(false);
                    setExecutionResult(event.data.result);
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

    const execute = async () => {
        setExecuting(true);
        setExecutionResult(null);
        workerRef.current?.postMessage("execute");
    };

    return (
        <div style={{ color: '#333' }}>
            <h2 style={{ color: '#1a1a1a', marginBottom: '15px', fontSize: '28px' }}>
                Tutorial 3: Execute Program
            </h2>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '25px' }}>
                Learn how to execute Aleo programs and smart contracts.
            </p>
            
            <div style={{textAlign: 'center', margin: '30px 0'}}>
                <button 
                    disabled={executing} 
                    onClick={execute}
                    style={{
                        padding: '15px 30px',
                        fontSize: '16px',
                        backgroundColor: executing ? '#6c757d' : '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: executing ? 'not-allowed' : 'pointer',
                        minWidth: '250px',
                        transition: 'all 0.3s ease',
                        opacity: executing ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                        if (!executing) {
                            e.currentTarget.style.backgroundColor = '#c82333';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!executing) {
                            e.currentTarget.style.backgroundColor = '#dc3545';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }
                    }}
                >
                    {executing
                        ? `🔄 Executing...check console for details...`
                        : `🚀 Execute helloworld.aleo`}
                </button>

                {executing && (
                    <div style={{
                        marginTop: '20px',
                        padding: '20px',
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffeaa7',
                        borderRadius: '10px'
                    }}>
                        <p style={{ color: '#856404', margin: 0, fontSize: '16px' }}>
                            ⏳ Program is executing... Please wait.
                        </p>
                    </div>
                )}

                {executionResult && (
                    <div style={{
                        marginTop: '20px',
                        padding: '20px',
                        backgroundColor: '#d4edda',
                        border: '1px solid #c3e6cb',
                        borderRadius: '10px'
                    }}>
                        <h4 style={{ color: '#155724', marginBottom: '10px' }}>
                            ✅ Execution Result:
                        </h4>
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '15px',
                            borderRadius: '8px',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            color: '#495057',
                            border: '1px solid #dee2e6',
                            wordBreak: 'break-all'
                        }}>
                            {executionResult}
                        </div>
                    </div>
                )}
            </div>

            {/* Program Code Display */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '10px'
            }}>
                <h4 style={{ color: '#495057', marginBottom: '15px' }}>
                    📝 Sample Program: helloworld.aleo
                </h4>
                <div style={{
                    backgroundColor: '#2d3748',
                    color: '#e2e8f0',
                    padding: '20px',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    overflow: 'auto'
                }}>
                    <pre style={{ margin: 0 }}>{`program hello_hello.aleo;

function hello:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;`}</pre>
                </div>
            </div>

            {/* Information Section */}
            <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#e7f3ff',
                border: '1px solid #b3d9ff',
                borderRadius: '10px'
            }}>
                <h4 style={{ color: '#0056b3', marginBottom: '15px' }}>
                    🔧 How Program Execution Works
                </h4>
                <ul style={{ color: '#495057', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '8px' }}>
                        Programs are executed in a secure, isolated environment
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        Input parameters can be public or private
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        Execution generates cryptographic proofs of correctness
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        Results can be verified without revealing private inputs
                    </li>
                </ul>
            </div>
        </div>
    );
} 