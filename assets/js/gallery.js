const galleryItems = [
  {
    type: 'video',
    src: 'assets/images/gallery/gallery-video2.mov',
    caption: 'Demostración',
  },
  {
    type: 'image',
    src: 'assets/images/gallery/gallery2.jpeg',
    caption: 'Iluminación LED',
  },
  {
    type: 'video',
    src: 'assets/images/gallery/gallery-video1.mov',
    caption: 'Producto en acción',
  },
  {
    type: 'image',
    src: 'assets/images/gallery/gallery1.jpeg',
    caption: 'MegaWatt',
    objectPosition: 'center 22%',
  },
];

function isGalleryVideo(path) {
  return /\.(mp4|webm|mov)$/i.test(path || '');
}

function galleryMediaHtml(item, { preview = true } = {}) {
  if (isGalleryVideo(item.src)) {
    const controls = preview ? '' : 'controls ';
    return `<video src="${item.src}" ${controls}muted playsinline loop autoplay preload="metadata" aria-label="${item.caption}"></video>`;
  }
  const positionStyle = item.objectPosition ? ` style="object-position: ${item.objectPosition}"` : '';
  return `<img src="${item.src}" alt="${item.caption}" loading="lazy"${positionStyle}>`;
}

function gallerySlideHtml(item, index) {
  return `
    <button type="button" class="gallery-slide" data-gallery-index="${index}" aria-label="Abrir: ${item.caption}">
      <span class="gallery-media">${galleryMediaHtml(item)}</span>
      ${item.caption ? `<span class="gallery-caption">${item.caption}</span>` : ''}
      <span class="gallery-zoom-hint" aria-hidden="true">Ampliar</span>
    </button>
  `;
}

function renderGalleryCarousel() {
  const track = document.getElementById('galleryTrack');
  if (!track || !galleryItems.length) return;
  const slides = galleryItems.map(gallerySlideHtml).join('');
  track.innerHTML = slides + slides;
}

