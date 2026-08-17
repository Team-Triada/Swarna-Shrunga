document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
});

function selectPack(pack) {
  const message = 'Hi Swarnashrunga Coffee, I would like to order ' + pack + ' via Cash on Delivery.';
  window.open('https://wa.me/917483412045?text=' + encodeURIComponent(message), '_blank');
}
