# E-Commerce App

A cross-platform e-commerce application built with React Native, Expo, and TypeScript. Runs on iOS, Android, and web.

## Features

- **User Authentication** - Register, login, and logout functionality
- **Product Catalog** - Browse products with search and category filtering
- **Shopping Cart** - Add/remove items, update quantities
- **Checkout & Payment** - Complete checkout flow with payment processing
- **Order Management** - View order history and order details
- **Admin Dashboard** - Manage products, view orders, and analytics
- **Responsive Design** - Works on mobile and web using NativeWind + Tailwind CSS

## Tech Stack

- **React Native** & **Expo** - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **Expo Router** - File-based routing
- **React Navigation** - Navigation management
- **NativeWind + Tailwind CSS** - Styling
- **Axios** - HTTP client
- **AsyncStorage** - Local storage layer
- **Chart Kit** - Admin analytics visualization
- **React Native Toast** - Toast notifications

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

## Installation

1. Clone the repository

   ```bash
   git clone <your-repo-url>
   cd ecommerce-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your API endpoint:
   # E-Commerce App

   A cross-platform e-commerce application built with React Native, Expo, and TypeScript. Runs on iOS, Android, and web.

   ## Features

   - **User Authentication** - Register, login, and logout functionality
   - **Product Catalog** - Browse products with search and category filtering
   - **Shopping Cart** - Add/remove items, update quantities
   - **Checkout & Payment** - Complete checkout flow with payment processing
   - **Order Management** - View order history and order details
   - **Admin Dashboard** - Manage products, view orders, and analytics
   - **Responsive Design** - Works on mobile and web using NativeWind + Tailwind CSS

   ## Tech Stack

   - **React Native** & **Expo** - Cross-platform mobile framework
   - **TypeScript** - Type-safe development
   - **Expo Router** - File-based routing
   - **React Navigation** - Navigation management
   - **NativeWind + Tailwind CSS** - Styling
   - **Axios** - HTTP client
   - **AsyncStorage** - Local storage layer
   - **Chart Kit** - Admin analytics visualization
   - **React Native Toast** - Toast notifications

   ## Prerequisites

   - Node.js (v18 or higher)
   - npm or yarn
   - Expo CLI: `npm install -g expo-cli`

   ## Installation

   1. Clone the repository

      ```bash
      git clone <your-repo-url>
      cd ecommerce-app
      ```

   2. Install dependencies

      ```bash
      npm install
      ```

   3. Set up environment variables

      ```bash
      cp .env.example .env.local
      ```

      Update `.env.local` with your API endpoint:
      ```
      EXPO_PUBLIC_API_URL=https://your-api-url.com
      ```

   ## Running the App

   ### Web
   ```bash
   npm run web
   ```

   ### iOS (macOS only)
   ```bash
   npm run ios
   ```

   ### Android
   ```bash
   npm run android
   ```

   ### Development Mode
   ```bash
   npm start
   ```

   Then press:
   - `w` for web
   - `a` for Android
   - `i` for iOS

   ## Project Structure

   ```
   ├── app/                    # Main application code (file-based routing)
   │   ├── (tabs)/            # Tab-based navigation screens
   │   ├── login.tsx          # Login screen
   │   ├── register.tsx       # Registration screen
   │   └── index.tsx          # Home/splash screen
   ├── components/            # Reusable components
   ├── context/              # React Context for state management
   ├── assets/               # Images and static assets
   ├── app.json              # Expo configuration
   ├── tailwind.config.js    # Tailwind CSS configuration
   └── tsconfig.json         # TypeScript configuration
   ```

   ## API Integration

   This app connects to a backend API endpoint specified in `EXPO_PUBLIC_API_URL`. The API should provide endpoints for:

   - User authentication (register, login, logout)
   - Product management (list, search, filter)
   - Cart operations (add, update, remove, fetch)
   - Orders (create, fetch, get details)
   - Admin operations

   ## Available Scripts

   ```bash
   npm start          # Start development server
   npm run web        # Run web version
   npm run ios        # Run iOS version
   npm run android    # Run Android version
   npm run lint       # Run linter
   npm run reset-project  # Reset to fresh project
   ```

   ## Deployment

   ### Web Deployment (Vercel)
   1. Push to GitHub
   2. Go to [vercel.com](https://vercel.com)
   3. Import your GitHub repository
   4. Set environment variables in Vercel dashboard
   5. Deploy (automatic on push)

   ### Mobile Deployment (EAS)
   ```bash
   npm install -g eas-cli
   eas login
   eas build
   eas submit
   ```

   ## Environment Variables

   Create a `.env.local` file (not tracked by git):

   ```
   EXPO_PUBLIC_API_URL=https://your-api-endpoint.com
   ```

   See `.env.example` for reference.

   ## Contributing

   Feel free to fork and submit pull requests.

   ## License

   MIT License

   ## Support

   For issues and questions, please open an issue on GitHub.

