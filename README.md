# AP Real Estate Solutions - Landing Website

A modern, premium real estate landing website built with HTML5, Tailwind CSS, and vanilla JavaScript.

## 🌟 Features

- **Modern Design**: Premium, elegant UI inspired by luxury real estate websites
- **Fully Responsive**: Mobile-first approach, works seamlessly on all devices
- **Smooth Animations**: GSAP-style animations using IntersectionObserver and CSS transitions
- **Performance Optimized**: Lighthouse score target ≥ 90
- **SEO Ready**: Complete meta tags, JSON-LD schema, sitemap, and robots.txt
- **Accessible**: WCAG compliant with proper ARIA labels 
- **Interactive Components**: Counters, parallax effects, accordions, and smooth scrolling

## 📁 Project Structure

```
/
├── index.html                 # Home page
├── landlords.html            # Landlords services page
├── lettings-management.html  # Lettings management page
├── tenants.html              # Tenants information page
├── maintenance.html          # Maintenance services page
├── about.html                # About us page
├── meet-the-team.html        # Team members page
├── careers.html              # Careers & job listings page
├── resources.html            # Free resources & guides
├── shop.html                 # Services shop page
├── books.html                # Books & publications page
├── contact.html              # Contact page with form & map
├── privacy-policy.html       # Privacy policy
├── terms.html                # Terms of service
├── cookies.html              # Cookie policy
├── 404.html                  # 404 error page
├── sitemap.xml               # XML sitemap
├── robots.txt                # Robots file
├── assets/
│   ├── images/              # Image assets
│   ├── icons/               # Icon assets
│   ├── scripts/
│   │   └── main.js          # Main JavaScript file
│   └── styles/
│       └── custom.css       # Custom CSS styles
└── partials/
    ├── navbar.html          # Reusable navbar component
    └── footer.html          # Reusable footer component
```

## 🎨 Design System

### Color Palette
- **White**: #FFFFFF
- **Soft Navy**: #1C2A39
- **Graphite Gray**: #2F3A4A
- **Gold Accent**: #C0A060
- **Light Gray BG**: #F7F7F7
- **Slate Text**: #1F2937

### Typography
- **Headings**: Poppins (600 weight)
- **Body**: Inter (400-700 weight)

### Key Components
- Animated stat counters
- Parallax hero sections
- Glassmorphic cards
- Smooth fade-in animations
- Responsive accordion FAQ
- Form validation
- Cookie consent banner

## 🚀 Getting Started

1. **Open the project**:
   Simply open `index.html` in a modern web browser

2. **Using a local server** (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Navigate to**: `http://localhost:8000`

## ⚡ JavaScript Features

The `main.js` file includes:
- Navbar scroll behavior & mobile menu
- Smooth scroll to anchors
- IntersectionObserver for scroll animations
- Animated number counters
- Parallax effects
- Accordion functionality
- Form validation
- Lazy loading images
- Cookie consent management

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔍 SEO Optimization

- Semantic HTML5 structure
- Meta tags on all pages
- JSON-LD schema markup
- Open Graph & Twitter cards
- XML sitemap included
- Robots.txt configured
- Alt text on images
- Canonical URLs

## ♿ Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Skip to content link
- Proper heading hierarchy
- 4.5:1 contrast ratio
- Prefers-reduced-motion support

## 📊 Performance

- Lazy loading images
- Optimized animations
- Minimal dependencies
- CSS and JS minification ready
- Preload critical fonts
- GPU-accelerated transforms

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Customization

### Colors
Edit the CSS custom properties in `assets/styles/custom.css`:
```css
:root {
  --color-gold: #C0A060;
  --color-navy: #1C2A39;
  /* ... */
}
```

### Content
All content is easily editable in the HTML files. Search for specific text to update.

### Images
Replace placeholder images in the `assets/images/` directory with your own.

## 📄 License

This project is created for AP Real Estate Solutions Ltd.

## 🤝 Support

For questions or support, contact: info@aprealestate.co.uk

---

**Built with ❤️ MostafaEl-Safy**

