/**
 * AP Real Estate Solutions Ltd - Main JavaScript
 * Modern, performance-optimized interactions with smooth animations
 */

// ========================================
// UTILITY FUNCTIONS
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Debounce function for performance
function debounce(func, wait = 20) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========================================
// NAVBAR SCROLL BEHAVIOR
// ========================================

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Initial check
  handleScroll();

  // Add scroll listener
  window.addEventListener('scroll', handleScroll);
  
  // Set active page
  setActivePage();
}

// ========================================
// ACTIVE PAGE DETECTION
// ========================================

function setActivePage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    // Remove active class from all links
    link.classList.remove('text-[#C0A060]', 'font-semibold');
    link.classList.add('text-white');
    
    // Add active class to current page
    if (linkPath === currentPath || 
        (currentPath === '/' && linkPath === '/index.html') ||
        (currentPath === '/index.html' && linkPath === '/index.html')) {
      link.classList.remove('text-white');
      link.classList.add('text-[#C0A060]', 'font-semibold');
    }
  });
  
  // Also handle mobile menu links
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    // Remove active class from all mobile links
    link.classList.remove('text-[#C0A060]', 'font-semibold');
    link.classList.add('text-[#1F2937]');
    
    // Add active class to current page
    if (linkPath === currentPath || 
        (currentPath === '/' && linkPath === '/index.html') ||
        (currentPath === '/index.html' && linkPath === '/index.html')) {
      link.classList.remove('text-[#1F2937]');
      link.classList.add('text-[#C0A060]', 'font-semibold');
    }
  });
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

function initMobileMenu() {
  console.log('Initializing mobile menu...');
  
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuBtn) {
    console.error('Mobile menu button not found!');
    return;
  }
  
  if (!mobileMenu) {
    console.error('Mobile menu not found!');
    return;
  }

  const menuOpenIcon = document.getElementById('menu-open-icon');
  const menuCloseIcon = document.getElementById('menu-close-icon');

  if (!menuOpenIcon || !menuCloseIcon) {
    console.error('Menu icons not found!', { menuOpenIcon: !!menuOpenIcon, menuCloseIcon: !!menuCloseIcon });
    return;
  }

  console.log('All mobile menu elements found, setting up...');

  // Ensure menu is closed initially
  mobileMenu.classList.add('translate-x-full');
  mobileMenu.style.zIndex = '1000';
  mobileMenu.style.visibility = 'visible';
  mobileMenu.style.opacity = '1';
  mobileMenu.style.display = 'block';

  let isOpen = false;

  const openMenu = () => {
    console.log('Opening mobile menu');
    isOpen = true;
    mobileMenu.classList.remove('translate-x-full');
    menuOpenIcon.classList.add('hidden');
    menuCloseIcon.classList.remove('hidden');
    
    // Prevent body scroll
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('menu-open');
    
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.style.zIndex = '1000';
  };

  const closeMenu = () => {
    console.log('Closing mobile menu');
    isOpen = false;
    mobileMenu.classList.add('translate-x-full');
    menuOpenIcon.classList.remove('hidden');
    menuCloseIcon.classList.add('hidden');
    
    // Restore body scroll
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.classList.remove('menu-open');
    
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('Toggle menu called, isOpen:', isOpen);
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Add click event
  menuBtn.onclick = toggleMenu;
  
  // Also add event listener for redundancy
  menuBtn.addEventListener('click', toggleMenu, { capture: true });
  
  // Touch event for mobile
  menuBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    toggleMenu(e);
  }, { passive: false, capture: true });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
    }
  }, true);

  // Close menu when clicking a link
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  console.log('Mobile menu initialized successfully');
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#main-content') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // Account for fixed navbar
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// INTERSECTION OBSERVER ANIMATIONS
// ========================================

