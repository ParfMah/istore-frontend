# 📱 iStore Pro — Guide complet

> Site e-commerce iPhone avec système de crédit, paiements manuels et CMS administrateur.

---

## 📋 Sommaire

1. [Ce que contient le projet](#1-ce-que-contient-le-projet)
2. [Ce dont vous avez besoin](#2-ce-dont-vous-avez-besoin)
3. [Installation en local (étape par étape)](#3-installation-en-local)
4. [Accès à l'espace administrateur](#4-espace-administrateur)
5. [Utilisation complète du site](#5-utilisation-complète-du-site)
6. [Déploiement sur internet (Render + GitHub)](#6-déploiement-sur-internet)
7. [Résolution des problèmes courants](#7-problèmes-courants)

---

## 1. Ce que contient le projet

Vous avez téléchargé **2 fichiers ZIP** :

| Fichier | Contenu |
|---------|---------|
| `istore-pro-frontend.zip` | Le site web (pages HTML, CSS, JavaScript) |
| `istore-pro-backend.zip`  | Le serveur (Node.js, base de données, PDF, emails) |

### Structure une fois extraits

```
istore-pro-frontend/
└── frontend/
    ├── index.html          ← Page d'accueil
    ├── catalogue.html      ← Catalogue des iPhones
    ├── produit.html        ← Détail d'un produit
    ├── simulation.html     ← Simulateur de crédit
    ├── connexion.html      ← Connexion / Inscription
    ├── espace-client.html  ← Tableau de bord client
    ├── admin/              ← CMS Administrateur (6 pages)
    └── assets/             ← CSS, JavaScript, images

istore-pro-backend/
└── backend/
    ├── server.js           ← Point d'entrée du serveur
    ├── .env                ← Vos variables de configuration
    ├── models/             ← Structure de la base de données
    ├── routes/             ← Points d'accès de l'API
    ├── controllers/        ← Logique métier
    ├── utils/              ← Génération PDF, emails
    └── data/               ← Script d'initialisation (seed)
```

---

## 2. Ce dont vous avez besoin

### Logiciels à installer (gratuits)

#### A — Node.js (moteur du serveur)
1. Aller sur **https://nodejs.org**
2. Télécharger la version **LTS** (ex : 20.x LTS)
3. Installer (suivre l'assistant, tout laisser par défaut)
4. Vérifier : ouvrir un terminal et taper :
   ```
   node --version
   ```
   Vous devez voir quelque chose comme `v20.11.0`

#### B — MongoDB (base de données)
**Option 1 — En ligne (recommandé, gratuit) :**
Utiliser MongoDB Atlas → voir section 6 pour la configuration.

**Option 2 — En local :**
1. Aller sur **https://www.mongodb.com/try/download/community**
2. Télécharger MongoDB Community Server
3. Installer (suivre l'assistant)
4. MongoDB démarre automatiquement en arrière-plan

#### C — Visual Studio Code (éditeur, recommandé)
1. Aller sur **https://code.visualstudio.com**
2. Télécharger et installer
3. Installer l'extension **Live Server** (clic sur l'icône Extensions → chercher "Live Server" → Installer)

---

## 3. Installation en local

### Étape 1 — Extraire les fichiers

1. Créer un dossier sur votre bureau, par exemple : `istore-pro`
2. Extraire `istore-pro-frontend.zip` → vous obtenez un dossier `frontend/`
3. Extraire `istore-pro-backend.zip`  → vous obtenez un dossier `backend/`
4. Placer les deux dossiers dans `istore-pro/`

Résultat :
```
istore-pro/
├── frontend/
└── backend/
```

---

### Étape 2 — Configurer le backend

#### 2a. Ouvrir un terminal dans le dossier backend

- **Windows** : clic droit sur le dossier `backend` → "Ouvrir dans le terminal"
- **Mac** : clic droit → "Nouveau terminal au dossier"
- **VS Code** : ouvrir le dossier `istore-pro`, puis Terminal → Nouveau terminal, puis taper `cd backend`

#### 2b. Installer les dépendances

Dans le terminal (dans le dossier `backend/`), taper :
```bash
npm install
```
Attendre que tout s'installe (1-2 minutes). Vous verrez un dossier `node_modules/` apparaître.

#### 2c. Configurer les variables d'environnement

Ouvrir le fichier `backend/.env` dans VS Code et remplir chaque ligne :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/iphone-store
JWT_SECRET=MonSecretTresLongEtComplique2025!
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
COMPANY_NAME=iStore Pro
COMPANY_ADDRESS=12 rue de la Paix, 75001 Paris, France
COMPANY_EMAIL=contact@istorepro.com
COMPANY_PHONE=+33 1 23 45 67 89
```

> **MONGO_URI** : si vous utilisez MongoDB local, laissez `mongodb://localhost:27017/iphone-store`
> **JWT_SECRET** : inventez une longue chaîne de caractères (au moins 20 caractères, mélange lettres/chiffres)
> **EMAIL_USER / EMAIL_PASS** : voir section "Configurer Gmail" ci-dessous

#### 2d. Configurer Gmail pour les emails (optionnel en local)

Si vous voulez que les emails de quittance soient envoyés :

1. Se connecter à votre compte Gmail
2. Aller sur : **https://myaccount.google.com/security**
3. Activer **Validation en 2 étapes** (obligatoire)
4. Chercher **Mots de passe des applications**
5. Générer un mot de passe pour "iStore Pro"
6. Copier le code à 16 caractères (ex: `abcd efgh ijkl mnop`)
7. Le coller dans `EMAIL_PASS` dans le fichier `.env`

> ⚠️ Si vous ne configurez pas l'email, le site fonctionne quand même. Les quittances PDF sont générées mais l'email ne part pas.

---

### Étape 3 — Initialiser la base de données

Dans le terminal (dossier `backend/`), taper :
```bash
npm run seed
```

Vous devez voir :
```
✅ Connecté à MongoDB
✅ 20 produits insérés
✅ Admin : admin@istorepro.com / Admin1234!
✅ Client test : client@test.com / Client1234!
🚀 Seed terminé !
```

> Si vous voyez une erreur de connexion MongoDB, vérifiez que MongoDB est bien démarré sur votre machine.

---

### Étape 4 — Démarrer le serveur backend

Dans le terminal (dossier `backend/`), taper :
```bash
npm run dev
```

Vous devez voir :
```
🚀 iStore Pro API démarrée
   URL     : http://localhost:5000
   MongoDB : mongodb://localhost:27017/iphone-store
✅ MongoDB connecté : localhost
✅ Index MongoDB vérifiés.
```

> **Laisser ce terminal ouvert.** Le serveur doit rester actif pendant que vous utilisez le site.

---

### Étape 5 — Ouvrir le frontend

**Méthode recommandée avec Live Server (VS Code) :**

1. Ouvrir VS Code
2. Fichier → Ouvrir le dossier → sélectionner `istore-pro/frontend/`
3. Clic droit sur `index.html` → **Open with Live Server**
4. Le site s'ouvre automatiquement dans votre navigateur sur `http://127.0.0.1:5500`

**Méthode alternative (sans VS Code) :**
```bash
npx serve frontend
```
Puis ouvrir `http://localhost:3000`

---

## 4. Espace Administrateur

### Connexion à l'espace admin

**Identifiants par défaut (créés par le seed) :**

| Champ | Valeur |
|-------|--------|
| **Email** | `admin@istorepro.com` |
| **Mot de passe** | `Admin1234!` |

### Comment y accéder

**Option 1 — Via la page de connexion du site :**
1. Aller sur `http://127.0.0.1:5500/connexion.html`
2. Saisir l'email et le mot de passe admin ci-dessus
3. Vous êtes automatiquement redirigé vers `admin/index.html`

**Option 2 — Accès direct :**
Aller directement sur `http://127.0.0.1:5500/admin/index.html`
(Si vous n'êtes pas connecté, vous serez redirigé vers la connexion)

### Pages disponibles dans le CMS

| Page | URL | Description |
|------|-----|-------------|
| **Dashboard** | `admin/index.html` | Statistiques, paiements en attente, dossiers récents |
| **Produits** | `admin/produits.html` | Ajouter, modifier, supprimer des iPhones |
| **Clients** | `admin/clients.html` | Liste des clients inscrits, fiche détail |
| **Dossiers** | `admin/dossiers.html` | Dossiers de crédit, changement de statut |
| **Paiements** | `admin/paiements.html` | ⭐ Valider ou rejeter les paiements |
| **Quittances** | `admin/quittances.html` | Télécharger les PDFs générés |

### Valider un paiement (action principale)

1. Aller sur `admin/paiements.html`
2. Filtrer par **"En attente"**
3. Cliquer sur le bouton vert **"✓ Valider"**
4. Vérifier le récapitulatif (client, montant, reste à payer)
5. Cliquer **"Confirmer la validation"**
6. ✅ Le paiement est validé, la quittance PDF est générée et envoyée par email au client

> ⚠️ Cette action est irréversible. Une quittance ne peut jamais être générée deux fois pour le même paiement.

### Changer votre mot de passe admin

Actuellement, pour changer le mot de passe admin, utiliser MongoDB Compass (outil gratuit) ou taper dans un terminal :
```bash
cd backend
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hash = await bcrypt.hash('VotreNouveauMotDePasse!', 12);
  await User.updateOne({email:'admin@istorepro.com'}, {password: hash});
  console.log('✅ Mot de passe changé');
  process.exit(0);
});
"
```

---

## 5. Utilisation complète du site

### Parcours client complet

```
1. index.html          → Découvrir le site
2. catalogue.html      → Parcourir les 21 iPhones
3. produit.html?id=... → Voir le détail d'un produit
4. simulation.html     → Simuler son crédit (sans inscription)
5. connexion.html      → Créer un compte
6. produit.html        → Cliquer "Ouvrir un dossier de crédit"
7. espace-client.html  → Voir son dossier, déclarer un paiement
8. (Admin valide)      → Client reçoit la quittance par email
```

### Compte client de test (créé par le seed)

| Email | Mot de passe |
|-------|-------------|
| `client@test.com` | `Client1234!` |

### Simulateur de crédit (sans inscription)

1. Aller sur `simulation.html`
2. Sélectionner un produit dans la liste
3. Choisir l'état (Neuf / Grade A / B / C)
4. Saisir l'apport (minimum 40% du prix)
5. Choisir la durée (3 à 24 mois)
6. Cliquer **"Calculer mes mensualités"**

**Taux appliqués automatiquement :**
- Neuf : 3%
- Grade A : 1,5%
- Grade B : 2%
- Grade C : 2,5%

---

## 6. Déploiement sur Internet

### Étape 1 — MongoDB Atlas (base de données cloud)

1. Aller sur **https://mongodb.com/cloud/atlas** → créer un compte gratuit
2. Créer un cluster → **Free / M0** → région **Frankfurt**
3. **Database Access** → Add New User :
   - Username : `istorepro`
   - Password : générer (notez-le !)
   - Role : **Atlas admin**
4. **Network Access** → Add IP → `0.0.0.0/0`
5. **Clusters** → Connect → Drivers → copier l'URI :
   ```
   mongodb+srv://istorepro:VOTRE_MOT_DE_PASSE@cluster0.xxxxx.mongodb.net/iphone-store?retryWrites=true&w=majority
   ```

---

### Étape 2 — GitHub

1. Créer un compte sur **https://github.com**
2. Créer 2 dépôts : `istore-pro-backend` et `istore-pro-frontend`
3. Dans un terminal, depuis votre dossier extrait :

```bash
# Backend
cd backend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/istore-pro-backend.git
git push -u origin main

# Frontend
cd ../frontend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/istore-pro-frontend.git
git push -u origin main
```

---

### Étape 3 — Déployer le Backend sur Render

1. Aller sur **https://render.com** → Sign up with GitHub
2. **New +** → **Web Service**
3. Connecter le dépôt `istore-pro-backend`
4. Remplir le formulaire :

| Champ | Valeur |
|-------|--------|
| Name | `istore-pro-backend` |
| Region | `Frankfurt (EU Central)` |
| Branch | `main` |
| Root Directory | `backend` |
| Runtime | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | `Free` |

5. Cliquer **Advanced** → **Add Environment Variable** — ajouter une par une :

| Clé | Valeur |
|-----|--------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGO_URI` | `mongodb+srv://istorepro:MOT_DE_PASSE@cluster0.xxxxx.mongodb.net/iphone-store?retryWrites=true&w=majority` |
| `JWT_SECRET` | `UnSecretTresLongPourLaProduction2025!` |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `votre.email@gmail.com` |
| `EMAIL_PASS` | `xxxx xxxx xxxx xxxx` |
| `COMPANY_NAME` | `iStore Pro` |
| `COMPANY_ADDRESS` | `12 rue de la Paix, 75001 Paris, France` |
| `COMPANY_EMAIL` | `contact@istorepro.com` |
| `COMPANY_PHONE` | `+33 1 23 45 67 89` |

6. **Create Web Service** → attendre 2-3 minutes
7. Copier l'URL affichée, ex : `https://istore-pro-backend.onrender.com`

---

### Étape 4 — Initialiser la base de données sur Render

Dans le dashboard Render → onglet **Shell** :
```bash
npm run seed
```

---

### Étape 5 — Mettre à jour l'URL API dans le frontend

Ouvrir `frontend/assets/js/api.js` et remplacer :
```js
'https://istore-pro-backend.onrender.com/api'
```
par votre vraie URL Render (celle copiée à l'étape 3).

Puis pousser sur GitHub :
```bash
git add assets/js/api.js
git commit -m "Update API URL"
git push
```

---

### Étape 6 — Déployer le Frontend sur Render

1. **New +** → **Static Site**
2. Connecter `istore-pro-frontend`

| Champ | Valeur |
|-------|--------|
| Name | `istore-pro-frontend` |
| Branch | `main` |
| Root Directory | `frontend` |
| Build Command | *(laisser vide)* |
| Publish Directory | `.` |

3. **Create Static Site**
4. URL finale : `https://istore-pro-frontend.onrender.com`

---

### Étape 7 — Accès admin en production

L'URL de votre CMS en production sera :
```
https://istore-pro-frontend.onrender.com/connexion.html
```
Connectez-vous avec `admin@istorepro.com` / `Admin1234!`

> ⚠️ **Important** : changez le mot de passe admin dès la mise en production.

---

## 7. Problèmes courants

### Le catalogue est vide

**Cause :** Le backend n'est pas démarré ou le seed n'a pas été exécuté.

**Solution :**
- Vérifier que le terminal avec `npm run dev` est toujours ouvert
- Relancer `npm run seed` si les produits sont absents
- ✅ Le catalogue affiche quand même les 21 iPhones intégrés même sans backend

---

### Erreur "Cannot connect to MongoDB"

**Cause :** MongoDB n'est pas démarré sur votre machine.

**Solution Windows :**
```
Appuyer sur Win + R → taper services.msc → chercher "MongoDB" → Démarrer
```
**Solution Mac/Linux :**
```bash
brew services start mongodb-community
# ou
sudo systemctl start mongod
```

---

### Le serveur démarre mais les appels API échouent

**Cause :** Le frontend tente d'appeler `http://localhost:5000` mais le navigateur bloque la requête (CORS).

**Solution :** Utiliser Live Server (port 5500) et non le double-clic sur le fichier HTML. Le CORS est configuré pour autoriser `http://127.0.0.1:5500`.

---

### Les emails ne partent pas

**Cause :** Mauvaise configuration Gmail.

**Solution :**
1. Vérifier que la validation en 2 étapes est activée sur Gmail
2. Utiliser un **mot de passe d'application** (pas votre mot de passe Gmail normal)
3. Le mot de passe d'application a le format : `xxxx xxxx xxxx xxxx` (16 caractères avec espaces)

---

### Render : le backend se réveille lentement

**Cause :** Le plan gratuit Render met le service en veille après 15 min d'inactivité.

**Solution :** Utiliser **UptimeRobot** (gratuit) pour pinger le backend toutes les 5 minutes :
1. Aller sur **https://uptimerobot.com** → créer un compte
2. Add New Monitor → HTTP(s)
3. URL : `https://istore-pro-backend.onrender.com/api/health`
4. Interval : 5 minutes

---

## 📞 Résumé des URLs et identifiants

### En local
| Description | URL |
|-------------|-----|
| Site web | `http://127.0.0.1:5500/index.html` |
| Connexion admin | `http://127.0.0.1:5500/connexion.html` |
| CMS Admin | `http://127.0.0.1:5500/admin/index.html` |
| API Backend | `http://localhost:5000/api` |
| Health check | `http://localhost:5000/api/health` |

### En production (après déploiement Render)
| Description | URL |
|-------------|-----|
| Site web | `https://istore-pro-frontend.onrender.com` |
| Connexion admin | `https://istore-pro-frontend.onrender.com/connexion.html` |
| CMS Admin | `https://istore-pro-frontend.onrender.com/admin/index.html` |

### Comptes par défaut
| Rôle | Email | Mot de passe |
|------|-------|-------------|
| 🔑 **Administrateur** | `admin@istorepro.com` | `Admin1234!` |
| 👤 **Client test** | `client@test.com` | `Client1234!` |

> ⚠️ Changez ces mots de passe en production !
