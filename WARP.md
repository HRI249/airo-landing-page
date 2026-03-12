# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This repo is an Expo (React Native) app called **Airo**, a mobile-first nutrition assistant with two core AI experiences:
- **Cal AI** – scan a meal to get a mock health score and calories.
- **Fridge AI** – scan fridge contents to get mock meal suggestions.

The codebase is UI/flow only right now: there is no backend wiring or real AI integration; camera and AI behavior are mocked for a polished prototype.

## Common Commands

All commands are intended to be run from the repo root.

### Install dependencies

```bash
npm install
```

### Start the Expo app (development)

```bash
npm start        # or: npx expo start
```

Platform-specific shortcuts:

```bash
npm run ios      # iOS simulator (macOS only)
npm run android  # Android emulator/device
npm run web      # Web via Expo web bundler
```

> Note: there are currently **no test or lint scripts** defined in `package.json`.

### Landing page deployment (static HTML)

There is also a separate static waitlist/landing page flow (HTML + Supabase) whose deployment is documented in:
- `DEPLOYMENT_GUIDE.md`
- `GITHUB_VERCEL_GUIDE.md`
- `VERCEL_404_FIX.md`
- `SUPABASE_SETUP.md`
- `MANUAL_TABLE_SETUP.md`

Use those docs if you need to work on the marketing/waitlist page rather than the Expo app.

## High-Level Architecture

### Entry point & navigation

- `App.js` is the single React Native entry point, configured to use Expo (`main` points to `node_modules/expo/AppEntry.js` in `package.json`).
- Navigation is built with **React Navigation**:
  - A `RootStack` controls the high-level app flow:
    - `Landing` → marketing-style intro screen.
    - `Onboarding` (multi-slide explanation of Airo, not currently linked from `Landing`).
    - `MainApp` → bottom tab navigator for the primary app.
  - The tab navigator (`TabNavigator` in `App.js`) defines four tabs:
    - `Home` → `HomeScreen` (hub for Cal AI / Fridge AI features).
    - `Cal AI` → `CalAIStack` (stack of Cal AI-related screens).
    - `Fridge AI` → `FridgeAIStack` (stack of Fridge AI-related screens).
    - `Profile` → `ProfileScreen`.
  - Each AI feature has its own internal stack:
    - `CalAIStack`: `CalAIScreen` → `CameraScreen` → `ResultsScreen`.
    - `FridgeAIStack`: `FridgeAIScreen` → `CameraScreen` → `ResultsScreen`.
- Tab bar icons and colors are controlled centrally via `theme` (`src/styles/theme.js`).

### Screens & flows (`src/screens`)

- `LandingScreen.js`
  - Hero/marketing landing page for the app with animated feature cards for Cal AI, Fridge AI, and analytics.
  - Bottom sticky "Get Started" CTA currently routes **directly to** `MainApp`, skipping onboarding.
- `OnboardingScreen.js`
  - Full-screen horizontally-paged onboarding carousel (FlatList) with three slides (Welcome, Cal AI, Fridge AI).
  - On completion, calls `navigation.replace('MainApp')`.
  - Not wired from `LandingScreen` yet; you may choose whether to insert it between `Landing` and `MainApp`.
- `HomeScreen.js`
  - Uses `GradientBackground` + `GlassCard` to create the glassmorphism home dashboard.
  - Shows feature cards for **Cal AI** and **Fridge AI**, which navigate into their respective tab routes (`navigation.navigate('Cal AI')`, `navigation.navigate('Fridge AI')`).
  - Includes static "Your Journey" stats and "Quick Tips" sections (placeholders for future analytics integration).
- `CalAIScreen.js`
  - Manages local state for `isScanning` and `lastScanResult`.
  - `Scan Your Food` button navigates to `CameraScreen` with params `{ type: 'meal', onResult }`.
  - `lastScanResult` is meant to be set from `CameraScreen` via the `onResult` callback, but currently the camera stub does **not** call it — this is important if you intend to wire real data.
  - Shows mocked last-scan summary (ScoreDisplay + calories) when `lastScanResult` is set.
  - Static description of Cal AI capabilities.
- `FridgeAIScreen.js`
  - Entry for Fridge AI; CTA navigates to `CameraScreen` with `{ type: 'fridge' }`.
  - Displays a static list of `recentScans` (mock data only).
