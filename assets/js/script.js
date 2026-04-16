/* ============================================================
   NAV — scroll shrink + mobile hamburger
   ============================================================ */
(function () {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('nav-overlay');
 
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
 
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
 
  window.closeMenu = function () {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };
})();

/* ============================================================
   HERO CANVAS — subtle drifting dot grid
   ============================================================ */
(function () {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  const DOT_SPACING = 36, DOT_R = 1.2, SPEED = 0.18;
  let W, H, dots = [], raf;
 
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildDots();
  }
 
  function buildDots() {
    dots = [];
    const cols = Math.ceil(W / DOT_SPACING) + 2;
    const rows = Math.ceil(H / DOT_SPACING) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          bx: c * DOT_SPACING, by: r * DOT_SPACING,
          ox: (Math.random() - 0.5) * 8,
          oy: (Math.random() - 0.5) * 8,
          phase: Math.random() * Math.PI * 2,
          speed: SPEED * (0.6 + Math.random() * 0.8)
        });
      }
    }
  }
  

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(96,165,250,0.55)';
    const ts = t * 0.001;
    for (const d of dots) {
      const x = d.bx + d.ox * Math.sin(ts * d.speed + d.phase);
      const y = d.by + d.oy * Math.cos(ts * d.speed + d.phase + 1);
      ctx.beginPath();
      ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  raf = requestAnimationFrame(draw);
})();

/* ============================================================
   STAT COUNT-UP — triggers when stats scroll into view
   ============================================================ */
(function () {
  const stats = document.querySelectorAll('.stat-number');
  const targets = Array.from(stats).map(el => {
    const raw = el.textContent.trim();
    return { el, raw, num: parseInt(raw), suffix: raw.replace(/[0-9]/g, '') };
  });
 
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const item = targets.find(t => t.el === entry.target);
      if (!item || item.done) return;
      item.done = true;
      observer.unobserve(entry.target);
 
      const duration = 1200, start = performance.now();
      item.el.classList.add('counting');
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        item.el.textContent = Math.round(ease * item.num) + item.suffix;
        if (p < 1) requestAnimationFrame(tick);
        else { item.el.textContent = item.raw; item.el.classList.remove('counting'); }
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
 
  stats.forEach(s => observer.observe(s));
})();

/* ============================================================
   PRESS BANNER — fade in on scroll
   ============================================================ */
(function () {
  const banner = document.querySelector('.press-banner');
  if (!banner) return;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      banner.classList.add('visible');
      observer.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(banner);
})();

/* ============================================================
   RENDER — reads from content.js and builds the page
   ============================================================ */

/* About */
(function () {
  const el = document.getElementById('about-text');
  if (!el) return;
  el.innerHTML = ABOUT.paragraphs.map(p => `<p>${p}</p>`).join('');
})();
 
/* Hero status card rows */
(function () {
  const el = document.getElementById('hero-status-rows');
  if (!el) return;
  el.innerHTML = HERO.status.map(row => `
    <div class="hero-status-row">
      <span class="hero-status-key">${row.key}</span>
      <span class="hero-status-val">${row.val}</span>
    </div>`).join('');
})();
 
