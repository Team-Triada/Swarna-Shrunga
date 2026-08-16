cat > index.js <<'JS'
// ============================================================
// SWARNASHRUNGA — SITE JAVASCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Navbar
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Mobile navigation
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function closeMenu() {
    if (!hamburger || !navMenu || !navOverlay) return;

    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && navMenu && navOverlay) {

    hamburger.addEventListener('click', () => {

      const open = navMenu.classList.contains('open');

      if (open) {
        closeMenu();
      } else {
        hamburger.classList.add('active');
        navMenu.classList.add('open');
        navOverlay.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

    });

    navOverlay.addEventListener('click', closeMenu);

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Smooth navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

      const id = this.getAttribute('href');

      if (!id || id === '#') return;

      const target = document.querySelector(id);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    });

  });

  calculateOrderTotal();
});


// ============================================================
// PACK SELECTION
// ============================================================

function selectPack(packOptionValue, qtyCount, priceAmount) {

  const select = document.getElementById('custQty');

  if (!select) return;

  for (const option of select.options) {

    if (
      option.value.includes(packOptionValue) ||
      option.text.includes(String(priceAmount))
    ) {
      select.value = option.value;
      break;
    }

  }

  calculateOrderTotal();

  const contact = document.getElementById('contact');

  if (contact) {
    contact.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}


// ============================================================
// ORDER TOTAL
// ============================================================

function calculateOrderTotal() {

  const select = document.getElementById('custQty');
  const total = document.getElementById('orderTotalVal');

  if (!select || !total) return;

  const value = select.value;

  let price = 340;

  if (value.includes('180') || value.includes('1 Bottle')) {
    price = 180;
  } else if (value.includes('340') || value.includes('Twin')) {
    price = 340;
  } else if (value.includes('790') || value.includes('Family')) {
    price = 790;
  } else if (value.includes('1500') || value.includes('Commercial')) {
    price = 1500;
  }

  total.textContent = '₹' + price;
}


// ============================================================
// WHATSAPP ORDER
// ============================================================

function handleOrder(e) {

  e.preventDefault();

  const form = e.target;

  const name = form.querySelector('#custName').value.trim();
  const phone = form.querySelector('#custPhone').value.trim();
  const address = form.querySelector('#custAddress').value.trim();
  const pack = form.querySelector('#custQty').value;
  const brew = form.querySelector('#custBrew').value;
  const total = document.getElementById('orderTotalVal').textContent;

  if (!name || !phone || !address) {
    alert('Please enter your name, phone number and delivery address.');
    return;
  }

  const message = [
    '*NEW SWARNASHRUNGA COFFEE ORDER*',
    '',
    'Name: ' + name,
    'Phone: ' + phone,
    'Address: ' + address,
    'Pack: ' + pack,
    'Brew: ' + brew,
    'Total: ' + total,
    'Payment: Cash on Delivery',
    '',
    'Please confirm my order. Thank you.'
  ].join('\n');

  const whatsapp =
    'https://wa.me/917483412045?text=' +
    encodeURIComponent(message);

  window.open(whatsapp, '_blank');
}
JS
