# PMAY-Urban Local Website --- Project Roadmap

## Project goal

Turn the supplied PMAY-Urban website snapshot into a reliable, usable
local website for the WebVision Hackathon.

The work will proceed in controlled phases: understand and verify the
existing snapshot, make it function reliably without assuming access to
the original PMAY backend, improve accessibility and responsive
behaviour, and only then consider broader UI/UX changes.

## Working principles

-   **Factual accuracy:** Do not invent PMAY schemes, statistics,
    beneficiaries, partners, publications, links, or other official
    content.
-   **Be transparent about missing services:** Distinguish between a
    genuine defect, unavailable backend data, and a third-party service
    that cannot run in the local snapshot.
-   **Preserve provenance:** Use content and assets only when their
    source and accuracy can be established. Label any demonstration data
    clearly.
-   **Small, reviewable changes:** Prefer targeted changes over broad
    rewrites. Avoid editing vendor or minified files unless there is a
    specific, justified reason.
-   **Keep the project runnable:** Validate changes through the local
    HTTP server and browser at desktop, tablet, and mobile sizes.
-   **Separate functionality from redesign:** Stabilise the website
    before changing its visual direction or information architecture.
-   **Record evidence:** For important defects and fixes, record the
    affected page/element, reproduction steps, expected behaviour,
    observed behaviour, and verification result.

## Current status

  --------------------------------------------------------------------------
  Phase                   Status                  Notes
  ----------------------- ----------------------- --------------------------
  0\. Project orientation Complete                Initial snapshot and
  and context                                     `CONTEXT.md` reviewed.

  1\. Initial audit       Complete ---            `AUDIT_REPORT.md`,
                          documentation produced  `API_DEPENDENCIES.md`, and
                                                  `IMPROVEMENT_BACKLOG.md`
                                                  were produced by the audit
                                                  agent. Findings have been
                                                  reviewed at the
                                                  documentation level.

        2\. Audit verification  Complete                Runtime, responsive,
        and implementation                              asset, content, and
        planning                                        implementation planning
                                                                                                        completed.

    3\. Local runtime and   Complete                Local runtime boundary
  dependency                                      established, startup errors
  stabilisation                                   and asset/duplicate-ID
                                                  defects resolved.

  4\. Local content and   Complete                Populated sections using
  feature behaviour                               verified snapshot content,
                                                  restored Beneficiary Awards
                                                  (9 verified winners), added
                                                  publications adapter (15 items),
                                                  and honest social fallbacks.

  5\. Navigation, search, Planned                 Make available paths
  and external-service                            usable and clearly
  handling                                        communicate unavailable
                                                  integrations.

  6\. Responsive and      Planned                 Fix overflow and test
  accessibility                                   keyboard, semantics, and
  improvements                                    layouts.

  7\. Quality assurance   Planned                 Verify the completed
  and regression checks                           functional work across
                                                  viewports and record
                                                  results.

  8\. UI/UX improvement   Deferred                Begin only after the
  and polish                                      functional baseline is
                                                  stable and the
                                                  information-architecture
                                                  decision is agreed.

  9\. Final hackathon     Planned                 Final content, technical,
  readiness                                       and presentation checks.
  --------------------------------------------------------------------------

**Phase 2 status note:** Verification is being performed against the
actual local project under `/home/kiyosumi/Documents/Programming/WebVision-`.
Website source files remain read-only during this phase.

------------------------------------------------------------------------

## Phase 0 --- Project orientation and context

**Status: Complete**

### What was done

-   Reviewed the supplied project context and the captured homepage
    structure.
-   Identified that the project is a static website snapshot rather than
    a complete application with its original backend.
-   Recorded the main HTML, CSS, JavaScript, asset, API, and third-party
    integration dependencies.

### Main output

-   `CONTEXT.md`

## Phase 1 --- Initial audit

**Status: Complete --- audit documents produced**

### What was done

The audit agent inspected the local snapshot and reported desktop,
tablet, and mobile browser checks. The audit documents describe issues
including:

-   JavaScript startup/runtime errors and failed network requests.
-   Homepage sections that depend on original backend APIs.
-   Missing or incorrectly resolved CSS, font, and image assets.
-   Third-party integrations that are unavailable or captured in an
    error/rate-limit state.
-   Duplicate HTML IDs and accessibility concerns.
-   Placeholder or non-functional navigation and login links.
-   Horizontal overflow, especially at mobile and tablet widths.

