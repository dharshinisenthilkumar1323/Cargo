// ============================================================
// CargoShare – Authentication Logic
// ============================================================

const Auth = {
  // ─── Session Management ────────────────────────────────────
  SESSION_KEY: 'cs_session',

  getSession() {
    try { return JSON.parse(localStorage.getItem(this.SESSION_KEY)); }
    catch { return null; }
  },

  setSession(user) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  isLoggedIn() { return !!this.getSession(); },

  getRole() {
    const s = this.getSession();
    return s ? s.role : null;
  },

  isTrader() { return this.getRole() === 'trader'; },
  isAdmin()  { return this.getRole() === 'admin';  },

  getCurrentUser() { return this.getSession(); },

  // ─── Trader Login ─────────────────────────────────────────
  traderLogin(email, password) {
    const users = DemoData.getUsers();
    const user  = users.find(u => u.email === email && u.password === password && u.role === 'trader');
    if (user) {
      if (user.status === 'inactive') {
        return { ok: false, msg: 'Your account has been deactivated. Please contact support.' };
      }
      this.setSession(user);
      return { ok: true, user };
    }
    return { ok: false, msg: 'Invalid email or password. Try: trader@demo.com / trader123' };
  },

  // ─── Trader Register ──────────────────────────────────────
  traderRegister(data) {
    const users = DemoData.getUsers();
    if (users.find(u => u.email === data.email)) {
      return { ok: false, msg: 'An account with this email already exists.' };
    }
    const newUser = {
      id:           Utils.generateId('trader'),
      role:         'trader',
      status:       'active',
      createdAt:    new Date().toISOString(),
      totalBookings: 0,
      activeShipments: 0,
      ...data
    };
    users.push(newUser);
    DemoData.saveUsers(users);

    // Also add to traders list
    const traders = DemoData.getTraders();
    traders.push(newUser);
    DemoData.saveTraders(traders);

    this.setSession(newUser);
    return { ok: true, user: newUser };
  },

  // ─── Admin Login ──────────────────────────────────────────
  adminLogin(email, password) {
    const admins = JSON.parse(localStorage.getItem('cs_admins') || '[]');
    const admin  = admins.find(a => a.email === email && a.password === password && a.role === 'admin');
    if (admin) {
      this.setSession(admin);
      return { ok: true, user: admin };
    }
    return { ok: false, msg: 'Invalid credentials. Try: admin@cargoshare.in / admin123' };
  },

  // ─── Logout ───────────────────────────────────────────────
  logout() {
    this.clearSession();
    window.location.href = rootPath() + 'login.html';
  },

  // ─── Route Guards ─────────────────────────────────────────
  requireTrader() {
    if (!this.isLoggedIn()) { window.location.href = rootPath() + 'login.html'; return false; }
    if (!this.isTrader())   { window.location.href = rootPath() + 'admin/dashboard.html'; return false; }
    return true;
  },

  requireAdmin() {
    if (!this.isLoggedIn()) { window.location.href = rootPath() + 'login.html'; return false; }
    if (!this.isAdmin())    { window.location.href = rootPath() + 'dashboard.html'; return false; }
    return true;
  },

  // ─── Update Nav UI ────────────────────────────────────────
  updateNavUI() {
    const user = this.getCurrentUser();
    const loggedOut = document.querySelector('.nav-logged-out');
    const loggedIn  = document.querySelector('.nav-logged-in');
    const nameEl    = document.querySelector('.nav-user-name');

    if (user && loggedIn) {
      Utils.show(loggedIn);
      if (loggedOut) Utils.hide(loggedOut);
      if (nameEl) nameEl.textContent = user.name?.split(' ')[0] || 'Trader';
    } else if (loggedOut) {
      Utils.show(loggedOut);
      if (loggedIn) Utils.hide(loggedIn);
    }
  }
};

// ─── Root path helper ─────────────────────────────────────────
function rootPath() {
  const path = window.location.pathname;
  if (path.includes('/admin/')) return '../';
  return '';
}

// ─── Logout button handler ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-logout]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout();
    });
  });
  Auth.updateNavUI();
});
