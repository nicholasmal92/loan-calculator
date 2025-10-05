# Loan Calculator

Cross-platform loan calculator with iOS (Swift) and Mobile (React Native) versions.

## Features
- Support for residential, commercial, and vehicle loan scenarios
- Adjustable loan amount, interest rate, term length, and payment frequency (monthly, bi-weekly, weekly)
- Automatic amortization calculations with a breakdown of principal vs interest
- Real-time calculations with interactive UI
- Mobile-friendly tabbed interface

## Project Structure
```
loan-calculator/
├── LoanCalculator/          # iOS Swift version
│   ├── Models/
│   ├── Views/
│   └── Utilities/
├── mobile/                  # React Native version
│   ├── src/
│   │   ├── components/
│   │   ├── models/
│   │   └── utils/
│   └── package.json
└── README.md
```

## Getting Started

### iOS Version (Swift/SwiftUI)
1. Open the `LoanCalculator` directory in Xcode (File → Open…)
2. Select *LoanCalculatorApp* as the run target
3. Build and run the project on an iOS 17+ simulator or device

### Mobile Version (React Native/Expo)
1. Navigate to the mobile directory: `cd mobile`
2. Install dependencies: `npm install`
3. Start development server: `npx expo start --port 5000`
4. Scan QR code with Expo Go app or press `w` for web

## Port Configuration
- **Mobile app**: Port 5000 (configured to avoid conflicts)
- **Other projects**: Use ports 4000+ for dispatch systems

The amortization logic is implemented consistently across both platforms and can be reused or integrated into other apps as needed.
