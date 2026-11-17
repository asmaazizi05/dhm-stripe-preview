/**
 * DISCOVER HIDDEN MOROCCO — STRIPE EDITION INTERACTIVITY
 * Includes: Fluid Canvas Gradient Mesh, Tab Switcher, Interactive Journey Simulator & Parallax
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroCanvas();
  initTabs();
  initJourneySimulator();
  initMobileMenu();
});

/* ==========================================================================
   1. STRIPE FLUID GRADIENT MESH CANVAS
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;

  // Blob configurations (colors match Moroccan sunset & Majorelle indigo)
  const blobs = [
    { x: 0.2, y: 0.3, r: 0.45, vx: 0.0004, vy: 0.0003, color: 'rgba(79, 70, 229, 0.45)' },  // Indigo
    { x: 0.8, y: 0.4, r: 0.50, vx: -0.0003, vy: 0.0005, color: 'rgba(225, 90, 62, 0.4)' },  // Terracotta
    { x: 0.5, y: 0.8, r: 0.40, vx: 0.0005, vy: -0.0004, color: 'rgba(245, 158, 11, 0.35)' }, // Saffron
    { x: 0.7, y: 0.2, r: 0.35, vx: -0.0004, vy: -0.0003, color: 'rgba(236, 72, 153, 0.3)' }  // Rose
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  let time = 0;
  function animate() {
    time += 0.005;
    ctx.clearRect(0, 0, width, height);

    // Draw dark base gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#060913');
    bgGrad.addColorStop(0.6, '#0A0F1D');
    bgGrad.addColorStop(1, '#111827');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Update and draw blobs
    blobs.forEach((b, i) => {
      // Oscillate positions smoothly
      const currentX = (b.x + Math.sin(time + i * 2) * 0.15) * width;
      const currentY = (b.y + Math.cos(time + i * 1.5) * 0.15) * height;
      const currentR = b.r * Math.min(width, height);

      const radGrad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, currentR);
      radGrad.addColorStop(0, b.color);
      radGrad.addColorStop(1, 'rgba(10, 15, 29, 0)');

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(currentX, currentY, currentR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVBAR BLUR ON SCROLL
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.stripe-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. STRIPE INTERACTIVE TABBED TOUR EXPLORER
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-nav-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update active state on buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active panel
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE JOURNEY SIMULATOR & ROUTE ESTIMATOR
   ========================================================================== */
