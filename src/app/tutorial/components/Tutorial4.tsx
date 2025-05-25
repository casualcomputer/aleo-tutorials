"use client";

export default function Tutorial4() {
    return (
        <div style={{ color: '#333' }}>
            <h2 style={{ color: '#1a1a1a', marginBottom: '15px', fontSize: '28px' }}>
                Tutorial 4: Deploy Contract
            </h2>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '25px' }}>
                Deploy your smart contracts to the Aleo network.
            </p>
            
            <div style={{
                padding: '30px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '12px', 
                textAlign: 'center',
                border: '1px solid #e9ecef'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
                <h3 style={{ color: '#495057', marginBottom: '15px' }}>Coming Soon!</h3>
                <p style={{ color: '#6c757d', marginBottom: '25px' }}>
                    Learn how to deploy contracts to the Aleo network.
                </p>
                
                <div style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                    <h4 style={{ color: '#495057', marginBottom: '15px' }}>
                        📋 What you'll learn:
                    </h4>
                    <ul style={{ color: '#6c757d', paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>
                            <strong>Write Leo Smart Contracts:</strong> Create programs using the Leo language
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <strong>Compile to Aleo Bytecode:</strong> Transform Leo code into executable bytecode
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <strong>Deploy to Testnet:</strong> Upload your contract to the Aleo testnet
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <strong>Verify Deployment:</strong> Confirm your contract is live and accessible
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <strong>Interact with Contracts:</strong> Call functions and manage state
                        </li>
                    </ul>
                </div>
            </div>

            {/* Sample Contract Preview */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '10px'
            }}>
                <h4 style={{ color: '#495057', marginBottom: '15px' }}>
                    📝 Sample Contract Preview
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
                    <pre style={{ margin: 0 }}>{`program token.aleo;

record Token:
    owner as address.private;
    amount as u64.private;

function mint:
    input r0 as address.private;
    input r1 as u64.private;
    cast r0 r1 into r2 as Token.record;
    output r2 as Token.record;

function transfer:
    input r0 as Token.record;
    input r1 as address.private;
    input r2 as u64.private;
    sub r0.amount r2 into r3;
    cast r0.owner r3 into r4 as Token.record;
    cast r1 r2 into r5 as Token.record;
    output r4 as Token.record;
    output r5 as Token.record;`}</pre>
                </div>
            </div>

            {/* Deployment Steps */}
            <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#e7f3ff',
                border: '1px solid #b3d9ff',
                borderRadius: '10px'
            }}>
                <h4 style={{ color: '#0056b3', marginBottom: '15px' }}>
                    🚀 Deployment Process
                </h4>
                <div style={{ color: '#495057' }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '12px',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        border: '1px solid #dee2e6'
                    }}>
                        <span style={{ 
                            backgroundColor: '#0070f3', 
                            color: 'white', 
                            borderRadius: '50%', 
                            width: '24px', 
                            height: '24px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginRight: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>1</span>
                        <span><strong>Prepare:</strong> Write and test your Leo program locally</span>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '12px',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        border: '1px solid #dee2e6'
                    }}>
                        <span style={{ 
                            backgroundColor: '#0070f3', 
                            color: 'white', 
                            borderRadius: '50%', 
                            width: '24px', 
                            height: '24px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginRight: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>2</span>
                        <span><strong>Compile:</strong> Use Leo CLI to compile to Aleo instructions</span>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '12px',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        border: '1px solid #dee2e6'
                    }}>
                        <span style={{ 
                            backgroundColor: '#0070f3', 
                            color: 'white', 
                            borderRadius: '50%', 
                            width: '24px', 
                            height: '24px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginRight: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>3</span>
                        <span><strong>Deploy:</strong> Submit deployment transaction to the network</span>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '12px',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        border: '1px solid #dee2e6'
                    }}>
                        <span style={{ 
                            backgroundColor: '#0070f3', 
                            color: 'white', 
                            borderRadius: '50%', 
                            width: '24px', 
                            height: '24px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginRight: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>4</span>
                        <span><strong>Verify:</strong> Confirm deployment and test contract functions</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 