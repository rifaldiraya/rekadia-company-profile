# Changelog

## [Unreleased]

### Added
- [feat] cms: sign in through the backend `POST /account/login` and refresh the access token before it expires (2ac784d)
- [feat] cms: read and write collections, items, and media through the backend `/cms/*` API (2ac784d)
- [docs] api: add the CMS API contract for the backend team (1845ce8)
- [feat] cms: add list and create/edit pages for 9 CMS collections backed by dummy data in the browser (1845ce8)
- [feat] cms: add a Collections submenu to the sidebar and link the dashboard cards to each collection (1845ce8)
- [feat] cms: add a reset dummy data action to the CMS home (1845ce8)
- [feat] admin: support a description and action buttons in the page header (1845ce8)
- [feat] cms: add an overview hero with count-up stats and a largest-collections chart to the CMS home (1845ce8)
- [feat] cms: browse collections as grid or list cards with search, group filters, and sorting (1845ce8)
- [feat] admin: add a mobile top bar that opens the navigation drawer (1845ce8)
- [feat] cms: add the Rekadia CMS sign-in page with dummy demo accounts and brand styling (1845ce8)
- [feat] cms: list the 9 website collections with search on the CMS home (1845ce8)
- [feat] industries: build the Industries page from the live Webflow site (486e140)
- [feat] blog: build the Blog listing with all 54 posts, title search, and `?page=` pagination (486e140)
- [feat] case-study: build the Case Study listing with title search (486e140)
- [feat] about-us: build the About page with the team photo slider, vision, mission, and philosophy (486e140)
- [feat] delva: rebuild the Delva page from the Webflow staging design (486e140)
- [feat] e-office: build the E-Office and E-Office Email product pages (486e140)
- [feat] solutions: build the Solutions page (486e140)
- [feat] home: recreate the homepage, site header, footer, and WhatsApp button (486e140)
- [feat] contact-us: build the Contact Us page with the contact form (486e140)
- [feat] api: add the contact and newsletter services with a mock fallback (486e140)
- [docs] assets: document every placeholder image and its original Webflow file (486e140)

### Changed
- [chore] api: point `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_BASE_URL` to the development API (2ac784d)
- [refactor] cms: remove the in-browser dummy data, demo accounts, and the reset dummy data action (2ac784d)
- [style] admin: restyle the CMS sidebar, header, and page background to match the sign-in page and company profile (1845ce8)
- [style] admin: use the company profile colours for the admin theme and brand the drawer as Rekadia CMS (1845ce8)
- [refactor] delva: share the case study cards with the Case Study page (486e140)

### Fixed
- [fix] admin: show ProblemDetails validation errors in the shared HTTP client instead of crashing (2ac784d)
- [fix] admin: highlight the active sidebar item when the URL has a trailing slash (1845ce8)
- [fix] auth: read the session token in middleware with the same secret used to sign it (1845ce8)
- [fix] contact-us: match the form position at 375px and the column widths from 1280px up (486e140)
