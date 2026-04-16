/* ============================================================
   CONTENT.JS — Single source of truth for all portfolio content
   Edit this file to update anything on the site.
   ============================================================ */

/* ── HERO ── */
const HERO = {
  eyebrow: 'Computer Engineering · UT Dallas',
  name: 'Kasish Jain.',
  tagline: 'Engineering reliable systems —<br>where hardware meets software.',
  bio: "Sophomore at UTD's Collegium V Honors College. I build at the intersection of embedded systems, computer vision, and real-world impact.",
  stats: [
    { number: '8+', label: 'Projects' },
    { number: '11', label: 'Campus orgs' },
    { number: '3',  label: 'Leadership roles' },
    { number: "'28", label: 'Graduating' },
  ],
  status: [
    { key: 'Building', val: '<strong>Memoir</strong> — Mobile AI<br><strong>BrailLearn</strong> — Wearable Hardware' },
    { key: 'Open to',  val: '<strong>Summer 2026</strong> internships' },
    { key: 'Focus',    val: 'Embedded · Applied AI · SWE' },
    { key: 'Location', val: 'McKinney, TX · Open to relocation' },
  ],
};

/* ── ABOUT ── */
const ABOUT = {
  paragraphs: [
    `I'm <strong>Kasish Jain</strong>, a Computer Engineering student at UT Dallas (Collegium V Honors, GPA 3.52) and a recipient of the <strong>Academic Excellence Scholarship</strong> and <strong>UTDesign EPICS Special Commendation Award</strong>. I build at the intersection of hardware, software, AI, cybersecurity, and computer vision — problems where a bug has physical consequences and reliability isn't optional.`,
    `I'm seeking <strong>Summer 2026 internships</strong> in embedded systems, software engineering, or applied AI. I bring hardware intuition, software depth, and a bias toward building things that actually work — not just in theory, but under stress. Whether integrating sensors on microcontrollers, designing fail-safe control logic, or building full-stack applications, I focus on turning complex ideas into reliable, working systems.`,
  ],
};