function initGalleryDragCarousel() {
  const carousel = document.getElementById('galleryCarousel');
  const track = document.getElementById('galleryTrack');
  if (!carousel || !track || galleryItems.length < 2) return;

  const scrollSpeed = 0.35;
  const dragThreshold = 6;
  const dragResumeDelay = 600;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let offset = 0;
  let paused = reducedMotion;
  let inView = true;
  let loopWidth = 0;
  let rafId = 0;
  let resumeTimer = 0;
  let momentumId = 0;

  let isDragging = false;
  let gestureMode = null;
  let startX = 0;
  let startY = 0;
  let startOffset = 0;
  let moved = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let activePointerId = null;

  const applyTransform = () => {
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  };

  const readCurrentOffset = () => {
    const transform = window.getComputedStyle(track).transform;
    if (!transform || transform === 'none') return offset;
    return -new DOMMatrix(transform).m41;
  };

  const measure = () => {
    loopWidth = track.scrollWidth / 2;
    normalizeOffset();
  };

  const normalizeOffset = () => {
    if (loopWidth <= 0) return;
    while (offset >= loopWidth) offset -= loopWidth;
    while (offset < 0) offset += loopWidth;
    applyTransform();
  };

  const pause = () => {
    paused = true;
  };

  const resume = () => {
    if (!reducedMotion) paused = false;
  };

  const scheduleResume = () => {
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(resume, dragResumeDelay);
  };

  const stopMomentum = () => {
    if (momentumId) {
      cancelAnimationFrame(momentumId);
      momentumId = 0;
    }
  };

  const startMomentum = () => {
    stopMomentum();
    if (Math.abs(velocity) < 0.15) {
      scheduleResume();
      return;
    }

    let lastFrame = performance.now();
    const step = (now) => {
      const dt = now - lastFrame;
      lastFrame = now;
      offset -= velocity * dt;
      velocity *= 0.92;
      normalizeOffset();

      if (Math.abs(velocity) > 0.05) {
        momentumId = requestAnimationFrame(step);
      } else {
        momentumId = 0;
        scheduleResume();
      }
    };
    momentumId = requestAnimationFrame(step);
  };

  const tick = () => {
    if (!paused && !momentumId && inView && loopWidth > 0) {
      offset += scrollSpeed;
      normalizeOffset();
    }
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    measure();
    if (!rafId) rafId = requestAnimationFrame(tick);
  };

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', () => {
      if (!isDragging && !momentumId) resume();
    });
  }

  document.addEventListener('gallery-lightbox-change', (e) => {
    if (e.detail?.open) {
      pause();
      stopMomentum();
      window.clearTimeout(resumeTimer);
    } else {
      scheduleResume();
    }
  });

  const resetGesture = () => {
    isDragging = false;
    gestureMode = null;
    activePointerId = null;
    carousel.classList.remove('is-dragging');
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    stopMomentum();
    window.clearTimeout(resumeTimer);
    pause();

    gestureMode = null;
    isDragging = false;
    activePointerId = e.pointerId;
    moved = 0;
    velocity = 0;
    startX = e.clientX;
    startY = e.clientY;
    lastX = e.clientX;
    lastTime = performance.now();
    startOffset = readCurrentOffset();
    offset = startOffset;
    normalizeOffset();
    startOffset = offset;
  };

  const onPointerMove = (e) => {
    if (activePointerId !== e.pointerId) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (gestureMode === null) {
      if (absDx < dragThreshold && absDy < dragThreshold) return;
      gestureMode = absDx > absDy * 1.1 ? 'horizontal' : 'vertical';
      if (gestureMode === 'horizontal') {
        isDragging = true;
        carousel.classList.add('is-dragging');
        carousel.setPointerCapture(e.pointerId);
      } else {
        return;
      }
    }

    if (gestureMode === 'vertical' || !isDragging) return;

    e.preventDefault();
    const now = performance.now();
    if (now - lastTime > 0) {
      velocity = (e.clientX - lastX) / (now - lastTime);
    }
    lastX = e.clientX;
    lastTime = now;

    moved = Math.max(moved, absDx);
    offset = startOffset - dx;
    normalizeOffset();
    startOffset = offset + dx;
  };

  const onPointerUp = (e) => {
    if (activePointerId !== e.pointerId) return;

    if (isDragging) {
      if (carousel.hasPointerCapture?.(e.pointerId)) {
        carousel.releasePointerCapture(e.pointerId);
      }
      normalizeOffset();

      carousel.querySelectorAll('.gallery-slide').forEach((slide) => {
        slide.dataset.dragged = moved > 10 ? 'true' : 'false';
        if (moved > 10) {
          window.setTimeout(() => {
            slide.dataset.dragged = 'false';
          }, 0);
        }
      });

      if (moved > 10) {
        startMomentum();
      } else {
        resume();
      }
    } else if (gestureMode === 'vertical' || gestureMode === null) {
      resume();
    }

    resetGesture();
  };

  carousel.addEventListener('pointerdown', onPointerDown);
  carousel.addEventListener('pointermove', onPointerMove, { passive: false });
  carousel.addEventListener('pointerup', onPointerUp);
  carousel.addEventListener('pointercancel', onPointerUp);

  carousel.addEventListener(
    'wheel',
    (e) => {
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!delta || isDragging) return;

      e.preventDefault();
      stopMomentum();
      pause();
      window.clearTimeout(resumeTimer);
      offset = readCurrentOffset();
      offset += delta;
      normalizeOffset();
      scheduleResume();
    },
    { passive: false }
  );

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(carousel);
  } else {
    window.addEventListener('resize', measure, { passive: true });
  }

  window.addEventListener(
    'orientationchange',
    () => window.setTimeout(measure, 250),
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

function ensureGalleryLightbox() {
  let lightbox = document.getElementById('galleryLightbox');
  if (lightbox) return lightbox;

  lightbox = document.createElement('div');
  lightbox.id = 'galleryLightbox';
  lightbox.className = 'gallery-lightbox';
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="gallery-lightbox-backdrop" data-gallery-close></div>
    <div class="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Galería ampliada">
      <button type="button" class="gallery-lightbox-close" data-gallery-close aria-label="Cerrar galería">×</button>
      <button type="button" class="gallery-lightbox-nav gallery-lightbox-prev" data-gallery-prev aria-label="Anterior">‹</button>
      <button type="button" class="gallery-lightbox-nav gallery-lightbox-next" data-gallery-next aria-label="Siguiente">›</button>
      <div class="gallery-lightbox-stage" id="galleryLightboxStage"></div>
      <p class="gallery-lightbox-caption" id="galleryLightboxCaption"></p>
      <p class="gallery-lightbox-swipe-hint" aria-hidden="true">Desliza para ver más</p>
    </div>
  `;
  document.body.appendChild(lightbox);
  return lightbox;
}

function initGalleryLightbox() {
  const lightbox = ensureGalleryLightbox();
  const stage = document.getElementById('galleryLightboxStage');
  const captionEl = document.getElementById('galleryLightboxCaption');
  let activeIndex = 0;
  let lastFocus = null;
  let swipeStartX = 0;
  let swipeStartY = 0;

  const renderSlide = (index, direction = 0) => {
    const item = galleryItems[index];
    if (!item || !stage) return;

    activeIndex = index;
    stage.classList.remove('slide-from-left', 'slide-from-right');
    if (direction < 0) stage.classList.add('slide-from-left');
    if (direction > 0) stage.classList.add('slide-from-right');

    stage.innerHTML = `<div class="gallery-lightbox-media">${galleryMediaHtml(item, { preview: false })}</div>`;
    if (captionEl) captionEl.textContent = item.caption || '';

    const video = stage.querySelector('video');
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {});
    }

    window.requestAnimationFrame(() => {
      stage.classList.remove('slide-from-left', 'slide-from-right');
    });
  };

  const open = (index) => {
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    lightbox.classList.add('open');
    document.body.classList.add('gallery-lightbox-open');
    document.dispatchEvent(new CustomEvent('gallery-lightbox-change', { detail: { open: true } }));
    renderSlide(index);
    lightbox.querySelector('.gallery-lightbox-close')?.focus();
  };

  const close = () => {
    stage?.querySelectorAll('video').forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
    lightbox.classList.remove('open');
    lightbox.hidden = true;
    document.body.classList.remove('gallery-lightbox-open');
    document.dispatchEvent(new CustomEvent('gallery-lightbox-change', { detail: { open: false } }));
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  const showNext = (step) => {
    const next = (activeIndex + step + galleryItems.length) % galleryItems.length;
    renderSlide(next, step);
  };

  document.getElementById('galleryTrack')?.addEventListener('click', (e) => {
    const slide = e.target.closest('.gallery-slide');
    if (!slide || slide.dataset.dragged === 'true') return;
    open(Number(slide.dataset.galleryIndex));
  });

  document.getElementById('galleryOpenBtn')?.addEventListener('click', () => open(0));

  lightbox.querySelectorAll('[data-gallery-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  lightbox.querySelector('[data-gallery-prev]')?.addEventListener('click', () => showNext(-1));
  lightbox.querySelector('[data-gallery-next]')?.addEventListener('click', () => showNext(1));

  const onSwipeStart = (x, y) => {
    swipeStartX = x;
    swipeStartY = y;
  };

  const onSwipeEnd = (x, y) => {
    const dx = x - swipeStartX;
    const dy = y - swipeStartY;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    showNext(dx < 0 ? 1 : -1);
  };

  stage?.addEventListener(
    'touchstart',
    (e) => {
      onSwipeStart(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    },
    { passive: true }
  );

  stage?.addEventListener(
    'touchend',
    (e) => {
      onSwipeEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    },
    { passive: true }
  );

  stage?.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    onSwipeStart(e.clientX, e.clientY);
  });

  stage?.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'touch') return;
    onSwipeEnd(e.clientX, e.clientY);
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
}

function initGallery() {
  renderGalleryCarousel();
  initGalleryDragCarousel();
  initGalleryLightbox();
}
