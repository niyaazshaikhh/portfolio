const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const resumeButton = document.querySelector('#resume-button');
const resumeDialog = document.querySelector('#resume-dialog');
const resumeCloseButton = resumeDialog?.querySelector('.resume-dialog-close');

const closeResume = () => {
  resumeDialog?.close();
  resumeButton?.setAttribute('aria-expanded', 'false');
  resumeButton?.focus();
};

resumeButton?.addEventListener('click', () => {
  resumeDialog?.showModal();
  resumeButton.setAttribute('aria-expanded', 'true');
  resumeCloseButton?.focus();
});

resumeCloseButton?.addEventListener('click', closeResume);

resumeDialog?.addEventListener('click', (event) => {
  if (event.target === resumeDialog) closeResume();
});

resumeDialog?.addEventListener('cancel', () => {
  resumeButton?.setAttribute('aria-expanded', 'false');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 6, 3) * 65}ms`;
  observer.observe(element);
});

const typeLines = document.querySelectorAll('.type-line');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const typeName = async () => {
  for (const line of typeLines) {
    const text = line.dataset.text || '';
    line.classList.add('typing');
    for (const character of text) {
      line.textContent += character;
      await new Promise((resolve) => setTimeout(resolve, 95));
    }
    line.classList.remove('typing');
    await new Promise((resolve) => setTimeout(resolve, 170));
  }
  typeLines[typeLines.length - 1]?.classList.add('typing');
};

if (reduceMotion) {
  typeLines.forEach((line) => { line.textContent = line.dataset.text || ''; });
} else {
  window.setTimeout(typeName, 500);
}
