# WEBOMONKS — 12-page animated digital marketing website

Production-oriented static HTML pages, CSS and JavaScript. No build step or package installation.

## 12 pages
1. [Home](index.html)
2. [About](about.html)
3. [Services](services.html)
4. [Meta Ads](meta-ads.html)
5. [Google Ads](google-ads.html)
6. [SEO Services](seo.html)
7. [Digital Marketing](digital-marketing.html)
8. [Social Media](social-media.html)
9. [Landing Pages](landing-pages.html)
10. [Strategy & Analytics](strategy.html)
11. [Insights](insights.html)
12. [Contact](contact.html)

## Design / functionality
- Animated 3D projected particle globe on every page; mouse and touch drag
- Responsive navigation with expandable service dropdown
- Reveal-on-scroll effects, subtle tilt cards, light trails and a motion-aware layout
- Expandable FAQs, useful SEO and marketing content, filtering on Services and Insights pages
- Fully linked navigation, query-parameter-driven service choice in Contact
- Shared style and script files: `assets/site.css` and `assets/site.js`
- Existing local orb illustration: `assets/webomonks-orb.webp`
- Basic SEO metadata and sitemap

## Important: Contact form delivery
The form currently opens an email draft with **no recipient** (because a verified WEBOMONKS business email has not been supplied) or copies the enquiry details. To receive actual enquiries, set the business inbox in `assets/site.js` (variable `receiver`) or integrate a trusted form backend. Do not claim the form sends data until a real endpoint is configured and tested.

## Deployment
For GitHub Pages: Settings → Pages → Deploy from branch → `main` → `/(root)`. If webomonks.com is deployed through another hosting provider, confirm that it is connected to this GitHub repository and `main` branch before assuming changes will appear at the custom domain.

## Performance
3D animation uses Canvas 2D with 3D projection, uses fewer particles on touch devices and pauses when the page is hidden or the scene leaves the viewport. Accessibility reduced-motion preference is respected. No external 3D library is required.
