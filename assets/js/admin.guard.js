// assets/js/admin.guard.js
// Inclure ce script sur toutes les pages admin AVANT tout autre script
// Il redirige immédiatement si l'utilisateur n'est pas admin

(function() {
  const token = localStorage.getItem('token');
  const user  = JSON.parse(localStorage.getItem('user') || 'null');

  if (!token || !user || user.role !== 'admin') {
    window.location.replace('../connexion.html');
  }
})();
