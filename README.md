# WEBOMONKS — Interactive 3D Digital Agency Website

A custom, responsive, single-page creative agency site inspired by the *visual style* of the supplied Instagram Reel: black/purple atmosphere, interactive particle-based 3D sphere, animated panels and a cinematic scroll experience. Text and visuals are newly built for WEBOMONKS.

## What's included

- `index.html` — semantic, responsive page with services, approach, about and contact sections
- `styles.css` — desktop/mobile styles and CSS animations
- `app.js` — real-time WebGL particle sphere, drag interaction, card modal, navigation, form handling
- `config.js` — contact email and optional form endpoint (edit before launch)

## Run locally

Open `index.html` in Chrome, Edge, Safari or Firefox. For best results, run a simple server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Edit before publishing

1. **Change the contact email in `config.js`.** The included `hello@webomonks.com` address is **an example only**. Confirm that you own the destination mailbox before launching.
2. The contact form currently opens the user's email application with a composed enquiry. That means the visitor must press **Send** in their email app; this does not silently send the form.
3. For server-side delivery from the website, make an account with your chosen form provider, obtain the actual form endpoint and set `formEndpoint` in `config.js`. The site supports a JSON POST endpoint (e.g. Formspree). Test with a real email before launch.
4. Replace the company intro and service copy with your actual offer. Do not add testimonials or performance claims without real evidence.
5. Connect your real domain and deploy the static files to Netlify, Cloudflare Pages, Vercel or any standard static web host.

## Notes

- The 3D sphere is a custom WebGL object with a Canvas-2D mathematical 3D fallback (not a video, screenshot or iframe). Drag it on a pointer/touch device to rotate. It runs without Three.js, installed packages or an image CDN.
- Custom icons and graphics are embedded via HTML/CSS/SVG.
- Google Fonts are used when a connection is available; built-in fallbacks work offline.
- Mouse wheel and finger scrolling use standard page behavior. On the orb, a horizontal drag rotates the sphere.
- To test reduced-motion accessibility, enable "Reduce motion" in your device's accessibility settings.
