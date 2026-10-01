/**
 * MAISON ÉLAN - SPECIALTY COFFEE & CULINARY ATELIER
 * Interactive Web Application Logic & Cinematic Coffee Pour Ritual
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeaderScroll();
  initMobileDrawer();
  initMenuTabs();
  initReservationForm();
  initGalleryLightbox();
  initNewsletterForm();
  initSmoothScroll();
  initScrollReveals();
  initHeroReveal();
});

/* ==========================================================================
   1. STICKY HEADER SCROLL LOGIC
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE DRAWER TOGGLE
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    toggleBtn.classList.add('active');
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. MENU TAB FILTERING
   ========================================================================== */
function initMenuTabs() {
  const tabBtns = document.querySelectorAll('.menu-tabs .tab-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');

  if (!tabBtns.length || !menuItems.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      menuItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'flex';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   4. RESERVATION FORM & SEATING PILLS
   ========================================================================== */
function initReservationForm() {
  const seatingBtns = document.querySelectorAll('.seating-pill-btn');
  const seatingInput = document.getElementById('seatingAreaInput');
  const form = document.getElementById('reservationForm');
  const modal = document.getElementById('reservationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  seatingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      seatingBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (seatingInput) {
        seatingInput.value = btn.getAttribute('data-value');
      }
    });
  });

  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const guestName = document.getElementById('resName').value || 'Valued Guest';
      const guestsCount = document.getElementById('resGuests').value || '2 Guests';
      const dateVal = document.getElementById('resDate').value || 'Tomorrow';
      const timeVal = document.getElementById('resTime').value || '11:30 AM';
      const areaVal = seatingInput ? seatingInput.value : 'Main Dining Atelier';
      
      const randomRef = 'ÉLAN-' + Math.floor(1000 + Math.random() * 9000);

      document.getElementById('summaryRef').textContent = randomRef;
      document.getElementById('summaryName').textContent = guestName;
      document.getElementById('summaryDetails').textContent = `${guestsCount} • ${dateVal} at ${timeVal}`;
      document.getElementById('summaryArea').textContent = areaVal;

      if (modal) {
        modal.classList.add('active');
      }

      form.reset();
      seatingBtns.forEach(b => b.classList.remove('active'));
      if (seatingBtns[0]) seatingBtns[0].classList.add('active');
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   5. GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('galleryModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeGalleryBtn = document.getElementById('closeGalleryBtn');

  if (!galleryItems.length || !lightboxModal) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Gallery image';
      }

      if (caption && lightboxCaption) {
        lightboxCaption.textContent = caption.textContent;
      }

      lightboxModal.classList.add('active');
    });
  });

  if (closeGalleryBtn) {
    closeGalleryBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      lightboxModal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. NEWSLETTER SIGNUP
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input || !input.value) return;

    alert(`Thank you for joining Maison Élan Society! A welcome note has been dispatched to ${input.value}.`);
    input.value = '';
  });
}

/* ==========================================================================
   7. SMOOTH SCROLLING FOR NAVIGATION LINKS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   8. HERO SECTION REVEAL CONTROLLER
   ========================================================================== */
function initHeroReveal() {
  const heroBadge = document.getElementById('heroBadge');
  const titleLines = document.querySelectorAll('.title-line');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroActions = document.getElementById('heroActions');
  const heroInfoBar = document.getElementById('heroInfoBar');

  // Smooth immediate reveal sequence
  setTimeout(() => {
    if (heroBadge) heroBadge.classList.add('revealed');
  }, 100);

  titleLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('revealed');
    }, 250 + index * 180);
  });

  setTimeout(() => {
    if (heroSubtitle) heroSubtitle.classList.add('revealed');
  }, 650);

  setTimeout(() => {
    if (heroActions) heroActions.classList.add('revealed');
  }, 850);

  setTimeout(() => {
    if (heroInfoBar) heroInfoBar.classList.add('revealed');
  }, 1050);
}

/* ==========================================================================
   9. CUSTOM INTERACTIVE CURSOR FOLLOWER
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const dot = document.getElementById('cursorDot');

  if (!cursor || !dot) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function loop() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX.toFixed(1)}px, ${cursorY.toFixed(1)}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  const interactiveSelector = 'a, button, .btn, .menu-item-card, .gallery-item, .seating-pill-btn';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}

/* ==========================================================================
   10. SCROLL REVEAL ANIMATION SYSTEM
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
