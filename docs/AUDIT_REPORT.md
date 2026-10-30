# PMAY-U Local Snapshot Audit

## Executive Summary

The snapshot is not self-contained. `PMAY (U).html` is a large captured production page whose markup, styles, and scripts assume the original PMAY host, Laravel globals, backend APIs, remote documents, and third-party services. The page can be served locally, but it does not behave as a reliable offline website without replacing API-driven sections and repairing local asset paths.

The highest-impact findings are:

- **Critical:** Mobile layout has severe horizontal overflow: at 390px viewport width, runtime `scrollWidth` was 1125px against `clientWidth` 375px.
- **Critical:** The page throws runtime errors while loading locally, including `TypeError: Cannot read properties of undefined (reading 'Constructor')` and `Error: Network Error`.
- **High:** Several required local resources are missing because CSS imports point to nonexistent `/css/` and `/webfonts/` paths.
- **High:** Homepage data depends on unavailable `APP_URL` APIs and remote PMAY endpoints, so dynamic content cannot be trusted locally.
- **High:** Duplicate IDs exist for translation widgets, navigation dropdowns, and generated third-party markup, making selectors and accessibility relationships ambiguous.
- **High:** The captured Twitter timeline is already a `Rate limit exceeded` response, and the Facebook capture is a Chrome error page.

### Verification scope

- Code inspection: completed for the entry HTML, relevant CSS, `script-english.js`, `english.js`, translation scripts, and captured widget files.
- Runtime inspection: completed by serving the directory with Python `http.server` on localhost and loading the page in a browser.
- Viewports tested: 1440x900 desktop, 768x1024 tablet, and 390x844 mobile.
- No backend was recreated or contacted intentionally beyond the page's own existing requests.
- Vendor and website files were not modified during this audit.

## Findings

### A. Functional Issues

| ID | Severity | Finding | Evidence / reproduction | Expected vs actual | Suggested fix |
|---|---|---|---|---|---|
| F-01 | Critical | Local load produces JavaScript errors | Runtime page errors: `TypeError: Cannot read properties of undefined (reading 'Constructor')`; `Error: Network Error`. Reproduce by serving the directory and opening `PMAY (U).html`. | Expected: page initializes without uncaught errors. Actual: missing/incompatible dependencies and failed network calls interrupt initialization. | Establish a local dependency manifest/order, guard optional plugins, and replace API calls with local adapters or explicit unavailable states. |
| F-02 | High | API-driven sections do not work offline | `script-english.js` calls `APP_URL + /api/en/processes`, `/api/en/beneficiaries`, `/getpartnerslider`, and `/angikaarapi`; `english.js` calls `/api/en/states`, `/api/en/sliders`, and `/api/en/publications`. | Expected: process, beneficiary, partner, statistics, states, slider, and publications sections populate. Actual: requests fail or return nothing without the original backend. | Add local static datasets only where source data is available; otherwise render clearly labeled unavailable/empty states. Do not invent government values. |
| F-03 | High | Search is not a self-contained form | The Google Custom Search form in `#___gcse_0` has no normal form action and relies on captured Google CSE scripts and remote services. | Expected: search works locally or clearly reports unavailable. Actual: local page depends on Google CSE runtime/network behavior. | Keep it as an explicitly external feature or provide a local search over captured page content. |
| F-04 | High | Twitter timeline is unavailable | `PMAY (U)_files/pmayurban.html` contains the literal response `Rate limit exceeded`; timeline scripts target `syndication.twitter.com` and `platform.twitter.com`. | Expected: Twitter updates render. Actual: the snapshot contains an error response and runtime requests are blocked/failed. | Replace with an explicitly unavailable social-feed panel or a locally captured, dated feed only if legally and operationally appropriate. |
| F-05 | High | Facebook embed is not functional | `PMAY (U)_files/page.html` is a saved `chrome-error://chromewebdata/` page titled `www.facebook.com`; `sdk.js` loads Facebook remotely. | Expected: Facebook updates render. Actual: only a browser error capture is available. | Mark the feed unavailable locally or replace it with a non-live link to the official page. |
| F-06 | Medium | Optional sliders/plugins can fail silently | `script-english.js` invokes `lightSlider`, `pwstabs`, `fancybox`, `isotope`, `magnificPopup`, `lightGallery`, and `multislider` conditionally, but the captured page has missing imported CSS and unclear plugin load order. | Expected: every initialized component renders and is interactive. Actual: a missing plugin can cause a runtime exception or an unstyled component. | Add dependency checks and explicit empty/error states around each optional component. |
| F-07 | Medium | Many navigation controls are placeholders | Runtime inspection found numerous links with `href="https://pmay-urban.gov.in/#"` and one navigation item with no `href`, including PMAY(Urban) dropdown roots, Progress roots, IEC roots, Gallery, awards, and other menus. | Expected: menu headings either open a submenu or navigate to a meaningful local page. Actual: several click targets only jump to the top/fragment or do nothing. | Convert menu roots to proper buttons with submenu behavior, or retain them as non-link labels with accessible keyboard handling. |
| F-08 | Medium | Login/top utility link is a placeholder | The top utility login icon links to `https://pmay-urban.gov.in/#`. | Expected: login opens a valid destination. Actual: it is a dead fragment link in the snapshot. | Keep as an explicit unavailable external action or point to a verified local placeholder page. |
| F-09 | Medium | API failures have no user-facing fallback | AJAX success handlers update content only when `data` is truthy; there are no `error` callbacks or loading/empty messages. Axios calls similarly have no visible failure UI. | Expected: users understand why content is unavailable. Actual: sections can remain blank with no explanation. | Add visible, non-misleading unavailable states and log technical details separately. |

