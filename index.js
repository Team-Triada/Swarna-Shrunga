// ===== HERO VIDEO — KEEP PLAYING =====
(function() {
  const heroVideo = document.querySelector('.hero-video-wrap video');
  if (heroVideo) {
    // Force play on load
    heroVideo.play().catch(function() {});
    // Re-play if it ever pauses unexpectedly
    heroVideo.addEventListener('pause', function() {
      if (!document.hidden) heroVideo.play().catch(function() {});
    });
    // Re-play if stalled
    heroVideo.addEventListener('stalled', function() {
      heroVideo.load();
      heroVideo.play().catch(function() {});
    });
    // Re-play when tab becomes visible again
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) heroVideo.play().catch(function() {});
    });
  }
})();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
});

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link && !link.classList.contains('nav-cta')) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== BLEND BAR ANIMATION =====
const blendBars = document.querySelectorAll('.blend-bar-fill');
const blendObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
      blendObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

blendBars.forEach(bar => blendObserver.observe(bar));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ORDER FORM HANDLER =====
function handleOrder(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('#custName').value.trim();
  const phone = form.querySelector('#custPhone').value.trim();
  const address = form.querySelector('#custAddress').value.trim();
  const qty = form.querySelector('#custQty').value;
  const brew = form.querySelector('#custBrew').value;

  // Basic validation
  if (!name || !phone || !address) {
    alert('Please fill in all required fields.');
    return;
  }

  // Build the WhatsApp message
  var lines = [
    'New Order - Swarnashrunga Coffee',
    '',
    'Name: ' + name,
    'Phone: ' + phone,
    'Address: ' + address,
    'Quantity: ' + qty + ' Bottle(s)',
    'Brew Preference: ' + brew,
    '',
    'Payment: Cash on Delivery'
  ];
  var message = lines.join('\n');
  var whatsappUrl = 'https://wa.me/917483412045?text=' + encodeURIComponent(message);
  window.open(whatsappUrl, '_blank');

  // Show confirmation
  var btn = form.querySelector('button[type="submit"]');
  var originalText = btn.textContent;
  btn.textContent = 'Order Sent — Check WhatsApp';
  btn.style.background = 'linear-gradient(135deg, #4A7C59, #3A6348)';
  setTimeout(function() {
    btn.textContent = originalText;
    btn.style.background = '';
    form.reset();
  }, 4000);
}

// ===== COUNTER ANIMATION FOR STATS =====
const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.animation = 'fadeInUp 0.6s ease forwards';
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));