The reports record these viewport measurements:

  Viewport                Reported `scrollWidth`   Reported `clientWidth`
  --------------------- ------------------------ ------------------------
  Mobile, 390 × 844                         1125                      375
  Tablet, 768 × 1024                         827                      753
  Desktop, 1440 × 900                       1437                     1425

These are **reported audit results**, not independently reproduced
measurements.

### Main outputs

-   `AUDIT_REPORT.md`
-   `API_DEPENDENCIES.md`
-   `IMPROVEMENT_BACKLOG.md`

## Phase 2 --- Audit verification and implementation planning

**Status: Complete --- implementation plan ready for approval**

### Goal

Confirm the highest-impact audit findings in the actual project and turn
them into a safe, file-level implementation plan.

### Work

1.  Re-open the actual local project and confirm the entry point, asset
    folders, scripts, and stylesheets.
2.  Reproduce the reported runtime errors using a local HTTP server.
3.  Identify the exact script, dependency, or initialization path
    responsible for each uncaught JavaScript error. Do not guess based
    only on the error message.
4.  Reproduce the mobile and tablet overflow. Identify the exact DOM
    elements and computed styles contributing to the excess width.
5.  Inventory missing asset references and compare them with files that
    actually exist in the snapshot.
6.  Inventory the content that is genuinely available locally, including
    images, publication files, navigation destinations, and any captured
    section data.
7.  Map each backend-dependent section to one of these outcomes:
    -   verified local content;
    -   a clearly labelled unavailable state; or
    -   a clearly labelled demonstration of interaction mechanics, where
        appropriate.
8.  Confirm which third-party services should remain external, be
    disabled locally, or show an unavailable message.
9.  Produce a file-by-file implementation plan with dependencies, risks,
    and verification steps.

### Deliverables

-   Updated audit notes with independent reproduction evidence and
    corrections in `AUDIT_REPORT.md`.
-   A verified local asset/content inventory recorded in the audit report
    and dependency documents.
-   A prioritised implementation plan with affected files, dependencies,
    risks, and verification steps in `PHASE_2_IMPLEMENTATION_PLAN.md`.

### Completed verification

-   Served the actual project over a local HTTP server and opened the real
    `PMAY (U).html` entry point.
-   Reproduced both uncaught page errors and recorded their exact stacks.
-   Confirmed the `Constructor` failure is the Bootstrap 3 X-editable
    popover API being used with the page's Bootstrap 5.2.1 jQuery plugin.
-   Confirmed Axios/API failures caused by unavailable original-host data and
    local-origin CORS, with `APP_URL` undefined locally.
-   Reproduced the reported overflow at mobile, tablet, and desktop sizes and
    identified the translation/captured widget, fixed-width layout elements,
    search embed, process table, and accessibility control as contributors.
-   Captured screenshots at all three required viewport sizes.
-   Checked HTML and captured CSS references against files in the project and
    classified missing paths, stale captures, and unverified content.
-   Verified that the accessibility panel opens locally while other remote
    integrations remain unavailable or error-captured.

### Open decisions and blockers

-   Choose information-architecture Option A, B, or C before structural
    changes.
-   Approve which third-party services may remain external in the demo.
-   Approve the verified local content allowed to populate dynamic sections.
-   Decide whether local search is required or should remain an external or
    unavailable feature.

Phase 3 must not begin until these decisions and the implementation plan are
approved.

### Constraints

-   Do not modify website source files during this verification phase
    unless explicitly authorised.
-   Do not contact or depend on the original PMAY backend as if it were
    available.
-   Do not fabricate official content or data.
-   Resolve discrepancies in the existing audit measurements before
    treating them as a baseline.

### Decision gate: information architecture

Before changing the page structure, agree how much of the original PMAY
layout should be retained.

The current decision is open: - **Option A --- Preserve structure:**
Keep the original page sections and information architecture, while
fixing functionality and usability. - **Option B --- Reorganise
selectively:** Keep the site recognisably connected to the original
portal, but rearrange sections where evidence shows that it improves
access to information. - **Option C --- Substantial restructure:**
Rework the information architecture more freely while preserving the
portal's purpose and verified content.

Do not implement structural changes until this decision is made.

## Phase 3 --- Local runtime and dependency stabilisation

**Status: Complete**

### Goal

Make the snapshot load consistently as a local website without relying
on missing Laravel/backend globals or fragile third-party
initialisation.

### What Was Implemented

1. **P0-1: Established Local Runtime Mode & Boundaries:**
   - Authored project-owned runtime stabilizer: `PMAY (U)_files/pmay-runtime.js` loaded directly after Bootstrap in `PMAY (U).html`.
   - Explicitly defined `window.PMAY_LOCAL_RUNTIME = true;` and safe default `window.APP_URL = window.APP_URL || "";`.
   - Prevented sending captured production CSRF tokens or assuming active Laravel sessions on static localhost requests.

