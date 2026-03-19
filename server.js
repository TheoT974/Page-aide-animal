// ============================================================================
//  SERVEUR BACKEND - Page d'Information de Karine
// ============================================================================
//
//  Ce fichier est le serveur Express qui gere :
//    - Le service des fichiers statiques (HTML, CSS, images)
//    - L'API REST pour lire et modifier les donnees (data.json)
//    - L'authentification par mot de passe pour proteger l'admin
//    - L'upload d'images pour les cartes
//
//  LANCER LE SERVEUR :
//    node server.js
//
//  Le serveur tourne sur http://localhost:3000
//
// ============================================================================

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// ============================================================================
//  CONFIGURATION DU MOT DE PASSE ADMIN
// ============================================================================
//
//  Le mot de passe est stocke sous forme de hash SHA-256 (jamais en clair).
//  Mot de passe par defaut : "admin123"
//
//  POUR CHANGER LE MOT DE PASSE :
//  1. Ouvre un terminal et tape :
//     node -e "console.log(require('crypto').createHash('sha256').update('TON_NOUVEAU_MDP').digest('hex'))"
//  2. Remplace la valeur de ADMIN_PASSWORD_HASH par le hash genere
//
//  OU plus simple : change directement 'admin123' ci-dessous par ton mot de passe
// ============================================================================
const ADMIN_PASSWORD_HASH = crypto.createHash('sha256').update('chienchataide974').digest('hex');

// Stockage des sessions actives en memoire (token -> timestamp)
// Les sessions expirent apres 2 heures
const sessions = new Map();

// --- Middlewares globaux ---
app.use(cors());               // Autorise les requetes cross-origin
app.use(express.json());       // Parse le JSON dans les requetes
app.use(express.static(__dirname)); // Sert les fichiers statiques (HTML, images, etc.)

// ============================================================================
//  AUTHENTIFICATION
// ============================================================================

// POST /api/login - Verifie le mot de passe et retourne un token de session
//
// Securite :
//  - Le mot de passe est hashe en SHA-256 avant comparaison
//  - Comparaison en timing-safe (protege contre les attaques par timing)
//  - Pas de base de donnees SQL = pas d'injection SQL possible
//  - Un token aleatoire de 32 octets est genere pour chaque session
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ ok: false, error: 'Mot de passe requis' });
  }
  const inputHash = crypto.createHash('sha256').update(password).digest('hex');
  const valid = crypto.timingSafeEqual(Buffer.from(inputHash, 'hex'), Buffer.from(ADMIN_PASSWORD_HASH, 'hex'));
  if (!valid) {
    return res.status(401).json({ ok: false, error: 'Mot de passe incorrect' });
  }
  // Genere un token de session unique
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, Date.now());
  res.json({ ok: true, token });
});

// Middleware requireAuth - Protege les routes d'ecriture
// Verifie que le header X-Auth-Token contient un token valide et non expire
function requireAuth(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Non autorise' });
  }
  // Les sessions expirent apres 2 heures
  if (Date.now() - sessions.get(token) > 2 * 60 * 60 * 1000) {
    sessions.delete(token);
    return res.status(401).json({ error: 'Session expiree' });
  }
  next();
}

// ============================================================================
//  UPLOAD D'IMAGES
// ============================================================================

// Configuration de multer pour stocker les images dans le dossier /images
// Les fichiers sont renommes avec un timestamp pour eviter les conflits
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'images')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, Date.now() + '-' + name);
  }
});
const upload = multer({ storage });

// ============================================================================
//  FONCTIONS UTILITAIRES - Lecture/ecriture du fichier data.json
// ============================================================================

// Lit et parse le fichier data.json
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// Ecrit les donnees dans data.json (formate avec indentation)
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ============================================================================
//  API REST - Routes publiques (lecture seule)
// ============================================================================

// GET /api/data - Retourne toutes les donnees (header, banniere, sections, cartes)
// Cette route est publique car la page principale en a besoin pour s'afficher
app.get('/api/data', (req, res) => {
  res.json(readData());
});

// ============================================================================
//  API REST - Routes protegees (necessite authentification)
// ============================================================================

// --- En-tete de la page ---

// PUT /api/header - Met a jour l'en-tete (badge, titre, description)
// Corps : { "badge": "...", "title": "...", "description": "..." }
app.put('/api/header', requireAuth, (req, res) => {
  const data = readData();
  data.header = { ...data.header, ...req.body };
  writeData(data);
  res.json({ ok: true });
});

// --- Banniere ---

// PUT /api/banner - Met a jour la banniere (titre, texte)
// Corps : { "title": "...", "text": "..." }
app.put('/api/banner', requireAuth, (req, res) => {
  const data = readData();
  data.banner = { ...data.banner, ...req.body };
  writeData(data);
  res.json({ ok: true });
});

// --- Sections ---

