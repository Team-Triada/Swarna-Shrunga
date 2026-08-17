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
  navMenu.classList.remove('open');
  navBackdrop.classList.remove('open');
  document.body.classList.remove('menu-open');
}

function openMenu() {
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
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
  testiDots.forEach((dot, idx) => dot.classList.toggle('active', idx === testiIndex));
}

document.getElementById('testiPrev').addEventListener('click', () => showTestimonial(testiIndex - 1));
document.getElementById('testiNext').addEventListener('click', () => showTestimonial(testiIndex + 1));
testiDots.forEach(dot => dot.addEventListener('click', () => showTestimonial(Number(dot.dataset.i))));

// ===== CASH ON DELIVERY FORM HANDLER =====
function handleOrder(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('#codName').value.trim();
  const phone = form.querySelector('#codPhone').value.trim();
  const address = form.querySelector('#codAddress').value.trim();
  const city = form.querySelector('#codCity').value.trim();
  const state = form.querySelector('#codState').value.trim();
  const pin = form.querySelector('#codPin').value.trim();
  const qty = form.querySelector('#codQty').value;
  const landmark = form.querySelector('#codLandmark').value.trim();

  if (!name || !phone || !address || !city || !state || !pin) {
    alert('Please fill in all required fields.');
    return;
  }

  var lines = [
    'New Order - Swarnashrunga Coffee', '',
    'Name: ' + name,
    'Phone: ' + phone,
    'Address: ' + address,
    'City: ' + city,
    'State: ' + state,
    'PIN Code: ' + pin,
    'Quantity: ' + qty
  ];
  if (landmark) lines.push('Landmark: ' + landmark);
  lines.push('', 'Payment: Cash on Delivery');

  var message = lines.join('\n');
  var whatsappUrl = 'https://wa.me/917483412045?text=' + encodeURIComponent(message);
  window.open(whatsappUrl, '_blank');

  var btn = form.querySelector('button[type="submit"]');
  var originalText = btn.textContent;
  btn.textContent = 'Order Sent, Check WhatsApp';
  btn.style.background = 'linear-gradient(135deg, #4A7C59, #3A6348)';
  setTimeout(function() {
    btn.textContent = originalText;
    btn.style.background = '';
    form.reset();
  }, 4000);
}
