// api.js — iStore Pro
// URL automatique : local en dev, Render en production

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://istore-pro-backend.onrender.com/api'; // ← Remplacer par votre URL Render

const API = {
  _headers(auth = false) {
    const h = { 'Content-Type': 'application/json' };
    if (auth) {
      const token = localStorage.getItem('token');
      if (token) h['Authorization'] = `Bearer ${token}`;
    }
    return h;
  },

  async _handle(res) {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `Erreur ${res.status}`);
    return data;
  },

  // Vérifier si le backend est disponible
  async isOnline() {
    try {
      await Promise.race([
        fetch(`${API_URL}/health`),
        new Promise((_, r) => setTimeout(() => r(), 2000))
      ]);
      return true;
    } catch { return false; }
  },

  async get(path, auth = false) {
    const res = await fetch(`${API_URL}${path}`, { headers: this._headers(auth) });
    return this._handle(res);
  },

  async post(path, body, auth = false) {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST', headers: this._headers(auth), body: JSON.stringify(body)
    });
    return this._handle(res);
  },

  async put(path, body, auth = true) {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'PUT', headers: this._headers(auth), body: JSON.stringify(body)
    });
    return this._handle(res);
  },

  async delete(path, auth = true) {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'DELETE', headers: this._headers(auth)
    });
    return this._handle(res);
  }
};
