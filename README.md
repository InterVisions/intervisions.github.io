# InterVisions Website

Static HTML/CSS/JS website for the InterVisions EU-funded project.

## Structure

```
intervisions/
├── index.html              # Homepage
├── css/
│   └── main.css            # All styles
├── js/
│   ├── includes.js         # Loads shared nav/footer
│   └── main.js             # Accordion, menu (legacy)
├── includes/
│   ├── nav.html            # Shared navigation + menu overlay
│   └── footer.html         # Shared footer
├── images/
│   └── logo.jpg            # InterVisions logo
└── pages/
    ├── tools.html          # Our Tools page
    ├── team.html           # Our Team page
    └── privacy.html        # Privacy policy
```

## Local Development

Because the site uses `fetch()` to load shared includes, you need a local server:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx)
npx serve .

# VS Code
# Install "Live Server" extension, then right-click index.html → Open with Live Server
```

Then open `http://localhost:8000`

## GitHub Pages

Push to a `gh-pages` branch or configure GitHub Pages to serve from `main` branch root. The site will work as-is — no build step needed.

## Key Design Decisions

- **Colors**: Brand palette from design spec — `#b3fc50` (lime), `#f6f262` (yellow), `#f9b6d7` (pink), `#717cf8` (periwinkle), `#ea5054` (red), `#3356a3` (blue), `#f8c5d4` (light pink), `#c7d8c4` (mint)
- **Font**: Space Grotesk (Google Fonts)
- **Shared nav/footer**: Loaded via `fetch()` from `includes/` — no build tool needed
- **Accordion**: CSS + minimal JS, color-coded per section
- **Community form**: Uses Formspree — replace `YOUR_FORM_ID` in `index.html` with your actual Formspree endpoint

## TODO

- [ ] Replace Formspree form ID in `index.html`
- [ ] Add real resource cards content
- [ ] Add `favicon.ico`



## Funding Acknowledgement

![Co-funded by the European Union](eu-funded.png)

Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.
