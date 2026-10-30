# PMAY-U Improvement Backlog

This backlog is intentionally focused on making the captured snapshot useful and self-contained. Visual redesign is deferred.

## Priority 0: Runtime Safety and Containment

### P0-1: Define local runtime mode
- Add a local data-provider boundary for all API-driven sections.
- Make unavailable external services explicit in the UI.
- Remove assumptions that `APP_URL` and a Laravel session exist locally.
- Dependency: none.

### P0-2: Eliminate uncaught startup errors
- Identify the source of `TypeError: Cannot read properties of undefined (reading 'Constructor')`.
- Guard optional plugin initialization when a plugin is missing.
- Add error handling to AJAX/Axios calls.
- Dependency: P0-1 for fallback behavior.

### P0-3: Repair local asset resolution
- Inventory every stylesheet, script, font, image, and iframe URL.
- Fix or intentionally disable missing `/css/`, `/webfonts/`, `/v3/`, and mismatched `Picture*.jpeg/.jpg` references.
- Dependency: none; must precede reliable browser testing.

### P0-4: Remove duplicate IDs from the local page
- Make translation containers, dropdown references, navigation menu IDs, and generated widget IDs unique.
- Keep one authoritative translation/accessibility instance.
- Dependency: P0-2 and P0-3, because duplicate runtime-generated markup must be understood after startup errors are contained.

## Priority 1: Functional Local Website

### P1-1: Replace homepage API calls with local providers
- Cover processes, beneficiaries, partner slider, Angikaar counts, states, sliders, and publications.
- Use verified captured data only.
- Provide labeled empty/unavailable states where data is absent.
- Dependency: P0-1 and P0-2.

### P1-2: Make navigation honest and usable locally
- Keep verified external PMAY links as external links.
- Replace dead `#` menu roots with accessible submenu buttons or clearly labeled external/unavailable actions.
- Preserve the original hierarchy and intent.
- Dependency: P0-4.

### P1-3: Stabilize search behavior
- Decide between local search over captured content and an explicitly external Google CSE.
- Provide a visible no-results/unavailable state.
- Dependency: P0-1 and P0-3.

### P1-4: Replace broken social embeds with explicit states
- Twitter/X: show that the live feed is unavailable locally; the saved capture is rate-limited.
- Facebook: do not display the captured Chrome error page; use an external link or unavailable state.
- Dependency: P0-1.

### P1-5: Test accessibility controls as functional features
- Verify opening/closing the panel, contrast, link highlighting, font scaling, spacing, line height, image hiding, cursor size, skip content, and language control.
- Ensure state changes are keyboard accessible and reversible.
- Dependency: P0-4 and P1-1.

## Priority 2: Responsive and Accessibility Hardening

### P2-1: Remove page-level horizontal overflow
- Re-test after each fix at 390px, 768px, and 1440px widths.
- Investigate fixed widths, absolute hero positioning, nested Bootstrap rows, navigation, sliders, and embedded widgets.
- Current evidence: mobile 1125px scroll width vs 375px client width; tablet 827px vs 753px.
- Dependency: P0-3 and P1-1.

### P2-2: Repair heading and landmark structure
- Establish a single H1 and logical section headings.
- Remove or isolate repeated translation-widget headings.
- Verify landmarks, labels, and skip-to-content behavior.
- Dependency: P0-4.

### P2-3: Complete image alternative-text audit
- Add meaningful alt text to informative images.
- Use empty alt text for decorative images.
- Provide a visible fallback for missing assets.
- Dependency: P0-3.

### P2-4: Keyboard-test all menus and overlays
- Verify focus order, Escape handling, submenu access, focus visibility, and focus return after closing panels.
- Dependency: P1-2 and P1-5.

## Priority 3: Maintainability

### P3-1: Establish a local asset manifest
- Record source path, local path, type, and whether each asset is required, optional, external, or unavailable.
- Dependency: P0-3.

### P3-2: Reduce dependency duplication
- Choose one Bootstrap version and one icon/translation implementation after behavior is known.
- Do not edit vendor files; isolate or stop loading unused copies from the page layer.
- Dependency: P0-2 and P0-3.

### P3-3: Add smoke tests
- Start a local server, load the page, assert no uncaught application errors, assert no page-level overflow at target widths, and check critical controls.
- Track expected external/API failures separately from application failures.
- Dependency: P2-1 and P2-4.

### P3-4: Remove captured secrets and tracking values
- Remove/rotate captured CSRF tokens and disable analytics for local builds.
- Dependency: before any public deployment.

## Future UI Improvements (Deferred)

These are intentionally out of scope for Phase 1 and should not block functional hardening:

- Visual redesign or rebranding.
- Typography and color-system refresh.
- Hero/layout modernization.
- Component-level visual simplification.
- Animation and transition polish.
- Consolidation of legacy page sections.

## Suggested Implementation Order

1. P0-1 local runtime mode.
2. P0-3 asset inventory and path repair.
3. P0-2 startup-error containment.
4. P0-4 duplicate-ID cleanup.
5. P1-1 local data providers and unavailable states.
6. P1-2 navigation and P1-4 social fallback states.
7. P1-3 search decision and implementation.
8. P1-5 accessibility behavior verification.
9. P2-1 responsive overflow fixes.
10. P2-2 through P2-4 accessibility and image hardening.
11. P3-1 through P3-4 maintainability and smoke tests.
12. Reassess future UI improvements only after the self-contained functional baseline passes.
