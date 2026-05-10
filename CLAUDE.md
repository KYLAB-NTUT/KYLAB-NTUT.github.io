# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the official static website for **KY Lab (System Analysis & Control Lab)** at National Taipei University of Technology (NTUT), led by Prof. Kuang-Yow Lian. It is a pure static HTML/CSS/JS site deployed via GitHub Pages — no build step, no package manager, no framework.

**Live site:** https://kylab-ntut.github.io/

## Deployment

Push to `main` → GitHub Pages auto-deploys within ~2 minutes. There is no CI build step to run.

```bash
git add <files>
git commit -m "描述這次改了什麼"
git push
```

## Architecture

### Page Structure

All pages use directory-style URLs (`/members/` maps to `members/index.html`). Each page loads the same two scripts at the bottom of `<body>`:

```html
<script src="/js/components.js"></script>
<script src="/js/main.js"></script>
```

| File | Purpose |
|---|---|
| `index.html` | Hero landing page |
| `research/index.html` | Research areas |
| `projects/index.html` | Lab projects overview |
| `projects/drone/`, `projects/speech/`, `projects/energy/`, `projects/vision/` | Individual project detail pages |
| `professor/index.html` | Professor profile & academic history |
| `members/index.html` | Lab members (Firebase-powered) |
| `awards/index.html` | Awards & recognition |
| `gallery/index.html` | Activity photos & videos |

Every page includes this inline `<script>` in `<head>` to apply dark mode before render:

```html
<script>try { if (localStorage.getItem('saclab-theme') !== 'light') document.documentElement.classList.add('dark-theme'); } catch (e) { }</script>
```

### Shared Components (`js/components.js`)

Injects navbar and footer into every page via `insertAdjacentHTML`. Active nav link is detected by comparing `location.pathname`. If you add a new page, add it to the `nav-links` list inside `components.js`. All href values use absolute paths (e.g. `/research/`).

### Main Script (`js/main.js`)

Controls all interactive behavior shared across pages:
- **`labPhotos` config array** — add image paths here to enable floating photo cards on the home page hero. Photos go in `images/lab/`.
- Scroll reveal animation (`IntersectionObserver` on `.reveal` elements)
- Navbar scroll shadow
- Mobile hamburger menu
- Drone cursor with physics tilt (`#droneCursor`)
- Cursor glow (`#cursorGlow`)
- Emoji bounce click animation
- Professor academic history expand/collapse (`toggleServices()`)
- Dark/light theme toggle persisted in `localStorage` under key `saclab-theme`; class applied to `<html>` (`document.documentElement`), not `<body>`
- Melvin easter egg: clicking Melvin's avatar (`#melvin-avatar-wrap`) 10 times rapidly triggers a Matrix-style overlay with confetti and achievement toast

### Members Page (`js/members.js` + `css/members.css`)

The members page is **dynamic** — member data is stored in Firebase, not in HTML. `js/members.js` is loaded as an ES module with `type="module"`.

**Firebase services used:**
- **Firestore** (`members` collection) — stores each member's name, role, year, bio, photo URL, tags, etc.
- **Firebase Auth** — Google OAuth + email/password login
- **Firebase Storage** — avatar photo uploads (path: `members/{docId}/avatar.jpg`)

**Auth roles:**
- Any authenticated user can edit their own card (nickname, bio, custom tags, photo)
- Admin (`melvin0kuo@gmail.com`) can edit all cards and sees additional fields (name, role, year, research tag, avatar color, email, display order)

**Firestore member document fields:**
`name`, `role`, `year` (碩一/碩二/博士班), `researchTag`, `email`, `order`, `nickname`, `bio`, `customTags[]`, `photoURL`, `previousPhotoURL`, `avatarColor`, `placeholderEmoji`

**Adding a new member:** Create a document in the `members` Firestore collection with the fields above. The page fetches and renders all members sorted by `order`.

### Gallery Page (`gallery/index.html`)

Activity photos are loaded automatically from **Google Drive** via the Drive API v3. Folder ID: `1HHxoyxt6y71EgBPXXLb1V6R6s8T1vaLs`. To add a new activity album, create a subfolder inside that Drive folder — the page will automatically pick it up.

Videos are YouTube embeds hardcoded in the HTML. To add a video, duplicate a `.gl-video-card` block and replace the video ID in the `iframe` `src`.

### Styling (`css/style.css`)

All colors are defined as CSS variables in `:root`. Dark mode overrides are applied via `html.dark-theme` (on the `<html>` element). To change the color scheme, edit the variables at the top of `style.css`:

```css
:root {
  --color-cyan: #64D2D6;
  --color-purple: #B794F4;
  /* etc. */
}
```

### Adding Content

- **New research card / project / member / award** — duplicate an existing card element in the relevant HTML file and edit the content (except members, which uses Firebase).
- **Floating lab photos** — add photo paths to the `labPhotos` array in `js/main.js` (max 6 shown). Place images in `images/lab/`.
- **New page** — create a new `<page-name>/index.html` following the same `<head>` template as an existing page (including the inline dark-mode script), then add the route to the navbar in `js/components.js`.

## GitHub Actions

- `.github/workflows/claude.yml` — enables `@claude` mentions in issues and PRs to trigger Claude Code.
- `.github/workflows/claude-code-review.yml` — automated code review on PRs.
