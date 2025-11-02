# React E-Commerce Application

A modern, full-featured e-commerce web application built with **React 19**, **TypeScript**, and **Vite**. This project demonstrates contemporary web development practices including server-side rendering concepts, real-time updates, secure payments, and optimized performance.

## 🎯 Project Goal

To build a scalable, high-performance e-commerce platform that provides:

- Seamless product browsing and filtering
- Secure payment processing
- Real-time order tracking
- User authentication and authorization
- Responsive, accessible UI

## ✨ Features

### 🛍️ Product Management

- **Product Browsing**: Homepage with featured products, new arrivals, and top-selling items
- **Product Filtering**: Advanced filtering by category, price range, ratings, and more
- **Product Details**: Comprehensive product pages with images, specifications, reviews, and ratings
- **Search Functionality**: Real-time search with optimized query params
- **Dynamic Carousels**: Embla-based carousel for featured and new arrival products

### 👤 User Authentication & Authorization

- **Google OAuth Integration**: Single sign-on via Google
- **Role-Based Access Control**: Protected routes based on user permissions
- **Session Management**: JWT-based authentication with secure token handling
- **User Preferences**: Personalized user settings and wishlists

### 💳 Payment Processing

- **Stripe Integration**: Secure payment processing with multiple payment methods
  - Credit/Debit Cards
  - FPX (Malaysian online banking)
  - GrabPay
  - Alipay
- **Payment Intent Flow**: Client secret-based payment confirmation
- **Transaction History**: Order tracking and transaction results

### 🛒 Shopping Experience

- **Shopping Cart**: Dynamic cart with add/remove/quantity management
- **Product Ratings & Reviews**: User-generated content for products
- **Wishlist & Preferences**: Save favorite products for later
- **Order Summary**: Checkout with comprehensive order details

### 🎨 UI/UX

- **Dark Mode Support**: Theme switching with next-themes
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton screens and loading spinners
- **Toast Notifications**: User feedback via Sonner
- **Accessibility**: WCAG-compliant components with Radix UI

### ⚡ Performance & State Management

- **React Query (TanStack)**: Efficient server state management and caching
- **Zustand**: Lightweight global state management
- **Immer**: Immutable state updates with simplified syntax
- **Code Splitting**: Lazy loading for optimized bundle size
- **React Compiler Ready**: Prepared for automatic optimization

### 📊 Real-Time Features

- **WebSocket Support**: Real-time updates via `react-use-websocket`
- **Instant Notifications**: Live order status updates

### 🔒 Security

- **Protected Routes**: Role-based access control with ProtectedRoute component
- **JWT Authentication**: Secure token-based authentication
- **CORS Support**: Configured for secure cross-origin requests
- **Environment Variables**: Secure API key management

### 📱 Contact & Support

- **Contact Page**: User inquiry form for customer support

## 🏗️ Project Structure

```
src/
├── components/        # Reusable UI components (buttons, inputs, modals, etc.)
├── pages/            # Page components (Home, Shop, Checkout, etc.)
├── services/         # API queries and mutations
├── hooks/            # Custom React hooks
├── context/          # React Context for state management
├── store/            # Zustand stores
├── reducer/          # useReducer logic with Immer
├── providers/        # Context providers (QueryProvider)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── api/              # Backend server (JSON Server + Stripe + Auth)
└── assets/           # Images, icons, fonts
```

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: TanStack Query, Zustand, Immer, useImmerReducer
- **UI Framework**: Tailwind CSS, Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod (validation)
- **Payments**: Stripe
- **Authentication**: Google OAuth, JWT
- **Real-Time**: WebSocket (react-use-websocket)
- **Backend**: JSON Server (development), Express-like Node.js setup
- **Database**: JSON (development), easily extensible to PostgreSQL/MongoDB
- **Routing**: React Router v7

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd react-master

# Install dependencies
npm install

# Create .env.local file with required keys
cp .env.example .env.local

# Required environment variables:
# VITE_STRIPE_PUBLISHABLE_KEY=pk_...
# VITE_STRIPE_SECRET_KEY=sk_...
# VITE_API_BASE_URL=http://localhost:3002
# VITE_WEB_APPLICATION_URL=http://localhost:5173
```

### Running the Application

```bash
# Development server + API
npm run dev:full

# Or separately:
npm run dev              # Vite dev server (port 5173)
npm run dev:api         # Backend API server (port 3002)

# Production build
npm run build

# Preview production build
npm run preview

# Mock server (JSON Server)
npm run mock-server
```

## 📦 Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run dev:api` - Start backend API server
- `npm run dev:full` - Run both dev server and API concurrently
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run mock-server` - Start JSON Server for data mocking

## 🔄 State Management Patterns

### Global State (Zustand)

```typescript
// useAuthStore.ts - Authentication state
```

### Server State (TanStack Query)

```typescript
// services/query/user.ts - Fetch and cache user data
```

### Local State (useReducer + Immer)

```typescript
// reducer/ProductReducer.ts - Product selection state (images, colors, sizes)
```

## 🎓 Learning Outcomes

This project demonstrates:

- Modern React 19 patterns and best practices
- TypeScript for type-safe development
- Server state management with TanStack Query
- Global state management with Zustand
- Immutable state updates with Immer
- Secure payment integration with Stripe
- Authentication flows (OAuth, JWT)
- Responsive design with Tailwind CSS
- Performance optimization (code splitting, lazy loading)
- Real-time updates with WebSockets

## 🚧 Future Enhancements

- [ ] Migration to Next.js 15 with App Router & RSC
- [ ] Server Actions for checkout
- [ ] GraphQL API integration
- [ ] Advanced analytics dashboard
- [ ] Admin panel for product management
- [ ] Email notifications
- [ ] Inventory management
- [ ] Multi-currency support

## 📝 Notes

- This is a development project with JSON Server backend
- Stripe integration is configured for test mode
- Google OAuth requires valid credentials in `.env.local`
- Backend runs on port 3002; frontend on port 5173

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**
