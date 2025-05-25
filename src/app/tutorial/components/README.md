# Tutorial Components

This directory contains individual tutorial components that are used in the Aleo tutorial application. Each tutorial is now split into its own component file for better code organization and maintainability.

## Structure

```
src/app/tutorial/components/
├── Tutorial1.tsx    # Wallet Connection Tutorial
├── Tutorial2.tsx    # Generate Account Tutorial
├── Tutorial3.tsx    # Execute Program Tutorial
├── Tutorial4.tsx    # Deploy Contract Tutorial
├── Tutorial5.tsx    # Transaction History Tutorial
└── README.md        # This file
```

## Components

### Tutorial1.tsx - Wallet Connection

- **Purpose**: Teaches users how to connect Aleo wallets (Leo, Puzzle)
- **Features**:
  - Wallet detection and debugging
  - Connection status display
  - Error handling
  - Installation instructions
- **Dependencies**: `@demox-labs/aleo-wallet-adapter-react`, `@demox-labs/aleo-wallet-adapter-reactui`

### Tutorial2.tsx - Generate Account

- **Purpose**: Shows how to generate new Aleo accounts
- **Features**:
  - Account generation using Web Workers
  - Private key display with security warnings
  - Educational information about Aleo accounts
- **Dependencies**: Web Worker integration

### Tutorial3.tsx - Execute Program

- **Purpose**: Demonstrates Aleo program execution
- **Features**:
  - Program execution with loading states
  - Sample Leo code display
  - Execution results display
  - Educational content about program execution
- **Dependencies**: Web Worker integration

### Tutorial4.tsx - Deploy Contract

- **Purpose**: Contract deployment tutorial (Coming Soon)
- **Features**:
  - Deployment process overview
  - Sample contract code
  - Step-by-step deployment guide
  - Educational content about smart contracts

### Tutorial5.tsx - Transaction History

- **Purpose**: Transaction history and wallet management (Coming Soon)
- **Features**:
  - Mock transaction history preview
  - Transaction filtering
  - Balance overview
  - Interactive transaction list

## Usage

Each component is imported and used in the main tutorial page (`src/app/tutorial/[id]/page.tsx`):

```tsx
import Tutorial1 from "../components/Tutorial1";
import Tutorial2 from "../components/Tutorial2";
// ... etc

const renderTutorialContent = () => {
  switch (tutorialId) {
    case 1:
      return <Tutorial1 />;
    case 2:
      return <Tutorial2 />;
    // ... etc
  }
};
```

## Benefits of This Structure

1. **Modularity**: Each tutorial is self-contained and easy to understand
2. **Maintainability**: Changes to one tutorial don't affect others
3. **Readability**: Developers can easily find and read specific tutorial code
4. **Reusability**: Components can be reused in other parts of the application
5. **Testing**: Each component can be tested independently
6. **Code Organization**: Clear separation of concerns

## Development

When adding new tutorials or modifying existing ones:

1. Create/edit the appropriate `TutorialX.tsx` file
2. Import and use it in the main tutorial page
3. Update this README if needed
4. Ensure proper TypeScript types and error handling
5. Add appropriate styling and user feedback

## Styling

All components use inline styles for consistency and to avoid CSS conflicts. The styling follows the established design system with:

- Consistent color palette
- Proper spacing and typography
- Responsive design principles
- Accessibility considerations
