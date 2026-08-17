// Text reveal by character on scroll
const textReveal = document.querySelector('.js-text-reveal');

if (textReveal) {
  const chars = textReveal.textContent.split('');
  textReveal.innerHTML = chars.map(char =>
    `<span class="text-reveal-char">${char}</span>`
  ).join('');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const charEls = textReveal.querySelectorAll('.text-reveal-char');
        charEls.forEach((char, i) => {
          setTimeout(() => char.classList.add('revealed'), i * 12);
        });
        observer.unobserve(textReveal);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(textReveal);
}

// Burger menu
const burger = document.querySelector('.nav-burger');
const nav = document.querySelector('.nav-header');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Закрыть при клике на ссылку
  nav.querySelectorAll('.nav-header__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
    });
  });

  // Закрыть при клике вне меню
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('nav-open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
    }
  });
}

// Contact form validation
const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    this.classList.add('submitted');

    if (this.checkValidity()) {
      this.submit();
    }
  });
}

// FAQ accordion
const ICON_CLOSE = '<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
const ICON_OPEN  = '<path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';

function updateIcon(item) {
  const icon = item.querySelector('.faq-item__icon');
  icon.innerHTML = item.classList.contains('faq-item--open') ? ICON_CLOSE : ICON_OPEN;
}

document.querySelectorAll('.faq-item').forEach(item => updateIcon(item));

document.querySelectorAll('.faq-item__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('faq-item--open');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('faq-item--open');
      updateIcon(i);
    });

    if (!isOpen) {
      item.classList.add('faq-item--open');
      updateIcon(item);
    }
  });
});

// Testimonial slider
const slider = document.querySelector('.testimonial-slider');

if (slider) {
  const track = slider.querySelector('.testimonial-slider__track');
  const cards = slider.querySelectorAll('.testimonial-card');
  const dotsContainer = slider.querySelector('.testimonial-slider__dots');
  const btnPrev = slider.querySelector('.testimonial-slider__btn--prev');
  const btnNext = slider.querySelector('.testimonial-slider__btn--next');

  let perSlide = window.innerWidth <= 768 ? 1 : 2;
  let total = Math.ceil(cards.length / perSlide);
  let current = 0;

  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-slider__dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(calc(-${current * 100 / perSlide * perSlide}% - ${current * 16}px))`;
    dotsContainer.querySelectorAll('.testimonial-slider__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function init() {
    perSlide = window.innerWidth <= 768 ? 1 : 2;
    total = Math.ceil(cards.length / perSlide);
    current = 0;
    track.style.transform = 'translateX(0)';
    buildDots();
  }

  init();

  btnNext.addEventListener('click', () => goTo(current + 1));
  btnPrev.addEventListener('click', () => goTo(current - 1));

  window.addEventListener('resize', () => {
    const newPer = window.innerWidth <= 768 ? 1 : 2;
    if (newPer !== perSlide) init();
  });
}