function initScrollAnimations() {
  if (prefersReducedMotion) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up-active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in-up class
  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });

  // Staggered animations
  document.querySelectorAll('.stagger-children').forEach(parent => {
    const children = parent.querySelectorAll('.stagger-item');
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * 100}ms`;
    });
  });
}

// ========================================
// ANIMATED COUNTERS
// ========================================

function animateCounter(element, target, duration = 2000) {
  if (prefersReducedMotion) {
    element.textContent = target;
    return;
  }

  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.floor(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (counterElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-counter'));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => observer.observe(el));
}

// ========================================
// PARALLAX EFFECT
// ========================================

function initParallax() {
  if (prefersReducedMotion) return;

  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  const handleParallax = () => {
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    });
  };

  window.addEventListener('scroll', debounce(handleParallax, 10));
  handleParallax(); // Initial call
}

// ========================================
// ACCORDION
// ========================================

function initAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.accordion-icon');
      const isOpen = content.classList.contains('accordion-open');
      
      // Close all other accordions in the same group
      const accordionGroup = button.closest('.accordion-group');
      if (accordionGroup) {
        accordionGroup.querySelectorAll('.accordion-content').forEach(item => {
          if (item !== content) {
            item.classList.remove('accordion-open');
            item.style.maxHeight = null;
          }
        });
        accordionGroup.querySelectorAll('.accordion-icon').forEach(item => {
          if (item !== icon) {
            item.classList.remove('rotate-180');
          }
        });
      }
      
      // Toggle current accordion
      if (isOpen) {
        content.classList.remove('accordion-open');
        content.style.maxHeight = null;
        icon.classList.remove('rotate-180');
      } else {
        content.classList.add('accordion-open');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.add('rotate-180');
      }
    });
  });
}

// ========================================
// FORM VALIDATION
// ========================================

function initFormValidation() {
  const forms = document.querySelectorAll('.validate-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      // Clear previous errors
      form.querySelectorAll('.error-message').forEach(msg => msg.remove());
      form.querySelectorAll('.border-red-500').forEach(input => {
        input.classList.remove('border-red-500');
      });
      
      // Validate required fields
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          showError(field, 'This field is required');
        }
      });
      
      // Validate email
      const emailFields = form.querySelectorAll('input[type="email"]');
      emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
          isValid = false;
          showError(field, 'Please enter a valid email address');
        }
      });
      
      // Validate phone
      const phoneFields = form.querySelectorAll('input[type="tel"]');
      phoneFields.forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
          isValid = false;
          showError(field, 'Please enter a valid phone number');
        }
      });
      
      if (isValid) {
        // Show success message
        showSuccessMessage(form);
        form.reset();
      }
    });
  });
}

function showError(field, message) {
  field.classList.add('border-red-500');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message text-red-500 text-sm mt-1';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4';
  successDiv.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span class="font-medium">Thank you! We'll be in touch soon.</span>
    </div>
  `;
  form.insertBefore(successDiv, form.firstChild);
  
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\+\-\(\)]{10,}$/.test(phone);
}

// ========================================
// TESTIMONIAL SLIDER (if present)
// ========================================

function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.testimonial-slide');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('hidden', i !== index);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  // Auto-play
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

// ========================================
// LAZY LOADING IMAGES
// ========================================

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 500) {
      scrollBtn.classList.remove('opacity-0', 'invisible');
      scrollBtn.classList.add('opacity-100', 'visible');
    } else {
      scrollBtn.classList.add('opacity-0', 'invisible');
      scrollBtn.classList.remove('opacity-100', 'visible');
    }
  }, 100));

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================
// COOKIE CONSENT
// ========================================

function initCookieConsent() {
  const cookieBanner = document.getElementById('cookie-consent');
  if (!cookieBanner) return;

  const acceptBtn = cookieBanner.querySelector('#accept-cookies');
  const declineBtn = cookieBanner.querySelector('#decline-cookies');

  // Check if user has already made a choice
  if (localStorage.getItem('cookieConsent')) {
    cookieBanner.classList.add('hidden');
    return;
  }

  // Show banner after a delay
  setTimeout(() => {
    cookieBanner.classList.remove('hidden');
  }, 1000);

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.add('hidden');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.add('hidden');
    });
  }
}

// ========================================
// HERO VIDEO BACKGROUND (if present)
// ========================================

function initVideoBackground() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  // Pause video if user prefers reduced motion
  if (prefersReducedMotion) {
    video.pause();
    video.style.display = 'none';
  }
}

// ========================================
// INITIALIZE ALL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Note: initNavbar() and initMobileMenu() are called after navbar is loaded via fetch
  initSmoothScroll();
  initScrollAnimations();
  initCounters();
  initParallax();
  initAccordion();
  initFormValidation();
  initTestimonialSlider();
  initLazyLoading();
  initScrollToTop();
  initCookieConsent();
  initVideoBackground();
  
  // Try to initialize mobile menu if navbar is already loaded
  if (document.getElementById('mobile-menu-btn')) {
    console.log('Mobile menu button found on DOMContentLoaded, initializing...');
    initMobileMenu();
  }
  
  // Add loaded class to body for CSS animations
  document.body.classList.add('loaded');
});

