# Frontend Documentation - NGO Project

## Overview

This is a modern React TypeScript frontend application for an NGO website built with **Vite**, **React 18**, **React Router**, and **Tailwind CSS**. The project uses **Shadcn/ui** components for a professional UI with dark mode support.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI Framework |
| **TypeScript** | 5.5.3 | Type Safety |
| **Vite** | 5.4.1 | Build Tool & Dev Server |
| **React Router** | 6.30.0 | Client-side Routing |
| **Tailwind CSS** | 3.4.11 | Styling & Utility-first CSS |
| **Shadcn/ui** | Latest | Pre-built UI Components |
| **React Hook Form** | 7.53.0 | Form Management |
| **React Query** | 5.56.2 | Server State Management |
| **Axios** | 1.6.0 | HTTP Client |
| **Zod** | 3.23.8 | Schema Validation |

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.tsx                 # Main App component with routing
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles
│   ├── App.css                 # App-specific styles
│   │
│   ├── components/
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer component
│   │   │
│   │   ├── blog/               # Blog-related components
│   │   │   ├── BlogArticleLayout.tsx
│   │   │   ├── MarkdownArticle.tsx
│   │   │   └── MarkdownArtical.tsx
│   │   │
│   │   └── ui/                 # Shadcn UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── form.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── select.tsx
│   │       ├── textarea.tsx
│   │       ├── badge.tsx
│   │       ├── alert.tsx
│   │       ├── accordion.tsx
│   │       ├── tabs.tsx
│   │       ├── table.tsx
│   │       └── ... (40+ more UI components)
│   │
│   ├── pages/
│   │   ├── Index.tsx           # Home page
│   │   ├── About.tsx           # About page
│   │   ├── WhatWeDo.tsx        # Services/Activities page
│   │   ├── Impact.tsx          # Impact/Statistics page
│   │   ├── Gallery.tsx         # Photo gallery
│   │   ├── Contact.tsx         # Contact form
│   │   ├── Donate.tsx          # Donation page
│   │   ├── Volunteer.tsx       # Volunteer signup page
│   │   ├── AuthCallback.tsx    # OAuth callback handler
│   │   ├── AuthError.tsx       # Authentication error page
│   │   │
│   │   └── blog/
│   │       ├── BlogIndexPage.tsx      # Blog listing
│   │       └── BlogPostPage.tsx       # Individual blog post
│   │
│   ├── lib/
│   │   ├── api.ts              # API client & endpoints
│   │   ├── blog.ts             # Blog utility functions
│   │   ├── config.ts           # Configuration
│   │   └── utils.ts            # Helper utilities
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Mobile breakpoint detection
│   │   └── use-toast.ts        # Toast notifications
│   │
│   ├── content/                # Static markdown content
│   │
│   └── vite-env.d.ts           # Vite type declarations
│
├── prerender/                  # Static site generation
│   ├── blog.js
│   ├── blog-routes.js
│   ├── blog-sitemap.js
│   └── utils.js
│
├── vite.config.ts              # Vite configuration
├── vite.config.d.ts            # Vite types
├── tailwind.config.ts          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── site.config.ts              # Site-wide configuration
├── components.json             # Shadcn component metadata
├── tsconfig.json               # TypeScript config
├── tsconfig.app.json           # App-specific TypeScript config
├── tsconfig.node.json          # Node tools TypeScript config
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── vercel.json                 # Vercel deployment config
├── VERCEL-DEPLOY.md            # Deployment instructions
└── package.json                # Dependencies

```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.0.0
- **pnpm** (recommended) or npm

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install
# or
npm install

# Start development server
pnpm dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📝 Available Scripts

### Development
```bash
pnpm dev                # Start Vite dev server
pnpm build              # Build for production
pnpm preview            # Preview production build
pnpm lint               # Run ESLint
```

### Typical Workflow
```bash
# Development
pnpm dev

# Before committing
pnpm lint

# Build for production
pnpm build