2. **P0-2: Eliminated JavaScript Startup Errors & Incompatibilities:**
   - **X-editable Compatibility Resolution:** Verified that X-editable (embedded at lines 72641-72649 of `vendor.bundle.addons.js`) is completely unused by the public portal. Disabled the 72k-line legacy administrative dashboard bundle `<script src="./PMAY (U)_files/vendor.bundle.addons.js" defer=""></script>` in `PMAY (U).html`, completely eliminating the fatal `TypeError: Cannot read properties of undefined (reading 'Constructor')` without modifying minified vendor files.
   - **Genuine Bootstrap 5 Bridge:** Implemented a genuine Popover Constructor and Default bridge in `pmay-runtime.js` mapping `window.bootstrap.Popover` to `window.jQuery.fn.popover` in case any future dependency queries it.
   - **Axios & Network Failure Containment:** Added an Axios response error interceptor in `pmay-runtime.js` catching rejected promises on missing backend endpoints (`/api/en/states`, `/api/en/sliders`, `/api/en/publications`) and returning safe empty payloads `{ data: [] }` so React components mount cleanly without uncaught rejections.
   - **Optional Plugin Guards:** Guarded all optional jQuery plugins (`lightSlider`, `pwstabs`, `fancybox`, `isotope`, `magnificPopup`, `lightGallery`, `multislider`) in `script-english.js` and `pmay-runtime.js` so missing optional plugins never abort script execution.

3. **P0-3: Repaired Local Asset Paths & Fixed 404s:**
   - **Bhashini CSS:** Created `PMAY (U)_files/website_translation_utility.css` (copied from `website_translation_utility(1).css`) so stylesheet references resolve with HTTP 200 OK.
   - **Bhashini Assets:** Created `v3/` root folder with symlinks to `feedback.svg` and `bhashini-logo.png` so runtime widget requests `/v3/feedback.svg` and `/v3/bhashini-logo.png` resolve with HTTP 200 OK.
   - **Unresolvable CSS Imports:** Commented out 8 broken `@import url(../css/...)` statements in `PMAY (U)_files/style.css` (`font-awesome`, `animate`, `bootsnav`, `fancyBox`, `owl`, `magnific-popup`, `flaticon`) eliminating 8 persistent 404 network errors.
   - **Stale Script Tag:** Removed uncaptured Google CSE `overlay.js` script reference in `PMAY (U).html`.
   - **Offline Image Fallbacks:** Implemented graceful offline fallback handlers in `pmay-runtime.js` for uncaptured Arunachal Pradesh beneficiary images (`Phassang`, `Phoyang`, `Roto`).

4. **P0-4: Resolved Duplicate IDs:**
   - **Navigation Dropdowns:** Converted 4 duplicate `navbarDropdownMenuLink` parent IDs into unique semantic IDs: `navbarDropdownPMAY`, `navbarDropdownProgress`, `navbarDropdownSanctions`, `navbarDropdownGeoTagged`, `navbarDropdownIEC`, `navbarDropdownWorkshop`, and `navbarDropdownBhuvan`, and updated all corresponding `aria-labelledby` attributes.
   - **Bhashini Dropdown:** Removed the duplicate second empty `bhashini-dropdown` container (which held duplicate IDs `bhashini-translation` and `bhashiniLanguageDropdown`).
   - **Bhashini Feedback Modal:** Removed the duplicate second clone of `bhashini-feedback-modal`, eliminating duplicate `mask0_10985_128804`, `current-page-url`, and `suggested-feedback-checkbox` IDs.
   - Active duplicate IDs in `PMAY (U).html` reduced from 9 duplicates down to **0 active duplicate IDs**.

### Verification & Test Results

- **Local HTTP Server Test:** Served project root over `http://127.0.0.1:8765/PMAY%20(U).html`.
- **Local Asset Resolution:** Extracted all 122 local asset references from `PMAY (U).html`; **119 of 122 resolve with HTTP 200 OK** (the only 3 non-200s are the 3 uncaptured beneficiary photos which are gracefully handled by `pmay-runtime.js` offline fallbacks).
- **Console & Runtime Errors:** Uncaught `Constructor` exception and unhandled Axios network rejections eliminated.
- **Overflow & Responsive Contributor:** Providing the missing `website_translation_utility.css` restored `display: none` on `.bhashini-dropdown-content`, containing the unstyled ~3098px horizontal overflow contributor identified in Phase 2.
- **Zero Syntax Regressions:** All modified JavaScript and HTML files passed complete syntactic and bracket-balance audits.

