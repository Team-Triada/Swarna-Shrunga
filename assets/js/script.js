// ===== HERO VIDEO: KEEP PLAYING =====
(function() {
  const heroVideo = document.querySelector('.hero-media video');
  if (heroVideo) {
    heroVideo.play().catch(function() {});
    heroVideo.addEventListener('pause', function() {
      if (!document.hidden) heroVideo.play().catch(function() {});
    });
    heroVideo.addEventListener('stalled', function() {
      heroVideo.load();
      heroVideo.play().catch(function() {});
    });
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) heroVideo.play().catch(function() {});
    });
  }
})();

// ===== MOBILE MENU =====
const hamburger = document.getElementById('menuToggle');
const navMenu = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

function closeMenu() {
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Open menu');
  navMenu.classList.remove('open');
  navBackdrop.classList.remove('open');
  document.body.classList.remove('menu-open');
}

function openMenu() {
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Close menu');
  navMenu.classList.add('open');
  navBackdrop.classList.add('open');
  document.body.classList.add('menu-open');
}

hamburger.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

navBackdrop.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CRAFT VIDEO PLAY OVERLAY =====
(function() {
  const video = document.getElementById('craftVideo');
  const wrap = document.getElementById('videoWrap');
  const playBtn = document.getElementById('videoPlayBtn');
  if (!video || !wrap || !playBtn) return;

  playBtn.addEventListener('click', () => {
    video.controls = true;
    video.play();
    wrap.classList.add('playing');
  });
  video.addEventListener('pause', () => wrap.classList.remove('playing'));
  video.addEventListener('play', () => wrap.classList.add('playing'));
})();

// ===== PACK SELECTION =====
function selectPack(label) {
  const codSection = document.getElementById('cod');
  if (codSection) codSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const qty = document.getElementById('codQty');
  if (qty) {
    for (const opt of qty.options) {
      if (label.indexOf('1 Bottle') === 0) opt.selected = opt.value === '1 Bottle (250ml)';
      else if (label.indexOf('Twin') === 0) opt.selected = opt.value === '2 Bottles (2x250ml)';
      else if (label.indexOf('Family') === 0) opt.selected = opt.value === '5 Bottles (5x250ml)';
    }
  }
}

// ===== TESTIMONIAL CAROUSEL =====
const testimonials = [
  { quote: 'The aroma & taste is just amazing. Reminds me of traditional South Indian filter coffee.', name: 'Priya Nair' },
  { quote: "Best filter coffee decoction I've tried. Saves so much time every morning.", name: 'Arjun Menon' },
  { quote: 'Rich, strong, authentic. Exactly like the coffee back home in Coorg.', name: 'Lakshmi Iyer' }
];
let testiIndex = 0;
const testiCard = document.getElementById('testiCard');
const testiQuote = document.getElementById('testiQuote');
const testiName = document.getElementById('testiName');
const testiAvatar = document.getElementById('testiAvatar');
const testiDots = document.querySelectorAll('#testiDots .dot-btn');

function showTestimonial(i) {
  testiIndex = (i + testimonials.length) % testimonials.length;
  const current = testimonials[testiIndex];
  testiCard.classList.add('fade');
  setTimeout(() => {
    testiQuote.textContent = current.quote;
    testiName.textContent = current.name;
    testiAvatar.textContent = current.name.charAt(0);
    testiCard.classList.remove('fade');
  }, 220);
  testiDots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === testiIndex);
    dot.setAttribute('aria-selected', idx === testiIndex ? 'true' : 'false');
  });
}

const testiPrevBtn = document.getElementById('testiPrev');
const testiNextBtn = document.getElementById('testiNext');
if (testiCard && testiPrevBtn && testiNextBtn) {
  testiPrevBtn.addEventListener('click', () => showTestimonial(testiIndex - 1));
  testiNextBtn.addEventListener('click', () => showTestimonial(testiIndex + 1));
  testiDots.forEach(dot => dot.addEventListener('click', () => showTestimonial(Number(dot.dataset.i))));
}

// ===== GOOGLE SHEETS ORDER LOG =====
// See GOOGLE_SHEETS_SETUP.md for how to get this URL.
const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx0mU7gJPmj34a5XMIjZ1l7i-QgH7VFONl_WCWXe4ryAolw_Pu5ENQ5j7pzGkoNnrk/exec';

function logOrderToSheet(order) {
  if (!SHEETS_WEBHOOK_URL || SHEETS_WEBHOOK_URL.indexOf('PASTE_YOUR') === 0) return;
  fetch(SHEETS_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(order)
  }).catch(function() {});
}

// ===== DIGIT-ONLY INPUTS =====
['codPhone', 'codPin'].forEach(function(id) {
  var el = document.getElementById(id);
  if (el) el.addEventListener('input', function() {
    el.value = el.value.replace(/[^0-9]/g, '');
  });
});

// ===== CASH ON DELIVERY FORM HANDLER =====
function handleOrder(e) {
  e.preventDefault();
  const form = e.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = form.querySelector('#codName').value.trim();
  const phone = form.querySelector('#codPhone').value.trim();
  const address = form.querySelector('#codAddress').value.trim();
  const city = form.querySelector('#codCity').value.trim();
  const state = form.querySelector('#codState').value.trim();
  const pin = form.querySelector('#codPin').value.trim();
  const qty = form.querySelector('#codQty').value;
  const landmark = form.querySelector('#codLandmark').value.trim();

  var btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;

  logOrderToSheet({ name: name, phone: phone, address: address, city: city, state: state, pin: pin, qty: qty, landmark: landmark });

  btn.textContent = 'Order Placed';
  btn.style.background = 'linear-gradient(135deg, #4A7C59, #3A6348)';
  setTimeout(function() {
    sessionStorage.setItem('orderJustPlaced', '1');
    window.location.href = 'thankyou.html';
  }, 1200);
}
