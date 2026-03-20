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
    tag: 'Computer Vision · Embedded · Dec 2025–Present',
    title: 'Vision-Based Secure Control Panel',
    summary: 'Real-time gesture recognition that controls hardware — architected to fail safely, never dangerously.',
    problem: "Gesture-based interfaces don't account for what happens when the sensor fails or gives bad data. I needed to build a system that could control hardware safely even under unreliable inputs — so I designed the failure modes before writing a single line of control logic.",
    built: "Engineered a real-time computer vision pipeline using OpenCV and MediaPipe to translate hand gestures into hardware control signals. Architected a fail-safe system by isolating Python-based vision logic from Arduino-enforced hardware states using Serial Communication protocols. Implemented a Finite State Machine (IDLE, ARMED, ACTIVE, ALERT) to enforce safe system behavior under sensor faults or unstable inputs.",
    insight: "Separating perception logic from hardware enforcement meant a vision fault could never put the system in a dangerous state. Designing for failure first changed how the entire architecture was structured.",
    tech: ['OpenCV', 'MediaPipe', 'Python', 'Arduino', 'Finite State Machine', 'Serial Communication', 'C/C++'],
    github: 'https://github.com/kasishjain'
  },
  memoir: {
    tag: 'Mobile · AI · ACM Projects',
    title: 'Memoir — Digital Memory Preservation App',
    summary: 'Scan handwritten cards with OCR, organize memories with AI tagging, and create new ones with music and voice notes.',
    problem: "Meaningful handwritten cards and letters get lost, damaged, or forgotten over time. Meanwhile, digital messages lack the emotional weight of something handwritten. Memoir was built to bridge that gap — preserving old memories while encouraging new ones worth keeping.",
    built: "A React Native (Expo) mobile app with a Supabase backend. Users can scan handwritten cards via camera + Google Cloud Vision OCR, which extracts and displays text alongside the original image. OpenAI API powers automatic tagging by mood and occasion. A card creation tool lets users design new digital cards with custom fonts, stickers, music, and voice notes.",
    insight: "OCR on handwriting is messy — the variance is huge. Instead of trying to make it perfect, I designed the UX to show the OCR output side-by-side with the original image and let users correct it. Embracing imperfection in the AI output and giving the user control was the right call.",
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Google Cloud Vision', 'OpenAI API', 'NativeWind', 'Vector Search'],
    github: 'https://github.com/kasishjain'
  },
  rocketry: {
    tag: 'Embedded · Hardware · Sep–Dec 2025',
    title: 'L1 Rocketry Avionics System',
    summary: 'Onboard avionics for a real high-G launch — where a software bug has physical consequences.',
    problem: "High-G launches don't forgive software bugs. As part of AIAA UTD's Comet Rocketry L1 program, I needed to design and program onboard avionics for a real launch — where reliability under physical stress wasn't optional.",
    built: "Designed and programmed onboard avionics for a high-G launch environment using ESP32 microcontrollers and BMP280 pressure sensors. Integrated SD logging for real-time telemetry and post-flight data analysis, focusing on system reliability under hardware stress. Conducted system validation and hardware debugging during assembly and pre-flight testing to ensure reliable sensor communication.",
    insight: "Debugging post-flight via SD-logged data taught me how to reason about system behavior I couldn't observe in real time. Constrained environments force you to write lean, predictable code — no shortcuts.",
    tech: ['ESP32', 'BMP280', 'C/C++', 'SD Logging', 'Sensor Interfacing', 'Embedded Systems'],
    github: 'https://github.com/kasishjain'
  },
  solar: {
    tag: 'Systems · Community Engineering · Jan–Dec 2025',
    title: 'Solar-Powered Water Purification System',
    summary: 'Co-designed a 10.3 kW solar system for rural Peru — real engineering, real stakes, real commendation.',
    problem: "A community in rural Peru needed reliable clean water. Our EPICS team redesigned a containerized purification system — downsizing from a 40ft to 20ft container while keeping it fully functional, safe, and locally maintainable.",
    built: "Co-designed a 10.3 kW bifacial solar array and 120 kWh LiFePO₄ battery system, performing detailed mathematical analysis (irradiance, depth-of-discharge, thermal loads) to optimize power storage. Rapidly mastered Autodesk Revit to create a comprehensive Construction Sheet Set, including circuit schematics and wiring diagrams for a 20ft containerized system. Researched affordable, locally sourced components from Peruvian vendors to ensure long-term maintainability and electrical safety compliance.",
    insight: "Real constraints — budget, local vendors, safety codes — killed our first three designs. Data-driven validation, not opinions, is the only way to resolve technical disagreements on a team. I also learned Autodesk Revit mid-project to produce the full construction sheet set.",
    tech: ['Fusion 360', 'Autodesk Revit', 'Solar/Battery Systems', 'Electrical Schematics', 'CAD', 'Power Analysis'],
    github: '',
    press: { label: 'Read the VAVV article ↗︎', url: 'https://veraaquaveravita.org/news/out-of-thin-air-how-vavv-and-utd-students-are-bringing-clean-water-to-peru' }
  },
  jiramate: {
    tag: 'Full-Stack · Hackathon · Nov 2025',
    title: 'JiraMate — AI Workflow Automation',
    summary: 'Integrated Nemotron LLMs to auto-generate Jira user stories — and learned that AI output is untrusted input.',
    problem: "Writing Jira user stories is repetitive and easy to do badly. At a hackathon, I built a tool that uses an LLM to auto-generate user stories and acceptance criteria from natural language input.",
    built: "Built a full-stack automation tool using Node.js, React, and Firebase to synchronize live task data and reduce manual project management workload. Integrated Nemotron LLMs via OpenRouter API to automate user story and acceptance criteria generation, refining prompt engineering to solve model unreliability and make output structured enough to actually submit to Jira.",
    insight: "LLM outputs are non-deterministic. Treating AI output as untrusted input — not ground truth — changed how I built the backend validation layer. Prompt engineering is a real engineering discipline.",
    tech: ['React', 'Node.js', 'Firebase', 'Nemotron', 'OpenRouter', 'Prompt Engineering', 'REST API'],
    github: 'https://github.com/kasishjain'
  },
  pantryfy: {
    tag: 'Web · Hackathon · April 2025',
    title: 'Pantry-fy — Recipe Recommendation Platform',
    summary: "Search by what's in your fridge, not by dish name. Built fast, shipped clean.",
    problem: "Most recipe sites make you search for dishes, not ingredients. Pantry-fy flips that — type what's in your fridge, get recipes that actually work with what you have.",
    built: "A responsive web platform with a React + Bootstrap frontend and Node.js/Express.js backend. MongoDB stores and queries recipes by ingredient. Focused on core functionality and clean UX under hackathon time pressure.",
    insight: "Hackathon scope pressure taught me to cut features ruthlessly. A fast, working core beats a slow, half-finished feature set. Clean API design upfront makes teammate integration painless.",
    tech: ['React', 'Express.js', 'MongoDB', 'Node.js', 'Bootstrap', 'REST API'],
    github: 'https://github.com/kasishjain'
  },
  braille: {
    tag: 'Hardware · Assistive Technology · Sep 2025–Present',
    title: 'Braille Input Glove',
    summary: 'A wearable that translates finger-movement Braille into real-time text and audio — built for the people who need it most.',
    problem: "Visually impaired users lack an intuitive way to input Braille digitally. Existing solutions are bulky, expensive, or require specialized hardware most users don't have.",
    built: "Collaborating on a multidisciplinary SWE team to design a wearable system that translates finger movements into real-time Braille text and audio output. Working through active hardware iteration and ergonomic testing to ensure the system is practical for real users.",
    insight: "Assistive tech design requires deeply understanding the user's mental model, not just the hardware spec. The hardest problems aren't electrical — they're ergonomic and cognitive.",
    tech: ['Embedded Systems', 'Sensor Interfacing', 'Hardware Prototyping', 'Accessibility Design'],
    github: ''
  }
};

function openModal(id) {
  const p = projects[id];
  if (!p) return;

  let linksHTML = '';
  if (p.github) linksHTML += `<a href="${p.github}" class="modal-link primary" target="_blank">View on GitHub &#x2197;&#xFE0E;</a>`;
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

  // Blue hover effect on tech tags in modal
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