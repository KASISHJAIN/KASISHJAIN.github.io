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
  
  /* For Clear background DELETE buildDots  */

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
 
  const ORDER = ['vision', 'memoir', 'rocketry', 'solar', 'jiramate', 'pantryfy', 'braille'];
 
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
  if (p.press)  linksHTML += `<a href="${p.press.url}" class="modal-link outline" target="_blank">${p.press.label}</a>`;
  if (!p.github && !p.press) linksHTML = `<span style="font-size:0.8rem;color:var(--text-3)">Repo link coming soon</span>`;
 
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

// /* ============================================================
//    PROJECT DATA
//    ============================================================ */
// const projects = {
//   vision: {
//     tag: 'Computer Vision · Embedded Systems · Arduino · Python · Mar 2026',
//     title: 'Vision-Based Secure Control Panel',
//     summary: 'Gesture-controlled security system where computer vision detects user intent, but all behavior is enforced by an Arduino-based FSM to ensure safe operation under unreliable inputs.',
//     problem: "Gesture-based interfaces are prone to noise, misclassification, and inconsistent input. Directly mapping vision outputs to hardware actions can result in unsafe or unpredictable behavior. The challenge was to design a system that allows natural gesture interaction while guaranteeing that incorrect inputs cannot trigger unsafe state transitions.",
//     built: "Developed a real-time gesture recognition system using OpenCV and MediaPipe to classify hand gestures from webcam input. Implemented stability gating and cooldown logic to ensure that only consistent, intentional gestures generate commands.\n\nDesigned an Arduino-based control layer that enforces system behavior using a finite state machine with three states: ACTIVE, ARMED, and ALERT. Established serial communication between Python and Arduino, where commands are validated against the current state and invalid transitions are explicitly ignored.\n\nBuilt a hardware feedback system using an RGB LED, white LED, and active buzzer to represent system state and urgency. Implemented non-blocking timing patterns using millis() to ensure continuous responsiveness while signaling different states and alert conditions, including a distinct panic override behavior.",
//     insight: "Separating perception from control was critical. By ensuring that the vision layer could only suggest commands and never enforce them, the system remains safe even when gesture detection is incorrect or unstable. Designing around failure cases first led to a more robust and realistic architecture that reflects how safety-critical systems are built.",
//     tech: ['OpenCV', 'MediaPipe', 'Python', 'Arduino', 'Finite State Machine', 'Serial Communication', 'C/C++', 'RGB LED', 'millis()'],
//     github: 'https://github.com/KASISHJAIN/Vision-Based-Secure-Control-Panel'
//   },
//   memoir: {
//     tag: 'Mobile · AI · Flask · ACM Projects · Jan 2025–Present',
//     title: 'Memoir — Digital Memory Preservation App',
//     summary: 'Scan physical greeting cards with OCR, auto-tag memories using AI, and find them instantly with semantic vector search — all organized in a personal digital archive.',
//     problem: "Handwritten greeting cards carry real emotional value but get lost, forgotten, or thrown away. There's no easy way to preserve and rediscover them. Memoir turns physical cards into a searchable, shareable digital collection.",
//     built: "As the backend developer, I built a Flask API powering the AI features — AI tag generation using OpenAI GPT-3.5, semantic vector search using OpenAI embeddings and pgvector in Supabase, and a /process-card endpoint that chains OCR → tagging → embedding in one call. I also built all frontend service files (CRUD operations for cards, folders, friendships, messaging, and conversations) using TypeScript and Supabase directly. The app is built in React Native with Expo Router.",
//     insight: "Semantic search changes how people find memories. A user searching 'someone who appreciates me' can surface an appreciation card even if those exact words never appear in the card — because the search understands meaning, not just keywords. That was the most rewarding thing to see work.",
//     tech: ['React Native', 'Expo Router', 'TypeScript', 'Flask', 'Supabase', 'pgvector', 'OpenAI GPT-3.5', 'OpenAI Embeddings', 'Google Cloud Vision', 'PostgreSQL'],
//     github: 'https://github.com/kasishjain'
//   },
//   rocketry: {
//     tag: 'Embedded · Hardware · Aerospace · Sep–Dec 2025',
//     title: 'L1 Rocketry Avionics System',
//     summary: 'Onboard avionics architected for a high-G launch environment — where hardware reliability and software precision have immediate physical consequences.',
//     problem: "High-acceleration launches create extreme physical stress that causes traditional electronics to fail. I needed to design an avionics suite that could maintain 100% sensor uptime and data integrity while subject to high-G forces, vibration, and constrained power and compute resources.",
//     built: "Hardware Stack: Integrated ESP32 microcontrollers with BMP280 pressure/altitude sensors and an SD module for local telemetry.\n\nAssembly: Performed high-precision soldering and strategic component placement to ensure vibration resistance.\n\nLogic: Programmed real-time data logging and telemetry protocols in C++ to capture flight metrics without blocking critical system cycles.\n\nValidation: Conducted rigorous system validation and hardware debugging during assembly and pre-flight testing to ensure stable I2C/SPI communication under stress.",
//     insight: "High-G environments treat 'minor' hardware oversights as catastrophic failures. This project taught me to prioritize failure-aware design — specifically how to use post-flight SD-logged data to reconstruct system behavior that is impossible to observe in real-time. It reinforced that in embedded systems, the most elegant code is the most predictable code.",
//     tech: ['ESP32', 'BMP280', 'C/C++', 'SD Logging', 'I2C/SPI', 'Soldering', 'Real-Time Telemetry', 'Embedded Systems'],
//     github: 'https://github.com/JFMcCM/AIAA-Rocketry'
//   },
//   solar: {
//     tag: 'Systems Engineering · BIM · Sustainable Power · Jan–Dec 2025',
//     title: 'Solar-Powered Water Purification System',
//     summary: 'Designed a 3D digital twin and off-grid 10.3 kW solar plant for a containerized purification system, earning a Special Commendation Award for rapid upskilling and professional document delivery.',
//     problem: "A nonprofit partner required a mobile, 20-ft containerized purification system for rural Peru. The project required a transition from conceptual 2D layouts to an industry-standard 3D BIM (Building Information Modeling) environment to ensure structural integrity and spatial feasibility before shipping.",
//     built: "3D Digital Twin (Revit): Built a comprehensive 3D model from scratch in Autodesk Revit, creating custom 3D families for batteries, pumps, and inverters to ensure precise spatial coordination.\n\nStructural Load Engineering: Designed a custom fixed-mount racking system and frame supports to safely distribute the weight of the 10.3 kW solar array across the container roof and reinforced side walls.\n\nCost & Feasibility Analysis: Conducted comprehensive financial and technical audits using Excel, managing the Bill of Materials (BOM) and performing mathematical load analysis to optimize the 120 kWh battery bank.\n\nProfessional Documentation: Delivered a complete Construction Sheet Set within two semesters, covering electrical schematics, wiring diagrams, and equipment layouts.",
//     insight: "This project was a trial by fire in technical agility. Earning a Special Commendation for getting proficient in Revit in under four months taught me that 'industry standard' isn't just a label — it's a language that allows multidisciplinary teams to prevent $10,000 errors before a single bolt is turned.",
//     tech: ['Autodesk Revit', 'BIM', 'Fusion 360', 'Solar/Battery Systems', 'Electrical Schematics', 'Structural Load Analysis', 'Excel BOM', 'CAD'],
//     github: '',
//     press: { label: 'Read the VAVV article ↗︎', url: 'https://veraaquaveravita.org/news/out-of-thin-air-how-vavv-and-utd-students-are-bringing-clean-water-to-peru' }
//   },
//   jiramate: {
//     tag: 'AI/LLMs · Full-Stack · Product Management · Nov 2025',
//     title: 'JiraMate — AI Workflow Automation',
//     summary: 'Built a full-stack AI partner for Jira that automates backlog grooming and user story generation — transforming manual PM overhead into 5-second automated insights.',
//     problem: "Product Managers are often bogged down by repetitive manual tasks: sorting backlogs, writing acceptance criteria, and translating feature requests into technical user stories. Our team identified that while PMs spend the most time in Jira, the tool itself doesn't 'reason' about the data it holds. We needed to build an intelligent extension that could read a product's history and automate its future.",
//     built: "The AI Engine: Integrated Nemotron LLMs via the OpenRouter API. Overcame significant server-side inconsistency and configuration issues through extensive debugging and API documentation review.\n\nThe Stack: Developed a full-stack application using Node.js/Express for the backend, React and Tailwind CSS for a modern frontend, and Firebase for real-time storage of user stories and interactions.\n\nUser-Centric Design: Conducted on-site research at HackUTD, attending workshops and interviewing PNC representatives to map out real-world Jira workflows and PM pain points.\n\nAutomated Logic: Engineered features to dynamically sort backlogs by priority and auto-generate acceptance criteria based on historical Jira data patterns.",
//     insight: "Integrating AI is easy; making AI reliable is hard. Facing non-deterministic API failures and connection hurdles with OpenRouter taught me to treat AI as an untrusted service. I learned to leverage other LLMs to troubleshoot complex integration errors and built a backend validation layer to ensure the 5-second automated output was actually production-ready.",
//     tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'Firebase', 'Nemotron', 'OpenRouter', 'REST API'],
//     github: 'https://github.com/kritigoomer/JiraMate'
//   },
//   pantryfy: {
//     tag: 'Full-Stack · AI Integration · API Development · April 2025',
//     title: 'Pantry-fy — Intelligent Recipe Discovery',
//     summary: "A fridge-first search engine that eliminates dinner fatigue by transforming available ingredients into gourmet meal plans.",
//     problem: "Most recipe platforms are built for shoppers, not for people looking to reduce food waste. Our team identified a gap: users often have the ingredients but lack the inspiration to connect them. We needed to build a tool that could handle messy user input — typos, uncommon foods — and fetch real-world data from external APIs while maintaining a non-overwhelming user experience.",
//     built: "The Engine: Developed a Node.js/Express backend to interface with the Spoonacular API, managing complex ingredient-based queries and providing robust fallbacks for broken image links or missing data.\n\nThe Frontend: Engineered a responsive, mobile-first interface using React and Bootstrap, ensuring low-latency search results that feel instant to the user.\n\nAI Integration: Integrated Gemini AI to handle experimental recipe generation, focusing on prompt engineering to ensure the model's responses were structured and safe for cooking.\n\nData Management: Implemented MongoDB to store user pantries and saved recipes, allowing for a persistent and personalized user experience.",
//     insight: "Building a full-stack app taught me that the hardest part isn't the happy path — it's the edge cases. Handling typos in ingredient names and managing inconsistent AI responses forced me to build a more resilient validation layer. Smart apps shouldn't feel complex; they should feel like a quietly brilliant friend that handles the logic so the user doesn't have to.",
//     tech: ['React', 'Bootstrap', 'Node.js', 'Express.js', 'MongoDB', 'Spoonacular API', 'Gemini AI', 'REST API'],
//     github: 'https://devpost.com/software/pantry-fy'
//   },
//   braille: {
//     tag: 'Wearable Tech · Embedded Systems · Assistive Technology · Sep 2025–Present',
//     title: 'BrailLearn — Assistive Braille Input Glove',
//     summary: 'A wearable digital pen for the visually impaired — converting tactile finger movements into real-time digital text and audio for under $100.',
//     problem: "For the 7 million visually impaired individuals in the US, digital text entry is often a choice between bulky, expensive ($1,000+) hardware or imprecise voice-to-text. Adults learning Braille later in life face a steep learning curve due to reduced neuroplasticity. We needed to create a portable, affordable, and intuitive invisible interface that allows users to type Braille anywhere without a physical desk.",
//     built: "The Interface: Designed a dual-glove system mapping 6 fingers to the 2x3 Braille cell grid (Index/Middle/Ring on each hand).\n\nHardware Stack: Integrated Force-Sensitive Resistors (FSRs) and an ESP32 microcontroller to detect intentional pressure against any surface, filtering out accidental movements that traditional flex sensors might misinterpret.\n\nFirmware: Developed C++ logic on the ESP32 to handle multi-sensor threshold detection and map simultaneous finger-press combinations to a Braille lookup table.\n\nDigital Dashboard: Architected a React-based webpage to provide real-time visual and audio feedback, creating an interactive confirmation loop that accelerates the Braille learning curve.\n\nErgonomics & Safety: Collaborated on a multidisciplinary team (SWE) to ensure the hardware was integrated into lightweight, breathable spandex, focusing on tactile feedback and long-term wearable comfort.",
//     insight: "In assistive technology, the hardest problems aren't electrical — they're ergonomic and cognitive. If the audio feedback lags by even a fraction of a second, the user's mental model breaks. This project taught me that functional is not enough — the technology must be invisible to truly empower the user.",
//     tech: ['ESP32', 'Force-Sensitive Resistors', 'C++', 'React', 'Braille Lookup Table', 'Wearable Hardware', 'Accessibility Design'],
//     github: ''
//   }
// };

