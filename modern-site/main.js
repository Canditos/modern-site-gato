import './style.css';
import { translations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  
  // Mobile Menu Logic
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navContainer = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navContainer.classList.toggle('mobile-active');
      document.body.style.overflow = navContainer.classList.contains('mobile-active') ? 'hidden' : '';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navContainer.classList.remove('mobile-active');
      document.body.style.overflow = '';
    });
  });

  // Instagram Feed Logic (Optimized with Lazy Loading)
  const instaGrid = document.getElementById('insta-feed');
  if (instaGrid) {
    const loadInstaFeed = () => {
      fetch('https://feeds.behold.so/qp0v4rwzcjNHNy0krpGQ')
        .then(response => response.json())
        .then(data => {
          instaGrid.innerHTML = ''; // Clear loader
          const posts = data.posts.slice(0, 4);
          
          posts.forEach(post => {
            const postElement = document.createElement('a');
            postElement.href = post.permalink;
            postElement.target = '_blank';
            postElement.className = 'insta-item';
            
            const imgUrl = (post.mediaType === 'VIDEO' || post.isReel) ? post.thumbnailUrl : post.mediaUrl;
            const isVideo = post.mediaType === 'VIDEO' || post.isReel;
            const viewText = translations[currentLang]["insta-view"] || "Ver no Instagram";
            
            postElement.innerHTML = `
              <img src="${imgUrl}" alt="Instagram post" loading="lazy">
              <div class="insta-overlay">
                <span class="insta-icon">${isVideo ? '▶️' : '📸'}</span>
                <span data-i18n="insta-view">${viewText}</span>
              </div>
              ${isVideo ? '<div class="video-tag">Reel</div>' : ''}
            `;
            instaGrid.appendChild(postElement);
          });
        })
        .catch(error => {
          console.error('Error fetching Instagram feed:', error);
          const errorText = translations[currentLang]["insta-error"] || "Não foi possível carregar o feed.";
          instaGrid.innerHTML = `<p class="insta-loader">${errorText}</p>`;
        });
    };

    // Only load when visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadInstaFeed();
        observer.disconnect(); // Only load once
      }
    }, { threshold: 0.1 });
    observer.observe(instaGrid);
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = navbar?.offsetHeight || 80;
        const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(targetTop - headerHeight, 0),
          behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Touch-friendly team cards: avoid sticky mobile hover states.
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.view-more-btn')) return;
      if (!window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
      document.querySelectorAll('.team-card.hover').forEach(openCard => {
        if (openCard !== card) openCard.classList.remove('hover');
      });
      card.classList.toggle('hover');
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.team-card')) return;
    document.querySelectorAll('.team-card.hover').forEach(card => card.classList.remove('hover'));
  });

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
      navbar.style.background = 'var(--glass-bg)';
      navbar.style.boxShadow = 'none';
    }
    
    // Highlight active section
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
    });
  });

  // --- State & Translations ---
  let currentLang = 'pt';

  // --- Modal Elements ---
  const teamModal = document.getElementById('teamModal');
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalImageContainer = serviceModal?.querySelector('.modal-image-container');
  const bookingMainContent = document.getElementById('bookingMainContent');
  const bookingOptions = document.getElementById('bookingOptions');
  let serviceGalleryTimer;

  const serviceGalleries = {
    RE: ['RE01.avif', 'RE02.avif', 'RE03.avif', 'RE04.avif', 'RE05.avif'],
    MP: ['MP01.avif', 'MP02.avif', 'MP03.avif', 'MP04.avif', 'MP05.avif', 'MP06.avif', 'MP07.avif'],
    CG: ['CG01.avif', 'CG02.avif', 'CG03.avif', 'CG04.avif', 'CG05.avif', 'CG06.avif', 'CG07.avif', 'CG08.avif'],
    AC: ['AC01.avif', 'AC02.avif', 'AC03.avif'],
    LAB: ['LAB01.avif', 'LAB02.avif', 'LAB03.avif', 'LAB04.avif'],
    CI: ['CI01.avif', 'CI02.avif', 'CI03.avif', 'CI04.avif', 'CI05.avif', 'CI06.avif'],
    INT: ['INT01.avif', 'INT02.avif', 'INT03.avif', 'INT04.avif', 'INT05.avif'],
    ECO: ['ECO01.avif', 'ECO02.avif', 'ECO03.avif', 'ECO04.avif', 'ECO05.avif'],
    ECG: ['ECG01.avif', 'ECG02.avif', 'ECG03.avif', 'ECG04.avif'],
    ORT: ['ORT01.avif', 'ORT02.avif', 'ORT03.avif', 'ORTO04.avif'],
    DE: ['DE01.avif', 'DE02.avif', 'DE03.avif'],
    EX: ['EX01.avif', 'EX02.avif']
  };

  const stopServiceGallery = () => {
    if (serviceGalleryTimer) {
      clearInterval(serviceGalleryTimer);
      serviceGalleryTimer = null;
    }
  };

  const renderServiceImage = (src, alt = '') => {
    stopServiceGallery();
    if (!serviceModalImageContainer) return;

    serviceModalImageContainer.classList.remove('service-gallery', 'booking-image');
    serviceModalImageContainer.innerHTML = `<img id="serviceModalImg" class="modal-main-img" src="${src}" alt="${alt}">`;
  };

  const renderServiceGallery = (galleryKey, fallbackImage, alt = '') => {
    const filenames = serviceGalleries[galleryKey];
    const images = filenames?.length
      ? filenames.map(filename => `/images/Servicos/${filename}`)
      : [fallbackImage];

    stopServiceGallery();
    if (!serviceModalImageContainer) return;

    serviceModalImageContainer.classList.remove('booking-image');
    serviceModalImageContainer.classList.add('service-gallery');
    serviceModalImageContainer.innerHTML = images.map((src, index) => (
      `<img class="service-gallery-img${index === 0 ? ' active' : ''}" src="${src}" alt="${alt}" loading="${index === 0 ? 'eager' : 'lazy'}">`
    )).join('');

    if (images.length < 2) return;

    let activeIndex = 0;
    const slides = serviceModalImageContainer.querySelectorAll('.service-gallery-img');
    serviceGalleryTimer = setInterval(() => {
      slides[activeIndex]?.classList.remove('active');
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex]?.classList.add('active');
    }, 3600);
  };

  const showBookingOptions = () => {
    bookingMainContent?.classList.add('hidden');
    bookingOptions?.classList.remove('hidden');
  };

  const showServiceModal = (btn) => {
    const i18nKey = btn.parentElement.querySelector('[data-i18n]')?.getAttribute('data-i18n')?.replace('-title', '');
    let title = btn.getAttribute('data-title');
    let desc = btn.getAttribute('data-desc');
    const image = btn.getAttribute('data-image');
    const galleryKey = btn.getAttribute('data-service-gallery');

    if (i18nKey && translations[currentLang][`${i18nKey}-title`]) {
      title = translations[currentLang][`${i18nKey}-title`];
      desc = translations[currentLang][`${i18nKey}-desc`];
    }

    document.getElementById('serviceModalTitle').textContent = title;
    document.getElementById('serviceModalDesc').textContent = desc;
    renderServiceGallery(galleryKey, image, title);
    
    // Reset modal state
    bookingMainContent?.classList.remove('hidden');
    bookingOptions?.classList.add('hidden');
    
    serviceModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const showTeamModal = (btn) => {
    const i18nKey = btn.getAttribute('data-i18n-key');
    let name = btn.getAttribute('data-name');
    let role = btn.getAttribute('data-role');
    let bio = btn.getAttribute('data-bio');
    let hobbies = btn.getAttribute('data-hobbies');
    const image = btn.getAttribute('data-image');

    if (i18nKey && translations[currentLang][`team-${i18nKey}-bio`]) {
      role = translations[currentLang][`team-${i18nKey}-role`];
      bio = translations[currentLang][`team-${i18nKey}-bio`];
      hobbies = translations[currentLang][`team-${i18nKey}-hobbies`] || hobbies;
    }

    document.getElementById('modalName').textContent = name;
    document.getElementById('modalRole').textContent = role;
    document.getElementById('modalBio').textContent = bio;
    document.getElementById('modalHobbies').textContent = hobbies;
    document.getElementById('modalImg').src = image;
    teamModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  // Event Delegation
  document.addEventListener('click', (e) => {
    const serviceBtn = e.target.closest('.view-service-btn');
    if (serviceBtn) { showServiceModal(serviceBtn); return; }

    const teamBtn = e.target.closest('.view-more-btn');
    if (teamBtn) { showTeamModal(teamBtn); return; }

    if (e.target.id === 'navBookBtn' || e.target.id === 'heroBookBtn') {
      document.getElementById('serviceModalTitle').textContent = translations[currentLang]["modal-book-main"];
      document.getElementById('serviceModalDesc').textContent = translations[currentLang]["modal-book-choice"];
      renderServiceImage('/images/booking_illustration.webp', translations[currentLang]["modal-book-main"]);
      serviceModalImageContainer?.classList.add('booking-image');
      showBookingOptions();
      serviceModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      return;
    }

    if (e.target.classList.contains('close-service-modal') || e.target === serviceModal) {
      stopServiceGallery();
      serviceModal.classList.remove('show');
      document.body.style.overflow = '';
    }
    if (e.target.classList.contains('close-modal') || e.target === teamModal) {
      teamModal.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (e.target.id === 'bookServiceMain') {
      showBookingOptions();
    }
    if (e.target.id === 'backToBook') {
      bookingMainContent.classList.remove('hidden');
      bookingOptions.classList.add('hidden');
    }
  });

  const switchLang = (lang) => {
    if (!translations[lang]) return;
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    
    // Update team roles on cards
    document.querySelectorAll('.team-card').forEach(card => {
        const btn = card.querySelector('.view-more-btn');
        const key = btn?.getAttribute('data-i18n-key');
        if (key && translations[lang][`team-${key}-role`]) {
            card.querySelector('.role').textContent = translations[lang][`team-${key}-role`];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en-US';
  };

  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => switchLang(btn.getAttribute('data-lang'))));

  // --- Slider Logic ---
  const slides = document.querySelectorAll('.slide');
  const thumbs = document.querySelectorAll('.thumb');
  let currentSlide = 0;
  let slideInterval;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    thumbs[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    thumbs[currentSlide].classList.add('active');
  };

  const startSlider = () => {
    if(slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  };

  if (slides.length > 0) {
    document.querySelector('.next-btn')?.addEventListener('click', () => { goToSlide(currentSlide + 1); startSlider(); });
    document.querySelector('.prev-btn')?.addEventListener('click', () => { goToSlide(currentSlide - 1); startSlider(); });
    thumbs.forEach((t, i) => t.addEventListener('click', () => { goToSlide(i); startSlider(); }));
    startSlider();
  }

  // --- Reviews Fade Slider ---
  const reviewCards = document.querySelectorAll('.review-card');
  const reviewDots = document.querySelector('.review-dots');
  let currentReview = 0;
  let reviewInterval;

  const renderReviewDots = () => {
    if (!reviewDots) return;
    reviewDots.innerHTML = '';
    reviewCards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `review-dot${index === currentReview ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Mostrar crítica ${index + 1}`);
      dot.addEventListener('click', () => {
        goToReview(index);
        startReviews();
      });
      reviewDots.appendChild(dot);
    });
  };

  const goToReview = (index) => {
    if (!reviewCards.length) return;
    reviewCards[currentReview].classList.remove('active');
    currentReview = (index + reviewCards.length) % reviewCards.length;
    reviewCards[currentReview].classList.add('active');
    reviewDots?.querySelectorAll('.review-dot').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentReview);
    });
  };

  const startReviews = () => {
    if (reviewInterval) clearInterval(reviewInterval);
    reviewInterval = setInterval(() => goToReview(currentReview + 1), 5500);
  };

  if (reviewCards.length > 0) {
    renderReviewDots();
    document.querySelector('.review-next')?.addEventListener('click', () => { goToReview(currentReview + 1); startReviews(); });
    document.querySelector('.review-prev')?.addEventListener('click', () => { goToReview(currentReview - 1); startReviews(); });
    startReviews();
  }

  // --- Lightbox Logic ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightboxModal) {
    document.querySelectorAll('.lightbox-trigger').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });
    const hideLightbox = () => {
      lightboxModal.classList.remove('show');
      document.body.style.overflow = '';
    };
    document.querySelector('.close-lightbox')?.addEventListener('click', hideLightbox);
    lightboxModal.addEventListener('click', (e) => { if (e.target === lightboxModal) hideLightbox(); });
  }

  // Reveal Animation
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
