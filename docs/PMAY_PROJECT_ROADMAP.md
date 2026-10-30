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

    3\. Local runtime and   Pending Approval        Remove avoidable runtime
  dependency                                      failures and repair local
  stabilisation                                   asset/dependency handling.

  4\. Local content and   Planned                 Make sections behave
  feature behaviour                               honestly without depending
                                                  on the unavailable
                                                  original backend.

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

**Status: Pending Approval**

### Goal

Make the snapshot load consistently as a local website without relying
on missing Laravel/backend globals or fragile third-party
initialisation.

### Work

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

### Exit criteria

-   The page loads over HTTP without uncaught startup errors
    attributable to the local implementation.
-   Required local assets resolve successfully.
-   Optional unavailable services do not prevent the rest of the page
    from working.
-   The browser console and network panel have been reviewed and
    remaining errors are documented.

## Phase 4 --- Local content and feature behaviour

**Status: Planned**

### Goal

Make the homepage sections useful in a local environment without
pretending the original APIs are available.

### Work

-   Implement a small, maintainable local data-provider boundary.
-   Populate sections only with content verified in the supplied
    snapshot or other explicitly approved sources.
-   For sections with no verified local data, show a clear
    unavailable/empty state rather than invented content.
-   Preserve original API-dependent section intent where practical,
    without recreating the original backend.
-   If an interaction demo uses sample data, label it clearly as
    demonstration data and keep it separate from official PMAY
    information.

### Sections identified in the dependency report

-   Processes.
-   Beneficiaries.
-   Partner slider.
-   Angikaar statistics.
-   Angikaar state information.
-   Homepage/banner sliders.
-   Publications.

### Exit criteria

-   Each section has a documented data source and fallback behaviour.
-   No unverified official figures, claims, or records are presented as
    real.
-   Empty or unavailable sections communicate their state clearly.

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

Review `docs/PHASE_2_IMPLEMENTATION_PLAN.md`, choose the information-
architecture direction, and approve the Phase 3 implementation scope. Do
not start website source changes before that approval.

## Project decision log

  -----------------------------------------------------------------------
  Decision                            Status
  ----------------------------------- -----------------------------------
  Preserve original structure or      Open --- decide before structural
  reorganise sections?                changes

    Which verified local content can    Inventory completed in Phase 2;
    populate API-dependent sections?    approval required for final set.

    Which third-party services should   Inventory completed in Phase 2;
    remain external, be disabled, or   approval required for final policy.
    show unavailable states?            

  When to begin visual redesign?      After functional stabilisation and
                                      approval
  -----------------------------------------------------------------------

## Source documents

Use these project documents as the current planning baseline:

-   `CONTEXT.md` --- snapshot structure and technical context.
-   `AUDIT_REPORT.md` --- reported findings and test scope.
-   `API_DEPENDENCIES.md` --- backend and third-party dependencies, plus
    recommended fallback treatment.
-   `IMPROVEMENT_BACKLOG.md` --- prioritised work items and
    dependencies.
-   `PHASE_2_IMPLEMENTATION_PLAN.md` --- verified findings and the
    file-level Phase 3 implementation sequence.

This roadmap organises the work described in those documents. Phase 2
runtime and browser findings were independently verified against the actual
local project; website source files remain read-only pending approval.
