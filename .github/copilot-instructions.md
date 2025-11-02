# Copilot Instructions for Orbitwelve Frontend

## Project Overview

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Purpose:** Modern, responsive portfolio site for showcasing projects, clients, and reviews.

## Architecture & Structure

- Main app code is in `src/app/` using Next.js App Router. Each subfolder (e.g., `clients/`, `privacy/`, `projects/`, `reviews/`) is a route.
- Shared UI components are in `src/components/` (e.g., `AboutSection.tsx`, `ClientMap.tsx`, `Footer.tsx`).
- Utility functions and API logic are in `src/utils/` and `src/lib/`.
- Type definitions for external libraries (Google Maps, Leaflet) are in `src/types/`.
- Global styles are in `src/app/globals.css`.

## Key Patterns & Conventions

- **Component Structure:** Use functional React components with TypeScript. Co-locate styles and logic.
- **Routing:** Each folder in `src/app/` with a `page.tsx` is a route. Use Next.js conventions for layouts and pages.
- **Data Flow:** Static data (projects, socials, etc.) should be placed in a dedicated data file or fetched via API routes.
- **External Integrations:** Google Maps and Leaflet are integrated via custom type definitions in `src/types/`.
- **Styling:** Tailwind CSS is used for all styling. Avoid custom CSS except for global styles.

## Developer Workflows

- **Start Dev Server:**
  ```cmd
  npm run dev
  ```
- **Build for Production:**
  ```cmd
  npm run build
  ```
- **Run Locally (Production):**
  ```cmd
  npm start
  ```
- **Environment Variables:**
  - Store secrets in `.env.local` (never commit this file).
  - Example:
    ```env
    NEXT_PUBLIC_EMAIL_SERVICE_ID=your_email_service_id
    NEXT_PUBLIC_EMAIL_TEMPLATE_ID=your_template_id
    NEXT_PUBLIC_EMAIL_USER_ID=your_user_id
    ```

## Integration Points

- **API:** Use `src/utils/api.ts` for API calls.
- **Maps:** Use `LocationMap.tsx` and `ClientMap.tsx` for map integrations.
- **Image Slider:** Use `ImageSlider.tsx` for project/review images.

## Project-Specific Notes

- All new pages should be added as folders in `src/app/` with a `page.tsx` file.
- Reusable UI elements should go in `src/components/`.
- Type definitions for third-party libraries should be placed in `src/types/`.
- Follow Tailwind CSS conventions for styling.

---

**For questions or unclear conventions, review `README.md` or ask for clarification.**
