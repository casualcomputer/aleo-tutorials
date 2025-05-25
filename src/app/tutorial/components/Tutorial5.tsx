"use client";

import { useState } from "react";

export default function Tutorial5() {
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Mock transaction data for demonstration
    const mockTransactions = [
        {
            id: '1',
            type: 'Transfer',
            amount: '100.0',
            from: 'aleo1abc...def',
            to: 'aleo1xyz...789',
            timestamp: '2024-01-15 14:30:25',
            status: 'Confirmed',
            hash: 'at1abc123...def789'
        },
        {
            id: '2',
            type: 'Deploy',
            amount: '0.0',
            from: 'aleo1abc...def',
            to: 'Contract',
            timestamp: '2024-01-14 09:15:10',
            status: 'Confirmed',
            hash: 'at1xyz456...abc123'
        },
        {
            id: '3',
            type: 'Execute',
            amount: '50.0',
            from: 'aleo1abc...def',
            to: 'aleo1uvw...456',
            timestamp: '2024-01-13 16:45:33',
            status: 'Pending',
            hash: 'at1def789...xyz456'
        }
    ];

    const filteredTransactions = selectedFilter === 'all' 
        ? mockTransactions 
        : mockTransactions.filter(tx => tx.type.toLowerCase() === selectedFilter);

    return (
        <div style={{ color: '#333' }}>
            <h2 style={{ color: '#1a1a1a', marginBottom: '15px', fontSize: '28px' }}>
                Tutorial 5: Transaction History
            </h2>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '25px' }}>
                View and manage your transaction history on Aleo.
            </p>
            
            <div style={{
                padding: '30px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '12px', 
                textAlign: 'center',
                border: '1px solid #e9ecef',
                marginBottom: '30px'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
                <h3 style={{ color: '#495057', marginBottom: '15px' }}>Coming Soon!</h3>
                <p style={{ color: '#6c757d', marginBottom: '25px' }}>
                    Full transaction history functionality is under development.
                </p>
                
                <div style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                    <h4 style={{ color: '#495057', marginBottom: '15px' }}>
                        📋 Features in development:
                    </h4>
                    <ul style={{ color: '#6c757d', paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>View Recent Transactions:</strong> See your latest activity
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>Filter by Transaction Type:</strong> Sort by transfers, deployments, executions
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>Export Transaction Data:</strong> Download your history as CSV/JSON
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>Track Wallet Balance:</strong> Monitor your Aleo credits over time
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>Transaction Details:</strong> View detailed information for each transaction
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mock Transaction History Preview */}
            <div style={{
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderBottom: '1px solid #e9ecef'
                }}>
                    <h4 style={{ color: '#495057', marginBottom: '15px' }}>
                        🔍 Transaction History Preview
                    </h4>
                    
                    {/* Filter Buttons */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {['all', 'transfer', 'deploy', 'execute'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    backgroundColor: selectedFilter === filter ? '#0070f3' : 'white',
                                    color: selectedFilter === filter ? 'white' : '#495057',
                                    border: '1px solid #dee2e6',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {filter === 'all' ? 'All Transactions' : `${filter}s`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transaction List */}
                <div style={{ padding: '0' }}>
                    {filteredTransactions.map((tx, index) => (
                        <div
                            key={tx.id}
                            style={{
                                padding: '20px',
                                borderBottom: index < filteredTransactions.length - 1 ? '1px solid #f1f3f4' : 'none',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{
                                        backgroundColor: tx.type === 'Transfer' ? '#e3f2fd' : 
                                                        tx.type === 'Deploy' ? '#f3e5f5' : '#fff3e0',
                                        color: tx.type === 'Transfer' ? '#1976d2' : 
                                               tx.type === 'Deploy' ? '#7b1fa2' : '#f57c00',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        marginRight: '12px'
                                    }}>
                                        {tx.type}
                                    </span>
                                    <span style={{
                                        backgroundColor: tx.status === 'Confirmed' ? '#d4edda' : '#fff3cd',
                                        color: tx.status === 'Confirmed' ? '#155724' : '#856404',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {tx.status}
                                    </span>
                                </div>
                                <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                                    From: {tx.from} → To: {tx.to}
                                </div>
                                <div style={{ fontSize: '12px', color: '#adb5bd' }}>
                                    {tx.timestamp} • Hash: {tx.hash}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ 
                                    fontSize: '16px', 
                                    fontWeight: 'bold',
                                    color: tx.amount === '0.0' ? '#6c757d' : '#28a745'
                                }}>
                                    {tx.amount === '0.0' ? '—' : `${tx.amount} Credits`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Balance Overview */}
            <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#e7f3ff',
                border: '1px solid #b3d9ff',
                borderRadius: '10px'
            }}>
                <h4 style={{ color: '#0056b3', marginBottom: '15px' }}>
                    💰 Wallet Balance Overview
                </h4>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '15px' 
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #dee2e6',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                            1,250.50
                        </div>
                        <div style={{ fontSize: '14px', color: '#6c757d' }}>
                            Total Balance (Credits)
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #dee2e6',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0070f3' }}>
                            23
                        </div>
                        <div style={{ fontSize: '14px', color: '#6c757d' }}>
                            Total Transactions
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #dee2e6',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
                            150.00
                        </div>
                        <div style={{ fontSize: '14px', color: '#6c757d' }}>
                            Total Sent (Credits)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 