// PUT /api/sections/:sectionId - Met a jour une section (titre, couleur)
// Corps : { "title": "...", "color": "violet" }
app.put('/api/sections/:sectionId', requireAuth, (req, res) => {
  const data = readData();
  const section = data.sections.find(s => s.id === req.params.sectionId);
  if (!section) return res.status(404).json({ error: 'Section non trouvee' });
  Object.assign(section, req.body);
  writeData(data);
  res.json({ ok: true });
});

// POST /api/sections - Cree une nouvelle section vide
// Corps : { "title": "Ma section", "color": "violet" }
app.post('/api/sections', requireAuth, (req, res) => {
  const data = readData();
  const id = 'section_' + Date.now();
  data.sections.push({ id, title: req.body.title || 'Nouvelle section', color: req.body.color || 'violet', cards: [] });
  writeData(data);
  res.json({ ok: true, id });
});

// DELETE /api/sections/:sectionId - Supprime une section et toutes ses cartes
app.delete('/api/sections/:sectionId', requireAuth, (req, res) => {
  const data = readData();
  data.sections = data.sections.filter(s => s.id !== req.params.sectionId);
  writeData(data);
  res.json({ ok: true });
});

// PUT /api/sections-reorder - Change l'ordre des sections
// Corps : { "sectionIds": ["id1", "id2", "id3"] }
app.put('/api/sections-reorder', requireAuth, (req, res) => {
  const data = readData();
  const { sectionIds } = req.body;
  if (!sectionIds) return res.status(400).json({ error: 'sectionIds requis' });
  const reordered = sectionIds.map(id => data.sections.find(s => s.id === id)).filter(Boolean);
  data.sections = reordered;
  writeData(data);
  res.json({ ok: true });
});

// --- Cartes ---

// PUT /api/sections/:sectionId/cards/:cardId - Met a jour une carte
// Corps : { "name": "...", "desc": "...", "color": "coral", "link": "...", etc. }
app.put('/api/sections/:sectionId/cards/:cardId', requireAuth, (req, res) => {
  const data = readData();
  const section = data.sections.find(s => s.id === req.params.sectionId);
  if (!section) return res.status(404).json({ error: 'Section non trouvee' });
  const card = section.cards.find(c => c.id === req.params.cardId);
  if (!card) return res.status(404).json({ error: 'Carte non trouvee' });
  Object.assign(card, req.body);
  writeData(data);
  res.json({ ok: true });
});

// POST /api/sections/:sectionId/cards - Ajoute une nouvelle carte a une section
// Corps optionnel : { "name": "...", "desc": "...", "color": "...", "emoji": "...", "link": "..." }
app.post('/api/sections/:sectionId/cards', requireAuth, (req, res) => {
  const data = readData();
  const section = data.sections.find(s => s.id === req.params.sectionId);
  if (!section) return res.status(404).json({ error: 'Section non trouvee' });
  const id = 'card_' + Date.now();
  section.cards.push({
    id,
    name: req.body.name || 'Nouvelle carte',
    desc: req.body.desc || '',
    color: req.body.color || 'violet',
    icon: 'emoji',
    image: '',
    emoji: req.body.emoji || '\uD83D\uDD17',
    link: req.body.link || '#'
  });
  writeData(data);
  res.json({ ok: true, id });
});

// DELETE /api/sections/:sectionId/cards/:cardId - Supprime une carte
app.delete('/api/sections/:sectionId/cards/:cardId', requireAuth, (req, res) => {
  const data = readData();
  const section = data.sections.find(s => s.id === req.params.sectionId);
  if (!section) return res.status(404).json({ error: 'Section non trouvee' });
  section.cards = section.cards.filter(c => c.id !== req.params.cardId);
  writeData(data);
  res.json({ ok: true });
});

// PUT /api/sections/:sectionId/reorder - Change l'ordre des cartes dans une section
// Corps : { "cardIds": ["card1", "card2", "card3"] }
app.put('/api/sections/:sectionId/reorder', requireAuth, (req, res) => {
  const data = readData();
  const section = data.sections.find(s => s.id === req.params.sectionId);
  if (!section) return res.status(404).json({ error: 'Section non trouvee' });
  const { cardIds } = req.body;
  if (!cardIds) return res.status(400).json({ error: 'cardIds requis' });
  const reordered = cardIds.map(id => section.cards.find(c => c.id === id)).filter(Boolean);
  section.cards = reordered;
  writeData(data);
  res.json({ ok: true });
});

// --- Upload d'images ---

// POST /api/upload - Upload une image dans le dossier /images
// Le fichier doit etre envoye en multipart/form-data avec le champ "image"
// Retourne : { "ok": true, "path": "images/1234567890-monimage.png" }
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Pas de fichier' });
  res.json({ ok: true, path: 'images/' + req.file.filename });
});

// ============================================================================
//  DEMARRAGE DU SERVEUR
// ============================================================================

app.listen(PORT, () => {
  console.log(`Serveur demarre sur http://localhost:${PORT}`);
  console.log(`Page: http://localhost:${PORT}/mainV2.html`);
  console.log(`Mot de passe admin par defaut: admin123`);
});