# Test production build locally
pnpm preview
```

---

## 🎨 UI Components

This project includes **40+ pre-built Shadcn/ui components** for rapid development:

### Form Components
- `input.tsx` - Text inputs
- `textarea.tsx` - Multi-line text
- `form.tsx` - Form wrapper with react-hook-form
- `checkbox.tsx` - Checkboxes
- `radio-group.tsx` - Radio buttons
- `select.tsx` - Dropdown select
- `combobox.tsx` - Searchable select
- `input-otp.tsx` - OTP input

### Layout Components
- `card.tsx` - Content cards
- `layout.tsx` - Page layout
- `sidebar.tsx` - Collapsible sidebar
- `sheet.tsx` - Slide-out panels
- `drawer.tsx` - Mobile drawer
- `tabs.tsx` - Tab navigation
- `accordion.tsx` - Expandable sections
- `navigation-menu.tsx` - Navigation menus

### Dialog & Popups
- `dialog.tsx` - Modal dialogs
- `alert-dialog.tsx` - Confirmation dialogs
- `popover.tsx` - Popover tooltips
- `hover-card.tsx` - Hover information

### Data Display
- `table.tsx` - Data tables
- `pagination.tsx` - Pagination
- `badge.tsx` - Status badges
- `alert.tsx` - Alert notifications
- `progress.tsx` - Progress bars
- `skeleton.tsx` - Loading skeleton
- `carousel.tsx` - Image carousel
- `chart.tsx` - Recharts integration

### Interaction
- `button.tsx` - Various button styles
- `toggle.tsx` - Toggle switches
- `switch.tsx` - Toggle switches
- `slider.tsx` - Range sliders
- `toggle-group.tsx` - Button groups

### Utilities
- `tooltip.tsx` - Hover tooltips
- `toast.tsx` / `toaster.tsx` - Toast notifications
- `dropdown-menu.tsx` - Dropdown menus
- `context-menu.tsx` - Right-click menus
- `scroll-area.tsx` - Scrollable areas
- `separator.tsx` - Visual dividers
- `sonner.tsx` - Toast library

---

## 🔗 Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Index.tsx` | Home page |
| `/about` | `About.tsx` | About NGO |
| `/what-we-do` | `WhatWeDo.tsx` | Services & activities |
| `/impact` | `Impact.tsx` | Impact & statistics |
| `/gallery` | `Gallery.tsx` | Photo gallery |
| `/contact` | `Contact.tsx` | Contact form |
| `/donate` | `Donate.tsx` | Donation page |
| `/volunteer` | `Volunteer.tsx` | Volunteer signup |
| `/blog` | `BlogIndexPage.tsx` | Blog listing |
| `/blog/:slug` | `BlogPostPage.tsx` | Blog post |
| `/auth/callback` | `AuthCallback.tsx` | OAuth callback |
| `/auth/error` | `AuthError.tsx` | Auth error page |

---

## 🎯 Key Features

### 1. **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Automatic breakpoint handling with `use-mobile` hook
- Responsive navigation with drawer/sheet

### 2. **Dark Mode Support**
- Integrated with `next-themes`
- System preference detection
- Manual theme toggle

### 3. **Form Handling**
- React Hook Form for performance
- Zod schema validation
- Shadcn form components

### 4. **Blog System**
- Markdown support with `markdown-to-jsx`
- Blog routing and SSG with prerender plugin
- Blog listing and individual post pages
- Automatic sitemap generation

### 5. **API Integration**
- Axios HTTP client with custom configuration
- React Query for server state management
- Centralized API client in `lib/api.ts`

### 6. **Notifications**
- Toast notifications with Sonner
- Alert dialogs for confirmations
- Custom toast hook

### 7. **Type Safety**
- Full TypeScript support
- Zod for runtime validation
- Strong typing across components

---

## 🔧 Configuration Files

### `vite.config.ts`
- Vite build configuration
- React SWC compiler plugin
- Sitemap and prerender plugins
- Alias configuration

### `tailwind.config.ts`
- Custom color scheme
- Typography and aspect-ratio plugins
- Theme customization

### `site.config.ts`
- Site-wide configuration
- SEO metadata
- URL constants

### `tsconfig.json`
- TypeScript compiler options
- Path aliases for imports
- Strict mode enabled

### `eslint.config.js`
- Code quality and formatting rules
- React hooks rules
- TypeScript support

---

## 📦 Deployment

### Vercel (Recommended)
```bash
# Configuration in vercel.json
# Auto-deploys on push to main branch
```

See [VERCEL-DEPLOY.md](VERCEL-DEPLOY.md) for detailed deployment instructions.

### Manual Build
```bash
pnpm build
# Output in dist/ directory
# Ready for any static hosting
```

---

## 🌐 Environment Variables

Create `.env.local` file:
```env
VITE_API_URL=http://localhost:3000/api
VITE_SITE_URL=http://localhost:5173
```

---

## 📱 Supported Browsers

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Custom theme configuration
- Animations with `tailwindcss-animate`
- Responsive design utilities

### Custom Styles
- Global styles in `src/index.css` and `src/App.css`
- Component-scoped styles with CSS modules or inline
- Theme variables in `tailwind.config.ts`

---

## 📚 Development Tips

### Adding New Pages
```typescript
// Create in src/pages/NewPage.tsx
export default function NewPage() {
  return <div>New Page</div>;
}

// Add route in App.tsx
<Route path="/new-page" element={<NewPage />} />
```

### Adding New Components
```typescript
// Create in src/components/NewComponent.tsx
interface NewComponentProps {
  title: string;
}

export default function NewComponent({ title }: NewComponentProps) {
  return <div>{title}</div>;
}
```

### Using Shadcn UI Components
```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Making API Calls
```typescript
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () => api.get("/endpoint"),
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5173   # Windows
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors
```bash
# Rebuild TypeScript
pnpm tsc --noEmit
```

---

## 📞 Support

For issues and questions, refer to:
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

---

## 📄 License

This project is part of the NGO website initiative.