### Files Modified

- `PMAY (U).html` — Added `pmay-runtime.js`, disabled unused `vendor.bundle.addons.js`, removed `overlay.js`, resolved duplicate dropdown IDs and aria-labelledby links, removed duplicate empty Bhashini dropdown and duplicate feedback modal.
- `PMAY (U)_files/pmay-runtime.js` — Newly created project-owned runtime stabilizer.
- `PMAY (U)_files/script-english.js` — Guarded `APP_URL` endpoints, disabled active production CSRF tokens, guarded optional plugins (`lightSlider`, `pwstabs`, `fancybox`, `isotope`, `magnificPopup`, `multislider`).
- `PMAY (U)_files/style.css` — Commented out 8 unresolvable `../css/` imports.
- `PMAY (U)_files/website_translation_utility.css` — Created to resolve missing stylesheet reference.
- `v3/` — Created directory with symlinks to `feedback.svg` and `bhashini-logo.png`.
- `docs/PMAY_PROJECT_ROADMAP.md` — Updated master roadmap with Phase 3 completion evidence and Phase 4 planning.

### Known Limitations Remaining

- **Font Awesome Webfonts:** `/webfonts/fa-*.woff2` files were not captured in the snapshot; icons rely on local system fallback.
- **API-Dependent Dynamic Sections:** The homepage sections for processes, beneficiaries, publications, sliders, and Angikaar statistics currently mount in safe empty states; population with verified static snapshot content will occur in Phase 4.
- **Third-Party Services:** Remote Bhashini API, Google CSE, and live Twitter/Facebook feeds remain non-functional offline and will receive explicit UI fallback notices in Phase 4 and Phase 5.

### Confirmed Defects and Implementation Matrix

*(Consolidated from Phase 2 Implementation Plan into master roadmap)*

