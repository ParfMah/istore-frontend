// auth.js — iStore Pro
// Gestion session JWT côté client

const Auth = {
  getUser() {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  },
  getToken() { return localStorage.getItem('token'); },
  isLoggedIn() { return !!this.getToken(); },
  isAdmin() { const u = this.getUser(); return u && u.role === 'admin'; },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/connexion.html';
  }
};

// Mettre à jour le bouton header selon l'état de connexion
document.addEventListener('DOMContentLoaded', () => {
  const authBtn = document.getElementById('authBtn');
  if (!authBtn) return;
  const user = Auth.getUser();
  if (user) {
    authBtn.textContent = `${user.firstname}`;
    authBtn.href = Auth.isAdmin() ? 'admin/index.html' : '#';
    // Ajouter menu déconnexion si besoin
    authBtn.addEventListener('click', (e) => {
      if (!Auth.isAdmin()) {
        e.preventDefault();
        if (confirm('Se déconnecter ?')) Auth.logout();
      }
    });
  }
});
