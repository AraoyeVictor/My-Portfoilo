const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Rotating hero phrase
const typedText = document.getElementById('typed-text');
const phrases = ['modern websites', 'responsive experiences', 'digital ideas'];
let phraseIndex = 0;
let charIndex = phrases[0].length;
let deleting = true;

function typePhrase() {
  if (!typedText) return;
  const phrase = phrases[phraseIndex];

  if (deleting) {
    charIndex--;
    typedText.textContent = phrase.slice(0, Math.max(0, charIndex));
    if (charIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typePhrase, 350);
      return;
    }
  } else {
    const nextPhrase = phrases[phraseIndex];
    charIndex++;
    typedText.textContent = nextPhrase.slice(0, charIndex);
    if (charIndex >= nextPhrase.length) {
      deleting = true;
      setTimeout(typePhrase, 1500);
      return;
    }
  }
  setTimeout(typePhrase, deleting ? 45 : 75);
}
setTimeout(typePhrase, 1800);

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// Highlight the navigation item for the visible section.
const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

// The contact form uses mailto, so no backend is required for this starter site.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:araoyevictor0@gmail.com?subject=${subject}&body=${body}`;
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
