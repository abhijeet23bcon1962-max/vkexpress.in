/* =============================================
   VK EXPRESS — SLIDESHOW & GALLERY JS
   ============================================= */

(function () {

  // ── HERO SLIDESHOW ──────────────────────────
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  const counterEl = document.getElementById('slideCurrentNum');
  const progressBar = document.getElementById('slideProgressBar');

  let current  = 0;
  let autoTimer = null;
  let progressTimer = null;
  const SLIDE_DURATION = 5000; // ms
  const PROGRESS_TICK  = 50;

  function goTo(index) {
    slides[current].classList.remove('active');
    slides[current].classList.add('prev');
    dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    // Clean up prev class after transition
    slides.forEach((s, i) => { if (i !== current) setTimeout(() => s.classList.remove('prev'), 1000); });
    dots[current].classList.add('active');
    if (counterEl) counterEl.textContent = current + 1;

    resetProgress();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Progress bar
  let progressPct = 0;
  function resetProgress() {
    clearInterval(progressTimer);
    progressPct = 0;
    if (progressBar) progressBar.style.width = '0%';
    progressTimer = setInterval(() => {
      progressPct += (PROGRESS_TICK / SLIDE_DURATION) * 100;
      if (progressBar) progressBar.style.width = progressPct + '%';
      if (progressPct >= 100) clearInterval(progressTimer);
    }, PROGRESS_TICK);
  }

  // Auto play
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, SLIDE_DURATION);
    resetProgress();
  }
  function stopAuto() {
    clearInterval(autoTimer);
    clearInterval(progressTimer);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { prev(); startAuto(); }
    if (e.key === 'ArrowRight') { next(); startAuto(); }
  });

  // Touch swipe
  let touchStartX = 0;
  const slidesWrapper = document.getElementById('slidesWrapper');
  if (slidesWrapper) {
    slidesWrapper.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    slidesWrapper.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); startAuto(); }
    }, { passive: true });
  }

  // Pause on hover
  const heroSection = document.getElementById('heroSlideshow');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAuto);
    heroSection.addEventListener('mouseleave', startAuto);
  }

  startAuto();


  // ── GALLERY DRAWER ───────────────────────────
  const galleryImages = [
    { src: 'master_page_img/14.jpg',    caption: 'Our Team' },
    { src: 'master_page_img/15.jpg',    caption: 'Delivery Fleet' },
    { src: 'master_page_img/16.jpg',    caption: 'International Shipping' },
    { src: 'master_page_img/17.jpg',    caption: 'Cargo Handling' },
    { src: 'master_page_img/20.jpg',    caption: 'Food Express' },
    { src: 'master_page_img/21.png',    caption: 'Franchise Network' },
    { src: 'master_page_img/frachise.jpg', caption: 'Franchisee Partners' },
    { src: 'master_page_img/mapindia.jpg', caption: 'Pan-India Network' },
  ];

  let galleryOpen = false;

  window.toggleGallery = function () {
    galleryOpen = !galleryOpen;
    const body   = document.getElementById('gdBody');
    const arrow  = document.getElementById('gdArrow');
    const toggle = document.getElementById('gdToggleText');
    if (body)  body.classList.toggle('open', galleryOpen);
    if (arrow) arrow.classList.toggle('open', galleryOpen);
    if (toggle) toggle.textContent = galleryOpen ? 'Close Gallery' : 'View Gallery';
  };

  // Make drawer header clickable too
  const gdHeader = document.querySelector('.gd-header');
  if (gdHeader) gdHeader.addEventListener('click', e => {
    if (!e.target.closest('.gd-toggle')) window.toggleGallery();
  });


  // ── LIGHTBOX ─────────────────────────────────
  let lbIndex = 0;

  window.openLightbox = function (index) {
    lbIndex = index;
    const lb  = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (!lb || !img) return;
    img.src = galleryImages[lbIndex].src;
    if (cap) cap.textContent = galleryImages[lbIndex].caption;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.moveLightbox = function (dir) {
    lbIndex = (lbIndex + dir + galleryImages.length) % galleryImages.length;
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (img) { img.style.opacity = 0; setTimeout(() => { img.src = galleryImages[lbIndex].src; img.style.opacity = 1; }, 200); }
    if (cap) cap.textContent = galleryImages[lbIndex].caption;
  };

  // Keyboard for lightbox
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape')      window.closeLightbox();
    if (e.key === 'ArrowLeft')   window.moveLightbox(-1);
    if (e.key === 'ArrowRight')  window.moveLightbox(1);
  });


  // ── WHY SECTION MINI SLIDER ──────────────────
  const whySlides = document.querySelectorAll('.why-slide');
  const whyDots   = document.querySelectorAll('.wd');
  let whyCurrent  = 0;

  function goWhySlide(index) {
    whySlides[whyCurrent].classList.remove('active');
    whyDots[whyCurrent].classList.remove('active');
    whyCurrent = (index + whySlides.length) % whySlides.length;
    whySlides[whyCurrent].classList.add('active');
    whyDots[whyCurrent].classList.add('active');
  }

  whyDots.forEach((dot, i) => dot.addEventListener('click', () => goWhySlide(i)));
  setInterval(() => goWhySlide(whyCurrent + 1), 3500);


  // ── ANIMATED COUNTERS ─────────────────────────
  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 1800;
    const step = 20;
    const increment = Math.ceil(target / (duration / step));
    const timer = setInterval(() => {
      start = Math.min(start + increment, target);
      el.textContent = start.toLocaleString('en-IN') + (suffix || '');
      if (start >= target) clearInterval(timer);
    }, step);
  }

  const counterEls = document.querySelectorAll('.stat-num[data-target]');
  if (counterEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = target >= 1000 ? '+' : '+';
          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => observer.observe(el));
  }


  // ── STICKY HEADER SHRINK ─────────────────────
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
        header.style.background = 'rgba(255,255,255,0.97)';
      } else {
        header.style.boxShadow = '';
        header.style.background = '';
      }
    }, { passive: true });
  }


})();