/* ── PROJECTS ── */
const PROJECTS = {
  vision: {
    tag: 'Computer Vision · Embedded Systems · Arduino · Python · Mar 2026',
    title: 'Vision-Based Secure Control Panel',
    summary: 'Gesture-controlled security system where computer vision detects user intent, but all behavior is enforced by an Arduino-based FSM to ensure safe operation under unreliable inputs.',
    problem: "Gesture-based interfaces are prone to noise, misclassification, and inconsistent input. Directly mapping vision outputs to hardware actions can result in unsafe or unpredictable behavior. The challenge was to design a system that allows natural gesture interaction while guaranteeing that incorrect inputs cannot trigger unsafe state transitions.",
    built: "Developed a real-time gesture recognition system using OpenCV and MediaPipe to classify hand gestures from webcam input. Implemented stability gating and cooldown logic to ensure that only consistent, intentional gestures generate commands.\n\nDesigned an Arduino-based control layer that enforces system behavior using a finite state machine with three states: ACTIVE, ARMED, and ALERT. Established serial communication between Python and Arduino, where commands are validated against the current state and invalid transitions are explicitly ignored.\n\nBuilt a hardware feedback system using an RGB LED, white LED, and active buzzer to represent system state and urgency. Implemented non-blocking timing patterns using millis() to ensure continuous responsiveness while signaling different states and alert conditions, including a distinct panic override behavior.",
    insight: "Separating perception from control was critical. By ensuring that the vision layer could only suggest commands and never enforce them, the system remains safe even when gesture detection is incorrect or unstable. Designing around failure cases first led to a more robust and realistic architecture that reflects how safety-critical systems are built.",
    tech: ['OpenCV', 'MediaPipe', 'Python', 'Arduino', 'Finite State Machine', 'Serial Communication', 'C/C++', 'RGB LED', 'millis()'],
    github: 'https://github.com/KASISHJAIN/Vision-Based-Secure-Control-Panel',
  },
  memoir: {
    tag: 'Mobile · AI · Flask · ACM Projects · Jan 2026–Present',
    title: 'Memoir — Digital Memory Preservation App',
    summary: 'Scan physical greeting cards with OCR, auto-tag memories using AI, and find them instantly with semantic vector search — all organized in a personal digital archive.',
    problem: "Handwritten greeting cards carry real emotional value but get lost, forgotten, or thrown away. There's no easy way to preserve and rediscover them. Memoir turns physical cards into a searchable, shareable digital collection.",
    built: "As the backend developer, I built a Flask API powering the AI features — AI tag generation using OpenAI GPT-3.5, semantic vector search using OpenAI embeddings and pgvector in Supabase, and a /process-card endpoint that chains OCR → tagging → embedding in one call. I also built all frontend service files (CRUD operations for cards, folders, friendships, messaging, and conversations) using TypeScript and Supabase directly. The app is built in React Native with Expo Router.",
    insight: "Semantic search changes how people find memories. A user searching 'someone who appreciates me' can surface an appreciation card even if those exact words never appear in the card — because the search understands meaning, not just keywords. That was the most rewarding thing to see work.",
    tech: ['React Native', 'Expo Router', 'TypeScript', 'Flask', 'Supabase', 'pgvector', 'OpenAI GPT-3.5', 'OpenAI Embeddings', 'Google Cloud Vision', 'PostgreSQL'],
    github: 'https://github.com/kasishjain',
  },
  rocketry: {
    tag: 'Embedded · Hardware · Aerospace · Sep 2025- Present',
    title: 'L1 Rocketry Avionics System',
    summary: 'Onboard avionics architected for a high-G launch environment — where hardware reliability and software precision have immediate physical consequences.',
    problem: "High-acceleration launches create extreme physical stress that causes traditional electronics to fail. I needed to design an avionics suite that could maintain 100% sensor uptime and data integrity while subject to high-G forces, vibration, and constrained power and compute resources.",
    built: "Hardware Stack: Integrated ESP32 microcontrollers with BMP280 pressure/altitude sensors and an SD module for local telemetry.\n\nAssembly: Performed high-precision soldering and strategic component placement to ensure vibration resistance.\n\nLogic: Programmed real-time data logging and telemetry protocols in C++ to capture flight metrics without blocking critical system cycles.\n\nValidation: Conducted rigorous system validation and hardware debugging during assembly and pre-flight testing to ensure stable I2C/SPI communication under stress.",
    insight: "High-G environments treat 'minor' hardware oversights as catastrophic failures. This project taught me to prioritize failure-aware design — specifically how to use post-flight SD-logged data to reconstruct system behavior that is impossible to observe in real-time. It reinforced that in embedded systems, the most elegant code is the most predictable code.",
    tech: ['ESP32', 'BMP280', 'C/C++', 'SD Logging', 'I2C/SPI', 'Soldering', 'Real-Time Telemetry', 'Embedded Systems'],
    github: 'https://github.com/JFMcCM/AIAA-Rocketry',
  },
  solar: {
    tag: 'Systems Engineering · BIM · Sustainable Power · Jan–Dec 2025',
    title: 'Solar-Powered Water Purification System',
    summary: 'Designed a 3D digital twin and off-grid 10.3 kW solar plant for a containerized purification system, earning a Special Commendation Award for rapid upskilling and professional document delivery.',
    problem: "A nonprofit partner required a mobile, 20-ft containerized purification system for rural Peru. The project required a transition from conceptual 2D layouts to an industry-standard 3D BIM (Building Information Modeling) environment to ensure structural integrity and spatial feasibility before shipping.",
    built: "3D Digital Twin (Revit): Built a comprehensive 3D model from scratch in Autodesk Revit, creating custom 3D families for batteries, pumps, and inverters to ensure precise spatial coordination.\n\nStructural Load Engineering: Designed a custom fixed-mount racking system and frame supports to safely distribute the weight of the 10.3 kW solar array across the container roof and reinforced side walls.\n\nCost & Feasibility Analysis: Conducted comprehensive financial and technical audits using Excel, managing the Bill of Materials (BOM) and performing mathematical load analysis to optimize the 120 kWh battery bank.\n\nProfessional Documentation: Delivered a complete Construction Sheet Set within two semesters, covering electrical schematics, wiring diagrams, and equipment layouts.",
    insight: "This project was a trial by fire in technical agility. Earning a Special Commendation for getting proficient in Revit in under four months taught me that 'industry standard' isn't just a label — it's a language that allows multidisciplinary teams to prevent $10,000 errors before a single bolt is turned.",
    tech: ['Autodesk Revit', 'BIM', 'Fusion 360', 'Solar/Battery Systems', 'Electrical Schematics', 'Structural Load Analysis', 'Excel BOM', 'CAD'],
    github: '',
    press: { label: 'Read the VAVV article &#x2197;&#xFE0E;', url: 'https://veraaquaveravita.org/news/out-of-thin-air-how-vavv-and-utd-students-are-bringing-clean-water-to-peru' },
  },
  jiramate: {
    tag: 'AI/LLMs · Full-Stack · Product Management · Nov 2025',
    title: 'JiraMate — AI Workflow Automation',
    summary: 'Built a full-stack AI partner for Jira that automates backlog grooming and user story generation — transforming manual PM overhead into 5-second automated insights.',
    problem: "Product Managers are often bogged down by repetitive manual tasks: sorting backlogs, writing acceptance criteria, and translating feature requests into technical user stories. Our team identified that while PMs spend the most time in Jira, the tool itself doesn't 'reason' about the data it holds. We needed to build an intelligent extension that could read a product's history and automate its future.",
    built: "The AI Engine: Integrated Nemotron LLMs via the OpenRouter API. Overcame significant server-side inconsistency and configuration issues through extensive debugging and API documentation review.\n\nThe Stack: Developed a full-stack application using Node.js/Express for the backend, React and Tailwind CSS for a modern frontend, and Firebase for real-time storage of user stories and interactions.\n\nUser-Centric Design: Conducted on-site research at HackUTD, attending workshops and interviewing PNC representatives to map out real-world Jira workflows and PM pain points.\n\nAutomated Logic: Engineered features to dynamically sort backlogs by priority and auto-generate acceptance criteria based on historical Jira data patterns.",
    insight: "Integrating AI is easy; making AI reliable is hard. Facing non-deterministic API failures and connection hurdles with OpenRouter taught me to treat AI as an untrusted service. I learned to leverage other LLMs to troubleshoot complex integration errors and built a backend validation layer to ensure the 5-second automated output was actually production-ready.",
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'Firebase', 'Nemotron', 'OpenRouter', 'REST API'],
    github: 'https://github.com/kritigoomer/JiraMate',
  },
  pantryfy: {
    tag: 'Full-Stack · AI Integration · API Development · April 2025',
    title: 'Pantry-fy — Intelligent Recipe Discovery',
    summary: "A fridge-first search engine that eliminates dinner fatigue by transforming available ingredients into gourmet meal plans.",
    problem: "Most recipe platforms are built for shoppers, not for people looking to reduce food waste. Our team identified a gap: users often have the ingredients but lack the inspiration to connect them. We needed to build a tool that could handle messy user input — typos, uncommon foods — and fetch real-world data from external APIs while maintaining a non-overwhelming user experience.",
    built: "The Engine: Developed a Node.js/Express backend to interface with the Spoonacular API, managing complex ingredient-based queries and providing robust fallbacks for broken image links or missing data.\n\nThe Frontend: Engineered a responsive, mobile-first interface using React and Bootstrap, ensuring low-latency search results that feel instant to the user.\n\nAI Integration: Integrated Gemini AI to handle experimental recipe generation, focusing on prompt engineering to ensure the model's responses were structured and safe for cooking.\n\nData Management: Implemented MongoDB to store user pantries and saved recipes, allowing for a persistent and personalized user experience.",
    insight: "Building a full-stack app taught me that the hardest part isn't the happy path — it's the edge cases. Handling typos in ingredient names and managing inconsistent AI responses forced me to build a more resilient validation layer. Smart apps shouldn't feel complex; they should feel like a quietly brilliant friend that handles the logic so the user doesn't have to.",
    tech: ['React', 'Bootstrap', 'Node.js', 'Express.js', 'MongoDB', 'Spoonacular API', 'Gemini AI', 'REST API'],
    github: 'https://devpost.com/software/pantry-fy',
  },
  braille: {
    tag: 'Wearable Tech · Embedded Systems · Assistive Technology · Sep 2025–Present',
    title: 'BrailLearn — Assistive Braille Input Glove',
    summary: 'A wearable digital pen for the visually impaired — converting tactile finger movements into real-time digital text and audio for under $100.',
    problem: "For the 7 million visually impaired individuals in the US, digital text entry is often a choice between bulky, expensive ($1,000+) hardware or imprecise voice-to-text. Adults learning Braille later in life face a steep learning curve due to reduced neuroplasticity. We needed to create a portable, affordable, and intuitive invisible interface that allows users to type Braille anywhere without a physical desk.",
    built: "The Interface: Designed a dual-glove system mapping 6 fingers to the 2x3 Braille cell grid (Index/Middle/Ring on each hand).\n\nHardware Stack: Integrated Force-Sensitive Resistors (FSRs) and an ESP32 microcontroller to detect intentional pressure against any surface, filtering out accidental movements that traditional flex sensors might misinterpret.\n\nFirmware: Developed C++ logic on the ESP32 to handle multi-sensor threshold detection and map simultaneous finger-press combinations to a Braille lookup table.\n\nDigital Dashboard: Architected a React-based webpage to provide real-time visual and audio feedback, creating an interactive confirmation loop that accelerates the Braille learning curve.\n\nErgonomics & Safety: Collaborated on a multidisciplinary team (SWE) to ensure the hardware was integrated into lightweight, breathable spandex, focusing on tactile feedback and long-term wearable comfort.",
    insight: "In assistive technology, the hardest problems aren't electrical — they're ergonomic and cognitive. If the audio feedback lags by even a fraction of a second, the user's mental model breaks. This project taught me that functional is not enough — the technology must be invisible to truly empower the user.",
    tech: ['ESP32', 'Force-Sensitive Resistors', 'C++', 'React', 'Braille Lookup Table', 'Wearable Hardware', 'Accessibility Design'],
    github: '',
  },
  scrubai: {
    tag: 'Computer Vision · AI/ML · Healthcare · WEHack UTD 2026 🏆 Track Winner',
    title: 'ScrubAI — Surgical Scrub Protocol Verification System',
    summary: 'Won our track at WEHack UTD. An offline real-time system that verifies the full 18-step surgical scrub protocol using speech recognition and computer vision — no internet required.',
    problem: "Surgical infections are still often caused by missed steps that go unverified in high-pressure environments. Checklists exist, but enforcement is still manual and fallible. We needed to build a system that could verify the full surgical scrub protocol in real time — reliably, offline, and under real-world noise and hardware constraints.",
    built: "Speech Recognition: Integrated OpenAI Whisper running fully offline to capture voice input during the scrub protocol. Built a custom context-aware matching engine to map natural language to the correct procedural step — handling variation in phrasing and background noise.\n\nComputer Vision: Used OpenCV optical flow to detect whether actual scrubbing motion was happening at the sink, providing a second layer of verification beyond voice input.\n\nSystem Architecture: Designed to run entirely offline on local hardware. Faced and overcame multiple hardware failures during the hackathon — screens that wouldn't power on, a Raspberry Pi that refused to cooperate, an Arduino OLED that broke under testing, Python dependency issues, and a demo pipeline that nearly collapsed right before judging.\n\nResilience Under Pressure: Both the speech system and vision system broke independently right before submission. We rebuilt them under pressure and ran the system split across two laptops to keep it stable for judging. Demonstrated the full system live despite heavy background noise causing intermittent recognition issues.",
    insight: "The hard part of AI isn't the model — it's making the entire system survive reality. Every component worked in isolation; the challenge was making them work together under physical hardware failures, dependency conflicts, and live demo pressure. Building for failure first, not last, is what got us through.",
    tech: ['OpenAI Whisper', 'OpenCV', 'Optical Flow', 'Python', 'Raspberry Pi', 'Speech Recognition', 'Computer Vision', 'Offline AI'],
    github: 'https://github.com/akao335/WeHack2026',
    devpost: 'https://devpost.com/software/vassavs',
  },
};