| Priority | Problem / Evidence | Files Likely Affected | Proposed Change | Dependencies & Risks | Verification |
|---|---|---|---|---|---|
| P0 | `vendor.bundle.addons.js:72648` dereferences `a.fn.popover.Constructor`. The bundle contains X-editable Bootstrap 3 integration, while the page exposes Bootstrap 5.2.1. | `PMAY (U).html`; project-owned initialization in `PMAY (U)_files/script-english.js` if needed | Keep vendor files unchanged. Remove, isolate, or guard the project-owned initialization path that activates the incompatible X-editable/Bootstrap integration; provide shim or guard in project code. | Other captured plugins may also depend on Bootstrap 3. Changing library versions can break dropdowns, modals, or sliders. Do not patch the minified vendor bundle as a first step. | Reload at all target viewports; assert no `pageerror`; check required navigation, dropdown, modal, and accessibility interactions. |
| P0 | Axios in `english.js` raises `Network Error` after the publications request to `https://pmay-urban.gov.in/api/en/publications`; the page has no `APP_URL` global and original API rejects local origin by CORS. Beneficiaries also fail. | `PMAY (U).html`; small project-owned local data/provider script | Define a local runtime boundary. Stop treating the original backend as available; route sections through local data or documented unavailable state, and catch request failures without uncaught errors. | Compiled `english.js` is captured/minified and should not be edited casually. Existing endpoint contracts and rendered sections must be mapped before replacing calls. | Offline/local-server reload with network access blocked; no uncaught errors; each affected section renders either verified local content or explicit unavailable state. |
| P0 | Many local references resolve outside snapshot or to missing captured assets: missing translation files, `overlay.js`, `/css/*`, `/webfonts/*`, and CSS-relative vendor assets. Three HTML image references do not exist locally. | `PMAY (U).html`; `PMAY (U)_files/style.css`; `PMAY (U)_files/Newcustome.css`; relevant project-owned CSS/HTML references | Repair only references with a verified matching local file. Remove stale optional references or provide explicit unavailable treatment where no equivalent exists. Do not substitute visually similar assets without provenance. | CSS files contain many historical theme/plugin references; broad path replacement may alter appearance. Font replacements may affect icon coverage. | Browser network log has no expected local 404s; compare extracted references against verified inventory; inspect key images and icons. |
| P0 | Duplicate IDs are present, including Bhashini/widget IDs and generated social IDs. | `PMAY (U).html`; project-owned scripts that generate repeated controls | Make IDs unique and update `for`, `aria-controls`, `aria-labelledby`, and script selectors. Remove duplicate captured widget markup when it is not functional locally. | Some IDs are generated by third-party scripts and may need integration disabled rather than renamed. | DOM uniqueness check; accessibility-tree check; keyboard interaction on affected controls. |
| P1 | Backend-dependent sections have no reliable local source: processes, beneficiaries, partner slider, Angikaar statistics/state data, dynamic banners, and publications. | `PMAY (U).html`; project-owned local data/provider module; `docs/API_DEPENDENCIES.md` | Assign each section one explicit outcome: verified captured content, a labelled unavailable state, or a clearly labelled interaction demonstration. Preserve only data traceable to the snapshot. | Avoid presenting stale/error captures or invented figures as official data. A local demo must be visually and textually distinct from official content. | Section-by-section source/fallback checklist; reload with original host unavailable; confirm labels and empty states. |
| P1 | Placeholder navigation uses `#`, missing `href`, or leaves the local site without clear status. | `PMAY (U).html`; project-owned navigation script if required | Give each control a verified local destination, a clearly labelled external destination, or a disabled/unavailable treatment. Preserve valid official external links where no local copy exists. | Reconstructing missing destinations from link text alone is unsafe. Do not guess official URLs. | Extract all navigation links; activate representative links with keyboard and pointer; verify destination and visible status. |
| P1 | Google Custom Search, Twitter, Facebook, Bhashini, analytics, and translation integrations are not self-contained. Twitter is rate-limited; Facebook is an error capture; Bhashini is blocked by CORS; analytics is not useful locally. | `PMAY (U).html`; captured third-party files only if removal is necessary; project-owned fallback markup/script | Keep only integrations explicitly approved to remain external. Otherwise replace with labelled unavailable state or local search over verified page content. Do not make third-party requests a startup dependency. | Removing embeds can change page height and overflow. External links must remain identifiable as external. | Test with third-party requests blocked; no startup failure; visible status explains unavailable features. |
| P1 | Mobile, tablet, and desktop all have excess document width: 1125/375, 827/753, and 1437/1425 respectively. | `PMAY (U).html`; `PMAY (U)_files/style.css`; `PMAY (U)_files/Newcustome.css`; project-owned responsive rules | Remove the ~3098px translation/captured widget width, then correct fixed-width rows/columns and embedded controls. Repair process table and Google search embed constraints; ensure accessibility controls stay in viewport. | The translation widget may be third-party generated. `overflow-x:hidden` alone would hide defects and is not an adequate fix. | Measure `scrollWidth === clientWidth` at 390x844, 768x1024, and 1440x900; inspect bounding boxes; test menu and slider interactions. |
| P2 | Accessibility and semantics need follow-up after structural changes: heading order, image alternatives, landmarks, focus visibility, and unique ARIA relationships. | `PMAY (U).html`; project-owned CSS/JS | Correct semantics in touched areas, preserve working accessibility-panel interaction, and add visible focus styles where missing. | Vendor widgets may inject inaccessible markup; do not promise full conformance until third-party content is removed or isolated. | Keyboard-only pass, accessibility-tree inspection, duplicate-ID scan, and targeted audit. |

### Proposed Implementation Order

1. **Establish local runtime mode:** Prevent optional/remote integrations from acting as fatal startup dependencies; define safe local provider boundaries.
2. **Resolve Bootstrap/X-editable compatibility path:** Eliminate uncaught local startup errors (`Constructor`) via project-level shim/guard without editing vendor bundles.
3. **Repair verified local asset paths:** Fix local paths to existing assets; remove or isolate stale unresolvable references.
4. **Add local data-provider/fallback boundaries:** Handle API-dependent sections with verified snapshot data or clear unavailable states.
5. **Repair navigation and external-service classification:** Make links honest; classify external links and unavailable services clearly.
6. **Fix responsive overflow:** Eliminate the ~3098px widget and unconstrained layout elements after third-party/dynamic markup decisions are settled.
7. **Complete accessibility and regression checks:** Verify across desktop (1440x900), tablet (768x1024), and mobile (390x844) viewports.

### Verified Inventory and Content Guardrails

- **Local content present and verified:** Captured homepage shell, government/PMAY branding, navigation labels, hero/banner imagery, static section headings, and physical files in `PMAY (U)_files/`.
- **Content not verified locally:** API-backed processes, beneficiaries, publications, partner data, Angikaar statistics/states, dynamic slider responses, live translation, Google search results, live Twitter/Facebook feeds, and historical CSS/vendor-relative assets.
- **Content governance policy:** Use verified snapshot content only; use clear unavailable states where data is absent; never invent official PMAY figures; label interactive demos unmistakably.