### B. Content and Asset Issues

| ID | Severity | Finding | Evidence / reproduction | Suggested fix |
|---|---|---|---|---|
| C-01 | High | Broken local image paths | Runtime found broken images such as `./PMAY (U)_files/Picture9.jpeg`, `Picture10.jpeg`, `Picture1.jpeg`, `Picture2.jpg`, and `http://127.0.0.1:8765/v3/bhashini-logo.png`; the folder contains different extensions/names for several captured pictures. | Inventory every `src`/`srcset`, map references to existing files, and add an explicit missing-media state where no asset exists. |
| C-02 | High | Bhashini assets resolve to the wrong local path | The captured markup references `./PMAY (U)_files/feedback.svg` and `./PMAY (U)_files/bhashini-logo.png`, while the runtime-generated widget requested `/v3/feedback.svg` and `/v3/bhashini-logo.png`. | Keep one local widget path or disable the remote-generated widget and use the captured local markup. |
| C-03 | High | Captured external content is stale or error content | `pmayurban.html` is rate-limit text; `page.html` is a Chrome error page; `saved_resource`/`f.txt` and other browser resources are not reliable content sources. | Exclude error captures from visible content and replace with clearly labeled unavailable states. |
| C-04 | Medium | Duplicate markup and repeated widget content | HTML includes repeated translation containers and repeated inline CSS; runtime duplicate IDs include `bhashini-translation`, `bhashiniLanguageDropdown`, `navbarDropdownMenuLink`, and generated widget IDs. | Remove duplication only in a later implementation phase after determining which instance is authoritative. |
| C-05 | Medium | No clear local provenance for dynamic content | The page mixes saved production markup with live URLs, compiled bundles, generated browser-extension markup, and assets from different capture moments. | Add a local snapshot date/source manifest during hardening. |
| C-06 | Low | Captured page contains legacy/commented sections and duplicated includes | Inline comments and repeated Bootstrap, Font Awesome, translation, and Google markup make content ownership unclear. | Do not refactor during audit; document and isolate in the implementation phase. |

### C. Technical Issues

| ID | Severity | Finding | Evidence / reproduction | Suggested fix |
|---|---|---|---|---|
| T-01 | High | Missing CSS imports | `PMAY (U)_files/style.css` imports `../css/font-awesome.min.css`, `bootsnav.css`, `fancyBox.css`, `animate.css`, `flaticon.css`, `magnific-popup.css`, and `owl.css`, but the captured directory has no sibling `css/` folder. | Copy only verified required local dependencies into a deliberate local asset structure or remove unused imports in a later phase. |
| T-02 | High | Missing Font Awesome font files | Runtime failed requests for `/webfonts/fa-regular-400.woff2`, `/webfonts/fa-brands-400.woff2`, and related TTF files because `all.min.css` expects `../webfonts/`. | Place verified font files under the expected local path or change the local stylesheet path consistently. |
| T-03 | High | Duplicate/conflicting library versions | HTML loads both `bootstrap.min.css` and `bootstrap(1).min.css`, multiple translation CSS files, duplicate Font Awesome includes, jQuery slim plus other compiled libraries, and several vendor bundles. | Define one controlled dependency set and remove only after verifying usage. |
| T-04 | High | Original hosting globals are missing locally | `script-english.js` and `english.js` assume global `APP_URL`; API code also assumes a Laravel CSRF token and same-origin backend. | Replace these assumptions with a local data-provider interface and no-op/error handling. |
| T-05 | High | External integrations are not isolated | The page loads Google CSE/Analytics, Bhashini, Facebook, X/Twitter, live PMAY pages/PDFs, and remote fonts. | Add an explicit external-integration boundary and local fallback policy. |
| T-06 | Medium | Relative-path behavior differs by file location | `style.css` imports paths relative to `PMAY (U)_files/`, while the captured CSS dependencies are not laid out under those paths. | Serve and validate from the directory root, then repair paths in a later implementation task. |
| T-07 | Medium | Local browser request volume is noisy and fragile | Runtime recorded many 404s, failed remote requests, CORS errors, analytics requests, and widget requests. | Classify requests as required local, optional external, or unsupported; remove unsupported requests only during the implementation phase. |
| T-08 | Low | Sensitive captured values remain in source | HTML includes a CSRF token and analytics identifiers from the source capture. | Treat snapshot as sensitive; rotate/remove values before public deployment. |

