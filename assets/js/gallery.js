const galleryItems = [
  {
    type: 'image',
    src: 'assets/images/gallery/gallery-01.jpeg',
    caption: 'Instalación MegaWatt',
  },
  {
    type: 'video',
    src: 'assets/images/gallery/gallery-01.mp4',
    caption: 'Producto en acción',
  },
  {
    type: 'image',
    src: 'assets/images/gallery/gallery-02.jpeg',
    caption: 'Iluminación LED',
  },
  {
    type: 'video',
    src: 'assets/images/gallery/gallery-02.mp4',
    caption: 'Demostración',
  },
];

function isGalleryVideo(path) {
  return /\.(mp4|webm|mov)$/i.test(path || '');
}

function gallerySlideHtml(item) {
  const media = isGalleryVideo(item.src)
    ? `<video src="${item.src}" muted playsinline loop autoplay preload="metadata" aria-label="${item.caption}"></video>`
    : `<img src="${item.src}" alt="${item.caption}" loading="lazy">`;

  return `
    <figure class="gallery-slide">
      <div class="gallery-media">${media}</div>
      ${item.caption ? `<figcaption class="gallery-caption">${item.caption}</figcaption>` : ''}
    </figure>
  `;
}

function renderGalleryCarousel() {
  const track = document.getElementById('galleryTrack');
  if (!track || !galleryItems.length) return;

  const slides = galleryItems.map(gallerySlideHtml).join('');
  track.innerHTML = slides + slides;
}

function initGallery() {
  renderGalleryCarousel();
}
