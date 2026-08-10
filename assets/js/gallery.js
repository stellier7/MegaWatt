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
  track.innerHTML = slides + slides + slides;
}

function initGalleryInfiniteScroll() {
  const carousel = document.getElementById('galleryCarousel');
  const track = document.getElementById('galleryTrack');
  if (!carousel || !track || galleryItems.length < 2) return;

  let setWidth = 0;
  let isJumping = false;

  const measure = () => {
    setWidth = track.scrollWidth / 3;
  };

  const jumpToMiddle = () => {
    measure();
    if (setWidth > 0) {
      isJumping = true;
      carousel.scrollLeft = setWidth;
      isJumping = false;
    }
  };

  const normalizeScroll = () => {
    if (isJumping || !setWidth) return;

    const x = carousel.scrollLeft;
    const edge = Math.max(8, carousel.clientWidth * 0.02);

    if (x >= setWidth * 2 - edge) {
      isJumping = true;
      carousel.scrollLeft = x - setWidth;
      isJumping = false;
    } else if (x <= edge) {
      isJumping = true;
      carousel.scrollLeft = x + setWidth;
      isJumping = false;
    }
  };

  jumpToMiddle();

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => {
      const ratio = setWidth > 0 ? carousel.scrollLeft / setWidth : 1;
      measure();
      if (setWidth > 0) {
        isJumping = true;
        carousel.scrollLeft = setWidth * Math.min(Math.max(ratio, 1), 2);
        isJumping = false;
      }
    });
    ro.observe(track);
  }

  window.addEventListener(
    'orientationchange',
    () => {
      window.setTimeout(jumpToMiddle, 250);
    },
    { passive: true }
  );

  carousel.addEventListener('scroll', normalizeScroll, { passive: true });

  return normalizeScroll;
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

  const renderSlide = (index) => {
    const item = galleryItems[index];
    if (!item || !stage) return;

    activeIndex = index;
    stage.innerHTML = `<div class="gallery-lightbox-media">${galleryMediaHtml(item, { preview: false })}</div>`;
    if (captionEl) captionEl.textContent = item.caption || '';

    const video = stage.querySelector('video');
    if (video) {
      video.muted = false;
      video.play().catch(() => {});
    }
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
    renderSlide(next);
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

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
}

function initGalleryScroll() {
  const carousel = document.getElementById('galleryCarousel');
  if (!carousel) return;

  const normalizeScroll = initGalleryInfiniteScroll();

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let moved = 0;

  carousel.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.gallery-lightbox')) return;
    isDown = true;
    moved = 0;
    startX = e.clientX;
    scrollLeft = carousel.scrollLeft;
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture(e.pointerId);
  });

  carousel.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const walk = e.clientX - startX;
    moved = Math.max(moved, Math.abs(walk));
    carousel.scrollLeft = scrollLeft - walk;
  });

  const endDrag = (e) => {
    if (!isDown) return;
    isDown = false;
    carousel.classList.remove('is-dragging');
    if (carousel.hasPointerCapture?.(e.pointerId)) {
      carousel.releasePointerCapture(e.pointerId);
    }

    normalizeScroll?.();

    carousel.querySelectorAll('.gallery-slide').forEach((slide) => {
      slide.dataset.dragged = moved > 8 ? 'true' : 'false';
      if (moved > 8) {
        setTimeout(() => {
          slide.dataset.dragged = 'false';
        }, 0);
      }
    });
  };

  carousel.addEventListener('pointerup', endDrag);
  carousel.addEventListener('pointercancel', endDrag);
  carousel.addEventListener('pointerleave', endDrag);
}

function initGallery() {
  renderGalleryCarousel();
  initGalleryLightbox();
  initGalleryScroll();
}