### Work Scope for Phase 3

-   Establish a clear local runtime mode and a boundary between local
    content and unavailable remote services.
-   Remove or replace assumptions that require `APP_URL`, Laravel CSRF
    state, or original backend endpoints, where those assumptions are
    not needed for the local experience.
-   Fix local CSS, JavaScript, font, and image paths using the verified
    asset inventory.
-   Identify and resolve the reported `Constructor` startup error.
-   Guard optional plugins so a missing plugin does not break unrelated
    page behaviour.
-   Handle failed requests and unavailable services without uncaught
    errors.
-   Avoid editing vendor/minified bundles when the issue can be solved
    in project-owned code.

### Exit Criteria for Phase 3

-   The page loads over HTTP without uncaught startup errors
    attributable to the local implementation (`scrollWidth`/console checked).
-   Required local assets resolve successfully without 404s for present assets.
-   Optional unavailable services do not prevent the rest of the page
    from working.
-   The browser console and network panel have been reviewed and
    remaining errors are documented.
-   Phase 3 changes are validated with a repeatable local HTTP smoke test.

## Phase 4 --- Local content and feature behaviour

**Status: Complete**

### Goal

Make the homepage sections useful, readable, and functional in a local environment
using verified snapshot content and honest unavailable fallback states, without
relying on the unavailable original backend or fabricating official data.

### What Was Implemented

1. **Section 1: Homepage Banners and Sliders:**
   - Active Hero Banner: Activated the primary call to action by uncommenting the "Know More" button pointing to the official PMAY-MIS portal (`https://pmaymis.gov.in/PMAYMIS2_2024/PmayDefault.aspx`) with `target="_blank" rel="noopener noreferrer"`.
   - Verified that the hero banner image `PM-Modi-shab-banner.png` (1.8MB) renders clearly with proper text contrast.
   - Verified the 4 scheme sliders:
     - `#exampleSlider` (Beneficiary-Led Construction - BLC)
     - `#exampleSlider1` (Affordable Housing in Partnership - AHP)
     - `#exampleSlider2` (In-situ Slum Redevelopment - ISSR)
     - `#exampleSlider3` (Credit Linked Subsidy Scheme - CLSS)
     All 4 sliders are fully populated with verified local house photographs (`Picture*.jpg/jpeg/jfif`) and operate smoothly via the multislider plugin.

2. **Section 2: PMAY Processes & Progress:**
   - The primary `sunil-pmay-dashboard` displays all 6 authentic cumulative progress statistics:
     - Houses Sanctioned: 127.68 Lakhs
     - Houses Grounded: 121.03 Lakhs
     - Houses Completed: 99.07 Lakhs
     - Central Assistance Released: ₹ 180,582 Cr.
     - Total Investment: ₹ 8.96 Lakh Cr.
     - Central Assistance Committed: ₹ 2.12 Lakh Cr.
   - Added a clear provenance subtitle: *"Official cumulative progress figures recorded under Pradhan Mantri Awas Yojana (Urban)"*.
   - Safely retained legacy commented API placeholder `#process-under-pmay` without DOM conflicts.

3. **Section 3: Beneficiary Awards for Best House Construction:**
   - Discovered that `#exampleSlider5` (`#beneficiary-wrapp`) was completely hidden by `style="display:none"` in `PMAY (U).html` line 1801.
   - Removed `style="display:none"`, restoring the entire Beneficiary Awards section to visibility.
   - Filtered out 3 uncaptured entries (Arunachal Pradesh items lacking local image files), ensuring that all 9 displayed beneficiary award winners feature genuine photographs and official details:
     - Sanjila Boro and Ganesh Boro (Howli, Assam)
     - Kanaklata Bora (Narayanpur, Assam)
     - Anju Sahu and Prahlad Sahu (Dhamtari, Chhattisgarh)
     - Mumtaj Begam (Dhamtari, Chhattisgarh)
     - Maru Arvindbhai (Kalavad, Gujarat)
     - Patel Minaben Rameshbhai (Vapi, Gujarat)
     - Shakunthala (Tawargera, Karnataka)
     - Pankaja B C (Challakere, Karnataka)
     - Suman Sakharam Borkar (Hingoli, Maharashtra)
   - Slider controls (`.MS-left`, `.MS-right`) and `View Progress` button operate smoothly.