### D. Accessibility Issues

| ID | Severity | Finding | Evidence / reproduction | Suggested fix |
|---|---|---|---|---|
| A-01 | High | Duplicate IDs break accessible relationships | `aria-controls="bhashiniLanguageDropdown"` points to duplicated elements; `navbarDropdownMenuLink` is reused for multiple menus. | Make every ID unique and ensure each control references its own panel. |
| A-02 | High | Accessibility widget behavior is not fully local | The trigger opens locally (`#a11yPanel` changed to `aria-hidden="false"` in runtime), but translation/accessibility behavior depends on external or missing scripts and generated markup. | Test each control individually and provide local implementations or explicit unavailable status. |
| A-03 | Medium | Some icon-only controls have weak/ambiguous targets | The login icon and menu controls are icon-only; some links point to `#` and several images/inline SVGs rely on surrounding context. | Ensure every icon-only control has a unique accessible name and a meaningful action. |
| A-04 | Medium | Heading hierarchy is inconsistent | Runtime heading sequence includes H1, H3, H2, H4, and repeated injected H2 `Rate this translation` headings. | Establish one page H1 and section heading levels during functional cleanup. |
| A-05 | Medium | Navigation roots use anchors as buttons | Many submenu parents use `href` fragments or no `href`, while behavior relies on Bootstrap dropdown scripting. | Use semantic buttons for expandable menus, with `aria-expanded` and keyboard support. |
| A-06 | Medium | Image alternative text is inconsistent | Some dynamic React images set `alt`, but the captured page has many images without visible verified alternatives; broken images are also exposed. | Audit all images and provide meaningful alt text or empty alt for decorative images. |
| A-07 | Low | Search form semantics are incomplete locally | The Google CSE form has a text input and submit button but no local action or clear fallback state. | Add a labeled local search or an explicit external-service notice. |

### E. Responsive Issues

| ID | Severity | Finding | Evidence / reproduction | Expected vs actual | Suggested fix |
|---|---|---|---|---|---|
| R-01 | Critical | Severe mobile horizontal overflow | At 390x844: `scrollWidth=1125`, `clientWidth=375`. | Expected: page fits viewport or has intentional contained scrolling. Actual: much of the page extends off-screen. | Locate fixed-width/header/hero/widget rules and add responsive constraints in a later implementation phase. |
| R-02 | High | Tablet overflow | At 768x1024: `scrollWidth=827`, `clientWidth=753`. | Expected: no page-level overflow. Actual: 74px overflow. | Audit fixed widths, Bootstrap grid nesting, nav, sliders, and embedded widgets. |
| R-03 | Medium | Desktop also has small overflow | At 1440x900: `scrollWidth=1437`, `clientWidth=1425`. | Expected: page width matches viewport. Actual: 12px overflow, likely scrollbar/width or fixed element interaction. | Identify the element causing overflow with a layout audit. |
| R-04 | High | Mobile navigation is not proven functional offline | At mobile width, the collapse container is hidden before interaction; the page contains Bootstrap toggler markup, but runtime also reports dependency errors. | Expected: toggler opens/closes the menu. Actual: not reliable while the dependency chain is failing. | Test after dependency repair and verify keyboard/focus behavior. |
| R-05 | Medium | Fixed/absolute hero positioning is fragile | `Newcustome-1.css` positions `.sunil-pmay-content` with percentage `left`, fixed responsive font sizes, and absolute layout. | Expected: readable content across widths. Actual: likely contributes to clipping/overflow; runtime confirms page-level overflow but not the sole cause. | Replace with constrained flow layout in a future UI phase; this audit does not redesign it. |

## API and External Dependency Classification

See `API_DEPENDENCIES.md` for the complete feature inventory. In summary, the page requires local replacements for homepage data APIs, while live government navigation/PDF links and social/translation integrations need explicit unavailable states or controlled external links.

## Recommended Direction

The correct next phase is functional hardening, not visual redesign:

1. Define a local data-provider layer and load only verified captured data.
2. Repair local CSS/font/image paths and remove duplicate IDs.
3. Guard optional plugins and remove runtime exceptions caused by unavailable services.
4. Add explicit empty/unavailable states for every API or social feed.
5. Re-test desktop, tablet, mobile, keyboard navigation, and network behavior.
6. Only after the page is self-contained should UI improvements be considered.
