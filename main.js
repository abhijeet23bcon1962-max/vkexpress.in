// =========================================
// VK EXPRESS — MAIN JAVASCRIPT
// =========================================

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// Highlight active nav link
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Tracking function
function trackShipment() {
  const input = document.getElementById('trackInput');
  if (!input) return;
  const val = input.value.trim();
  const resultEl = document.getElementById('trackResult');

  if (!val) {
    alert('Please enter a tracking or AWB number.');
    return;
  }

  const consignments = getConsignments();
  const found = consignments.find(c =>
    c.awb.toLowerCase() === val.toLowerCase() ||
    c.trackingNo.toLowerCase() === val.toLowerCase()
  );

  if (resultEl) {
    resultEl.style.display = 'block';
    if (found) {
      resultEl.className = 'track-result found';
      resultEl.innerHTML = `
        <strong>✅ Shipment Found</strong><br>
        AWB: <strong>${found.awb}</strong> | Status: <strong>${found.status}</strong><br>
        From: ${found.origin} → To: ${found.destination}<br>
        Date: ${found.date} | Type: ${found.type}<br>
        ${found.consignee ? `Consignee: ${found.consignee}` : ''}
        ${found.status === 'Delivered' ? `<br>Delivered on: ${found.deliveredDate} to ${found.deliveredTo}` : ''}
      `;
    } else {
      resultEl.className = 'track-result notfound';
      resultEl.innerHTML = `❌ No shipment found for tracking number <strong>${val}</strong>. Please check the number or contact our office.`;
    }
  }
}

// Full track page
function trackShipmentPage() {
  const input = document.getElementById('trackInputPage');
  const resultBox = document.getElementById('trackResultPage');
  if (!input || !resultBox) return;

  const val = input.value.trim();
  if (!val) { alert('Please enter a tracking number.'); return; }

  const consignments = getConsignments();
  const found = consignments.find(c =>
    c.awb.toLowerCase() === val.toLowerCase() ||
    c.trackingNo.toLowerCase() === val.toLowerCase()
  );

  resultBox.style.display = 'block';
  if (found) {
    const statusClass = found.status === 'Delivered' ? 'delivered' : 'intransit';
    const badgeClass = found.status === 'Delivered' ? 'status-delivered' : 'status-intransit';
    resultBox.className = `track-result-box ${statusClass}`;
    resultBox.innerHTML = `
      <h3>Shipment Details <span class="status-badge ${badgeClass}">${found.status}</span></h3>
      <div class="track-detail-row"><span class="track-detail-label">AWB Number</span><span class="track-detail-val">${found.awb}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Tracking No.</span><span class="track-detail-val">${found.trackingNo}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Booking Date</span><span class="track-detail-val">${found.date}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Origin</span><span class="track-detail-val">${found.origin}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Destination</span><span class="track-detail-val">${found.destination}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Consignor</span><span class="track-detail-val">${found.consignor || 'N/A'}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Consignee</span><span class="track-detail-val">${found.consignee || 'N/A'}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Service Type</span><span class="track-detail-val">${found.type}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Weight</span><span class="track-detail-val">${found.weight ? found.weight + ' kg' : 'N/A'}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Forwarder</span><span class="track-detail-val">${found.forwarder}</span></div>
      <div class="track-detail-row"><span class="track-detail-label">Payment Mode</span><span class="track-detail-val">${found.paymentMode}</span></div>
      ${found.status === 'Delivered' ? `<div class="track-detail-row"><span class="track-detail-label">Delivered On</span><span class="track-detail-val">${found.deliveredDate}</span></div><div class="track-detail-row"><span class="track-detail-label">Delivered To</span><span class="track-detail-val">${found.deliveredTo}</span></div>` : ''}
    `;
  } else {
    resultBox.className = 'track-result-box';
    resultBox.innerHTML = `<h3>❌ Not Found</h3><p>No shipment found for <strong>${val}</strong>. Please verify the number or contact us at 0291-2613165.</p>`;
  }
}

// Load branches on homepage
function loadBranchesPreview() {
  const grid = document.getElementById('branchesGrid');
  if (!grid) return;
  const branches = getBranches().filter(b => b.status === 1).slice(0, 6);
  grid.innerHTML = branches.map(b => `
    <div class="branch-card">
      <div class="branch-city">📍 ${b.city}</div>
      <div class="branch-addr">${b.address}</div>
      <div class="branch-phone">📱 ${b.mobile} | ☎ ${b.phone}</div>
    </div>
  `).join('');
}

// Contact form
function submitContactForm(e) {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  if (!name || !email) { alert('Please fill all required fields.'); return; }
  document.getElementById('contactForm').reset();
  document.getElementById('contactSuccess').style.display = 'block';
  setTimeout(() => { document.getElementById('contactSuccess').style.display = 'none'; }, 4000);
}

// On DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadBranchesPreview();
  const trackInputEl = document.getElementById('trackInput');
  if (trackInputEl) {
    trackInputEl.addEventListener('keydown', e => { if (e.key === 'Enter') trackShipment(); });
  }
  const trackInputPage = document.getElementById('trackInputPage');
  if (trackInputPage) {
    trackInputPage.addEventListener('keydown', e => { if (e.key === 'Enter') trackShipmentPage(); });
  }
  const cf = document.getElementById('contactForm');
  if (cf) cf.addEventListener('submit', submitContactForm);
});
