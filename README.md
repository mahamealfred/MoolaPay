# MoolaPay Mobile App (Expo)

A React Native + Expo banking-style client for Moola enterprise core services.

## Features

- Modern banking dashboard with account balance and quick actions
- Payments screen for sending money flow
- Cards screen for card management preview
- Insights screen for spending and savings analytics
- Profile screen with API gateway visibility
- Typed service layer ready for backend integration

## Run Locally

From the monorepo root:

1. Install dependencies:
   npm install
2. Start the mobile app:
   npm run dev --workspace=moolapay-client

You can also run platform targets:

- Android: npm run android --workspace=moolapay-client
- iOS: npm run ios --workspace=moolapay-client
- Web: npm run web --workspace=moolapay-client

## API Connection

Set the API gateway URL with:

EXPO_PUBLIC_API_BASE_URL=http://localhost:3000

The app reads this value in src/services/api.ts.

## Next Integration Targets

- Authenticate with user-service via API gateway
- Replace mock dashboard data with account-service and transaction-service endpoints
- Connect transfer form to transaction-service endpoint
