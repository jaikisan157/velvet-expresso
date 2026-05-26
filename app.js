// --- VELVET ESPRESSO: LUXURY SENSORY INTERACTION ENGINE ---

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const tabButtons = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');
const drawerOverlay = document.getElementById('drawer-overlay');
const reservationDrawer = document.getElementById('reservation-drawer');
const drawerClose = document.getElementById('drawer-close');
const reservationForm = document.getElementById('reservation-form');
const bookingDateInput = document.getElementById('booking-date');
const successScreen = document.getElementById('booking-success');
const successCloseBtn = document.getElementById('success-close-btn');

// Carousel Elements
const carouselTrack = document.getElementById('carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const indicatorsContainer = document.getElementById('carousel-indicators');

// Global States
let currentSlideIndex = 0;
let carouselInterval = null;

// Initialize Page Orchestrations
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initMenuFiltering();
  initCarousel();
  initDrawer();
  initReservationForm();
  
  // High-End Micro-Animations
  initScrollReveal();
  initCard3DParallax();
  initMagneticButtons();
});

/* --- 1. GLASS NAV BAR SCROLL DYNAMICS --- */
function initStickyHeader() {
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- 2. MOBILE MENU DRAWER SYSTEMS --- */
function initMobileMenu() {
  if (!mobileToggle || !navLinks) return;
  
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

/* --- 3. DYNAMIC STAGGERED MENU FILTERING --- */
function initMenuFiltering() {
  if (tabButtons.length === 0 || menuCards.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-category');
      showToast(`Selected: ${filterValue === 'all' ? 'All Slow Bar Crafts' : capitalizeFirst(filterValue)}`);

      let visibleIndex = 0;

      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const isMatch = (filterValue === 'all' || cardCategory === filterValue);

        if (isMatch) {
          card.classList.remove('hidden');
          
          // Reset transform before re-applying reveal transitions
          card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.opacity = '0';
          card.style.transform = 'translateY(25px) scale(0.96)';

          // Beautiful staggered reveal using frame delays
          const revealDelay = 40 + (visibleIndex * 60);
          visibleIndex++;

          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, revealDelay);
        } else {
          card.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.95)';
          
          setTimeout(() => {
            card.classList.add('hidden');
          }, 400);
        }
      });
    });
  });
}

/* --- 4. SENSORY PHOTO GALLERY CAROUSEL --- */
function initCarousel() {
  if (slides.length === 0) return;

  // Generate indicator dots dynamically
  indicatorsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const ind = document.createElement('span');
    ind.className = `indicator ${index === 0 ? 'active' : ''}`;
    ind.setAttribute('data-index', index);
    indicatorsContainer.appendChild(ind);
  });

  const indicators = indicatorsContainer.querySelectorAll('.indicator');

  const showSlide = (targetIndex) => {
    if (targetIndex >= slides.length) targetIndex = 0;
    if (targetIndex < 0) targetIndex = slides.length - 1;
    
    currentSlideIndex = targetIndex;

    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    indicators.forEach((ind, idx) => {
      if (idx === currentSlideIndex) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  };

  prevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));

  indicators.forEach(ind => {
    ind.addEventListener('click', () => {
      const idx = parseInt(ind.getAttribute('data-index'), 10);
      showSlide(idx);
    });
  });

  const startAutoplay = () => {
    carouselInterval = setInterval(() => {
      showSlide(currentSlideIndex + 1);
    }, 6500);
  };

  const stopAutoplay = () => {
    if (carouselInterval) clearInterval(carouselInterval);
  };

  startAutoplay();
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
  }
}

