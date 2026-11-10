// Foodie Cafe: shared JavaScript for all four pages

// Restore saved theme preference and update the theme button.
const themeButton = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('foodieCafeTheme');
if (savedTheme === 'dark') document.body.classList.add('dark');

function updateThemeButton() {
  if (themeButton) themeButton.textContent = document.body.classList.contains('dark') ? '☀️ Light mode' : '🌙 Dark mode';
}
updateThemeButton();

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('foodieCafeTheme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeButton();
  });
}

// Mobile navigation menu.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });
}

// Gallery lightbox: click an image to enlarge it.
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.lightbox-close');
  document.querySelectorAll('.gallery-grid img').forEach((photo) => {
    photo.addEventListener('click', () => {
      lightboxImage.src = photo.src;
      lightboxImage.alt = photo.alt;
      lightbox.classList.add('open');
    });
  });
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImage.src = '';
  }
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
}

// Booking form validation. This is a front-end demo, not a real booking service.
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  const dateInput = bookingForm.querySelector('input[name="date"]');
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  dateInput.min = localToday;

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById('formMessage');
    message.className = 'form-message';

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      message.textContent = 'Please complete all required fields correctly.';
      message.classList.add('error');
      return;
    }

    const phone = bookingForm.elements.phone.value.trim();
    if (!/^[0-9]{10}$/.test(phone)) {
      message.textContent = 'Please enter a valid 10-digit phone number.';
      message.classList.add('error');
      bookingForm.elements.phone.focus();
      return;
    }

    const customerName = bookingForm.elements.name.value.trim();
    message.textContent = `Thank you, ${customerName}! Your demo booking request has been validated.`;
    message.classList.add('success');
    bookingForm.reset();
    dateInput.min = localToday;
  });
}

// Back-to-top button.
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 350);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
