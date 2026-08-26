// ============================================================
// CargoShare – Utility Functions
// ============================================================

const Utils = {
  // ─── Format ────────────────────────────────────────────────
  formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  },

  formatWeight(kg) {
    return kg >= 1000 ? (kg/1000).toFixed(1) + ' t' : kg + ' kg';
  },

  formatDate(dateStr) {
    if (!dateStr) return '–';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  },

  formatDateTime(dateStr) {
    if (!dateStr) return '–';
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
  },

  timeAgo(dateStr) {
    if (!dateStr) return '';
    const now  = new Date();
    const then = new Date(dateStr);
    const diff = Math.floor((now - then) / 1000);
    if (diff < 60)     return 'just now';
    if (diff < 3600)   return Math.floor(diff/60) + 'm ago';
    if (diff < 86400)  return Math.floor(diff/3600) + 'h ago';
    if (diff < 604800) return Math.floor(diff/86400) + 'd ago';
    return Utils.formatDate(dateStr);
  },

  // ─── Capacity Status ───────────────────────────────────────
  getCapacityStatus(avail, total) {
    const pct = total > 0 ? (avail / total) * 100 : 0;
    if (pct === 0)  return { label: 'FULL',     cls: 'full',      badge: 'badge-full',      dot: '🔴' };
    if (pct <= 20)  return { label: 'LIMITED',  cls: 'limited',   badge: 'badge-limited',   dot: '🟡' };
    return              { label: 'AVAILABLE', cls: 'available', badge: 'badge-available', dot: '🟢' };
  },

  occupancyPercent(avail, total) {
    return total > 0 ? Math.round(((total - avail) / total) * 100) : 100;
  },

  availablePercent(avail, total) {
    return total > 0 ? Math.round((avail / total) * 100) : 0;
  },

  // ─── Price Calculation ─────────────────────────────────────
  calcPrice(pricePerKg, weight) {
    const base       = Math.round(pricePerKg * weight);
    const handling   = Math.max(100, Math.round(base * 0.12));
    const serviceFee = Math.round(base * 0.05);
    const total      = base + handling + serviceFee;
    return { base, handling, serviceFee, total };
  },

  // ─── Booking ID ────────────────────────────────────────────
  generateBookingId() {
    const num = Math.floor(10000 + Math.random() * 90000);
    return 'CS' + num;
  },

  generateId(prefix = 'id') {
    return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2,6);
  },

  // ─── Duration ──────────────────────────────────────────────
  calcDuration(dep, arr) {
    const [dh, dm] = dep.split(':').map(Number);
    const [ah, am] = arr.split(':').map(Number);
    let mins = (ah * 60 + am) - (dh * 60 + dm);
    if (mins < 0) mins += 1440;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h + 'h ' + (m > 0 ? m + 'm' : '');
  },

  // ─── QR Visual Generator ──────────────────────────────────
  generateQRPattern(bookingId) {
    // Create a deterministic-looking QR pattern from booking ID
    let seed = 0;
    for (let i = 0; i < bookingId.length; i++) seed += bookingId.charCodeAt(i);
    const cells = [];
    for (let i = 0; i < 49; i++) {
      // Corners always on (QR marker pattern)
      const r = Math.floor(i / 7), c = i % 7;
      const isCornerMarker = (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2);
      cells.push(isCornerMarker ? 1 : (Math.sin(seed * (i + 1)) > 0 ? 1 : 0));
    }
    return cells;
  },

  renderQR(bookingId, container) {
    const cells = Utils.generateQRPattern(bookingId);
    const qr = document.createElement('div');
    qr.className = 'qr-visual';
    cells.forEach(c => {
      const cell = document.createElement('div');
      cell.className = 'qr-cell' + (c ? ' dark' : '');
      qr.appendChild(cell);
    });
    if (container) container.innerHTML = '';
    if (container) container.appendChild(qr);
    return qr;
  },

  // ─── DOM Helpers ───────────────────────────────────────────
  $(sel, ctx = document) { return ctx.querySelector(sel); },
  $$(sel, ctx = document){ return [...ctx.querySelectorAll(sel)]; },

  show(el) { if (el) el.classList.remove('hidden'); },
  hide(el) { if (el) el.classList.add('hidden'); },

  toast(msg, type = 'success', duration = 3500) {
    const existing = document.querySelector('.cs-toast');
    if (existing) existing.remove();

    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = 'cs-toast animate-fade-up';
    toast.innerHTML = `<span class="cs-toast-icon">${icons[type]}</span><span>${msg}</span>`;
    toast.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:9999;
      background:${type==='success'?'#166534':type==='error'?'#7f1d1d':type==='warning'?'#78350f':'#1e3a5f'};
      color:white; padding:14px 20px; border-radius:14px;
      box-shadow:0 8px 24px rgba(0,0,0,0.2); display:flex; align-items:center; gap:10px;
      font-family:Outfit,sans-serif; font-weight:600; font-size:0.9rem;
      max-width:360px; line-height:1.4;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // ─── Confetti ──────────────────────────────────────────────
  launchConfetti() {
    const colors = ['#E8500A', '#F4A820', '#2D5016', '#16A34A', '#FFD166'];
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.cssText = `
        left: ${Math.random() * 100}vw;
        animation-delay: ${Math.random() * 2}s;
        animation-duration: ${1.5 + Math.random() * 2}s;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      `;
      container.appendChild(piece);
    }
    setTimeout(() => container.remove(), 5000);
  },

  // ─── Animate on Scroll ────────────────────────────────────
  initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('animate-fade-up');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  },

  // ─── Navbar Scroll Effect ─────────────────────────────────
  initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  },

  // ─── Mobile Nav ───────────────────────────────────────────
  initMobileNav() {
    const toggle = document.querySelector('.nav-hamburger');
    const links  = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (links.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  },

  // ─── Capacity Bar Animation ───────────────────────────────
  animateCapacityBars() {
    document.querySelectorAll('.capacity-bar-fill').forEach(bar => {
      const target = bar.getAttribute('data-width') || bar.style.width;
      bar.style.setProperty('--target-width', target);
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = target;
        bar.style.transition = 'width 1s cubic-bezier(0.4,0,0.2,1)';
      }, 100);
    });
  },

  // ─── Get current page name ────────────────────────────────
  currentPage() {
    return window.location.pathname.split('/').pop().replace('.html','') || 'index';
  },

  // ─── Tracking Status Helpers ──────────────────────────────
  TRACKING_STEPS: [
    { key: 'booking_confirmed', label: 'Booking Confirmed',  icon: '📦', desc: 'Your booking has been confirmed and payment received.' },
    { key: 'cargo_submitted',   label: 'Cargo Submitted',    icon: '🏭', desc: 'Cargo has been submitted at the origin warehouse.' },
    { key: 'cargo_loaded',      label: 'Cargo Loaded',       icon: '🚂', desc: 'Cargo has been loaded onto the train.' },
    { key: 'in_transit',        label: 'In Transit',         icon: '🚆', desc: 'Train is en route to the destination.' },
    { key: 'arrived',           label: 'Arrived',            icon: '📍', desc: 'Train has arrived at the destination station.' },
    { key: 'delivered',         label: 'Delivered',          icon: '✅', desc: 'Cargo has been delivered to the receiver.' }
  ],

  getStepIndex(status) {
    return Utils.TRACKING_STEPS.findIndex(s => s.key === status);
  }
};

// ─── Global Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Utils.initNavbarScroll();
  Utils.initMobileNav();
  Utils.initScrollAnimations();
  setTimeout(Utils.animateCapacityBars, 300);
});