/* Hero stats */
(function () {
  const el = document.getElementById('hero-stats');
  if (!el) return;
  el.innerHTML = HERO.stats.map(s => `
    <div class="stat-item">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');
})();
 
/* Involvement cards */
(function () {
  const el = document.getElementById('inv-grid');
  if (!el) return;
  el.innerHTML = INVOLVEMENT.map(inv => `
    <div class="inv-card">
      <div class="inv-top">
        <span class="inv-num">${inv.num}</span>
        <span class="inv-date">${inv.date}</span>
      </div>
      <div class="inv-org">${inv.org}</div>
      <div class="inv-role">${inv.role}</div>
      <div class="inv-desc">${inv.desc}</div>
    </div>`).join('');
})();
 
/* Skills */
(function () {
  const el = document.getElementById('skills-grid');
  if (!el) return;
  el.innerHTML = SKILLS.map(group => `
    <div class="skills-group">
      <div class="skills-group-label">${group.label}</div>
      <div class="skills-list">
        ${group.pills.map(p => `<span class="skill-pill">${p}</span>`).join('')}
      </div>
    </div>`).join('');
})();
 
/* Contact */
(function () {
  const heading = document.getElementById('contact-heading');
  const sub     = document.getElementById('contact-sub');
  const press   = document.getElementById('contact-press');
  const links   = document.getElementById('contact-links');
  if (heading) heading.innerHTML = CONTACT.heading;
  if (sub)     sub.innerHTML     = CONTACT.sub;
  if (press)   press.innerHTML   = `
    <span class="press-badge-dot"></span>
    <span>${CONTACT.press.text} </span>
    <a href="${CONTACT.press.url}" target="_blank">${CONTACT.press.label}</a>`;
  if (links)   links.innerHTML   = CONTACT.links.map(l => `
    <a href="${l.href}" class="contact-link ${l.style}" ${l.target ? `target="${l.target}"` : ''}>${l.label}</a>`
  ).join('');
})();
 
/* Updates FAB feed */
(function () {
  const el = document.getElementById('fab-feed');
  if (!el) return;
  el.innerHTML = UPDATES.map(u => `
    <div class="fab-update">
      <span class="fab-update-date">${u.date}</span>
      <div class="fab-update-text">${u.text}</div>
      <span class="fab-update-tag">${u.tag}</span>
    </div>`).join('');
})();
 
/* ============================================================
   PROJECT CARDS — rendered from PROJECTS in content.js
   ============================================================ */
(function () {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
 
  const ORDER = ['scrubai', 'vision', 'memoir', 'rocketry', 'solar', 'jiramate', 'pantryfy', 'braille'];
 
  grid.innerHTML = ORDER.map(id => {
    const p = PROJECTS[id];
    const pressHTML = p.press
      ? `<a href="${p.press.url}" target="_blank" class="press-badge" onclick="event.stopPropagation()">
           <span class="press-badge-dot"></span>${p.press.label}
         </a>` : '';
    return `
      <div class="project-card" onclick="openModal('${id}')">
        <span class="project-tag">${p.tag}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-summary">${p.summary}</p>
        ${pressHTML}
        <div class="project-tech">
          ${p.tech.slice(0, 5).map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>`;
  }).join('');
})();
 
/* ============================================================
   MODAL
   ============================================================ */
function openModal(id) {
  const p = PROJECTS[id];
  if (!p) return;
 
  let linksHTML = '';
  if (p.github) linksHTML += `<a href="${p.github}" class="modal-link primary" target="_blank">View on GitHub &#x2197;&#xFE0E;</a>`;
  if (p.devpost) linksHTML += `<a href="${p.devpost}" class="modal-link outline" target="_blank">Devpost &#x2197;&#xFE0E;</a>`;
  if (p.press)  linksHTML += `<a href="${p.press.url}" class="modal-link outline" target="_blank">${p.press.label}</a>`;
  if (!p.github && !p.devpost && !p.press) linksHTML = `<span style="font-size:0.8rem;color:var(--text-3)">Repo link coming soon</span>`;
 
  const builtHTML = p.built.split('\n\n').map(para => `<p>${para}</p>`).join('');
 
  document.getElementById('modalContent').innerHTML = `
    <p class="modal-tag">${p.tag}</p>
    <h2>${p.title}</h2>
    <div class="modal-section">
      <div class="modal-section-label">The Problem</div>
      <p>${p.problem}</p>
    </div>
    <div class="modal-divider"></div>
    <div class="modal-section">
      <div class="modal-section-label">What I Built</div>
      ${builtHTML}
    </div>
    <div class="modal-insight">
      <div class="modal-section-label">Key Insight</div>
      <p>${p.insight}</p>
    </div>
    <div class="modal-section-label" style="margin-bottom:0.5rem;">Tech Stack</div>
    <div class="modal-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
    <div class="modal-divider"></div>
    <div class="modal-links">${linksHTML}</div>
  `;
 
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
 
  document.querySelectorAll('.modal-tech .tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.color = 'var(--accent)';
      tag.style.borderColor = 'rgba(96,165,250,0.4)';
      tag.style.background = 'var(--accent-dim)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.color = '';
      tag.style.borderColor = '';
      tag.style.background = '';
    });
  });
}
 
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
 
function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}
 
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
 
/* ============================================================
   FLOATING UPDATES BUBBLE
   ============================================================ */
window.toggleFab = function () {
  const panel = document.getElementById('fabPanel');
  const btn   = document.getElementById('fabBtn');
  const open  = panel.classList.toggle('open');
  btn.classList.toggle('open', open);
};
 
document.addEventListener('click', function (e) {
  const wrap = document.querySelector('.fab-wrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('fabPanel').classList.remove('open');
    document.getElementById('fabBtn').classList.remove('open');
  }
});
