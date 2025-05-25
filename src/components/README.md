# Components Directory

This directory contains **core reusable components** for Aleo development. All tutorial-specific content is located in `/app/tutorial/components/`.

## 📁 Structure

```
src/components/
├── WalletWrapper.jsx          # Main wallet integration component
├── workers/                   # Shared Web Worker components
│   └── AleoWorker.js          # Aleo operations worker
└── README.md                  # This file
```

## 🎯 Component Purpose

### WalletWrapper.jsx

- **Purpose**: Core wallet provider setup for the entire application
- **Used in**: `src/app/layout.tsx` to wrap the entire app
- **Features**: Multiple wallet support, network configuration, permissions
- **Tutorial**: Foundation for Tutorial 1 (Wallet Connection)

### workers/AleoWorker.js

- **Purpose**: Web Worker for computationally intensive Aleo operations
- **Used in**: Tutorial 2 (Account Generation) and Tutorial 3 (Program Execution)
- **Features**: Thread pool initialization, private key generation, program execution

## 🎓 Tutorial Content Location

**All tutorial-specific components and examples are located in:**

```
src/app/tutorial/components/
├── Tutorial1.tsx              # Wallet Connection tutorial
├── Tutorial2.tsx              # Account Generation tutorial
├── Tutorial3.tsx              # Program Execution tutorial
├── Tutorial4.tsx              # Contract Deployment tutorial
├── Tutorial5.tsx              # Transaction History tutorial
└── README.md                  # Tutorial components documentation
```

## 🔧 Design Principle

### Core Components (src/components/)

- **Reusable across the entire application**
- **Minimal, focused functionality**
- **Well-documented for educational purposes**
- **Stable APIs that don't change frequently**

### Tutorial Components (src/app/tutorial/components/)

- **Educational, step-by-step implementations**
- **Feature-specific demonstrations**
- **Progressive learning examples**
- **Experimental and modifiable code**

## 📚 Learning Resources

- **Aleo Documentation**: https://developer.aleo.org/
- **Wallet Adapter Docs**: https://github.com/demox-labs/aleo-wallet-adapter
- **Leo Language Guide**: https://developer.aleo.org/leo/
- **SDK Reference**: https://github.com/AleoHQ/sdk

## 🚀 Quick Start

To use these core components:

1. **WalletWrapper** (already integrated in layout.tsx):

   ```jsx
   import { WalletWrapper } from "../components/WalletWrapper";

   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>
           <WalletWrapper>{children}</WalletWrapper>
         </body>
       </html>
     );
   }
   ```

2. **AleoWorker** (in tutorial components):

   ```jsx
   const workerRef = useRef(null);

   useEffect(() => {
     workerRef.current = new Worker(
       new URL("../../../components/workers/AleoWorker.js", import.meta.url)
     );
   }, []);
   ```

3. **Wallet hooks** (in any component):

   ```jsx
   import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

   function MyComponent() {
     const { wallet, connected, connect } = useWallet();
     // Your component logic
   }
   ```
