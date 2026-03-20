<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Demo - Page d'Information de Karine</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&display=swap" rel="stylesheet">
<style>
  :root {
    --coral: #FF6B6B; --coral-light: #FFF0F0;
    --sky: #4ECDC4; --sky-light: #EDFCFA;
    --violet: #7C5CFC; --violet-light: #F0EDFF;
    --sun: #FFB340; --sun-light: #FFF6E6;
    --mint: #2ED47A; --mint-light: #EAFBF1;
    --rose: #F76CA5; --rose-light: #FFF0F6;
    --ocean: #3B82F6; --ocean-light: #EEF4FF;
    --lavender: #A78BFA; --lavender-light: #F3F0FF;
    --amber: #F59E0B; --amber-light: #FFFBEB;
    --teal: #14B8A6; --teal-light: #F0FDFA;
    --bg: #FAFBFE; --text: #1E293B; --text-dim: #64748B;
    --white: #FFFFFF; --border: #E2E8F0;
    --danger: #EF4444; --success: #10B981;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0F172A; color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

  /* ── Hero section ── */
  .hero {
    text-align: center; padding: 60px 24px 40px;
    background: linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%);
    position: relative; overflow: hidden;
  }
  .hero::before { content: ''; position: absolute; width: 400px; height: 400px; background: rgba(124,92,252,0.15); border-radius: 50%; top: -100px; right: -50px; filter: blur(60px); }
  .hero::after { content: ''; position: absolute; width: 300px; height: 300px; background: rgba(247,108,165,0.1); border-radius: 50%; bottom: -80px; left: -30px; filter: blur(60px); }
  .hero h1 {
    font-family: 'Fraunces', serif; font-size: 2.8rem; font-weight: 700;
    background: linear-gradient(135deg, #A78BFA 0%, #F76CA5 50%, #FFB340 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-bottom: 12px; position: relative; z-index: 1;
  }
  .hero p { color: #94A3B8; font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6; position: relative; z-index: 1; }
  .hero-badge {
    display: inline-block; background: rgba(124,92,252,0.2); color: #A78BFA;
    font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em;
    padding: 6px 16px; border-radius: 100px; margin-bottom: 16px; border: 1px solid rgba(124,92,252,0.3);
    position: relative; z-index: 1;
  }

  /* ── View switcher ── */
  .switcher {
    display: flex; justify-content: center; gap: 8px; padding: 30px 24px 20px;
    background: #0F172A; position: sticky; top: 0; z-index: 50;
  }
  .switcher button {
    padding: 10px 28px; border-radius: 10px; border: 1px solid #334155;
    background: #1E293B; color: #94A3B8; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: all 0.2s;
  }
  .switcher button:hover { border-color: #7C5CFC; color: #E2E8F0; }
  .switcher button.active {
    background: linear-gradient(135deg, var(--violet), var(--ocean));
    color: white; border-color: transparent; box-shadow: 0 4px 20px rgba(124,92,252,0.3);
  }

  /* ── Device frame ── */
  .frame-wrap { display: flex; justify-content: center; padding: 20px 24px 60px; }
  .device-frame {
    width: 100%; max-width: 800px; border-radius: 20px; overflow: hidden;
    box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
    background: var(--bg); position: relative;
  }
  .device-bar {
    background: #F1F5F9; padding: 10px 16px; display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid var(--border);
  }
  .device-dots { display: flex; gap: 6px; }
  .device-dots span { width: 10px; height: 10px; border-radius: 50%; }
  .device-dots span:nth-child(1) { background: #FF6B6B; }
  .device-dots span:nth-child(2) { background: #FFB340; }
  .device-dots span:nth-child(3) { background: #2ED47A; }
  .device-url {
    flex: 1; background: white; border: 1px solid var(--border); border-radius: 6px;
    padding: 5px 12px; font-size: 0.75rem; color: var(--text-dim); font-family: monospace;
  }
  .device-content { max-height: 700px; overflow-y: auto; position: relative; }

  /* ── Page publique (dans le frame) ── */
  .page-demo { padding: 40px 24px 60px; position: relative; overflow: hidden; }
  .page-demo .blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.2; pointer-events: none; }
  .page-demo .blob-1 { width: 400px; height: 400px; background: var(--coral); top: -120px; right: -80px; }
  .page-demo .blob-2 { width: 300px; height: 300px; background: var(--sky); bottom: -80px; left: -60px; }
  .page-demo .blob-3 { width: 280px; height: 280px; background: var(--violet); top: 40%; left: 50%; transform: translateX(-50%); }

  .page-demo header { text-align: center; margin-bottom: 36px; position: relative; z-index: 1; }
  .page-demo .badge {
    display: inline-block; background: linear-gradient(135deg, var(--violet), var(--rose));
    color: white; font-size: 0.65rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.12em; padding: 5px 14px; border-radius: 100px; margin-bottom: 12px;
  }
  .page-demo header h1 {
    font-family: 'Fraunces', serif; font-size: 2.2rem; font-weight: 700;
    background: linear-gradient(135deg, var(--violet) 0%, var(--coral) 50%, var(--sun) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    line-height: 1.2; margin-bottom: 8px;
  }
  .page-demo header p { color: var(--text-dim); font-size: 0.9rem; max-width: 420px; margin: 0 auto; line-height: 1.6; }

  .info-banner {
    background: linear-gradient(135deg, var(--violet), var(--ocean));
    color: white; border-radius: 16px; padding: 24px 28px; margin-bottom: 32px;
    position: relative; overflow: hidden; z-index: 1;
  }
  .info-banner::before { content: ''; position: absolute; width: 160px; height: 160px; background: rgba(255,255,255,0.08); border-radius: 50%; top: -50px; right: -30px; }
  .info-banner h2 { font-family: 'Fraunces', serif; font-size: 1.2rem; margin-bottom: 6px; }
  .info-banner p { font-size: 0.82rem; opacity: 0.9; line-height: 1.5; }

  .section { margin-bottom: 32px; position: relative; z-index: 1; }
  .section-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; padding-left: 4px; }
  .section-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  .section-title { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-dim); }

  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
  .card {
    display: flex; align-items: center; gap: 12px; padding: 14px 16px;
    border-radius: 14px; text-decoration: none; color: var(--text);
    border: 1.5px solid transparent; transition: all 0.3s; cursor: pointer;
  }
  .card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
  .card-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; flex-shrink: 0; color: white; overflow: hidden;
  }
  .card-icon img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }
  .card-info { flex: 1; min-width: 0; }
  .card-name { font-weight: 600; font-size: 0.85rem; margin-bottom: 1px; }
  .card-desc { font-size: 0.72rem; color: var(--text-dim); }

  .card.civis { background: var(--sun-light); border-color: rgba(255,179,64,0.15); }
  .card.civis .card-icon { background: rgba(255,212,45); }
  .card.civis:hover { border-color: var(--sun); }
  .card.coral { background: var(--coral-light); border-color: rgba(255,107,107,0.15); }
  .card.coral .card-icon { background: var(--coral); }
  .card.coral:hover { border-color: var(--coral); }
  .card.mint { background: var(--mint-light); border-color: rgba(46,212,122,0.15); }
  .card.mint .card-icon { background: var(--mint); }
  .card.mint:hover { border-color: var(--mint); }
  .card.violet { background: var(--violet-light); border-color: rgba(124,92,252,0.15); }
  .card.violet .card-icon { background: var(--violet); }
  .card.violet:hover { border-color: var(--violet); }
  .card.lavender { background: var(--lavender-light); border-color: rgba(167,139,250,0.15); }
  .card.lavender .card-icon { background: var(--lavender); }
  .card.lavender:hover { border-color: var(--lavender); }
  .card.rose { background: var(--rose-light); border-color: rgba(247,108,165,0.15); }
  .card.rose .card-icon { background: var(--rose); }
  .card.rose:hover { border-color: var(--rose); }
  .card.teal { background: var(--teal-light); border-color: rgba(20,184,166,0.15); }
  .card.teal .card-icon { background: var(--teal); }
  .card.teal:hover { border-color: var(--teal); }

  .demo-footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.06); position: relative; z-index: 1; }
  .demo-footer p { color: var(--text-dim); font-size: 0.75rem; }
  .hearts { display: flex; justify-content: center; gap: 4px; margin-top: 5px; font-size: 0.55rem; }

  /* ── Admin demo ── */
  .admin-demo { padding: 30px 24px 40px; display: none; }

  .admin-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .admin-top h1 { font-size: 1.2rem; }
  .back-btn {
    display: inline-flex; align-items: center; gap: 5px; padding: 7px 14px;
    border-radius: 8px; border: 1px solid var(--border); background: white;
    font-size: 0.8rem; font-weight: 600; color: var(--text-dim); margin-bottom: 14px;
  }
  .btn-danger { background: var(--danger); color: white; padding: 6px 14px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; border: none; }
  .btn-primary { background: var(--violet); color: white; padding: 6px 14px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; border: none; }

  .panel { background: white; border-radius: 12px; border: 1px solid var(--border); margin-bottom: 16px; overflow: hidden; }
  .panel-header {
    padding: 14px 18px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .panel-header h2 { font-size: 0.9rem; font-weight: 700; display: flex; align-items: center; gap: 6px; }
  .panel-body { padding: 16px; }
  .panel-toggle { font-size: 0.7rem; color: var(--text-dim); }

  .form-group { margin-bottom: 12px; }
  .form-group label { display: block; font-size: 0.72rem; font-weight: 600; color: var(--text-dim); margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.05em; }
  .form-group input, .form-group textarea {
    width: 100%; padding: 8px 10px; border: 1px solid var(--border); border-radius: 8px;
    font-size: 0.82rem; font-family: inherit; background: white; color: var(--text);
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .color-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .color-picker { display: flex; gap: 5px; flex-wrap: wrap; }
  .color-option { width: 26px; height: 26px; border-radius: 6px; border: 2px solid transparent; }
  .color-option.selected { border-color: var(--text); box-shadow: 0 0 0 2px white, 0 0 0 4px var(--text); }

  .card-editor { background: #F8FAFC; border: 1px solid var(--border); border-radius: 10px; padding: 14px; margin-bottom: 10px; }
  .card-editor-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .card-editor-header h3 { font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 5px; }

  .order-btn {
    width: 26px; height: 26px; border-radius: 5px; border: 1px solid var(--border);
    background: white; font-size: 0.8rem; display: inline-flex; align-items: center;
    justify-content: center; color: var(--text-dim);
  }

  .card-preview {
    display: flex; align-items: center; gap: 10px; padding: 12px 14px;
    border-radius: 10px; margin-bottom: 12px; border: 1.5px solid transparent;
  }
  .card-preview .icon {
    width: 36px; height: 36px; border-radius: 9px; display: flex;
    align-items: center; justify-content: center; font-size: 1.1rem; color: white;
    overflow: hidden; flex-shrink: 0;
  }
  .card-preview .icon img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }
  .card-preview .name { font-weight: 600; font-size: 0.82rem; }
  .card-preview .desc { font-size: 0.7rem; color: var(--text-dim); }

  /* ── Stats demo ── */
  .stats-total { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
  .stats-card { background: white; border: 1px solid var(--border); border-radius: 10px; padding: 16px; flex: 1; min-width: 120px; text-align: center; }
  .stats-card .number { font-size: 1.6rem; font-weight: 700; color: var(--violet); }
  .stats-card .label { font-size: 0.72rem; color: var(--text-dim); margin-top: 3px; }
  .stats-table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
  .stats-table th { text-align: left; padding: 8px 10px; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); border-bottom: 2px solid var(--border); }
  .stats-table td { padding: 8px 10px; border-bottom: 1px solid var(--border); }
  .stats-rank { width: 36px; text-align: center; font-weight: 700; color: var(--violet); }
  .stats-bar { height: 5px; border-radius: 3px; background: var(--violet); }
  .stats-bar-bg { height: 5px; border-radius: 3px; background: var(--border); width: 100%; }

  /* ── Feature list ── */
  .features {
    max-width: 800px; margin: 0 auto; padding: 0 24px 60px;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px;
  }
  .feature {
    background: #1E293B; border: 1px solid #334155; border-radius: 14px;
    padding: 24px; transition: all 0.3s;
  }
  .feature:hover { border-color: #7C5CFC; transform: translateY(-2px); }
  .feature-icon { font-size: 1.6rem; margin-bottom: 10px; }
  .feature h3 { color: #E2E8F0; font-size: 0.95rem; margin-bottom: 6px; }
  .feature p { color: #94A3B8; font-size: 0.8rem; line-height: 1.5; }

  .section-label {
    text-align: center; padding: 40px 24px 20px;
    color: #94A3B8; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  @media (max-width: 600px) {
    .hero h1 { font-size: 2rem; }
    .cards { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .features { grid-template-columns: 1fr; }
    .stats-total { flex-direction: column; }
  }
</style>
</head>
<body>

<!-- ── HERO ── -->
<div class="hero">
  <div class="hero-badge">Demo du projet</div>
  <h1>Page d'Information</h1>
  <p>Une page web complete avec panneau d'administration cache, gestion de contenu dynamique et suivi des statistiques de clics.</p>
</div>

<!-- ── Switcher ── -->
<div class="switcher">
  <button class="active" onclick="switchView('page')">Page publique</button>
  <button onclick="switchView('admin')">Administration</button>
  <button onclick="switchView('stats')">Statistiques</button>
</div>

<!-- ── Features ── -->
<div class="section-label">Fonctionnalites principales</div>
<div class="features">
  <div class="feature">
    <div class="feature-icon">&#128274;</div>
    <h3>Admin secret</h3>
    <p>5 clics rapides sur le footer pour acceder au panneau. Invisible pour les visiteurs.</p>
  </div>
  <div class="feature">
    <div class="feature-icon">&#127912;</div>
    <h3>14 couleurs</h3>
    <p>Palette de 14 themes pour les cartes et les sections, modifiables en un clic.</p>
  </div>
  <div class="feature">
    <div class="feature-icon">&#128202;</div>
    <h3>Analytics</h3>
    <p>Suivi automatique des clics avec classement, medailles et barres de popularite.</p>
  </div>
  <div class="feature">
    <div class="feature-icon">&#128736;</div>
    <h3>Edition en direct</h3>
    <p>Modifier titres, descriptions, liens, images et couleurs sans toucher au code.</p>
  </div>
  <div class="feature">
    <div class="feature-icon">&#128256;</div>
    <h3>Reordonnancement</h3>
    <p>Deplacer les cartes et sections avec les fleches haut/bas.</p>
  </div>
  <div class="feature">
    <div class="feature-icon">&#128737;</div>
    <h3>Securite</h3>
    <p>Hash SHA-256, comparaison timing-safe, tokens de session, pas d'injection SQL.</p>
  </div>
</div>

<!-- ── Device frame ── -->
<div class="frame-wrap">
  <div class="device-frame">
    <div class="device-bar">
      <div class="device-dots"><span></span><span></span><span></span></div>
      <div class="device-url" id="url-bar">localhost:3000/mainV2.html</div>
    </div>
    <div class="device-content">

      <!-- PAGE PUBLIQUE -->
      <div class="page-demo" id="view-page">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>

        <header>
          <div class="badge">Page d'information</div>
          <h1>Bienvenue !</h1>
          <p>Retrouve ici toutes les informations importantes et les liens utiles dont tu as besoin.</p>
        </header>

        <div class="info-banner">
          <h2>Annonce importante</h2>
          <p>Ecris ici un message important, une annonce ou une info a mettre en avant. Ce bloc attire l'attention immediatement.</p>
        </div>

        <div class="section">
          <div class="section-header">
            <div class="section-dot" style="background: var(--violet)"></div>
            <div class="section-title">Interco/Prefecture</div>
          </div>
          <div class="cards">
            <div class="card civis"><div class="card-icon" style="background:rgba(255,212,45);color:red;font-weight:700;font-size:0.6rem;">CIVIS</div><div class="card-info"><div class="card-name">CIVIS</div><div class="card-desc">Interco</div></div></div>
            <div class="card coral"><div class="card-icon">&#127759;</div><div class="card-info"><div class="card-name">CINOR</div><div class="card-desc">Interco Nord</div></div></div>
            <div class="card violet"><div class="card-icon">&#127963;</div><div class="card-info"><div class="card-name">CASUD</div><div class="card-desc">Interco Sud</div></div></div>
            <div class="card civis"><div class="card-icon" style="font-size:0.6rem;font-weight:700;color:red;">CIREST</div><div class="card-info"><div class="card-name">CIREST</div><div class="card-desc">Interco Est</div></div></div>
            <div class="card teal"><div class="card-icon">&#127961;</div><div class="card-info"><div class="card-name">TCO</div><div class="card-desc">Territoire de l'Ouest</div></div></div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <div class="section-dot" style="background: var(--coral)"></div>
            <div class="section-title">Veterinaire</div>
          </div>
          <div class="cards">
            <div class="card coral"><div class="card-icon">&#9993;&#65039;</div><div class="card-info"><div class="card-name">Email principal</div><div class="card-desc">contact@example.com</div></div></div>
            <div class="card lavender"><div class="card-icon">&#128172;</div><div class="card-info"><div class="card-name">Discord</div><div class="card-desc">Serveur communautaire</div></div></div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <div class="section-dot" style="background: var(--mint)"></div>
            <div class="section-title">Association</div>
          </div>
          <div class="cards">
            <div class="card mint"><div class="card-icon">&#128218;</div><div class="card-info"><div class="card-name">Documentation</div><div class="card-desc">Guides et tutoriels</div></div></div>
            <div class="card civis"><div class="card-icon">&#128194;</div><div class="card-info"><div class="card-name">Fichiers partages</div><div class="card-desc">Google Drive commun</div></div></div>
            <div class="card rose"><div class="card-icon">&#127909;</div><div class="card-info"><div class="card-name">Videos</div><div class="card-desc">Replays et tutos video</div></div></div>
          </div>
        </div>

        <div class="demo-footer">
          <p>Derniere mise a jour : Mars 2026</p>
          <div class="hearts">
            <span style="color:var(--coral)">&#9679;</span>
            <span style="color:var(--sun)">&#9679;</span>
            <span style="color:var(--mint)">&#9679;</span>
            <span style="color:var(--violet)">&#9679;</span>
            <span style="color:var(--sky)">&#9679;</span>
          </div>
          <p style="margin-top:8px;font-size:0.7rem;color:var(--violet);font-weight:600;">&#8593; 5 clics rapides ici = acces admin &#8593;</p>
        </div>
      </div>

      <!-- ADMIN DEMO -->
      <div class="admin-demo" id="view-admin">
        <div class="back-btn">&#8592; Retour a la page</div>
        <div class="admin-top">
          <h1>Administration</h1>
          <button class="btn-danger">Deconnexion</button>
        </div>

        <!-- Header panel -->
        <div class="panel">
          <div class="panel-header"><h2>En-tete de la page</h2><span class="panel-toggle">&#9660;</span></div>
          <div class="panel-body">
            <div class="form-group"><label>Badge</label><input type="text" value="Page d'information"></div>
            <div class="form-group"><label>Titre</label><input type="text" value="Bienvenue !"></div>
            <div class="form-group"><label>Description</label><textarea rows="2">Retrouve ici toutes les informations importantes et les liens utiles dont tu as besoin.</textarea></div>
          </div>
        </div>

        <!-- Banner panel -->
        <div class="panel">
          <div class="panel-header"><h2>Banniere</h2><span class="panel-toggle">&#9660;</span></div>
          <div class="panel-body">
            <div class="form-group"><label>Titre</label><input type="text" value="Annonce importante"></div>
            <div class="form-group"><label>Message</label><textarea rows="2">Ecris ici un message important...</textarea></div>
          </div>
        </div>

        <!-- Section panel -->
        <div class="panel">
          <div class="panel-header">
            <h2><span class="color-dot" style="background:var(--violet)"></span> Interco/Prefecture</h2>
            <div style="display:flex;gap:4px;align-items:center;">
              <button class="order-btn">&#9650;</button>
              <button class="order-btn">&#9660;</button>
              <span class="panel-toggle">&#9660;</span>
            </div>
          </div>
          <div class="panel-body">
            <div class="form-row" style="margin-bottom:14px;">
              <div class="form-group"><label>Nom de la section</label><input type="text" value="Interco/Prefecture"></div>
              <div class="form-group"><label>Couleur de la section</label>
                <div class="color-picker">
                  <div class="color-option" style="background:#FF6B6B"></div>
                  <div class="color-option" style="background:#4ECDC4"></div>
                  <div class="color-option selected" style="background:#7C5CFC"></div>
                  <div class="color-option" style="background:#FFB340"></div>
                  <div class="color-option" style="background:#2ED47A"></div>
                  <div class="color-option" style="background:#F76CA5"></div>
                  <div class="color-option" style="background:#3B82F6"></div>
                  <div class="color-option" style="background:#A78BFA"></div>
                  <div class="color-option" style="background:#F59E0B"></div>
                  <div class="color-option" style="background:#6366F1"></div>
                  <div class="color-option" style="background:#059669"></div>
                  <div class="color-option" style="background:#D946EF"></div>
                  <div class="color-option" style="background:#14B8A6"></div>
                  <div class="color-option" style="background:#475569"></div>
                </div>
              </div>
            </div>

            <!-- Card editor CIVIS -->
            <div class="card-editor">
              <div class="card-editor-header">
                <h3><span class="color-dot" style="background:rgba(255,212,45)"></span> CIVIS</h3>
                <div style="display:flex;gap:4px;align-items:center;">
                  <button class="order-btn">&#9650;</button>
                  <button class="order-btn">&#9660;</button>
                  <button class="btn-danger" style="padding:4px 10px;font-size:0.75rem;">Supprimer</button>
                </div>
              </div>
              <div class="card-preview" style="background:rgba(255,212,45,0.1)">
                <div class="icon" style="background:rgba(255,212,45);font-size:0.55rem;font-weight:700;color:red;">CIVIS</div>
                <div><div class="name">CIVIS</div><div class="desc">Interco</div></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Nom</label><input type="text" value="CIVIS"></div>
                <div class="form-group"><label>Description</label><input type="text" value="Interco"></div>
              </div>
              <div class="form-group"><label>Lien (URL)</label><input type="text" value="https://www.civis.re/ecologie-urbaine-rurale/218-le-centre-animalier"></div>
              <div class="form-group"><label>Couleur</label>
                <div class="color-picker">
                  <div class="color-option" style="background:#FF6B6B"></div>
                  <div class="color-option" style="background:#4ECDC4"></div>
                  <div class="color-option" style="background:#7C5CFC"></div>
                  <div class="color-option selected" style="background:#FFD42D"></div>
                  <div class="color-option" style="background:#2ED47A"></div>
                  <div class="color-option" style="background:#F76CA5"></div>
                  <div class="color-option" style="background:#3B82F6"></div>
                  <div class="color-option" style="background:#A78BFA"></div>
                </div>
              </div>
            </div>

            <!-- Card editor CINOR (collapsed) -->
            <div class="card-editor">
              <div class="card-editor-header">
                <h3><span class="color-dot" style="background:var(--coral)"></span> CINOR</h3>
                <div style="display:flex;gap:4px;align-items:center;">
                  <button class="order-btn">&#9650;</button>
                  <button class="order-btn">&#9660;</button>
                  <button class="btn-danger" style="padding:4px 10px;font-size:0.75rem;">Supprimer</button>
                </div>
              </div>
              <div class="card-preview" style="background:rgba(255,107,107,0.1)">
                <div class="icon" style="background:var(--coral);">&#127759;</div>
                <div><div class="name">CINOR</div><div class="desc">Interco Nord</div></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Nom</label><input type="text" value="CINOR"></div>
                <div class="form-group"><label>Description</label><input type="text" value="Interco Nord"></div>
              </div>
            </div>

            <div style="display:flex;gap:8px;margin-top:8px;">
              <button class="btn-primary" style="font-size:0.78rem;">+ Ajouter une carte</button>
              <button class="btn-danger" style="font-size:0.78rem;">Supprimer la section</button>
            </div>
          </div>
        </div>

        <div style="text-align:center;margin:16px 0;">
          <button class="btn-primary">+ Nouvelle section</button>
        </div>
      </div>

      <!-- STATS DEMO -->
      <div class="admin-demo" id="view-stats">
        <div class="back-btn">&#8592; Retour a la page</div>
        <div class="admin-top">
          <h1>Administration</h1>
          <button class="btn-danger">Deconnexion</button>
        </div>

        <div class="panel">
          <div class="panel-header"><h2>&#128202; Statistiques</h2><span class="panel-toggle">&#9660;</span></div>
          <div class="panel-body">
            <div class="stats-total">
              <div class="stats-card"><div class="number">47</div><div class="label">Clics au total</div></div>
              <div class="stats-card"><div class="number">8</div><div class="label">Cartes cliquees</div></div>
              <div class="stats-card"><div class="number">CIVIS</div><div class="label">Carte la plus populaire</div></div>
            </div>

            <table class="stats-table">
              <thead><tr>
                <th style="width:36px">#</th><th>Carte</th><th>Section</th><th style="width:60px">Clics</th><th style="width:150px">Popularite</th><th>Dernier clic</th>
              </tr></thead>
              <tbody>
                <tr>
                  <td class="stats-rank">&#129351; 1</td>
                  <td><strong>CIVIS</strong></td>
                  <td style="color:var(--text-dim)">Interco/Prefecture</td>
                  <td><strong>15</strong></td>
                  <td><div class="stats-bar-bg"><div class="stats-bar" style="width:100%"></div></div></td>
                  <td style="font-size:0.72rem;color:var(--text-dim)">19/03/2026 14:32</td>
                </tr>
                <tr>
                  <td class="stats-rank">&#129352; 2</td>
                  <td><strong>CINOR</strong></td>
                  <td style="color:var(--text-dim)">Interco/Prefecture</td>
                  <td><strong>9</strong></td>
                  <td><div class="stats-bar-bg"><div class="stats-bar" style="width:60%"></div></div></td>
                  <td style="font-size:0.72rem;color:var(--text-dim)">19/03/2026 13:18</td>
                </tr>
                <tr>
                  <td class="stats-rank">&#129353; 3</td>
                  <td><strong>Documentation</strong></td>
                  <td style="color:var(--text-dim)">Association</td>
                  <td><strong>7</strong></td>
                  <td><div class="stats-bar-bg"><div class="stats-bar" style="width:47%"></div></div></td>
                  <td style="font-size:0.72rem;color:var(--text-dim)">19/03/2026 12:45</td>
                </tr>
                <tr>
                  <td class="stats-rank">4</td>
                  <td><strong>TCO</strong></td>
                  <td style="color:var(--text-dim)">Interco/Prefecture</td>
                  <td><strong>5</strong></td>
                  <td><div class="stats-bar-bg"><div class="stats-bar" style="width:33%"></div></div></td>
                  <td style="font-size:0.72rem;color:var(--text-dim)">19/03/2026 11:20</td>
                </tr>
                <tr>
                  <td class="stats-rank">5</td>
                  <td><strong>Discord</strong></td>
                  <td style="color:var(--text-dim)">Veterinaire</td>
                  <td><strong>4</strong></td>
                  <td><div class="stats-bar-bg"><div class="stats-bar" style="width:27%"></div></div></td>
                  <td style="font-size:0.72rem;color:var(--text-dim)">18/03/2026 17:55</td>
                </tr>
                <tr>
                  <td class="stats-rank">6</td>
                  <td><strong>CASUD</strong></td>
                  <td style="color:var(--text-dim)">Interco/Prefecture</td>
                  <td><strong>3</strong></td>
                  <td><div class="stats-bar-bg"><div class="stats-bar" style="width:20%"></div></div></td>
                  <td style="font-size:0.72rem;color:var(--text-dim)">18/03/2026 15:10</td>
                </tr>
                <tr>
                  <td class="stats-rank">7</td>
                  <td><strong>Boutique</strong></td>
                  <td style="color:var(--text-dim)">Liens Utiles</td>
                  <td><strong>2</strong></td>
                  <td><div class="stats-bar-bg"><div class="stats-bar" style="width:13%"></div></div></td>
                  <td style="font-size:0.72rem;color:var(--text-dim)">18/03/2026 10:02</td>
                </tr>
                <tr>
                  <td class="stats-rank">8</td>
                  <td><strong>Videos</strong></td>
                  <td style="color:var(--text-dim)">Association</td>
                  <td><strong>2</strong></td>
                  <td><div class="stats-bar-bg"><div class="stats-bar" style="width:13%"></div></div></td>
                  <td style="font-size:0.72rem;color:var(--text-dim)">17/03/2026 19:30</td>
                </tr>
              </tbody>
            </table>

            <div style="margin-top:14px;text-align:right;">
              <button class="btn-danger" style="font-size:0.78rem;">Remettre a zero les statistiques</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<script>
function switchView(view) {
  document.getElementById('view-page').style.display = view === 'page' ? '' : 'none';
  document.getElementById('view-admin').style.display = view === 'admin' ? 'block' : 'none';
  document.getElementById('view-stats').style.display = view === 'stats' ? 'block' : 'none';

  document.querySelectorAll('.switcher button').forEach((b, i) => {
    b.classList.remove('active');
    if ((view === 'page' && i === 0) || (view === 'admin' && i === 1) || (view === 'stats' && i === 2)) b.classList.add('active');
  });

  const url = document.getElementById('url-bar');
  if (view === 'page') url.textContent = 'localhost:3000/mainV2.html';
  else url.textContent = 'localhost:3000/mainV2.html (admin)';

  document.querySelector('.device-content').scrollTop = 0;
}
</script>

</body>
</html>