/* ── INVOLVEMENT ── */
const INVOLVEMENT = [
  {
    num: '01', date: 'Mar 2026–Present',
    org: 'Break Through Tech AI — Cornell Tech',
    role: 'AI & ML Fellow',
    desc: 'Selected as an AI & ML Fellow through Break Through Tech at Cornell Tech — a competitive program focused on applied machine learning and real-world AI system development. Engaging in hands-on project work, mentorship, and industry collaboration at the intersection of hardware-aware AI and responsible system design.',
  },
  {
    num: '02', date: 'Feb 2026–Present',
    org: 'Girls Who Code UTD',
    role: 'Events Officer',
    desc: 'Organizing events to support and grow the women in computing community at UTD.',
  },
  {
    num: '03', date: 'Jan 2026–Present',
    org: 'ACM Projects UTD',
    role: 'Projects · Memoir · Mobile Dev',
    desc: 'Building Memoir — a digital memory preservation app — as part of ACM Projects.',
  },
  {
    num: '04', date: 'Sep 2025–Present',
    org: 'AIAA UTD',
    role: 'Comet Rocketry L1 · Avionics',
    desc: 'Designing ESP32-based avionics and telemetry logging for a high-G launch. Currently conducting pre-flight system validation and sensor stress-testing.',
  },
  {
    num: '05', date: 'Sep 2025–Present',
    org: 'Cybersecurity Club UTD',
    role: 'Logistics Officer',
    desc: 'Managing operations, procurement, and event coordination for technical workshops and skill-building sessions.',
  },
  {
    num: '06', date: 'Sep 2025–Present',
    org: 'Society of Women Engineers',
    role: 'BrailLearn · Assistive Tech',
    desc: 'Prototyping an assistive glove that translates finger-movement Braille to text and audio.',
  },
  {
    num: '07', date: 'Aug 2025–Present',
    org: 'IEEE UTD',
    role: 'Initiatives Officer & Tutor · CE 2310',
    desc: 'Initiatives Officer: supporting event setup, logistics, and on-site execution while gathering feedback to improve future events. Tutor: selected to tutor Digital Systems (CE 2310) covering logic design, Boolean algebra, and circuit behavior.',
  },
  {
    num: '08', date: 'Oct–Dec 2025',
    org: 'SASE × Texas Instruments',
    role: 'Mentee · TI Mentoring Program',
    desc: 'Gaining insight into lab-based silicon validation and post-fabrication testing workflows from TI engineers.',
  },
  {
    num: '09', date: 'Sep–Nov 2025',
    org: 'Ladies in Tech Mentoring',
    role: 'Mentor · Freshman Advising',
    desc: 'Mentoring freshman students on course navigation, academic transitions, and early engineering challenges.',
  },
  {
    num: '10', date: 'May 2024–Dec 2025',
    org: 'CodePath',
    role: 'College Peer Mentor · Web, Cyber, DSA',
    desc: 'Mentored students as a College Peer Mentor. Earned CodePath certifications in Web Development, Cybersecurity, and Data Structures & Algorithms.',
  },
  {
    num: '11', date: 'Jan–Dec 2025',
    org: 'EPICS UTDesign',
    role: 'Financial Officer · Solar Water Purification',
    desc: 'Co-designed a solar-powered clean water system for rural Peru. Received EPICS Special Commendation Award.',
  },
  {
    num: '12', date: 'Jan–May 2025',
    org: 'ACM Mentorship Program',
    role: 'Mentee',
    desc: 'Receiving guidance on technical skills and career preparation from experienced engineers.',
  },
  {
    num: '13', date: 'Jan–May 2025',
    org: 'UTD Road Warriors Mentorship Program',
    role: 'Mentee · UTD Road Warriors',
    desc: 'Engaged in commuter community-building events and received mentorship focused on balancing academics, involvement, and personal growth.',
  },
];