- `CameraScreen.js`
  - **Mock camera implementation**:
    - Uses a static Unsplash image as a background instead of device camera APIs.
    - Simulates a scan with `setTimeout` (2 seconds) and then navigates to `ResultsScreen` with `{ type }` from route params.
    - Does **not** use the `onResult` callback passed from `CalAIScreen`; any real integration should:
      - Replace the mock image with `expo-camera` or `expo-image-picker`.
      - Capture an image, call an AI/backend, then navigate to results with real data.
  - Contains custom camera UI chrome (frame corners, capture button, gallery/flip icons) implemented in pure RN.
- `ResultsScreen.js`
  - Reads `type` from `route.params` to decide between **Meal Analysis** and **Meal Suggestions** modes.
  - Uses an internal loading state to simulate AI processing before revealing results.
  - `meal` mode:
    - Shows `ScoreDisplay` and a calories pill.
    - Glass card with static macro breakdown and explanatory text.
  - `fridge` mode:
    - Shows `Suggested Meals` section with two static recipe cards.
  - Back button currently `navigate('Home')`, not `goBack()`; this is a design decision to drop users back to the hub instead of the camera.
- `ProfileScreen.js`
  - Static profile + stats page with toggles for notifications and dark mode (local state only; no persistence).
  - Menu entries (Nutrition Goals, Scan History, Favorite Meals, etc.) are stubs that log to console.
  - Bottom card shows hard-coded app name and version.

### Shared UI & theming

- `src/styles/theme.js`
  - Centralizes design tokens: colors (including the full gradient flow), gradients, spacing, border radii, shadows, typography, and device dimensions.
  - Exports both `theme` (object) and `globalStyles` (common container/glass styles).
  - Most screens import `theme` (and sometimes `globalStyles`) and avoid inline magic numbers; when adding new UI, prefer to extend this rather than hard-coding values.
- `src/components/GradientBackground.js`
  - Wraps screens with the full "gradient flow" background (`theme.gradients.fullFlow`) and a subtle white overlay.
  - All primary screens already use this; new screens should too for visual consistency.
- `src/components/UIComponents.js`
  - Reusable, animated components built around the theme:
    - `GradientButton` – linear-gradient button with loading/disabled support.
    - `GlassCard` – blurred, semi-transparent card (using `expo-blur`), tuned for the glassmorphism style.
    - `GradientCard` – alternative card with gradient backgrounds.
    - `FeatureCard` – specialized card for feature promotion blocks.
    - `ScoreDisplay` – circular gradient meter for numeric scores (health score, etc.).
    - `LoadingSpinner` – decorative gradient spinner.
  - These build in `react-native-animatable` animations; new UI should reuse them where appropriate instead of rolling one-off buttons/cards.

### Landing page & Supabase docs

The repo also contains documentation for a **separate static landing/waitlist page** that is not part of the Expo app runtime:

- `DEPLOYMENT_GUIDE.md` – simple deploy instructions (Netlify Drop, Vercel) for a single-file HTML landing page.
- `GITHUB_VERCEL_GUIDE.md` – GitHub + Vercel CI-style deployment, including an example `vercel.json` rewrite for static `index.html`.
- `VERCEL_404_FIX.md` – describes structural changes (use `public/index.html`) so Vercel serves the page correctly.
- `SUPABASE_SETUP.md` / `MANUAL_TABLE_SETUP.md` – detailed instructions for wiring a Supabase `waitlist` table and pasting the anon key into `landing-page.html`.

These files are **operational guides**, not code that is imported into the React Native app.

## Notes for Future Changes

- **Real camera & AI integration**:
  - Replace `CameraScreen`'s mock image and timeout with `expo-camera` / `expo-image-picker` and real inference logic.
  - Ensure the `onResult` callback from `CalAIScreen` is actually invoked, or pass structured result data directly when navigating to `ResultsScreen`.
- **Navigation wiring**:
  - Decide whether `LandingScreen` should route to `OnboardingScreen` first (e.g., `navigation.replace('Onboarding')`) instead of `MainApp`.
  - If you add deep links or auth flows, they should be modelled in `RootStack` and, if necessary, split into separate stacks.
- **Testing & linting**:
  - There is currently no Jest/React Native Testing Library or lint config wired into the scripts; if you introduce tests or linting, also add corresponding `npm test` / `npm run lint` scripts to `package.json` so future agents can rely on them.