// function openModal(id) {
//   const p = projects[id];
//   if (!p) return;

//   let linksHTML = '';
//   if (p.github) linksHTML += `<a href="${p.github}" class="modal-link primary" target="_blank">View on GitHub &#x2197;&#xFE0E;</a>`;
//   if (p.press)  linksHTML += `<a href="${p.press.url}" class="modal-link outline" target="_blank">${p.press.label}</a>`;
//   if (!p.github && !p.press) linksHTML = `<span style="font-size:0.8rem;color:var(--text-3)">Repo link coming soon</span>`;

//   document.getElementById('modalContent').innerHTML = `
//     <p class="modal-tag">${p.tag}</p>
//     <h2>${p.title}</h2>
//     <div class="modal-section">
//       <div class="modal-section-label">The Problem</div>
//       <p>${p.problem}</p>
//     </div>
//     <div class="modal-divider"></div>
//     <div class="modal-section">
//       <div class="modal-section-label">What I Built</div>
//       <p>${p.built}</p>
//     </div>
//     <div class="modal-insight">
//       <div class="modal-section-label">Key Insight</div>
//       <p>${p.insight}</p>
//     </div>
//     <div class="modal-section-label" style="margin-bottom:0.5rem;">Tech Stack</div>
//     <div class="modal-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
//     <div class="modal-divider"></div>
//     <div class="modal-links">${linksHTML}</div>
//   `;

