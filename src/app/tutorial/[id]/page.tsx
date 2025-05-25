"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";
import Tutorial1 from "../components/Tutorial1";
import Tutorial2 from "../components/Tutorial2";
import Tutorial3 from "../components/Tutorial3";
import Tutorial4 from "../components/Tutorial4";
import Tutorial5 from "../components/Tutorial5";

export default function TutorialPage() {
    const params = useParams();
    const router = useRouter();
    const tutorialId = parseInt(params.id as string);

    const tutorials = [
        { id: 1, title: "Wallet Connection", description: "Learn how to connect your Aleo wallet" },
        { id: 2, title: "Generate Account", description: "Create a new Aleo account" },
        { id: 3, title: "Execute Program", description: "Run your first Aleo program" },
        { id: 4, title: "Deploy Contract", description: "Deploy a smart contract to Aleo" },
        { id: 5, title: "Transaction History", description: "View your transaction history" },
    ];

    const currentTutorial = tutorials.find(t => t.id === tutorialId);

    const renderTutorialContent = () => {
        switch (tutorialId) {
            case 1:
                return <Tutorial1 />;
            case 2:
                return <Tutorial2 />;
            case 3:
                return <Tutorial3 />;
            case 4:
                return <Tutorial4 />;
            case 5:
                return <Tutorial5 />;
            default:
                return (
                    <div style={{textAlign: 'center', padding: '50px'}}>
                        <h2>Tutorial Not Found</h2>
                        <p>The tutorial you're looking for doesn't exist.</p>
                        <button 
                            onClick={() => router.push('/')}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Go Back Home
                        </button>
                    </div>
                );
        }
    };

    if (!currentTutorial && tutorialId !== 0) {
        return (
            <div style={{textAlign: 'center', padding: '50px'}}>
                <h2>Tutorial Not Found</h2>
                <p>The tutorial you're looking for doesn't exist.</p>
                <button 
                    onClick={() => router.push('/')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Go Back Home
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div style={{
                width: '300px',
                backgroundColor: '#1a1a1a',
                color: 'white',
                padding: '20px',
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ marginBottom: '30px', color: '#fff' }}>Aleo Tutorials</h2>
                
                {tutorials.map((tutorial) => (
                    <div
                        key={tutorial.id}
                        onClick={() => router.push(`/tutorial/${tutorial.id}`)}
                        style={{
                            padding: '15px',
                            margin: '10px 0',
                            backgroundColor: tutorialId === tutorial.id ? '#0070f3' : '#2a2a2a',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: tutorialId === tutorial.id ? '2px solid #0070f3' : '2px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                            if (tutorialId !== tutorial.id) {
                                e.currentTarget.style.backgroundColor = '#3a3a3a';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (tutorialId !== tutorial.id) {
                                e.currentTarget.style.backgroundColor = '#2a2a2a';
                            }
                        }}
                    >
                        <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                            {tutorial.id}. {tutorial.title}
                        </h3>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                            {tutorial.description}
                        </p>
                    </div>
                ))}
                
                {/* Home Button */}
                <div
                    onClick={() => router.push('/')}
                    style={{
                        padding: '15px',
                        margin: '20px 0 10px 0',
                        backgroundColor: '#333',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '2px solid #666'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#444';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#333';
                    }}
                >
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                        🏠 Home
                    </h3>
                    <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                        Back to main page
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                        <Image
                            src="/next.svg"
                            alt="Next.js Logo"
                            width={120}
                            height={25}
                            priority
                        />
                        <Image
                            src="/aleo.svg"
                            alt="Aleo Logo"
                            width={120}
                            height={30}
                            priority
                        />
                    </div>
                    <h1 style={{ color: '#333', marginBottom: '10px' }}>
                        {currentTutorial ? currentTutorial.title : 'Aleo Development Tutorials'}
                    </h1>
                    <p style={{ color: '#666' }}>
                        {currentTutorial ? currentTutorial.description : 'Learn how to build on the Aleo blockchain'}
                    </p>
                </div>

                {/* Tutorial Content */}
                <div style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    minHeight: '500px'
                }}>
                    {renderTutorialContent()}
                </div>
            </div>
        </div>
    );
} 