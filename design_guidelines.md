# Taxi Booking Website - Design Guidelines

## Design Approach
**Reference-Based with Utility Focus**: Drawing inspiration from Uber, Lyft, and Grab's efficient, mobile-first design patterns while maintaining clarity and ease of use. The design prioritizes quick booking flows and clear information hierarchy.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Brand Primary: 16 85% 45% (deep teal - trustworthy, professional)
- Brand Dark: 16 85% 35% (for dark mode and accents)

**Functional Colors:**
- Shared Taxi: 142 71% 45% (green - eco-friendly, cost-effective)
- Normal Taxi: 221 83% 53% (blue - premium, private)
- Success: 142 71% 45%
- Warning: 38 92% 50%
- Error: 0 84% 60%

**Neutral Palette (Dark Mode Primary):**
- Background: 220 13% 10%
- Surface: 220 13% 15%
- Border: 220 13% 25%
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 0 0% 98%
- Border: 220 13% 90%
- Text Primary: 220 13% 10%
- Text Secondary: 220 8% 45%

### B. Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - for all UI elements, clean and highly readable
- Accent: 'Plus Jakarta Sans' (Google Fonts) - for headings and CTAs, friendly yet professional

**Font Scales:**
- Hero/Display: 3xl to 5xl, bold (700-800)
- Page Headers: 2xl to 3xl, semibold (600)
- Section Titles: xl to 2xl, semibold (600)
- Body Large: base to lg, regular (400)
- Body: sm to base, regular (400)
- Caption: xs to sm, medium (500)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, and 16 for consistent rhythm
- Micro spacing: 2
- Component spacing: 4, 6
- Section spacing: 8, 12
- Page spacing: 16, 20

**Container Strategy:**
- Marketing pages: max-w-6xl with px-4
- Booking flow: max-w-2xl (narrow, focused)
- Dashboard/My Bookings: max-w-7xl

### D. Component Library

**Navigation:**
- Fixed header with logo left, navigation center/right
- Mobile: Hamburger menu with slide-out drawer
- Includes: Home, Book Ride, My Bookings, Profile/Login
- Booking CTA button always visible in navigation

**Booking Form (Hero Feature):**
- Two-step process: Location selection → Taxi type selection
- Large, prominent input fields with icons (Heroicons)
- Pickup/dropoff inputs with location pin icons
- Date/time pickers with calendar icons
- Clear visual separation between steps
- Progress indicator for multi-step booking

**Taxi Selection Cards:**
- Side-by-side comparison cards for Shared vs Normal
- Each card shows: Icon/illustration, name, capacity, estimated price range, ETA
- Shared taxi: Green accent with "Save up to 40%" badge
- Normal taxi: Blue accent with "Private ride" badge
- Selected state: Border highlight + subtle background tint
- Price displayed prominently in card header

**Ride Details Display:**
- Map placeholder showing route (use placeholder comment for map integration)
- Fare breakdown table: Base fare, distance, surge pricing (if applicable), total
- Estimated time and distance prominently displayed
- Driver details (for confirmation page): Photo placeholder, name, rating, vehicle info

**Booking Cards (My Bookings):**
- Timeline-style layout showing: Pickup → Dropoff with visual connector
- Status badge: Upcoming (blue), Completed (green), Cancelled (gray)
- Quick details: Date, time, taxi type, fare
- Action buttons: View Details, Cancel (for upcoming), Rebook (for completed)

**CTAs and Buttons:**
- Primary: Solid fill with brand colors, rounded-lg
- Secondary: Outline with hover effects
- Floating Action Button: For "Book Now" - fixed bottom-right on mobile
- Button sizes: Large for hero CTAs (px-8 py-4), medium for forms (px-6 py-3), small for cards (px-4 py-2)

**Forms:**
- Consistent input styling: Dark backgrounds with lighter borders, rounded-lg
- Focus states: Brand color border + subtle glow
- Error states: Red border with error message below
- Floating labels for better UX
- Icon integration in inputs (left-aligned)

### E. Page-Specific Layouts

**Landing/Home Page:**
- Hero Section (70vh): 
  - Background: Gradient overlay on city/taxi image
  - Large headline: "Your Ride, Your Choice"
  - Subheadline: "Book shared or private taxis in seconds"
  - Inline booking form (simplified: just pickup/dropoff + CTA)
  - Trust indicators: "50,000+ Happy Riders" badge
  
- Features Section (3-column grid):
  - Shared Taxi: Cost-effective, eco-friendly
  - Normal Taxi: Private, comfortable
  - Easy Booking: Quick 2-minute process
  Each with icon, title, description

- How It Works (3-step horizontal layout):
  - Enter details → Choose taxi → Confirm booking
  - Number badges (1, 2, 3) with connecting lines

- Social Proof: 2-column testimonial cards with user photos, ratings

- Footer: Multi-column with Quick Links, Contact, Social Media, Newsletter signup

**Booking Flow Pages:**
- Clean, focused layout with step indicator at top
- Large, centered content area (max-w-2xl)
- Navigation: Back button + Cancel option
- Action buttons bottom-fixed on mobile, inline on desktop

**My Bookings Dashboard:**
- Tab navigation: All, Upcoming, Completed
- Filter/sort options: Date, Price, Type
- Grid of booking cards (2-column on desktop, single on mobile)
- Empty state: Illustration + "No bookings yet" + Book Now CTA

### Images

**Hero Image:**
- Large background image (1920x1080): Modern city scene with taxis/traffic at dusk or dawn, creates urgency and relates to urban transportation
- Gradient overlay: Dark gradient from bottom (80% opacity) to transparent top for text readability
- Position: Center-cover

**Feature Icons/Illustrations:**
- Custom illustrated icons for each taxi type (use placeholder comments)
- Feature section: Small illustrated icons for each benefit

**Testimonial Photos:**
- Circular user avatars (64x64px) with subtle border
- Use placeholder images for demo

### Accessibility & Dark Mode
- Default to dark mode throughout
- Ensure WCAG AA contrast ratios (4.5:1 minimum)
- All interactive elements have visible focus states
- Form inputs maintain dark backgrounds with light text
- Consistent color application across all components