//   document.getElementById('modalOverlay').classList.add('open');
//   document.body.style.overflow = 'hidden';

//   // Blue hover effect on tech tags in modal
//   document.querySelectorAll('.modal-tech .tech-tag').forEach(tag => {
//     tag.addEventListener('mouseenter', () => {
//       tag.style.color = 'var(--accent)';
//       tag.style.borderColor = 'rgba(96,165,250,0.4)';
//       tag.style.background = 'var(--accent-dim)';
//     });
//     tag.addEventListener('mouseleave', () => {
//       tag.style.color = '';
//       tag.style.borderColor = '';
//       tag.style.background = '';
//     });
//   });
// }

// function closeModal() {
//   document.getElementById('modalOverlay').classList.remove('open');
//   document.body.style.overflow = '';
// }

// function handleOverlayClick(e) {
//   if (e.target === document.getElementById('modalOverlay')) closeModal();
// }

// document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// /* ============================================================
//    FLOATING UPDATES BUBBLE
//    ============================================================ */
// window.toggleFab = function () {
//   const panel = document.getElementById('fabPanel');
//   const btn   = document.getElementById('fabBtn');
//   const open  = panel.classList.toggle('open');
//   btn.classList.toggle('open', open);
// };
 
// // Close on outside click
// document.addEventListener('click', function(e) {
//   const wrap = document.querySelector('.fab-wrap');
//   if (wrap && !wrap.contains(e.target)) {
//     document.getElementById('fabPanel').classList.remove('open');
//     document.getElementById('fabBtn').classList.remove('open');
//   }
// });
 