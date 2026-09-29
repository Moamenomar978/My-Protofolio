# Moamen Fathy — Portfolio (Angular)

Angular rebuild of the original static HTML/CSS/JS portfolio, converted to
standalone components with plain CSS (no SCSS).

## Structure

```
src/app
├── components
│   ├── home        # hero, skills, projects, contact form (main landing content)
│   ├── about-as     # "About Me" section
│   └── navbar       # nav bar, theme toggle, mobile menu, back-to-top, progress bar
├── core
│   ├── models        # Project / Skill / Service / CV TypeScript interfaces
│   ├── services       # ThemeService, ScrollEffectsService, ContactService, AuthService
│   ├── guards          # authGuard (protects /admin)
│   └── directives       # RevealDirective (scroll-reveal, replaces old IntersectionObserver code)
├── pages
│   ├── home          # route "/"  — navbar + home component
│   ├── services        # route "/services"
│   └── cv                # route "/cv"
├── features
│   ├── auth/login      # route "/auth/login" (placeholder)
│   ├── user/profile     # route "/user" (placeholder)
│   └── admin/dashboard   # route "/admin", guarded (placeholder)
├── app.config.ts
├── app.routes.ts
├── app.ts
└── app.html
```

## Getting started

```bash
npm install
npm start        # ng serve, http://localhost:4200
npm run build     # production build to dist/
```

## Notes

- All styling is plain **CSS** (see `src/styles.css`, ported from the original
  `style.css`) — no SCSS is used anywhere in the project.
- Images (`profile.jpeg`, `project1.png` … `project5.png`) live in `public/`
  and are served from the app root, matching the original relative paths.
- The contact form is a Reactive Form. It runs in "demo mode" out of the box;
  open `src/app/core/services/contact.service.ts` and fill in your EmailJS
  `PUBLIC_KEY` / `SERVICE_ID` / `TEMPLATE_ID` to send real emails.
- `features/auth`, `features/user`, and `features/admin` are intentionally
  minimal scaffolding (a login form, a profile stub, and a guarded dashboard
  stub) since the original site had no authentication — wire them up to a
  real backend when you need them.
- CV "Download PDF" currently triggers the browser print dialog
  (`window.print()`), same fallback behavior as a simple print-to-PDF.
