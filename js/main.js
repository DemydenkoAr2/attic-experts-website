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

// Testimonial slider
const slider = document.querySelector('.testimonial-slider');

if (slider) {
  const track = slider.querySelector('.testimonial-slider__track');
  const cards = slider.querySelectorAll('.testimonial-card');
  const dots = slider.querySelectorAll('.testimonial-slider__dot');
  const btnPrev = slider.querySelector('.testimonial-slider__btn--prev');
  const btnNext = slider.querySelector('.testimonial-slider__btn--next');

  const perSlide = 2;
  const total = Math.ceil(cards.length / perSlide);
  let current = 0;

  function goTo(index) {
    current = (index + total) % total;
    const offset = current * (100 / perSlide) * perSlide;
    track.style.transform = `translateX(calc(-${current * 100}% - ${current * 16}px))`;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  btnNext.addEventListener('click', () => goTo(current + 1));
  btnPrev.addEventListener('click', () => goTo(current - 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
}