// Also try to initialize mobile menu after a short delay as backup
setTimeout(() => {
  if (document.getElementById('mobile-menu-btn')) {
    console.log('Backup: Initializing mobile menu after timeout...');
    initMobileMenu();
  }
}, 500);

// ========================================
// EXTERNAL LINK WARNING
// ========================================

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="http"]');
  if (link && !link.href.includes(window.location.hostname)) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
    }
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

// ========================================
// SERVICE TAB SWITCHING
// ========================================

function switchServiceTab(service) {
  // Hide all content panels with fade out
  const allContent = document.querySelectorAll('.service-content');
  allContent.forEach(content => {
    content.classList.remove('active');
    content.classList.add('hidden');
  });

  // Remove active state from all tabs
  const allTabs = document.querySelectorAll('.service-tab');
  allTabs.forEach(tab => {
    tab.classList.remove('active');
    const tabDiv = tab.querySelector('div');
    if (tabDiv) {
      // Reset to white/gray inactive style
      tabDiv.classList.remove('bg-gradient-to-r', 'from-[#C0A060]', 'to-[#A08850]', 'shadow-xl');
      tabDiv.classList.add('bg-white', 'border', 'border-gray-200', 'shadow-md');
    }
    // Reset all text to dark
    const h3 = tab.querySelector('h3');
    if (h3) {
      h3.classList.remove('text-white');
      h3.classList.add('text-[#1C2A39]');
    }
    const p = tab.querySelector('p');
    if (p) {
      p.classList.remove('text-white/80');
      p.classList.add('text-gray-600');
    }
    // Reset icon
    const icon = tab.querySelector('.w-12.h-12, .w-14.h-14');
    if (icon) {
      const svg = icon.querySelector('svg');
      if (svg) {
        svg.classList.remove('text-white');
        svg.classList.add('text-[#1C2A39]');
      }
    }
    // Reset arrow
    const arrow = tab.querySelector('.flex-shrink-0.transform svg');
    if (arrow) {
      arrow.classList.remove('text-white');
      arrow.classList.add('text-[#C0A060]');
      arrow.parentElement.classList.remove('opacity-100');
      arrow.parentElement.classList.add('opacity-40');
    }
  });

  // Activate selected tab
  const selectedTab = document.getElementById(`tab-${service}`);
  if (selectedTab) {
    selectedTab.classList.add('active');
    const tabDiv = selectedTab.querySelector('div');
    if (tabDiv) {
      // Set to gold gradient active style
      tabDiv.classList.remove('bg-white', 'border', 'border-gray-200', 'shadow-md');
      tabDiv.classList.add('bg-gradient-to-r', 'from-[#C0A060]', 'to-[#A08850]', 'shadow-xl');
    }
    // Set all text to white
    const h3 = selectedTab.querySelector('h3');
    if (h3) {
      h3.classList.remove('text-[#1C2A39]');
      h3.classList.add('text-white');
    }
    const p = selectedTab.querySelector('p');
    if (p) {
      p.classList.remove('text-gray-600');
      p.classList.add('text-white/80');
    }
    // Set icon to white
    const icon = selectedTab.querySelector('.w-12.h-12, .w-14.h-14');
    if (icon) {
      const svg = icon.querySelector('svg');
      if (svg) {
        svg.classList.remove('text-[#1C2A39]');
        svg.classList.add('text-white');
      }
    }
    // Set arrow to white
    const arrow = selectedTab.querySelector('.flex-shrink-0.transform svg');
    if (arrow) {
      arrow.classList.remove('text-[#C0A060]');
      arrow.classList.add('text-white');
      arrow.parentElement.classList.remove('opacity-40');
      arrow.parentElement.classList.add('opacity-100');
    }
  }

  // Show selected content with amazing fade in
  setTimeout(() => {
    const selectedContent = document.getElementById(`content-${service}`);
    if (selectedContent) {
      selectedContent.classList.remove('hidden');
      // Force reflow to trigger animation
      void selectedContent.offsetWidth;
      selectedContent.classList.add('active');
    }
  }, 150);
}

// Make function globally available
window.switchServiceTab = switchServiceTab;