/* --- 5. RESERVATIONS SLIDING DRAWER SYSTEM --- */
function initDrawer() {
  const triggers = document.querySelectorAll('.btn-drawer-trigger');

  const openDrawer = () => {
    reservationDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock base scroll
  };

  const closeDrawer = () => {
    reservationDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Unlock base scroll
    
    setTimeout(() => {
      successScreen.classList.remove('show');
    }, 550);
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reservationDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --- 6. RESERVATION FORM CONTROLS & CONFIRMATION --- */
function initReservationForm() {
  if (!reservationForm) return;

  // Bind date picker min to current date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const minDateString = `${year}-${month}-${day}`;
  bookingDateInput.setAttribute('min', minDateString);
  bookingDateInput.value = minDateString;

  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const guests = document.getElementById('guests').value;
    const rawDate = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const seating = document.getElementById('seating').value;

    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateObj = new Date(rawDate + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions);

    document.getElementById('summary-guests').textContent = `${guests} ${guests === '1' ? 'Guest' : 'Guests'}`;
    document.getElementById('summary-date').textContent = formattedDate;
    
    let seatingLabel = 'Cozy Concrete Booth';
    if (seating === 'bar') seatingLabel = 'Barista Slow Bar Counter';
    else if (seating === 'window') seatingLabel = 'Acoustic Window Booth';
    else if (seating === 'no-pref') seatingLabel = 'No Preference (First Available)';
    
    document.getElementById('summary-seating').textContent = seatingLabel;
    
    const timeOptions = {
      '08:00': '08:00 AM - 09:30 AM',
      '10:00': '10:00 AM - 11:30 AM',
      '12:00': '12:00 PM - 01:30 PM',
      '14:00': '02:00 PM - 03:30 PM',
      '16:00': '04:00 PM - 05:30 PM',
      '18:00': '06:00 PM - 07:30 PM'
    };
    document.getElementById('summary-time').textContent = timeOptions[time] || time;

    // Slide up confirmation panel smoothly
    successScreen.classList.add('show');
    
    reservationForm.reset();
    bookingDateInput.value = minDateString;
  });

  successCloseBtn.addEventListener('click', () => {
    drawerClose.click();
  });
}

/* --- 7. STYLISH INTERACTION ENGINE: SCROLL REVEALS --- */
function initScrollReveal() {
  // Elements to apply fluid scroll reveals
  const revealElements = [
    '.hero-badge', 'hero-content h1', '.hero-subtitle', '.hero-buttons', 
    '.hero-image-wrapper', '.story-image-container', '.story-content-block', 
    '.menu-header', '.menu-tabs', '.menu-card', '.experience-header', 
    '.carousel-container', '.cta-inner', '.footer-cols'
  ];

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12 // Trigger when 12% is in viewport
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  // Set up each selector securely
  revealElements.forEach(selector => {
    const elList = document.querySelectorAll(selector);
    elList.forEach((el, index) => {
      el.classList.add('reveal-fade-up');
      
      // Auto-assign stagger indexes for grids or sequences
      if (selector === '.menu-card' || selector === '.check-item') {
        el.style.transitionDelay = `${index % 3 * 0.08}s`;
      }
      
      observer.observe(el);
    });
  });
}

/* --- 8. HYPER-SMOOTH 3D PARALLAX PERSPECTIVE TILT --- */
function initCard3DParallax() {
  // Apply 3D perspective mouse tilt to specialty menu cards and hero visual
  const tiltContainers = document.querySelectorAll('.menu-card, .image-inner, .story-image-container');
  
  // Disable 3D tilt effects on touch screen mobile devices for safety
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  tiltContainers.forEach(container => {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      
      // Calculate cursor coordinates relative to card bounds
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation percentages (-1 to 1 range)
      const xPercent = (x / rect.width - 0.5) * 2;
      const yPercent = (y / rect.height - 0.5) * 2;
      
      // Max tilt angle (degrees)
      const maxTilt = 8;
      
      // Compute 3D rotation angles
      const rotateX = (-yPercent * maxTilt).toFixed(2);
      const rotateY = (xPercent * maxTilt).toFixed(2);

      // Perform fast hardware accelerated transforms
      requestAnimationFrame(() => {
        container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        container.style.transition = 'transform 0.1s var(--ease-out-expo)';
      });
    });

    container.addEventListener('mouseleave', () => {
      // Revert back smoothly to neutral
      requestAnimationFrame(() => {
        container.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        container.style.transition = 'transform 0.6s var(--ease-out-expo)';
      });
    });
  });
}

/* --- 9. MAGNETIC CURSOR PULL ON CTAs --- */
function initMagneticButtons() {
  const magneticCTAs = document.querySelectorAll('.btn-primary');
  
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  magneticCTAs.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull limits (moves 25% towards cursor offset)
      const pullFactor = 0.28;
      const moveX = (x * pullFactor).toFixed(1);
      const moveY = (y * pullFactor).toFixed(1);

      requestAnimationFrame(() => {
        btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.025)`;
        btn.style.transition = 'transform 0.12s var(--ease-out-expo)';
      });
    });

    btn.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        btn.style.transform = 'translate(0px, 0px) scale(1)';
        btn.style.transition = 'transform 0.5s var(--ease-out-expo)';
      });
    });
  });
}

/* --- 10. MICRO-TOAST NOTIFIER --- */
function showToast(message) {
  const toast = document.getElementById('toast-notify');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