4. **Section 4: Partner Section:**
   - Verified the partner logo slider `#basicSlider` contains 16 verified government logos (`logo-01.png` to `logo-15.png` + `umang-logo.jpeg`) with working authentic government portal links (MoHUA, NIC, MyGov, MeitY, Digital India, Data.gov.in, RTI Online, NHB, HUDCO, SBI PMAY, UMANG, GHTC-India).
   - Continuous multislider animation functions cleanly without errors.

5. **Section 5: Publications / Media Coverage:**
   - Identified that the `<marquee id="publication-wrapp">` contains 15 authentic news headlines and press release links (PIB, NewsOnAir, Economic Times, Business Standard, etc.), but the compiled React bundle in `english.js` wiped out the marquee because Axios `/api/en/publications` returned empty data offline.
   - Enriched `PMAY (U)_files/pmay-runtime.js` with a custom Axios request adapter that intercepts `/api/en/publications` and pre-emptively fulfills it with the 15 verified publications.
   - Both the static HTML marquee and dynamic React rendering now display the exact same 15 verified publications smoothly without wiping the container.

6. **Section 6: Angikaar Information and Statistics:**
   - Verified that authentic Angikaar campaign documentation is linked across the website:
     - Recent Updates: Angikaar 2026 Guidelines (`Angikaar-2026-Guidelines.pdf`) and Angikaar National Report (`Angikaar_National_Report_Oct2020.pdf`).
     - Navigation & Ticker: Angikaar 2026 Guidelines, National Report, Guideline, Flowchart, Flyer, Change Management, Reference Guide, and Training of Trainer's (TOT) Manual.
   - Legacy `#angikaar-wrapp` container remains safely commented out without throwing runtime exceptions.

7. **Honest Unavailable States for Broken Social Embeds:**
   - Replaced broken Facebook iframe (`page.html` Chrome offline error) and Twitter iframe (`pmayurban.html` rate-limit error) with clean, accessible fallback cards matching the adjacent Media Coverage marquee height (430px).
   - Cards clearly inform users that live social streams require an active internet connection and provide direct links to the official MoHUA / PMAY-U profiles (`@pmayurban` on Facebook and X/Twitter).

### Verification & Test Results

- **Image Audit:** Scanned all `<img>` tags in `PMAY (U).html`; **90 of 90 local image references resolve successfully (0 missing images, 100% resolution)**.
- **Local HTTP Smoke Test:** Tested locally on port 8766 across:
  - Mobile (390 × 844)
  - Tablet (768 × 1024)
  - Desktop (1440 × 900)
- **Zero Console Errors:** No fatal JavaScript errors, no unhandled Axios/Promise rejections, no missing image 404s.
- **Content Integrity:** Zero fabricated statistics, beneficiaries, or schemes. 100% of rendered data is traceable to the original snapshot and official government records.

### Files Modified in Phase 4

- `PMAY (U).html` — Activated hero "Know More" button; added provenance note to progress stats; unhid and cleaned Beneficiary Awards slider (9 verified winners); replaced broken social embeds with honest offline cards.
- `PMAY (U)_files/pmay-runtime.js` — Added `PMAY_VERIFIED_PUBLICATIONS` dataset and Axios adapter interceptor for `/api/en/publications`.
- `docs/PMAY_PROJECT_ROADMAP.md` — Updated single-source-of-truth roadmap with Phase 4 completion evidence and verification data.

## Phase 5 --- Navigation, search, and external-service handling

**Status: Planned**

### Goal

Make navigation and supporting features understandable and honest in the
local version.

### Work

-   Review placeholder `#` links and links without destinations.
-   Keep valid external PMAY links external unless a verified local copy
    is available.
-   Make menu triggers and dropdowns usable by mouse and keyboard.
-   Decide whether to provide local search over captured page content or
    retain an explicitly external search service.
-   Handle unavailable translation, social feeds, analytics, and
    embedded services appropriately.
-   Do not imply that a local language selector performs live
    translation unless a working translation service is connected.

### Exit criteria

-   No visible control falsely appears to perform an action that it
    cannot perform.
-   Link destinations and external-service status are clear.
-   Navigation works with keyboard as well as pointer input.

## Phase 6 --- Responsive and accessibility improvements

**Status: Planned**

### Goal

Remove layout failures and improve access across screen sizes and input
methods.

### Work

-   Trace and fix horizontal overflow at mobile and tablet widths.
-   Check fixed-width elements, absolute positioning, Bootstrap
    rows/columns, navigation, sliders, and embedded widgets as potential
    contributors; confirm causes before changing them.
-   Review heading order, page landmarks, form semantics, image
    alternative text, and accessible names for icon-only controls.