/* ── SKILLS ── */
const SKILLS = [
  {
    label: 'Languages',
    pills: ['Python', 'C / C++', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'MATLAB', 'Kotlin / Android', 'HTML / CSS'],
  },
  {
    label: 'AI, ML & Computer Vision',
    pills: ['OpenCV', 'MediaPipe', 'Prompt Engineering', 'LLM Integration', 'Semantic Vector Search', 'pgvector', 'OpenAI Embeddings', 'Nemotron / OpenRouter', 'GPT-4o / GPT-3.5', 'Gemini', 'NumPy', 'Matplotlib'],
  },
  {
    label: 'Embedded & Hardware',
    pills: ['ESP32 / ESP8266', 'Arduino', 'MSP430', 'FSM Design', 'I2C / SPI / UART', 'Force-Sensitive Resistors', 'BMP280', 'Soldering', 'Oscilloscope', 'Multimeter', 'Schematic Capture', 'Solar & Battery Systems', 'Thermal Load Analysis', 'SD Logging'],
  },
  {
    label: 'Software & Full-Stack',
    pills: ['React', 'React Native', 'Expo Router', 'Node.js', 'Express.js', 'Flask', 'Tailwind CSS', 'Bootstrap', 'Supabase', 'Firebase', 'MongoDB', 'PostgreSQL', 'GitHub Actions / CI-CD', 'Linux'],
  },
  {
    label: 'Tools & Design',
    pills: ['Autodesk Revit', 'Fusion 360', 'Git / GitHub', 'Jira', 'Figma', 'VS Code', 'Cursor', 'Eclipse', 'Excel (Advanced)'],
  },
];

