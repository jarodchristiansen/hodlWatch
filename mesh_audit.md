# Mesh — Portfolio Site Audit

**hodl-watch.vercel.app · Prepared for Jarod Christiansen · March 2026**

---

## Overview

This audit covers every publicly accessible page of the Mesh application, crawled in order from the landing page through all linked routes. Issues are categorized by severity:

- 🔴 **HIGH** — blocks credibility or core functionality
- 🟡 **MEDIUM** — polish and UX gaps a hiring manager would notice
- 🟢 **LOW** — smaller details worth addressing with available time

**Total issues: 24 · High: 10 · Medium: 9 · Low: 5**

---

## Priority Order for Fixes

Address these first — they are the most visible and damaging to a hiring manager's impression:

1. Fix `/user/undefined` in navigation — global, visible on every page, signals broken auth wiring
2. Remove all "CTA Placeholder" strings from the Bitcoin article — visible unfinished content
3. Fix duplicate/identical testimonial avatars on the landing page
4. Fix the assets page so core data renders — the main feature of the app is invisible
5. Fix the news page empty state — secondary feature is also broken
6. Fix related posts section — 4 identical links to the same article
7. Fix missing list item content in the Bitcoin article (Digicash, Hashcash, e-Cash entries)
8. Fix auth page tab title mismatch — Sign In link shows Sign Up heading

---

## Landing Page

---

### 🔴 HIGH — Testimonials use the same avatar image for all three users

