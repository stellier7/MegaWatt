const galleryItems = [
  {
    type: 'image',
    src: 'assets/images/gallery/gallery1.jpeg',
    caption: 'Instalación MegaWatt',
  },
  {
    type: 'video',
    src: 'assets/images/gallery/gallery-video1.mov',
    caption: 'Producto en acción',
  },
  {
    type: 'image',
    src: 'assets/images/gallery/gallery2.jpeg',
    caption: 'Iluminación LED',
  },
  {
    type: 'video',
    src: 'assets/images/gallery/gallery-video2.mov',
    caption: 'Demostración',
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
  return `<img src="${item.src}" alt="${item.caption}" loading="lazy">`;
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

  let offset = 0;
  let loopWidth = 0;
  let isDragging = false;
  let startX = 0;
  let startOffset = 0;
  let moved = 0;
  let velocity = 0;
  let lastX = 0;
  let lastTime = 0;
  let momentumId = 0;
  let snapAnimId = 0;
  let wheelSnapTimer = 0;

  const applyTransform = () => {
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  };

  const getSlidePitch = () => {
    const slides = track.querySelectorAll('.gallery-slide');
    if (slides.length < 2) {
      const slide = slides[0];
      return slide ? slide.offsetWidth + 20 : 360;
    }
    return slides[1].offsetLeft - slides[0].offsetLeft;
  };

  const getSlide0BaseOffset = () => {
    const slide = track.querySelector('.gallery-slide');
    if (!slide) return 0;
    return slide.offsetLeft + slide.offsetWidth / 2 - carousel.clientWidth / 2;
  };

  const repositionLoop = () => {
    if (loopWidth <= 0) return;
    const before = offset;
    while (offset >= loopWidth) offset -= loopWidth;
    while (offset < 0) offset += loopWidth;
    if (offset !== before) applyTransform();
  };

  const stopMomentum = () => {
    if (momentumId) {
      cancelAnimationFrame(momentumId);
      momentumId = 0;
    }
  };

  const stopSnap = () => {
    if (snapAnimId) {
      cancelAnimationFrame(snapAnimId);
      snapAnimId = 0;
    }
    track.classList.remove('is-snapping');
  };

  const findSnapOffset = ({ releaseVelocity = 0 } = {}) => {
    const pitch = getSlidePitch();
    if (pitch <= 0) return offset;

    const base = getSlide0BaseOffset();
    const relative = (offset - base) / pitch;
    const threshold = 0.12;
    const nearest = Math.round(relative);
    const delta = relative - nearest;

    let index = nearest;
    if (delta > threshold || releaseVelocity < -0.08) {
      index = nearest + 1;
    } else if (delta < -threshold || releaseVelocity > 0.08) {
      index = nearest - 1;
    }

    let target = base + index * pitch;
    const span = loopWidth || pitch * galleryItems.length;

    while (target - offset > span / 2) target -= span;
    while (target - offset < -span / 2) target += span;

    return target;
  };

  const snapToNearest = (releaseVelocity = 0) => {
    if (loopWidth <= 0 || isDragging) return;

    const target = findSnapOffset({ releaseVelocity });
    if (Math.abs(target - offset) < 1) {
      offset = target;
      repositionLoop();
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      offset = target;
      repositionLoop();
      return;
    }

    stopSnap();
    track.classList.add('is-snapping');

    const start = offset;
    const distance = target - start;
    const duration = 280;
    const startTime = performance.now();

    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      offset = start + distance * eased;
      applyTransform();

      if (t < 1) {
        snapAnimId = requestAnimationFrame(tick);
        return;
      }

      snapAnimId = 0;
      track.classList.remove('is-snapping');
      offset = target;
      repositionLoop();
    };

    snapAnimId = requestAnimationFrame(tick);
  };

  const measure = () => {
    loopWidth = track.scrollWidth / 2;
    applyTransform();
  };

  const startMomentum = (onDone) => {
    stopMomentum();
    const step = () => {
      if (Math.abs(velocity) < 0.08) {
        momentumId = 0;
        onDone?.();
        return;
      }
      offset -= velocity;
      velocity *= 0.93;
      applyTransform();
      momentumId = requestAnimationFrame(step);
    };
    momentumId = requestAnimationFrame(step);
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    stopMomentum();
    stopSnap();
    if (wheelSnapTimer) {
      clearTimeout(wheelSnapTimer);
      wheelSnapTimer = 0;
    }
    isDragging = true;
    moved = 0;
    startX = e.clientX;
    lastX = e.clientX;
    lastTime = performance.now();
    startOffset = offset;
    velocity = 0;
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const now = performance.now();
    const delta = e.clientX - startX;
    moved = Math.max(moved, Math.abs(delta));

    if (now - lastTime > 0) {
      velocity = (e.clientX - lastX) / (now - lastTime);
    }
    lastX = e.clientX;
    lastTime = now;

    offset = startOffset - delta;
    applyTransform();
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    carousel.classList.remove('is-dragging');
    if (carousel.hasPointerCapture?.(e.pointerId)) {
      carousel.releasePointerCapture(e.pointerId);
    }

    carousel.querySelectorAll('.gallery-slide').forEach((slide) => {
      slide.dataset.dragged = moved > 10 ? 'true' : 'false';
      if (moved > 10) {
        window.setTimeout(() => {
          slide.dataset.dragged = 'false';
        }, 0);
      }
    });

    if (moved <= 10) return;

    const releaseVelocity = velocity;
    if (Math.abs(releaseVelocity) > 0.18) {
      startMomentum(() => snapToNearest(releaseVelocity));
    } else {
      snapToNearest(releaseVelocity);
    }
  };

  carousel.addEventListener('pointerdown', onPointerDown);
  carousel.addEventListener('pointermove', onPointerMove);
  carousel.addEventListener('pointerup', onPointerUp);
  carousel.addEventListener('pointercancel', onPointerUp);

  carousel.addEventListener(
    'wheel',
    (e) => {
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!delta) return;

      e.preventDefault();
      stopMomentum();
      stopSnap();
      offset += delta * 1.45;
      applyTransform();

      if (wheelSnapTimer) clearTimeout(wheelSnapTimer);
      wheelSnapTimer = window.setTimeout(() => {
        wheelSnapTimer = 0;
        snapToNearest();
      }, 90);
    },
    { passive: false }
  );

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => {
      measure();
      snapToNearest();
    });
    ro.observe(track);
    ro.observe(carousel);
  } else {
    window.addEventListener(
      'resize',
      () => {
        measure();
        snapToNearest();
      },
      { passive: true }
    );
  }

  window.addEventListener(
    'orientationchange',
    () => {
      window.setTimeout(() => {
        measure();
        snapToNearest();
      }, 250);
    },
    { passive: true }
  );

  measure();
  window.requestAnimationFrame(snapToNearest);
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