/* ── UPDATES (newest first) ── */
const UPDATES = [
  {
    date: 'Mar 2026',
    text: '<strong>Won WEHack UTD — ScrubAI.</strong> Built an offline surgical scrub verification system using OpenAI Whisper and OpenCV optical flow in 24 hours. Won our track.',
    tag: 'WEHack UTD · Track Winner · CV · AI',
  },
  {
    date: 'Mar 2026',
    text: '<strong>Selected — Break Through Tech AI at Cornell Tech.</strong> Accepted as an AI & ML Fellow in a competitive program focused on applied ML and real-world AI system development.',
    tag: 'Cornell Tech · AI/ML · Fellowship',
  },
  {
    date: 'Apr 2026',
    text: '<strong>L1 Rocketry Launch — Upcoming.</strong> Finalizing avionics hardware for the scheduled flight window.',
    tag: 'AIAA UTD · Embedded · Upcoming',
  },
  {
    date: 'Feb 2026',
    text: '<strong>Vision Control Panel Integration.</strong> Completed the Python-to-Arduino bridge, implementing stable serial communication and FSM-enforced safety protocols.',
    tag: 'Personal Project · CV · Embedded',
  },
  {
    date: 'Feb 2026',
    text: '<strong>Joined Girls Who Code UTD.</strong> Appointed Events Officer — directing community-building initiatives and events for women in computing.',
    tag: 'Leadership · GWC',
  },
  {
    date: 'Jan 2026',
    text: '<strong>Memoir (ACM Projects) Kickoff.</strong> Started backend development for semantic memory search using pgvector and Flask for automated card digitization.',
    tag: 'ACM Projects · AI · Flask',
  },
  {
    date: 'Dec 2025',
    text: '<strong>EPICS Solar Project Complete.</strong> Delivered full Revit 3D models and Construction Sheet Set. Received the Special Commendation Award.',
    tag: 'EPICS · Award · BIM',
  },
  {
    date: 'Nov 2025',
    text: '<strong>CodePath Certification Wave.</strong> Completed Web Development (WEB 101) and Cybersecurity (CYB 102) while serving as a College Peer Mentor.',
    tag: 'CodePath · Certifications',
  },
  {
    date: 'Nov 2025',
    text: '<strong>Built JiraMate at HackUTD.</strong> Shipped an AI tool using Node.js and Nemotron LLMs with a custom validation layer to transform non-deterministic AI output into structured Jira stories.',
    tag: 'Hackathon · Full-Stack · AI',
  },
  {
    date: 'Sep 2025',
    text: '<strong>Fall Involvement Surge.</strong> Joined AIAA Comet Rocketry (Avionics), SWE Assistive Tech (Braille Glove), and the Cybersecurity Club (Logistics Officer).',
    tag: 'Leadership · Embedded · Assistive Tech',
  },
  {
    date: 'Sep 2025',
    text: '<strong>Cybersecurity Club UTD.</strong> Appointed Logistics Officer — directing operational planning and resource management for the 2026 technical workshop series.',
    tag: 'Leadership · Cybersecurity',
  },
  {
    date: 'Aug 2025',
    text: '<strong>Technical Foundation.</strong> Completed CodePath TIP 102 (Data Structures &amp; Algorithms) and CYB 101 (Cybersecurity Fundamentals).',
    tag: 'CodePath · DSA · Cybersecurity',
  },
  {
    date: 'Jun 2025',
    text: '<strong>TI Mentorship.</strong> Selected for the Texas Instruments Mentoring Program to study embedded systems and the semiconductor engineering pipeline.',
    tag: 'SASE · Texas Instruments · Embedded',
  },
];

/* ── CONTACT ── */
const CONTACT = {
  heading: 'Open to internships<br>for Summer 2026.',
  sub: "Interested in embedded systems, software engineering, and applied AI. If you're building something interesting, reach out.",
  press: {
    text: 'As featured in',
    label: 'Vera Aqua Vera Vita &#x2197;&#xFE0E;',
    url: 'https://veraaquaveravita.org/news/out-of-thin-air-how-vavv-and-utd-students-are-bringing-clean-water-to-peru',
  },
  links: [
    { label: 'Email me →',          href: 'mailto:iamkasishjain@gmail.com', style: 'primary' },
    { label: 'LinkedIn &#x2197;&#xFE0E;', href: 'https://linkedin.com/in/kasishjain', style: 'outline', target: '_blank' },
    { label: 'GitHub &#x2197;&#xFE0E;',   href: 'https://github.com/kasishjain',      style: 'outline', target: '_blank' },
  ],
};