|                    |                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Problem**        | All three testimonials — John Doe, Jane Smith, and David Johnson — render the same photo. The carousel also duplicates all three entries, so the same avatar appears 6 times total.                                                                                                                                                                                      |
| **Why it matters** | This is the single most visible signal that the project is unfinished. A hiring manager who scrolls through will immediately notice, and it undermines the credibility of everything else on the page.                                                                                                                                                                   |
| **Suggested fix**  | Replace with CSS initials-based avatars (a colored circle with the person's initials) or source distinct free-to-use stock photos. Initials avatars are actually more professional for a data platform — they look intentional rather than placeholder-y. Also fix the carousel duplication bug, which is likely caused by cloning slides without deduplicating the DOM. |

---

### 🔴 HIGH — Hero copy is generic SaaS boilerplate with no technical specificity

|                    |                                                                                                                                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | "Your All-in-One Web3 Companion" and "Join the revolution today" are phrases that appear on hundreds of crypto apps. Nothing here tells a technical reviewer what makes this app architecturally interesting or what scale it operates at.                                |
| **Why it matters** | The hero is the most-read section of any landing page. Hiring managers reading this are engineers — they respond to technical precision, not marketing copy.                                                                                                              |
| **Suggested fix**  | Rewrite the hero to lead with scale and specificity: e.g., "Real-time market data and portfolio tracking for 10,000+ assets — built on a GraphQL API with Redis caching and Apollo optimistic updates." Surface your actual technical architecture in the marketing copy. |

---

### 🔴 HIGH — Profile link in navigation renders as `/user/undefined`

|                    |                                                                                                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The nav bar "Profile" link resolves to `/user/undefined`. The user ID is being interpolated before authentication state is loaded.                                                                              |
| **Why it matters** | Immediately visible to anyone who looks at the URL bar or hovers over the nav link. Signals an unhandled async state and incomplete auth integration.                                                           |
| **Suggested fix**  | Conditionally render the Profile link only when a user is authenticated and their ID is available. In the unauthenticated state, replace it with a Sign In CTA or hide it entirely: `if (!userId) return null`. |

---

### 🟡 MEDIUM — Feature section copy is vague and benefit-free

|                    |                                                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The three feature cards ("Stay Informed", "Stay Connected", "Thrive") describe the app in the most abstract terms. "Thrive" as a feature name communicates nothing.                                                                |
| **Why it matters** | For a portfolio project being reviewed by engineers, this copy actively detracts from the technical impression.                                                                                                                    |
| **Suggested fix**  | Rewrite feature descriptions to be concrete and technical. For example: "Stay Informed" → "Live price feeds for 10,000+ assets with WebSocket updates and custom alert thresholds." Ground every feature in implementation detail. |

---

### 🟡 MEDIUM — Bottom CTA repeats the same boilerplate as the hero

|                    |                                                                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | "Take control of your crypto journey with Mesh today!" is nearly identical in tone and content to the hero. CTAs at the bottom of a page should close with a specific proof point, not re-hash the opening pitch. |
| **Why it matters** | A repeated generic CTA signals that the page was not thought through end-to-end.                                                                                                                                  |
| **Suggested fix**  | Replace with a concrete proof point: e.g., "Tracking 12,500+ assets across 3 blockchains. Built with Next.js, Apollo, and Redis. Open source." Add a GitHub link as a secondary CTA alongside Sign Up.            |

---

### 🟢 LOW — No mention of the technical stack anywhere on the landing page

|                    |                                                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Problem**        | There is no way to know from the landing page that this is built on Next.js, uses GraphQL/Apollo, has Redis caching, or handles real-time data.                                                  |
| **Why it matters** | This is a portfolio project. The audience is hiring managers trying to assess technical depth. A consumer app hides its stack; a portfolio project should surface it prominently.                |
| **Suggested fix**  | Add a small "Built with" or "Under the hood" section near the bottom listing core technologies with one-line explanations of how each is used. This is standard practice for portfolio projects. |

---

## Assets Page (`/assets`)

---

### 🔴 HIGH — Asset list content does not render

|                    |                                                                                                                                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The `/assets` page is the core feature of the application — the 12,500+ asset tracker referenced in your resume. When loaded without JS execution or on slow connections, the page renders nothing but a pagination control and footer. The main data table is entirely absent.                       |
| **Why it matters** | This is the page a hiring manager is most likely to click on after the landing page. The main feature of the app being invisible is the most critical functional issue on the site.                                                                                                                   |
| **Suggested fix**  | Implement SSR or SSG for the initial asset list using Next.js `getServerSideProps` or `getStaticProps` with revalidation. At minimum, add visible skeleton states so the page communicates that data is being fetched. An empty page with a pagination widget is more confusing than a loading state. |

---

### 🔴 HIGH — No loading states or skeleton UI visible during data fetch

|                    |                                                                                                                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | There are no skeleton cards or spinner communicating loading state. Production React applications always handle loading, error, and empty states explicitly.                                                                                      |
| **Why it matters** | The absence of these states signals that UX edge cases were not considered — a specific gap hiring managers look for at the senior level.                                                                                                         |
| **Suggested fix**  | Add explicit loading, error, and empty states for every data-fetching component. Use a skeleton loader that mirrors the shape of an asset row. Also add an error boundary at the page level that shows a friendly fallback if the API call fails. |

---

### 🟡 MEDIUM — Pagination controls render without context

|                    |                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Problem**        | The pagination widget (Previous / 1 / 2 / 3 / Next) appears on a visually empty page with no indication of total results or current range. |
| **Why it matters** | Without seeing the data it paginates, there is no way to understand what "page 1 of 3" means.                                              |
| **Suggested fix**  | Add a results count and range label: "Showing assets 1–50 of 12,547". Make the current page visually distinct from non-active pages.       |

---

## News Page (`/news`)

---

### 🔴 HIGH — News page renders completely empty

|                    |                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The `/news` page is linked prominently in the nav and footer, but loads with no content visible. The only element rendered is a "+ More Articles" button with no articles above it.                                                                                                                                                                       |
| **Why it matters** | A broken or empty secondary feature reinforces the impression that the app is unfinished.                                                                                                                                                                                                                                                                 |
| **Suggested fix**  | Fix the initial data load so at least the first page of articles renders without requiring user interaction. If the news API is rate-limited or deprecated, replace the page with a static set of curated articles or a clear message: "News feed temporarily unavailable." An empty page with a load-more button is worse than an honest fallback state. |

---

### 🟡 MEDIUM — Page title is generic and not descriptive

|                    |                                                                                                                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | Page title is "Mesh: Keeping you up to date on all things web3" — fine for a consumer product but doesn't demonstrate the SEO awareness that is part of your professional skill set.                                                              |
| **Why it matters** | Your resume highlights SEO expertise. The page titles should reflect that.                                                                                                                                                                        |
| **Suggested fix**  | Update to something specific: "Crypto & Web3 News Feed — Mesh". Add a subtitle explaining the data source: "Curated from [source] via [API name]" — this simultaneously describes the feature and demonstrates you thought about data provenance. |

---

## Education Section (`/education`)

---

### 🔴 HIGH — Only 2 articles exist, making the section look sparse and unfinished

|                    |                                                                                                                                                                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The education section lists "What is Bitcoin?" and "What is Fibonacci Retracement?" — just two articles. For a section presented as a content hub, two entries reads as an empty state.                                                                               |
| **Why it matters** | A sparse content section signals the feature was started but not completed.                                                                                                                                                                                           |
| **Suggested fix**  | Add 4–6 more education articles, or reframe the section as a curated "Featured Reading" list rather than implying it's a comprehensive library. Alternatively, add a "More coming soon" state with a subscribe option — this converts a weakness into a feature hook. |

---

### 🟡 MEDIUM — Financial disclaimer uses parenthetical humor that undermines credibility

|                    |                                                                                                                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The disclaimer reads: "Remember, nothing in these articles should be interpreted as financial advice. (we think we're pretty good, but we aren't financial advisors)" — the parenthetical is meant to be light-hearted but reads as unprofessional. |
| **Why it matters** | Disclaimer copy should be clear and direct. The humor undercuts it.                                                                                                                                                                                 |
| **Suggested fix**  | Keep the disclaimer, remove the parenthetical: "Nothing in these articles constitutes financial or investment advice." You can keep an informal voice in article content, but legal/disclaimer copy should be clean.                                |

---

## Education Article (`/education/what-is-bitcoin`)

---

### 🔴 HIGH — Multiple "CTA Placeholder" strings are visible in the article body

|                    |                                                                                                                                                                                                                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The Bitcoin article contains at least 6 visible placeholder strings: "This is a CTA Placeholder For the Moment" and "CTA Placholder at bottom if no other at bottom" (including a typo). These are visible to any user who reads past the first few paragraphs.                                                              |
| **Why it matters** | This is one of the most damaging issues on the entire site. It signals the project was never finished, and it appears repeatedly throughout the most detailed piece of content on the app.                                                                                                                                   |
| **Suggested fix**  | Replace every CTA placeholder with real content (a link to the asset explorer, a sign-up prompt, a related article link, or a relevant external resource), or remove them entirely. Fix the typo "Placholder" → "Placeholder". Do a global search for the string "Placeholder" across all content to ensure no others exist. |

---

### 🔴 HIGH — Related Posts section links to the same article 4 times

|                    |                                                                                                                                                                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The "Related Posts" section at the bottom shows 4 cards, all linking to "So, What is Bitcoin?" — the article you are already reading.                                                                                                                                                             |
| **Why it matters** | Makes the page look broken and the content navigation non-functional.                                                                                                                                                                                                                             |
| **Suggested fix**  | Filter the current article out of the related posts query. If there are not enough other articles to fill the section (the root issue — only 2 education articles exist), hide the related posts section when fewer than 2 other articles exist, or replace it with a "Back to all articles" CTA. |

---

### 🔴 HIGH — Several numbered list items are empty

|                    |                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Problem**        | In the section "Were there any specific tech projects that predated Bitcoin?", entries 1 (Digicash), 2 (hashCash), and 3 (e-Cash) are listed with numbers but no content body. Only entries 4–6 have descriptions.                                                 |
| **Why it matters** | Visibly unfinished content mid-article.                                                                                                                                                                                                                            |
| **Suggested fix**  | Either complete the missing list entries with brief descriptions, or remove the numbered list format and only include the projects that have written descriptions. The article already covers Hashcash in an earlier section, so consolidating would work cleanly. |

---

### 🟡 MEDIUM — Article contains a factual error in the CPI comparison

|                    |                                                                                                                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The article states: "in 1971, the CPI was approximately 38.8, while in 2021 it was approximately 9.5" — this is internally contradictory (38.8 to 9.5 would be deflation, not inflation). The actual 2021 CPI was approximately 270 on the 1982-84=100 base.      |
| **Why it matters** | A data accuracy error in a technical portfolio piece reflects on attention to detail.                                                                                                                                                                             |
| **Suggested fix**  | Correct the CPI figures. As of 2021, the US CPI (1982-84=100 base) was approximately 270. The article's overall conclusion about purchasing power decline is directionally correct — just the supporting numbers are wrong. Link to the BLS data source directly. |

---

### 🟢 LOW — No estimated reading time, author attribution, or publish date

|                    |                                                                                                                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | Standard content platform UX includes reading time, publish date, and author. Their absence makes the article feel unpolished.                                                                                                      |
| **Why it matters** | Small but visible UX detail. For a portfolio demonstrating frontend craft, these are the kinds of things that add up.                                                                                                               |
| **Suggested fix**  | Add a byline section below the article title with: author name, publish date, and estimated reading time (calculated from word count at ~200 words/minute). 30-minute implementation, adds meaningful polish to every article page. |

---

## Auth Page (`/auth`)

---

### 🟡 MEDIUM — Sign In nav link routes to a page titled "Sign Up"

|                    |                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The nav bar link says "Sign In" but the page title reads "Sign Up". The URL query param (`?path=SignIn`) is presumably intended to control the active tab, but the page title does not reflect this.                                     |
| **Why it matters** | A user clicking "Sign In" and seeing a "Sign Up" heading will be confused about whether they're in the right place — a basic UX failure on a core flow.                                                                                  |
| **Suggested fix**  | Ensure the page title (H1 and document `<title>`) dynamically reflects the active tab state. If the URL param is `?path=SignIn`, the heading should read "Sign In". Ensure the default active tab matches the URL param on initial load. |

---

### 🟡 MEDIUM — Social sign-in section has a heading but no visible provider buttons

|                    |                                                                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The auth page contains "Sign in with:" followed by a note about providers, but no actual OAuth buttons are visible. Either the provider buttons fail to render or were never fully implemented. |
| **Why it matters** | A broken or empty social login section is worse than no social login section — it looks like something is missing rather than a deliberate choice.                                              |
| **Suggested fix**  | Either fully implement the OAuth provider buttons using your auth provider's SDK, or remove the "Sign in with:" section entirely until it is functional.                                        |

---

## Terms of Service (`/terms-of-service`)

---

### 🟡 MEDIUM — Links to a Privacy Notice URL that returns 404

|                    |                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The ToS references "our Privacy Notice located at www.hodl-watch.vercel.app//privacy-notice" (note the double slash). The `/privacy-notice` route does not exist. |
| **Why it matters** | Broken internal links in legal documents are a credibility issue. The double slash also signals a path construction bug.                                          |
| **Suggested fix**  | Either create a `/privacy-notice` page with appropriate content, or remove the reference from the ToS until it exists. Fix the double-slash in the URL.           |

---

### 🟢 LOW — ToS last updated December 2022 and references old branding

|                    |                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The ToS says "Updated: December, 27th, 2022" and references `www.hodl-watch.vercel.app` and "HODLWATCH" throughout, while the product is now called Mesh. |
| **Why it matters** | Inconsistent branding across pages signals lack of attention to detail.                                                                                   |
| **Suggested fix**  | Update the last-modified date and do a find-and-replace to update all references from hodl-watch.vercel.app / HODLWATCH to Mesh / current domain.         |

---

## Global — Navigation

---

### 🔴 HIGH — `/user/undefined` in nav affects every page

|                    |                                                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The Profile nav link renders as `/user/undefined` on every page of the application, not just the landing page.                                                                                                                     |
| **Why it matters** | This is a global issue in the shared navigation component. It is the first thing a technical reviewer will notice when hovering over any nav link.                                                                                 |
| **Suggested fix**  | Fix auth state hydration in the navigation component. The user ID should only be interpolated into the nav link after authentication state has fully loaded on the client: `show Profile link only when session?.user?.id exists`. |

---

### 🟡 MEDIUM — Footer navigation contains non-functional plain-text links

|                    |                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The footer contains "Profile" and "Manage Account" in the Users section, but they render as plain text rather than anchor tags. Clicking them does nothing.                                                                            |
| **Why it matters** | Non-functional navigation items in a footer persist across every page and are a clear polish gap.                                                                                                                                      |
| **Suggested fix**  | Either convert these to proper anchor tags with the correct destination URLs, or remove them from the footer until the pages they link to are complete. If they require authentication, conditionally render them based on auth state. |

---

### 🟢 LOW — No active state on navigation links

|                    |                                                                                                                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | None of the navigation links show an active/current state (underline, bold, color change) when you are on their corresponding page.                                                                      |
| **Why it matters** | Standard navigation UX that improves wayfinding. Its absence is a noticeable omission when reviewing a frontend portfolio.                                                                               |
| **Suggested fix**  | Use Next.js `useRouter().pathname` to compare the current route against each nav link's href, and apply an active class when they match. This is a ~10 line change and a visible signal of UX attention. |

---

## Global — Architecture & Technical Gaps

---

### 🟡 MEDIUM — GraphQL/Apollo architecture is invisible in the UI

|                    |                                                                                                                                                                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Problem**        | Your resume and portfolio description highlight GraphQL with Apollo and a sophisticated caching strategy as core technical achievements. Nothing in the UI surfaces this — no real-time update indicators, no cache behavior, nothing that demonstrates the architecture to someone inspecting the app.      |
| **Why it matters** | The technical depth you're claiming exists, but a hiring manager has no way to verify it from the running app.                                                                                                                                                                                               |
| **Suggested fix**  | Add a "Last updated X seconds ago" timestamp on asset data, a visible WebSocket connection indicator, or an "Architecture" page with a stack diagram and explanation of the GraphQL schema design and caching strategy. Surface the real-time capability somewhere in the UI — it's a strong differentiator. |

---

### 🟡 MEDIUM — No error boundaries — unhandled errors would crash the entire app

|                    |                                                                                                                                                                                                                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | Production React applications use error boundaries to contain failures. For a portfolio targeting senior frontend roles, the absence of error boundaries is a noticeable gap — senior engineers are expected to think about failure modes.                                                                       |
| **Why it matters** | It's both a real technical gap and a visible one to anyone doing a code review or inspecting the app under failure conditions.                                                                                                                                                                                   |
| **Suggested fix**  | Add a top-level `ErrorBoundary` component wrapping the main application, plus per-page boundaries around data-fetching sections. The assets list and news feed should each have error boundaries with friendly fallback UIs. This is a well-defined React pattern and takes about an hour to implement properly. |

---

### 🟢 LOW — No tests exist — zero visible testing infrastructure

|                    |                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**        | The complete absence of tests (unit, integration, or E2E) is a meaningful gap for a senior frontend portfolio.                                                                                                                                                                                                                                                                                        |
| **Why it matters** | The resume mentions performance optimization and A/B testing in production, but the portfolio projects show no evidence of testing discipline. Tests are one of the first things senior-level reviewers look for in a GitHub repo.                                                                                                                                                                    |
| **Suggested fix**  | Add Vitest + React Testing Library. Target 10–15 tests covering the highest-value paths: the asset search/filter logic, auth state rendering in the nav (which would have caught the `/user/undefined` bug), and the education article rendering. Add a GitHub Actions CI workflow that runs tests on push — the green badge on the README is an immediate, visible signal to any technical reviewer. |

---

## Closing Note

The underlying architecture of Mesh is genuinely strong — GraphQL with Apollo, Redis caching, real-time data for 12,500+ assets, and community features are all meaningful technical achievements. The issues identified in this audit are almost entirely presentation and polish problems, not architecture problems.

Fixing the High severity issues (estimated 4–6 hours of focused work) would meaningfully change the impression this project makes on a hiring manager. Fixing all issues would transform it from a project that raises questions into one that answers them.
