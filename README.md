# Karam Ajaj – Online Resume

A modern, dark-themed portfolio and resume website built with vanilla HTML, CSS, and JavaScript. Features a terminal/coding aesthetic with matrix rain background, typing effects, scroll-reveal animations, and collapsible sections.

**Live Demo**: [karam-ajaj.github.io/portfolio](https://karam-ajaj.github.io/portfolio/)

---

## Tech Stack

- **Frontend**: HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript
- **Fonts**: JetBrains Mono, Inter (Google Fonts), Font Awesome icons
- **PDF Generation**: WeasyPrint (Python) for static CV export
- **Deployment**: GitHub Pages

---

## Project Structure

```
portfolio/
├── index.html              # Main single-page portfolio
├── cv.html                 # One-page CV source (used to generate PDF)
├── Karam_Ajaj_CV.pdf       # Static downloadable CV (A4, one page)
├── css/
│   └── main.css            # Full dark-theme stylesheet
├── js/
│   ├── main.js             # Animations, scroll effects, badge loading
│   └── badges.json         # Credly badge IDs (47 badges)
├── img/                    # Profile image and assets
├── resrc/                  # Certifications, courses, and other resources
│   ├── certification/      # PDF certificates (VMware, Zerto, IBM, etc.)
│   └── courses/            # Course completion certificates
├── vendor/                 # Third-party libraries (Font Awesome, etc.)
├── tools/
│   └── generate_sitemap.py # Sitemap generator
├── sitemap.xml             # SEO sitemap
├── gulpfile.js             # Legacy Gulp configuration
├── LICENSE                 # MIT License
└── README.md               # This file
```

---

## Getting Started

To run the project locally, simply open `index.html` in a browser — no build step required.

```bash
git clone https://github.com/karam-ajaj/portfolio.git
cd portfolio
# Open index.html in your browser
```

---

## Updating the CV PDF

The downloadable CV is a static PDF generated from `cv.html`. To update it:

1. **Edit** `cv.html` with your latest information
2. **Install WeasyPrint** (one-time setup):
   ```bash
   python3 -m venv .venv
   .venv/bin/pip install weasyprint
   ```
   System dependencies (Debian/Ubuntu):
   ```bash
   sudo apt-get install -y libpango-1.0-0 libpangoft2-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libcairo2
   ```
3. **Generate the PDF**:
   ```bash
   .venv/bin/weasyprint cv.html Karam_Ajaj_CV.pdf
   ```
4. **Commit** both `cv.html` and `Karam_Ajaj_CV.pdf`

---

## Key Features

- **Matrix rain** canvas background animation
- **Typing effect** in the hero section with rotating role titles
- **Scroll-reveal** animations (IntersectionObserver-based)
- **Collapsible** certification groups and badge sections
- **47 Credly badges** loaded dynamically with show/hide toggle
- **One-page PDF CV** download button in the hero
- **Responsive** design for mobile, tablet, and desktop
- **Dark terminal aesthetic** with green/cyan/purple accents

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

- **LinkedIn**: [linkedin.com/in/karam-ajaj](https://www.linkedin.com/in/karam-ajaj)
- **GitHub**: [github.com/karam-ajaj](https://github.com/karam-ajaj)
- **Email**: karam.ajaj@hotmail.com
