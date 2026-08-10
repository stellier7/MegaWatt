function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initHeroParallax() {
  const heroMark = document.getElementById('heroMark');
  if (!heroMark) return;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      heroMark.style.transform = `translateY(${y * 0.18}px) scale(${Math.max(1 - y * 0.0006, 0.85)})`;
    },
    { passive: true }
  );
}

function initBoltField() {
  const boltField = document.getElementById('boltField');
  if (!boltField) return;
  for (let i = 0; i < 7; i++) {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('width', String(40 + Math.random() * 90));
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
    s.innerHTML = '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="#E8611F"/>';
    boltField.appendChild(s);
  }
}

function initCardTilt() {
  document.querySelectorAll('.nfc-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
    });
  });
}

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add('in');
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

function initAutoCarousel(track, carousel, options = {}) {
  if (!track || !carousel) return;

  const speed = options.speed ?? 0.55;
  const staticClass = options.staticClass ?? 'auto-carousel--static';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    carousel.classList.add(staticClass);
    return;
  }

  let offset = 0;
  let paused = false;
  let inView = true;
  let loopWidth = 0;
  let rafId = 0;

  const measure = () => {
    loopWidth = track.scrollWidth / 2;
    if (loopWidth > 0) offset %= loopWidth;
  };

  const pause = () => {
    paused = true;
  };
  const resume = () => {
    paused = false;
  };

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', resume);
  }

  carousel.addEventListener(
    'touchstart',
    () => {
      paused = true;
    },
    { passive: true }
  );
  carousel.addEventListener(
    'touchend',
    () => {
      window.setTimeout(resume, 400);
    },
    { passive: true }
  );
  carousel.addEventListener('touchcancel', resume, { passive: true });

  const tick = () => {
    if (!paused && inView && loopWidth > 0) {
      offset += speed;
      if (offset >= loopWidth) offset -= loopWidth;
      track.style.transform = `translate3d(-${offset}px, 0, 0)`;
    }
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    measure();
    if (!rafId) rafId = requestAnimationFrame(tick);
  };

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(measure);
    ro.observe(track);
  }

  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener(
    'orientationchange',
    () => {
      window.setTimeout(measure, 250);
    },
    { passive: true }
  );

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        if (inView) measure();
      },
      { threshold: 0.08 }
    );
    io.observe(carousel);
  }

  start();

  track.querySelectorAll('img, video').forEach((el) => {
    el.addEventListener('load', measure, { once: true });
    el.addEventListener('loadeddata', measure, { once: true });
    el.addEventListener('error', measure, { once: true });
  });

  window.setTimeout(measure, 400);
  window.setTimeout(measure, 1500);
}

function initFeaturedCarousel() {
  initAutoCarousel(
    document.getElementById('featuredTrack'),
    document.getElementById('featuredCarousel'),
    { speed: 0.55, staticClass: 'featured-carousel--static' }
  );
}

function initLanding() {
  initHeroParallax();
  initBoltField();
  initCardTilt();
  initReveal();
  initFeaturedCarousel();
}
