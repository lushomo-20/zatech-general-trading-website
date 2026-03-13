const STORAGE_KEY = 'zatech_preview_mode';
const modes = {
  full: 'Full',
  mobile: 'Mobile',
  laptop: 'Laptop'
};

function applyMode(mode) {
  document.body.classList.remove('preview-mobile', 'preview-laptop');
  if (mode === 'mobile') document.body.classList.add('preview-mobile');
  if (mode === 'laptop') document.body.classList.add('preview-laptop');
  localStorage.setItem(STORAGE_KEY, mode);
  document.querySelectorAll('.preview-bar button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

function wrapContent() {
  const bar = document.createElement('div');
  bar.className = 'preview-bar';
  bar.innerHTML = `
    <span>Preview:</span>
    <button data-mode="full">Full</button>
    <button data-mode="mobile">Mobile</button>
    <button data-mode="laptop">Laptop</button>
  `;

  const frame = document.createElement('div');
  frame.className = 'preview-frame';

  while (document.body.firstChild) {
    frame.appendChild(document.body.firstChild);
  }

  document.body.appendChild(bar);
  document.body.appendChild(frame);

  bar.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => applyMode(btn.dataset.mode));
  });
}

function init() {
  wrapContent();
  const saved = localStorage.getItem(STORAGE_KEY) || 'full';
  applyMode(saved);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