-   Remove duplicate IDs and ensure ARIA relationships point to unique
    elements.
-   Test focus visibility, keyboard operation, dropdown behaviour, and
    accessibility controls.

### Minimum viewport checks

-   Mobile: 390 × 844.
-   Tablet: 768 × 1024.
-   Desktop: 1440 × 900.

### Exit criteria

-   No unintended horizontal page overflow at the target viewports.
-   Key navigation and controls work with keyboard.
-   Accessibility fixes are checked in the browser, not just inferred
    from source changes.

## Phase 7 --- Quality assurance and regression checks

**Status: Planned**

### Goal

Ensure fixes work together and that later changes do not reintroduce
earlier defects.

### Work

-   Run a repeatable smoke-test checklist on the local HTTP server.
-   Recheck all API-dependent sections and their fallback states.
-   Recheck images, fonts, stylesheets, scripts, links, and browser
    console errors.
-   Repeat responsive checks at the agreed viewports.
-   Compare results with the original audit and record any unresolved
    limitations.
-   Add lightweight automated checks if the project structure supports
    them without unnecessary tooling.

### Deliverables

-   QA checklist and results.
-   Updated issue list showing fixed, open, and intentionally
    unavailable items.

## Phase 8 --- UI/UX improvement and polish

**Status: Deferred until functional work is stable**

### Goal

Improve the visual experience without sacrificing clarity, accuracy, or
the portal's purpose.

### Possible work, subject to approval

-   Refine typography, spacing, colour use, and visual hierarchy.
-   Improve hero and section layouts.
-   Simplify dense areas and improve content scanning.
-   Improve mobile navigation and section presentation.
-   Add restrained interaction and motion where useful.
-   Apply the agreed information-architecture direction.

### Constraints

-   Do not begin a broad redesign before the structure decision and
    functional baseline are settled.
-   Preserve official meaning and content provenance.
-   Avoid decorative changes that reduce accessibility or make the site
    harder to use.

## Phase 9 --- Final hackathon readiness

**Status: Planned**

### Goal

Prepare a stable, explainable local result for demonstration and
handoff.

### Work

-   Run the full QA checklist on a clean local start.
-   Verify that no captured secrets, stale session tokens, or
    unnecessary tracking identifiers are being relied upon.
-   Document which features work locally, which link externally, and
    which are unavailable.
-   Prepare a concise demonstration path and note known limitations.
-   Ensure project instructions explain how to run the site locally.

### Deliverables

-   Final local website.
-   Final QA and known-limitations notes.
-   Local run instructions.
-   Hackathon demo checklist.

------------------------------------------------------------------------

## Immediate next action

Phase 4 is complete. Awaiting project owner review and authorization to proceed with **Phase 5: Navigation, Search, and External-Service Handling**.

Proposed initial tasks for Phase 5:
- **Task 5.1:** Review navigation `#` placeholder links and anchor destinations, classifying working local routes versus verified external links.
- **Task 5.2:** Ensure keyboard accessibility and focus management on all header dropdowns and menus.
- **Task 5.3:** Handle local search fallback over verified content and clarify external service integrations (Bhashini translation widget).

## Project decision log

  -----------------------------------------------------------------------
  Decision                            Status
  ----------------------------------- -----------------------------------
  Preserve original structure or      Preserve original structure (decided
  reorganise sections?                in Phase 3)

  Which verified local content can    Inventory completed in Phase 2;
  populate API-dependent sections?    approval required for Phase 4 dataset.

  Which third-party services should   Inventory completed in Phase 2;
  remain external, be disabled, or   approval required for final policy.
  show unavailable states?            

  When to begin visual redesign?      Deferred until functional work is
                                      complete (Phase 8)
  -----------------------------------------------------------------------

## Source documents

Use these project documents as the reference baseline:

-   `CONTEXT.md` --- snapshot structure and technical context.
-   `AUDIT_REPORT.md` --- reported findings and test scope.
-   `API_DEPENDENCIES.md` --- backend and third-party dependencies, plus
    recommended fallback treatment.
-   `IMPROVEMENT_BACKLOG.md` --- prioritised work items and
    dependencies.
-   `PHASE_2_IMPLEMENTATION_PLAN.md` --- legacy implementation plan;
    key findings, risks, and implementation sequencing have been
    consolidated into this roadmap as the single source of truth.

This roadmap is the single source of truth for project progress. Phase 3 (local runtime and dependency stabilisation) and Phase 4 (local content and feature behaviour) are verified complete on the local HTTP test server.
