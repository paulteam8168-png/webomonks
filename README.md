# WEBOMONKS — Cinematic Digital Growth Studio

The live production website is served at **https://webomonks.com/** using a Cloudflare Worker called `webomonks-live`. The GitHub source repository is `paulteam8168-png/webomonks`, branch `main`.

## Design — cinematic dashboard theme
The October 2026 update adapts the user-provided Wafer-style visual reference for the WEBOMONKS digital marketing agency. The agency site is **not an AI API service or an OAuth login**.

- Castle-video welcome intro on the homepage, with two useful Google Ads / Instagram service shortcuts and an "Enter the Studio" control
- Dashboard with collapsible 200px black sidebar, responsive 42px compact rail and sky-loop video
- Real-time (when accessible) ASCII texture sampled from the active video
- Glowing rainbow playbook, expandable service detail cards, subtle 3D particle header globe
- Exact relevant brand SVGs displayed inline: multicolor Google G, Instagram gradient camera, Facebook, Meta infinity-style mark and other service symbols
- 12 static pages with unique service content and internal links
- Native search popover (press /), keyboard accessibility, reduced-motion support and mobile-friendly presentation

## 12 routes
- `index.html`
- `about.html`
- `services.html`
- `meta-ads.html`
- `google-ads.html`
- `seo.html`
- `digital-marketing.html`
- `social-media.html`
- `landing-pages.html`
- `strategy.html`
- `insights.html`
- `contact.html`

## Technology
The 12 pages link to `assets/wafer-theme.css` and `assets/wafer-theme.js`, with no framework or build step. The reference's castle and sky video URLs are hot-linked. There are no third-party login buttons or fake client results. The local orb illustration remains in `assets/webomonks-orb.webp` as a fallback background.

The Cloudflare Worker named `webomonks-live` serves listed paths from this GitHub branch, with a bundled fallback snapshot. Apex and www DNS routes were connected to this Worker. When new routes are added or the fallback snapshot must be refreshed, redeploy the Worker and update its path registry.

## Contact form
The contact page currently **prepares an email draft** and can copy project details. It does **not** submit to a server; no verified WEBOMONKS receiving email address was supplied. Configure a business inbox or a reliable form backend before advertising automatic enquiry collection.

## Google verification
`google76ba3c9b1e8c30ef.html` is kept at the site root, alongside `robots.txt` and `sitemap.xml`.

## Domain
- Production: https://webomonks.com/
- Worker preview: https://webomonks-live.sharma-chirag93.workers.dev/
- GitHub: https://github.com/paulteam8168-png/webomonks
