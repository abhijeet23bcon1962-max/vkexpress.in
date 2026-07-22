// =========================================
// VK EXPRESS — ADMIN UTILITIES
// =========================================

function requireLogin() {
  if (localStorage.getItem('vkadmin_logged_in') !== 'true') {
    window.location.href = 'index.html';
  }
  const user = localStorage.getItem('vkadmin_username') || 'vkadmin';
  const el = document.getElementById('userNameDisplay');
  const av = document.getElementById('userAvatar');
  if (el) el.textContent = user;
  if (av) av.textContent = user.slice(0,2).toUpperCase();
}

function doLogout() {
  localStorage.removeItem('vkadmin_logged_in');
  window.location.href = 'index.html';
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function badgeClass(status) {
  if (!status) return 'badge-pending';
  const s = status.toLowerCase();
  if (s === 'delivered') return 'badge-delivered';
  if (s.includes('transit')) return 'badge-intransit';
  if (s === 'booked') return 'badge-booked';
  return 'badge-pending';
}

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Highlight active sidebar link
document.querySelectorAll('.sidebar-link').forEach(link => {
  if (link.href && window.location.href.includes(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});
