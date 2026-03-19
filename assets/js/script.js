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
   PROJECT DATA
   ============================================================ */
const projects = {
  vision: {
    tag: 'Computer Vision · Embedded · Ongoing',
    title: 'Vision-Based Secure Control Panel',
    problem: "Existing gesture-based interfaces don't account for what happens when the sensor fails or gives bad data. I wanted to build a system that could control hardware safely even under unreliable inputs — so I designed the failure modes before writing a single line of control logic.",
    built: "A real-time computer vision pipeline using OpenCV and MediaPipe that classifies hand gestures and translates them into hardware control signals. A finite state machine (IDLE, ARMED, ACTIVE, ALERT) enforces safe system behavior. Python handles the perception layer; Arduino enforces the hardware states — completely separated so a vision glitch can never cause unsafe actuation.",
    insight: "Separating perception logic from hardware enforcement meant a vision fault could never put the system in a dangerous state. Designing for failure first changed how the entire architecture was structured.",
    tech: ['OpenCV', 'MediaPipe', 'Python', 'Arduino', 'Finite State Machine', 'Serial Communication', 'C/C++'],
    github: 'https://github.com/kasishjain'
  },
  memoir: {
    tag: 'Mobile · AI · ACM Projects',
    title: 'Memoir — Digital Memory Preservation App',
    problem: "Meaningful handwritten cards and letters get lost, damaged, or forgotten over time. Meanwhile, digital messages lack the emotional weight of something handwritten. Memoir was built to bridge that gap — preserving old memories while encouraging new ones worth keeping.",
    built: "A React Native (Expo) mobile app with a Supabase backend. Users can scan handwritten cards via camera + Google Cloud Vision OCR, which extracts and displays text alongside the original image. OpenAI API powers automatic tagging by mood and occasion. A card creation tool lets users design new digital cards with custom fonts, stickers, music, and voice notes.",
    insight: "OCR on handwriting is messy — the variance is huge. Instead of trying to make it perfect, I designed the UX to show the OCR output side-by-side with the original image and let users correct it. Embracing imperfection in the AI output and giving the user control was the right call.",
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Google Cloud Vision', 'OpenAI API', 'NativeWind', 'Vector Search'],
    github: 'https://github.com/kasishjain'
  },
  rocketry: {
    tag: 'Embedded · Hardware · AIAA UTD',
    title: 'L1 Rocketry Avionics System',
    problem: "High-G launches don't forgive software bugs. As part of AIAA UTD's Comet Rocketry L1 program, I needed to design and program onboard avionics for a real launch — where reliability under physical stress wasn't optional.",
    built: "Onboard avionics using ESP32 microcontrollers with BMP280 pressure sensors for altitude tracking and SD card logging for post-flight telemetry analysis. The system had to operate reliably in a constrained compute environment under significant physical stress.",
    insight: "Debugging post-flight via SD-logged data taught me how to reason about system behavior I couldn't observe in real time. Constrained environments force you to write lean, predictable code — no shortcuts.",
    tech: ['ESP32', 'BMP280', 'C/C++', 'SD Logging', 'Sensor Interfacing', 'Embedded Systems'],
    github: 'https://github.com/kasishjain'
  },
  solar: {
    tag: 'Systems · Community Engineering · EPICS UTD',
    title: 'Solar-Powered Water Purification System',
    problem: "A community in rural Peru needed reliable clean water. Our EPICS team redesigned a containerized purification system — downsizing from a 40ft to 20ft container while keeping it fully functional, safe, and locally maintainable. The project was featured by Vera Aqua Vera Vita.",
    built: "A 10.3 kW bifacial solar array with 120 kWh LiFePO₄ battery system powering a containerized water purification unit. I co-led CAD modeling, electrical schematics, wiring diagrams, inverter/MPPT configuration, and component sourcing from Peruvian vendors for local affordability.",
    insight: "Real constraints — budget, local vendors, safety codes — killed our first three designs. Data-driven validation, not opinions, is the only way to resolve technical disagreements in a team. I also learned Autodesk Revit mid-project to produce the full construction sheet set.",
    tech: ['Fusion 360', 'Autodesk Revit', 'Solar/Battery Systems', 'Electrical Schematics', 'CAD', 'Power Analysis'],
    github: '',
    press: { label: 'Read the VAVV article ↗', url: 'https://veraaquaveravita.org/news/out-of-thin-air-how-vavv-and-utd-students-are-bringing-clean-water-to-peru' }
  },
  jiramate: {
    tag: 'Full-Stack · Hackathon · Nov 2025',
    title: 'JiraMate — AI Workflow Automation',
    problem: "Writing Jira user stories is repetitive and easy to do badly. At a hackathon, I built a tool that uses an LLM to auto-generate user stories and acceptance criteria from natural language input.",
    built: "A full-stack web app using React, Node.js, and Firebase. The backend integrates Nemotron via OpenRouter to generate structured user stories from prompts. I added validation and prompt engineering to make LLM output reliable enough to actually submit to Jira.",
    insight: "LLM outputs are non-deterministic. Treating AI output as untrusted input — not ground truth — changed how I built the backend validation layer. Prompt engineering is a real engineering discipline.",
    tech: ['React', 'Node.js', 'Firebase', 'LLM API', 'OpenRouter', 'Prompt Engineering', 'REST API'],
    github: 'https://github.com/kasishjain'
  },
  pantryfy: {
    tag: 'Web · Hackathon · April 2025',
    title: 'Pantry-fy — Recipe Recommendation Platform',
    problem: "Most recipe sites make you search for dishes, not ingredients. Pantry-fy flips that — type what's in your fridge, get recipes that actually work with what you have.",
    built: "A responsive web platform with a React + Bootstrap frontend and Node.js/Express.js backend. MongoDB stores and queries recipes by ingredient. Focused on core functionality and clean UX under hackathon time pressure.",
    insight: "Hackathon scope pressure taught me to cut features ruthlessly. A fast, working core beats a slow, half-finished feature set. Clean API design upfront makes teammate integration painless.",
    tech: ['React', 'Express.js', 'MongoDB', 'Node.js', 'Bootstrap', 'REST API'],
    github: 'https://github.com/kasishjain'
  },
  braille: {
    tag: 'Hardware · Assistive Technology · SWE UTD',
    title: 'Braille Input Glove',
    problem: "Visually impaired users lack an intuitive way to input Braille digitally. Existing solutions are bulky, expensive, or require specialized hardware most users don't have.",
    built: "Prototyping a glove with embedded sensors that detects finger-movement Braille patterns and translates them in real-time into text and audio output. Working with SWE's multidisciplinary team through active iteration.",
    insight: "Assistive tech design requires deeply understanding the user's mental model, not just the hardware spec. The hardest problems aren't electrical — they're ergonomic and cognitive.",
    tech: ['Embedded Systems', 'Sensor Interfacing', 'Hardware Prototyping', 'Accessibility Design'],
    github: ''
  }
};

function openModal(id) {
  const p = projects[id];
  if (!p) return;

  let linksHTML = '';
  if (p.github) linksHTML += `<a href="${p.github}" class="modal-link primary" target="_blank">View on GitHub ↗</a>`;
  if (p.press)  linksHTML += `<a href="${p.press.url}" class="modal-link outline" target="_blank">${p.press.label}</a>`;
  if (!p.github && !p.press) linksHTML = `<span style="font-size:0.8rem;color:var(--text-3)">Repo link coming soon</span>`;

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
      <p>${p.built}</p>
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
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });