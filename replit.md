# RideShare - Taxi Booking Platform

## Overview

RideShare is a modern taxi booking web application that allows users to book either shared or private taxi rides. The platform features a clean, mobile-first design inspired by leading ride-sharing services like Uber and Lyft. Users can quickly book rides, view their booking history, and manage upcoming trips through an intuitive interface.

The application is built as a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (alternative to React Router)

**UI Component Library**
- shadcn/ui components built on Radix UI primitives for accessibility
- Tailwind CSS for utility-first styling with custom design tokens
- Dark mode support as the primary theme with light mode fallback
- Custom color system featuring teal primary colors and distinct taxi type colors (green for shared, blue for normal)

**State Management**
- TanStack Query (React Query) for server state management, caching, and API synchronization
- React hooks for local component state
- Custom toast notifications for user feedback

**Design System**
- Inter and Plus Jakarta Sans fonts from Google Fonts
- Mobile-first responsive design with breakpoint at 768px
- Elevation system using transparent overlays for hover/active states
- Consistent border radius and shadow system

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and RESTful API endpoints
- TypeScript with ESM modules for modern JavaScript features
- Custom middleware for request logging and error handling

**API Design**
- RESTful endpoints under `/api` namespace
- JSON request/response format
- Endpoints for CRUD operations on bookings:
  - `GET /api/bookings` - List all bookings
  - `GET /api/bookings/:id` - Get single booking
  - `POST /api/bookings` - Create new booking
  - `PATCH /api/bookings/:id/status` - Update booking status
  - `DELETE /api/bookings/:id` - Delete booking

**Request Validation**
- Zod schemas for runtime type validation
- Drizzle-Zod integration for automatic schema generation from database models
- Consistent error responses with appropriate HTTP status codes

**Development Tools**
- Vite integration in development mode for seamless frontend/backend development
- Custom logging middleware for API request tracking
- Static file serving for production builds

### Data Storage

**Database**
- PostgreSQL as the primary relational database
- Neon serverless Postgres driver (@neondatabase/serverless) for database connections
- Connection via DATABASE_URL environment variable

**ORM Layer**
- Drizzle ORM for type-safe database queries and migrations
- Schema-first approach with TypeScript definitions
- Automatic type inference from database schema

**Data Models**
- Single `bookings` table with fields:
  - `id` (UUID, auto-generated)
  - `pickup` (text) - Pickup location
  - `dropoff` (text) - Destination
  - `date` (text) - Booking date
  - `time` (text) - Booking time
  - `taxiType` (enum: "shared" | "normal")
  - `fare` (decimal) - Trip cost
  - `status` (enum: "upcoming" | "completed" | "cancelled")
  - `createdAt` (timestamp, auto-generated)

**Fallback Storage**
- In-memory storage implementation (MemStorage) for development/testing
- Implements the same IStorage interface as database storage for easy switching

### External Dependencies

**Database Services**
- Neon Serverless Postgres for cloud-hosted PostgreSQL database
- Requires DATABASE_URL environment variable for connection

**UI Component Libraries**
- Radix UI primitives for accessible, unstyled components (dialogs, dropdowns, tabs, etc.)
- shadcn/ui pre-configured components built on Radix
- Lucide React for icon library

**Development Tools**
- Replit-specific plugins for development environment:
  - @replit/vite-plugin-runtime-error-modal for error display
  - @replit/vite-plugin-cartographer for code navigation
  - @replit/vite-plugin-dev-banner for development indicators

**Font Services**
- Google Fonts CDN for Inter and Plus Jakarta Sans typefaces
- Preconnect optimization for faster font loading

**Build & Development**
- tsx for running TypeScript files directly in development
- esbuild for fast production builds
- PostCSS with Tailwind CSS and Autoprefixer for CSS processing