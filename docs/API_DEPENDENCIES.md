# API and External Dependency Inventory

This inventory is based on code inspection and localhost runtime testing. No original PMAY backend is available, so no backend behavior is assumed or recreated.

## Local Backend/API Calls

| Feature | Existing implementation | Required dependency | Without dependency | Local replacement | Recommendation |
|---|---|---|---|---|---|
| PMAY processes section | `script-english.js`: `#process_under_pmay` | `APP_URL + /api/en/processes` | Container stays empty; no error UI | Static local HTML only if the captured content is verified; otherwise an unavailable panel | Replace with local provider and explicit provenance |
| Beneficiary section | `script-english.js`: `#beneficiary-wrapp` | `APP_URL + /api/en/beneficiaries` | Container stays empty | Static verified capture or unavailable state | Replace with local provider; do not invent beneficiary data |
| Partner slider | `script-english.js`: `#partner_slider` | `APP_URL + /getpartnerslider` | Slider remains empty | Static verified partner list/cards if available | Static data is reasonable only with source verification |
| Angikaar statistics | `script-english.js`: `#count1` through `#count12` | `APP_URL + /angikaarapi`; response must be `*`-delimited | Counters remain blank; malformed response can produce undefined values | Static values only from a dated, verified capture; otherwise unavailable labels | Do not fabricate numbers |
| Angikaar states | `english.js` React component mounted at `#angikaar-wrapp` | Axios request to `APP_URL + /api/en/states` | State cards do not render; Axios rejects with network error | Static state list only if present in captured HTML/assets; otherwise unavailable state | Replace with local JSON/data module later |
| Homepage sliders | `english.js` React component mounted at `#banner-wrapp` | Axios request to `APP_URL + /api/en/sliders` | Carousel has no dynamic slides | Use existing local images only when their identity/content is verified; otherwise a clearly labeled unavailable carousel | Prefer static local content over a mock government claim |
| Publications | `english.js` React component mounted at `#publication-wrapp` | Axios request to `APP_URL + /api/en/publications` | Publication list is empty; runtime showed network failure | Use only captured publication links/data; otherwise unavailable state | Static data opportunity if content is already in the snapshot |
| CSRF-protected requests | `script-english.js` AJAX setup and Axios bundle | Captured `meta[name="csrf-token"]` plus original server session | Requests cannot be authenticated meaningfully against localhost | Not needed for read-only local static data | Remove from local runtime in a future hardening phase; do not reuse captured token |

## External Service Dependencies

| Feature | Existing implementation | Required dependency | Without dependency | Local replacement | Recommendation |
|---|---|---|---|---|---|
| Bhashini translation | `website_translation_utility.js`, `bhasni.js`, injected hosted script | Bhashini translation API/plugin and CORS permission | Language menu may render but translation/domain detection fails; runtime saw CORS failure for hosted script | Static language selector cannot translate; mock translation would be misleading | Keep as explicitly unavailable or provide a clearly labeled demo-only mock |
| Bhashini language assets | Widget-generated `/v3/feedback.svg` and `/v3/bhashini-logo.png` paths | Original Bhashini host/path layout | Local 404s and broken images | Use captured local `feedback.svg`/`bhashini-logo.png` if the widget is made local | Repair path only in a later implementation task |
| Google Custom Search | `#___gcse_0`, `cse_element__en.js`, Google CSE styles | Google CSE scripts/service and network | Search UI may be present but results/autocomplete fail | Local client-side search over captured text is feasible | Either implement local search or label as external-only |
| Analytics | Inline `gtag` and captured Tag Manager resources | Google Analytics/Tag Manager endpoints | Analytics requests fail; page content should still work | No local replacement needed | Disable in a self-contained build; never treat analytics failure as user-facing error |
| X/Twitter timeline | `widgets.js`, `timeline...js`, widget iframe, `pmayurban.html` | X/Twitter syndication/platform services | Timeline fails; saved response says `Rate limit exceeded` | A dated local capture could be shown only with provenance; no live feed mock | Use unavailable state or external link |
| Facebook updates | `sdk.js`, `page.html` | Facebook SDK and Facebook content | Saved subframe is a Chrome error page; live integration unavailable | External link only | Keep explicitly unavailable locally |
| Live PMAY navigation | Many `href="https://pmay-urban.gov.in/..."` links | Original PMAY website | Link leaves local site and may be unreachable | Static local route placeholders would require content not present | Preserve as external links but label local snapshot limitations |
| Government PDFs/documents | Progress, minutes, notices, and uploaded document links in HTML | Original PMAY host and document paths | Documents open externally or fail offline | Local copies only if actually captured; otherwise external link/unavailable message | Inventory and verify links during implementation |
| Google Fonts | `css2` link and CSS `@import` | Google Fonts network | Font falls back; layout can change | Use captured local font only if present; otherwise system fallback | Treat as optional external dependency |

## Static Data Opportunities

These are safe candidates only when the content is already present in the captured HTML or local assets:

- Navigation labels and hierarchy.
- Visible portal headings and explanatory copy.
- Existing local logos and images after path verification.
- Publication/document links already embedded in the snapshot.
- A static list of external resources, marked as external.
- A local search index built from captured page text.

Do not create government statistics, beneficiary counts, state records, policy notices, or progress values from assumptions. Missing data should be labeled unavailable.

## Interactive Mock Opportunities

A mock is appropriate only for interaction mechanics, not for official content:

- Carousel controls can demonstrate movement using verified local slides.
- Dropdown and accessibility panel open/close behavior can be implemented locally.
- Search can filter captured page text and return a clear `local snapshot` result label.
- API sections can demonstrate loading, empty, and unavailable states without fake records.

## Features That Should Remain Explicitly Unavailable

- Live translation through Bhashini when the service is not bundled.
- Live Twitter/X timeline and analytics.
- Facebook feed/embed.
- Authenticated login or user-specific PMAY services.
- Live PMAY progress and document updates.
- Any data whose source is only an unavailable API.
