/* =========================================================
   ENGINEERHUB — script.js
   Renders dynamic content (roadmap, features, learning flow)
   and wires up nav / scroll interactions.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Data: Learning Roadmap ---------- */
  const roadmap = [
    { title: 'Foundation', desc: 'Numbers, units, physics refresher for engineering.', duration: '1 week', status: 'done' },
    { title: 'Basic Electricity', desc: 'Voltage, current, resistance, Ohm\u2019s law, circuits.', duration: '2 weeks', status: 'done' },
    { title: 'Basic Electronics', desc: 'Diodes, transistors, capacitors, breadboarding.', duration: '2 weeks', status: 'active' },
    { title: 'Circuit Analysis', desc: 'Kirchhoff\u2019s laws, mesh & nodal analysis, network theorems.', duration: '3 weeks', status: 'locked' },
    { title: 'Analog Electronics', desc: 'Amplifiers, op-amps, filters and signal conditioning.', duration: '3 weeks', status: 'locked' },
    { title: 'Digital Electronics', desc: 'Logic gates, flip-flops, counters, combinational design.', duration: '3 weeks', status: 'locked' },
    { title: 'Embedded Systems', desc: 'Architecture, interfacing, firmware fundamentals.', duration: '4 weeks', status: 'locked' },
    { title: 'Microcontrollers', desc: 'ARM/AVR programming, timers, interrupts, communication.', duration: '4 weeks', status: 'locked' },
    { title: 'PCB Design', desc: 'Schematic capture, layout, routing, and fabrication.', duration: '3 weeks', status: 'locked' },
    { title: 'Power Electronics', desc: 'Converters, inverters, motor drives, protection.', duration: '3 weeks', status: 'locked' },
    { title: 'IoT', desc: 'Sensors, connectivity, cloud dashboards, edge devices.', duration: '3 weeks', status: 'locked' },
    { title: 'Industrial Electronics', desc: 'PLCs, automation, industrial communication protocols.', duration: '3 weeks', status: 'locked' },
    { title: 'Industry Ready', desc: 'Capstone project, interview prep, certification.', duration: '2 weeks', status: 'locked' },
  ];

  const iconCheck = `<svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const iconLock  = `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" stroke-width="1.8"/></svg>`;

  const roadmapList = document.getElementById('roadmapList');
  roadmap.forEach((item, i) => {
    const li = document.createElement('li');
    const stateClass = item.status === 'done' ? 'is-done' : item.status === 'locked' ? 'is-locked' : '';
    li.className = `roadmap-item ${stateClass} reveal`;

    let nodeContent = String(i + 1).padStart(2, '0');
    if (item.status === 'done') nodeContent = iconCheck;
    if (item.status === 'locked') nodeContent = iconLock;

    li.innerHTML = `
      <div class="node">${nodeContent}</div>
      <div class="roadmap-body">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
      <div class="roadmap-meta">
        <span class="duration-pill">${item.duration}</span>
        ${progressRing(item.status)}
      </div>
    `;

    if (item.status !== 'locked') {
      li.addEventListener('click', () => {
        li.animate(
          [{ transform: 'scale(1)' }, { transform: 'scale(0.98)' }, { transform: 'scale(1)' }],
          { duration: 220, easing: 'ease-out' }
        );
      });
    }
    roadmapList.appendChild(li);
  });

  function progressRing(status) {
    const pct = status === 'done' ? 100 : status === 'active' ? 45 : 0;
    const r = 16, c = 2 * Math.PI * r;
    const offset = c - (pct / 100) * c;
    const color = status === 'done' ? '#17C3B2' : status === 'active' ? '#2F6FED' : '#CBD5E1';
    return `
      <svg class="progress-ring" width="42" height="42" viewBox="0 0 42 42">
        <circle cx="21" cy="21" r="${r}" fill="none" stroke="#EEF1F7" stroke-width="4"/>
        <circle cx="21" cy="21" r="${r}" fill="none" stroke="${color}" stroke-width="4"
          stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"
          transform="rotate(-90 21 21)"/>
        <text x="21" y="25" text-anchor="middle" font-size="10" font-family="Inter, sans-serif" fill="#33456B">${pct}%</text>
      </svg>`;
  }

  /* ---------- Data: Why choose EngineerHub ---------- */
  const features = [
    { title: 'Interactive Learning', desc: 'Hands-on lessons that respond to your input, not passive video.', icon: `<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.4 1 1.1 1 1.9v.3h5.2v-.3c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>` },
    { title: 'Story-Based Learning', desc: 'Every concept begins with a real-world engineering story.', icon: `<path d="M4 19V6a2 2 0 0 1 2-2h9l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="1.7"/><path d="M15 4v5h5" stroke="currentColor" stroke-width="1.7"/>` },
    { title: 'Animations', desc: 'Visualize current flow, signals and logic that textbooks can\u2019t show.', icon: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>` },
    { title: 'Interactive Simulations', desc: 'Build and test circuits virtually before touching hardware.', icon: `<path d="M4 12h4l2-7 4 14 2-7h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>` },
    { title: 'Daily Study Planner', desc: 'A schedule that adapts to your pace and available hours.', icon: `<rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>` },
    { title: 'Smart Revision', desc: 'Spaced repetition surfaces exactly what you\u2019re forgetting.', icon: `<path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 14a8 8 0 0 0 14.5 3M19 10A8 8 0 0 0 4.5 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>` },
    { title: 'Mock Tests', desc: 'Timed, exam-style tests that mirror real assessments.', icon: `<path d="M9 12h6M9 16h6M9 8h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" stroke-width="1.7"/>` },
    { title: 'Industry Projects', desc: 'Ship real embedded and electrical projects for your portfolio.', icon: `<rect x="4" y="7" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="1.7"/>` },
    { title: 'Progress Tracking', desc: 'See exactly how close you are to industry-ready.', icon: `<path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>` },
    { title: 'Certificates', desc: 'Verified credentials recognized by hiring engineers.', icon: `<path d="M12 2l2.9 6.3L21 9.3l-4.6 4.5L17.5 21 12 17.8 6.5 21l1.1-7.2L3 9.3l6.1-1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>` },
    { title: 'Career Roadmaps', desc: 'Clear paths from student to embedded, power or PCB engineer.', icon: `<path d="M4 12h16M4 12l5-5M4 12l5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>` },
    { title: 'Responsive Learning', desc: 'Continue any lesson seamlessly across phone, tablet and desktop.', icon: `<rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 20h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>` },
  ];

  const featureGrid = document.getElementById('featureGrid');
  features.forEach(f => {
    const card = document.createElement('div');
    card.className = 'feature-card reveal';
    card.innerHTML = `
      <div class="feature-icon"><svg viewBox="0 0 24 24" fill="none">${f.icon}</svg></div>
      <h4>${f.title}</h4>
      <p>${f.desc}</p>
    `;
    featureGrid.appendChild(card);
  });

  /* ---------- Data: How students learn (real sequence -> numbered) ---------- */
  const flow = [
    'Real-life Story', 'Problem Statement', 'Concept Explanation', 'Animation',
    'Simulation', 'Worked Example', 'Practice Questions', 'Mini Activity',
    'Quiz', 'Quick Revision', 'Next Topic'
  ];
  const arrowSvg = `<svg viewBox="0 0 24 24" fill="none"><path d="M12 4v16M6 14l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const flowList = document.getElementById('flowList');
  flow.forEach((step, i) => {
    const stepEl = document.createElement('div');
    stepEl.className = 'flow-step reveal';
    stepEl.innerHTML = `<div class="flow-num">${String(i + 1).padStart(2, '0')}</div><h4>${step}</h4>`;
    flowList.appendChild(stepEl);
    if (i < flow.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'flow-arrow';
      arrow.innerHTML = arrowSvg;
      flowList.appendChild(arrow);
    }
  });

  /* ---------- Sticky nav shadow on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