function initJourneySimulator() {
  let selectedCity = 'Marrakech';
  let selectedDuration = '5 Days';
  let selectedStyle = 'Luxury Riads & Desert Camp';

  const cityBtns = document.querySelectorAll('[data-sim-city]');
  const durationBtns = document.querySelectorAll('[data-sim-duration]');
  const styleBtns = document.querySelectorAll('[data-sim-style]');

  const titleEl = document.getElementById('simTourTitle');
  const summaryEl = document.getElementById('simTourSummary');
  const checkpointsEl = document.getElementById('simCheckpoints');
  const whatsappBtn = document.getElementById('simWhatsappTrigger');

  const tourDataMap = {
    'Marrakech-3 Days': {
      title: 'Marrakech & Atlas Mountain Escape (3D)',
      summary: 'Private luxury discovery of Marrakech medina, followed by a scenic journey to the high Atlas valleys and Berber heritage villages.',
      points: ['Day 1: Marrakech Historic Medina & Private Secret Riad', 'Day 2: High Atlas Mountain Passes, Imlil & Berber Tea Ceremony', 'Day 3: Agafay Stone Desert Sunset Camel Trek & Return']
    },
    'Marrakech-5 Days': {
      title: 'Marrakech to Merzouga Sahara Luxe Expedition (5D)',
      summary: 'Our signature route: Cross Tizi n\'Tichka, explore Ait Ben Haddou Kasbah, Todra Gorges, and spend an unforgettable night in luxury Sahara desert glamping.',
      points: ['Day 1: Marrakech → Ouarzazate & UNESCO Ait Ben Haddou', 'Day 2: Dades Valley & Towering Todra Gorges', 'Day 3: Merzouga Erg Chebbi Sunset Camels & Starlit Camp', 'Day 4: Draa Valley Oasis & Kasbahs', 'Day 5: Return to Marrakech with Mountain Panoramas']
    },
    'Marrakech-7 Days': {
      title: 'Grand Morocco Loop: Imperial Cities & Sahara (7D)',
      summary: 'The ultimate panoramic odyssey connecting Marrakech, the dramatic Sahara dunes of Merzouga, and the medieval imperial tanneries of Fès.',
      points: ['Day 1-2: Marrakech VIP Discovery & High Atlas Crossing', 'Day 3: Ait Ben Haddou & Dades Gorges Panoramic Valley', 'Day 4: Merzouga Luxury Desert Camp Stargazing & Drums', 'Day 5: Ziz Valley, Middle Atlas Cedar Forests to Fès', 'Day 6: Fes El Bali UNESCO Historic Medina Exploration', 'Day 7: Scenic Return or Airport Transfer']
    },
    'Marrakech-10+ Days': {
      title: 'The Royal Kingdom Odyssey (10-12D)',
      summary: 'Comprehensive tailor-made private grand tour encompassing Marrakech, Sahara dunes, Fes, the blue city of Chefchaouen, and Atlantic ocean retreat in Essaouira.',
      points: ['Day 1-3: Marrakech & High Atlas Berber Exploration', 'Day 4-6: Sahara Deep Desert, Erg Chebbi & Gorges', 'Day 7-8: Fes Medieval Imperial Capital & Meknes', 'Day 9: Chefchaouen Enchanted Blue Medina', 'Day 10+: Essaouira Atlantic Coast & Fresh Seafood Harbor']
    },
    'Casablanca-7 Days': {
      title: 'Casablanca, Imperial Capitals & Sahara (7D)',
      summary: 'Start from Casablanca (Hassan II Mosque), traverse Rabat, Meknes, Fès, down to the golden dunes of Merzouga and finishing in vibrant Marrakech.',
      points: ['Day 1: Casablanca Hassan II Mosque & Rabat Royal Capital', 'Day 2: Fes El Bali UNESCO Guided Heritage Walk', 'Day 3-4: Sahara Desert Expedition & Erg Chebbi Luxury Tents', 'Day 5: Ouarzazate Kasbahs & High Atlas Mountains', 'Day 6-7: Marrakech Palace Discovery & Farewell Dinner']
    }
  };

  function updateSimulator() {
    const key = `${selectedCity}-${selectedDuration}`;
    const fallbackKey = `Marrakech-${selectedDuration}`;
    const data = tourDataMap[key] || tourDataMap[fallbackKey] || tourDataMap['Marrakech-5 Days'];

    if (titleEl) titleEl.textContent = data.title;
    if (summaryEl) summaryEl.textContent = `${data.summary} (Travel Style: ${selectedStyle}).`;

    if (checkpointsEl) {
      checkpointsEl.innerHTML = '';
      data.points.forEach(pt => {
        const div = document.createElement('div');
        div.className = 'sim-checkpoint';
        div.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${pt}</span>`;
        checkpointsEl.appendChild(div);
      });
    }

    if (whatsappBtn) {
      const message = `Hello Discover Hidden Morocco! I am interested in planning a ${selectedDuration} tour starting from ${selectedCity} with ${selectedStyle} style. Could you send me a custom private itinerary and pricing?`;
      whatsappBtn.href = `https://wa.me/212660082066?text=${encodeURIComponent(message)}`;
    }
  }

  function setupButtons(buttons, callback) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        callback(btn.textContent.trim());
        updateSimulator();
      });
    });
  }

  setupButtons(cityBtns, val => { selectedCity = val; });
  setupButtons(durationBtns, val => { selectedDuration = val; });
  setupButtons(styleBtns, val => { selectedStyle = val; });

  updateSimulator();
}

/* ==========================================================================
   5. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(10, 15, 29, 0.96)';
        navLinks.style.padding = '24px';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
    });
  }
}
