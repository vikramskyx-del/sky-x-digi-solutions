/* =========================================================
   SKYX DIGI SOLUTIONS — ENGINE
   Slate Grey, Emerald Green & Ocean Blue Palette
   Three.js 3D WebGL Engine | Snap Scroll | Service Configurator
   ========================================================= */

'use strict';

// ─────────────────────────────────────────────
// 0. CINEMATIC VIDEO BACKGROUND — autoplay + Ken Burns parallax
// ─────────────────────────────────────────────
(function initCinematicVideo() {
  const video = document.getElementById('cinematic-bg-video');
  if (!video) return;

  // Ensure muted (required for autoplay policy)
  video.muted = true;
  video.volume = 0;

  // Try autoplay immediately
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay blocked — unlock on first user interaction
      const unlock = () => {
        video.play().catch(() => {});
        document.removeEventListener('click', unlock);
        document.removeEventListener('touchstart', unlock);
        document.removeEventListener('keydown', unlock);
      };
      document.addEventListener('click',      unlock, { once: true });
      document.addEventListener('touchstart', unlock, { once: true });
      document.addEventListener('keydown',    unlock, { once: true });
    });
  }

  // Subtle scroll-based parallax — shifts the video slightly as you scroll slides
  const container = document.getElementById('slides-container');
  if (!container) return;
  let ticking = false;
  container.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const progress = container.scrollTop / (container.scrollHeight - container.clientHeight);
      const yShift   = (progress - 0.5) * 5; // ±2.5% vertical drift
      video.style.transform = `scale(1.05) translateY(${yShift}%)`;
      ticking = false;
    });
  });
})();

// ─────────────────────────────────────────────
// 1. CUSTOM CURSOR
// ─────────────────────────────────────────────
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  const hoverTargets = 'a, button, .port-card, .team-card, .svc-dot, .sp-dot, .nav-arrow, input, select, textarea';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

// ─────────────────────────────────────────────
// 2. NAVIGATION — MENU OPEN / CLOSE
// ─────────────────────────────────────────────
(function initNav() {
  const burger  = document.getElementById('nav-burger');
  const overlay = document.getElementById('menu-overlay');
  const close   = document.getElementById('menu-close');

  function openMenu()  { overlay?.classList.add('open'); }
  function closeMenu() { overlay?.classList.remove('open'); }

  burger?.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);

  overlay?.addEventListener('click', e => {
    if (e.target === overlay) closeMenu();
  });

  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', e => {
      if (link.dataset.slide !== undefined) {
        e.preventDefault();
        closeMenu();
        const target = parseInt(link.dataset.slide);
        setTimeout(() => scrollToSlide(target), 300);
      } else {
        closeMenu();
      }
    });
  });
})();

// ─────────────────────────────────────────────
// 3. SNAP-SCROLL ENGINE
// ─────────────────────────────────────────────
const slides = Array.from(document.querySelectorAll('.slide'));
const container = document.getElementById('slides-container');
let currentSlide = 0;
let isScrolling = false;

function scrollToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  currentSlide = index;
  setActiveSlide(index);
  slides[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (container) {
    container.scrollTo({ top: slides[index].offsetTop, behavior: 'smooth' });
  }
}

const slideObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
      const idx = slides.indexOf(entry.target);
      if (idx !== -1 && idx !== currentSlide) setActiveSlide(idx);
    }
  });
}, { root: container, threshold: 0.45 });

slides.forEach(s => slideObserver.observe(s));

function setActiveSlide(idx) {
  currentSlide = idx;

  const numEl = document.getElementById('nav-section-num');
  if (numEl) numEl.textContent = `0${idx + 1} / 0${slides.length}`;

  document.querySelectorAll('.sp-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });

  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');
  if (prevBtn) prevBtn.disabled = idx === 0;
  if (nextBtn) nextBtn.disabled = idx === slides.length - 1;

  // Commercial video playback control: ONLY active on Slide 1 (Home)
  const bgVideo = document.getElementById('cinematic-bg-video');
  if (bgVideo) {
    if (idx === 0) {
      bgVideo.play().catch(() => {});
    } else {
      bgVideo.pause();
    }
  }

  animateSlide(slides[idx]);
}

// Nav arrow buttons (Up / Down)
const prevBtn = document.getElementById('nav-prev');
const nextBtn = document.getElementById('nav-next');
prevBtn?.addEventListener('click', () => scrollToSlide(currentSlide - 1));
nextBtn?.addEventListener('click', () => scrollToSlide(currentSlide + 1));

// Side progress dots
document.querySelectorAll('.sp-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    const target = parseInt(dot.dataset.target || '0');
    scrollToSlide(target);
  });
});

// Any "slide-goto" button
document.querySelectorAll('.slide-goto').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const target = parseInt(btn.dataset.target || '0');
    if (!isNaN(target)) scrollToSlide(target);
  });
});

// Mouse wheel navigation
window.addEventListener('wheel', e => {
  e.preventDefault();
  if (isScrolling) return;

  const delta = e.deltaY;
  if (Math.abs(delta) > 18) {
    if (delta > 0 && currentSlide < slides.length - 1) {
      isScrolling = true;
      scrollToSlide(currentSlide + 1);
      setTimeout(() => { isScrolling = false; }, 750);
    } else if (delta < 0 && currentSlide > 0) {
      isScrolling = true;
      scrollToSlide(currentSlide - 1);
      setTimeout(() => { isScrolling = false; }, 750);
    }
  }
}, { passive: false });

// Keyboard navigation
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault();
    scrollToSlide(currentSlide + 1);
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    scrollToSlide(currentSlide - 1);
  }
});

// Touch swipe navigation
let touchStartY = 0;
window.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', e => {
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dy) > 40) {
    if (dy < 0) scrollToSlide(currentSlide + 1);
    else scrollToSlide(currentSlide - 1);
  }
}, { passive: true });

// ─────────────────────────────────────────────
// 4. ENTRANCE ANIMATIONS PER SLIDE
// ─────────────────────────────────────────────
function animateSlide(slide) {
  if (!slide) return;
  const animEls = slide.querySelectorAll('[data-anim]');
  animEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = getInitialTransform(el.dataset.anim);
    el.style.transition = 'none';

    setTimeout(() => {
      const delay = parseInt(el.dataset.delay || '0') / 1000;
      el.style.transition = `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
      el.style.opacity = '1';
      el.style.transform = 'translate(0,0) scale(1)';
    }, 45);
  });
}

function getInitialTransform(anim) {
  switch (anim) {
    case 'fade-up':    return 'translateY(35px)';
    case 'fade-down':  return 'translateY(-35px)';
    case 'fade-left':  return 'translateX(45px)';
    case 'fade-right': return 'translateX(-45px)';
    case 'scale-in':   return 'scale(0.92)';
    default:           return 'translateY(20px)';
  }
}

setTimeout(() => animateSlide(slides[0]), 150);

// ─────────────────────────────────────────────
// 5. 16K CINEMATIC VOLUMETRIC MOTION CANVAS ENGINE
// ─────────────────────────────────────────────
function createBgCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  let particles = [];
  const COUNT = 48;
  let mouseOffset = { x: 0, y: 0 };
  let targetMouse = { x: 0, y: 0 };

  window.addEventListener('mousemove', e => {
    targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 40;
    targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 40;
  });

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * (W || 1400),
      y: Math.random() * (H || 800),
      vx: (Math.random() - 0.5) * 0.26,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 2.2 + 0.6,
      depth: Math.random() * 0.85 + 0.15,
      alpha: Math.random() * 0.45 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulse: Math.random() * Math.PI * 2,
      isGreen: Math.random() > 0.45
    });
  }

  let time = 0;
  function render() {
    time += 0.012;
    mouseOffset.x += (targetMouse.x - mouseOffset.x) * 0.05;
    mouseOffset.y += (targetMouse.y - mouseOffset.y) * 0.05;

    ctx.clearRect(0, 0, W, H);

    // 1. Volumetric Light Rays (Cinematic God Rays)
    ctx.save();
    const rayAngle = Math.PI * 0.22 + Math.sin(time * 0.25) * 0.04;
    const originX = W * 0.85 + mouseOffset.x * 0.35;
    const originY = -40 + mouseOffset.y * 0.2;
    const rayLength = Math.max(W, H) * 1.5;

    for (let r = 0; r < 4; r++) {
      const rayOffset = (r - 1.5) * 0.12 + Math.sin(time * 0.3 + r) * 0.03;
      const angle = rayAngle + rayOffset;
      const pulseAlpha = (Math.sin(time * 0.6 + r * 1.5) * 0.5 + 0.5) * 0.04 + 0.015;

      const grad = ctx.createRadialGradient(originX, originY, 20, originX + Math.cos(angle) * rayLength * 0.5, originY + Math.sin(angle) * rayLength * 0.5, rayLength * 0.8);
      grad.addColorStop(0, r % 2 === 0 ? `rgba(16, 185, 129, ${pulseAlpha * 1.5})` : `rgba(14, 165, 233, ${pulseAlpha * 1.3})`);
      grad.addColorStop(0.4, r % 2 === 0 ? `rgba(52, 211, 153, ${pulseAlpha * 0.7})` : `rgba(56, 189, 248, ${pulseAlpha * 0.6})`);
      grad.addColorStop(1, 'rgba(7, 11, 18, 0)');

      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.arc(originX, originY, rayLength, angle - 0.12, angle + 0.12);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }
    ctx.restore();

    // 2. Fluid Aurora Light Ribbons (Flowing sine waves)
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let w = 0; w < 2; w++) {
      ctx.beginPath();
      const waveY = H * (0.45 + w * 0.22) + Math.sin(time * 0.5 + w) * 35;
      ctx.moveTo(0, waveY);

      for (let x = 0; x <= W; x += 40) {
        const y = waveY + 
          Math.sin(x * 0.003 + time * 0.7 + w * 1.8) * 45 + 
          Math.cos(x * 0.006 - time * 0.4) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();

      const waveGrad = ctx.createLinearGradient(0, waveY - 50, W, waveY + 120);
      const wAlpha = (Math.sin(time * 0.4 + w) * 0.5 + 0.5) * 0.035 + 0.015;
      if (w === 0) {
        waveGrad.addColorStop(0, `rgba(16, 185, 129, ${wAlpha * 1.5})`);
        waveGrad.addColorStop(0.5, `rgba(14, 165, 233, ${wAlpha})`);
        waveGrad.addColorStop(1, 'transparent');
      } else {
        waveGrad.addColorStop(0, `rgba(14, 165, 233, ${wAlpha * 1.3})`);
        waveGrad.addColorStop(0.5, `rgba(52, 211, 153, ${wAlpha * 0.8})`);
        waveGrad.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = waveGrad;
      ctx.fill();
    }
    ctx.restore();

    // 3. Cinematic Drifting Particles & Stardust with Parallax
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;

      const px = p.x + mouseOffset.x * p.depth;
      const py = p.y + mouseOffset.y * p.depth;
      const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

      ctx.beginPath();
      ctx.arc(px, py, p.r * (0.9 + 0.2 * Math.sin(p.pulse)), 0, Math.PI * 2);
      ctx.fillStyle = p.isGreen
        ? `rgba(16, 185, 129, ${currentAlpha})`
        : `rgba(14, 165, 233, ${currentAlpha})`;
      ctx.shadowBlur = p.r > 1.8 ? 12 : 0;
      ctx.shadowColor = p.isGreen ? '#10b981' : '#0ea5e9';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(render);
  }
  render();
}

['bg-canvas-1','bg-canvas-2','bg-canvas-3','bg-canvas-4','bg-canvas-5','bg-canvas-6','bg-canvas-7'].forEach(id => {
  createBgCanvas(id);
});

// ─────────────────────────────────────────────
// 6. HERO 3D GLOBE — REMOVED (video background replaces)
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// 7. SERVICES CONFIGURATOR (Original 6 Services)
// ─────────────────────────────────────────────
const SERVICES_DATA = [
  {
    name: 'Digital Marketing',
    sub: 'SEO · Social Media · Content · PPC · Analytics',
    img: 'assets/svc_marketing.jpg',
    tag: '01 — 06',
    formVal: 'Digital Marketing',
    tech: 'GROWTH SUITE',
    footTitle: 'META ADS & OMNICHANNEL SUITE',
    footStat: 'ROAS COMPACTION · 4.8\u00d7'
  },
  {
    name: 'Website Development',
    sub: 'Fast, modern Next.js & React platforms that convert.',
    img: 'assets/svc_web.jpg',
    tag: '02 — 06',
    formVal: 'Website Development',
    tech: 'NEXT.JS & REACT',
    footTitle: 'HIGH-PERFORMANCE ARCHITECTURE',
    footStat: 'LIGHTHOUSE 100 · 0.2s LCP'
  },
  {
    name: 'Mobile Application',
    sub: 'iOS & Android native apps with seamless performance.',
    img: 'assets/svc_app.jpg',
    tag: '03 — 06',
    formVal: 'Mobile Application',
    tech: 'IOS & ANDROID NATIVE',
    footTitle: 'CROSS-PLATFORM ECOSYSTEM',
    footStat: '60 FPS NATIVE PIPELINE'
  },
  {
    name: 'Customized Software',
    sub: 'Enterprise-grade cloud architectures & ERP tools.',
    img: 'assets/svc_software.jpg',
    tag: '04 — 06',
    formVal: 'Customized Software',
    tech: 'CLOUD CLUSTERS & API',
    footTitle: 'ENTERPRISE SOFTWARE ENGINE',
    footStat: '99.99% SYSTEM UPTIME'
  },
  {
    name: 'WhatsApp API Solutions',
    sub: 'Automated customer engagement & broadcast marketing.',
    img: 'assets/svc_whatsapp.jpg',
    tag: '05 — 06',
    formVal: 'WhatsApp API Solutions',
    tech: 'META OFFICIAL API',
    footTitle: 'AUTOMATED CHATBOT WORKFLOWS',
    footStat: 'ZERO-LATENCY BROADCASTS'
  },
  {
    name: 'Business Consultation',
    sub: 'Strategic growth & digital transformation roadmaps.',
    img: 'assets/svc_ai.jpg',
    tag: '06 — 06',
    formVal: 'Business Consultation',
    tech: 'STRATEGIC ADVISORY',
    footTitle: 'ENTERPRISE SCALING ROADMAP',
    footStat: '10\u00d7 COMPOUNDING IMPACT'
  }
];

let currentSvc = 0;

function updateService(idx) {
  if (idx < 0) idx = SERVICES_DATA.length - 1;
  if (idx >= SERVICES_DATA.length) idx = 0;
  currentSvc = idx;

  const cur = SERVICES_DATA[idx];
  const prevIdx = (idx - 1 + SERVICES_DATA.length) % SERVICES_DATA.length;
  const nextIdx = (idx + 1) % SERVICES_DATA.length;

  const titleEl = document.getElementById('svc-title');
  const subEl = document.getElementById('svc-sub');
  const tagEl = document.getElementById('svc-tag');
  const imgEl = document.getElementById('svc-img');
  const techEl = document.getElementById('svc-badge-tech');
  const footTitleEl = document.getElementById('svc-foot-title');
  const footStatEl = document.getElementById('svc-foot-stat');

  if (titleEl) {
    titleEl.style.opacity = '0';
    setTimeout(() => {
      titleEl.textContent = cur.name;
      titleEl.style.opacity = '1';
    }, 150);
  }

  if (subEl) subEl.textContent = cur.sub;
  if (tagEl) tagEl.textContent = cur.tag;
  if (techEl) techEl.textContent = cur.tech || 'CAPABILITY';
  if (footTitleEl) footTitleEl.textContent = cur.footTitle || cur.name;
  if (footStatEl) footStatEl.textContent = cur.footStat || 'OPTIMIZED';

  if (imgEl) {
    imgEl.style.opacity = '0.35';
    setTimeout(() => {
      imgEl.src = cur.img;
      imgEl.style.opacity = '1';
    }, 150);
  }

  // Left preview
  const numLeft = document.getElementById('svc-num-left');
  const labelPrev = document.getElementById('svc-label-prev');
  const descPrev = document.getElementById('svc-desc-prev');
  if (numLeft) numLeft.textContent = `0${prevIdx + 1}`;
  if (labelPrev) labelPrev.textContent = SERVICES_DATA[prevIdx].name;
  if (descPrev) descPrev.textContent = SERVICES_DATA[prevIdx].sub;

  // Right preview
  const numRight = document.getElementById('svc-num-right');
  const labelNext = document.getElementById('svc-label-next');
  const descNext = document.getElementById('svc-desc-next');
  if (numRight) numRight.textContent = `0${nextIdx + 1}`;
  if (labelNext) labelNext.textContent = SERVICES_DATA[nextIdx].name;
  if (descNext) descNext.textContent = SERVICES_DATA[nextIdx].sub;

  // Dots
  document.querySelectorAll('.svc-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}

document.getElementById('svc-btn-prev')?.addEventListener('click', () => updateService(currentSvc - 1));
document.getElementById('svc-btn-next')?.addEventListener('click', () => updateService(currentSvc + 1));
document.querySelectorAll('.svc-dot').forEach((dot, i) => {
  dot.addEventListener('click', () => updateService(i));
});

// Interactive 3D Card Perspective Tilt
(function initServiceCardTilt() {
  const wrap = document.getElementById('svc-3d-wrap');
  const overlay = document.getElementById('svc-icon-overlay');
  if (!wrap || !overlay) return;

  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / (rect.height / 2)) * 8;
    const ry = (x / (rect.width / 2)) * 10;
    overlay.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  wrap.addEventListener('mouseleave', () => {
    overlay.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
})();

document.getElementById('svc-cta-main')?.addEventListener('click', e => {
  e.preventDefault();
  const select = document.getElementById('cf-service');
  if (select && SERVICES_DATA[currentSvc]) {
    select.value = SERVICES_DATA[currentSvc].formVal;
  }
  scrollToSlide(6);
});

updateService(0);

// ─────────────────────────────────────────────
// 8. TESTIMONIALS STRIP
// ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Sky x Digi Solutions is always up-to-date on the latest digital marketing trends. They are always looking for new ways to improve my business and provide unique strategies unlike other digital marketing companies in Krishnagiri. I'm very happy with their work.",
    author: "— Saravanan Saravanan · Client · 2 reviews"
  },
  {
    quote: "Highly professional team, hired them for social account management and digital marketing. Awesome work, my business with them is for lead generation and website development. They did their job very well. Every month am getting good leads…",
    author: "— PARVATHI INNACHIMUTHU · Client · 1 review"
  },
  {
    quote: "Their WhatsApp API and custom software automation reduced our customer response time to zero. Highest recommendation for any ambitious business looking to scale with intelligent digital systems.",
    author: "— Vignesh Sundaram · Managing Director"
  }
];

let testiIdx = 0;
function updateTestimonial(idx) {
  if (idx < 0) idx = TESTIMONIALS.length - 1;
  if (idx >= TESTIMONIALS.length) idx = 0;
  testiIdx = idx;

  const quoteEl = document.getElementById('testi-quote');
  if (quoteEl) {
    quoteEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.innerHTML = `
        <p>"${TESTIMONIALS[idx].quote}"</p>
        <div class="testi-author">${TESTIMONIALS[idx].author}</div>
      `;
      quoteEl.style.opacity = '1';
    }, 150);
  }
}

document.getElementById('testi-prev')?.addEventListener('click', () => updateTestimonial(testiIdx - 1));
document.getElementById('testi-next')?.addEventListener('click', () => updateTestimonial(testiIdx + 1));

// ─────────────────────────────────────────────
// 9. CONTACT FORM
// ─────────────────────────────────────────────
const form = document.getElementById('contact-form');
form?.addEventListener('submit', e => {
  e.preventDefault();

  const name = (document.getElementById('cf-name')).value.trim();
  const email = (document.getElementById('cf-email')).value.trim();
  const service = (document.getElementById('cf-service')).value;
  const msg = (document.getElementById('cf-msg')).value.trim();

  if (!name || !email) {
    alert('Please provide your name and email address.');
    return;
  }

  const successEl = document.getElementById('cf-success');
  if (successEl) successEl.style.display = 'block';

  // Format WhatsApp message
  const text = `*New Inquiry via SKYX Website*\nName: ${name}\nEmail: ${email}\nService: ${service || 'General'}\nMessage: ${msg || 'None'}`;
  const waUrl = `https://wa.me/917845604588?text=${encodeURIComponent(text)}`;

  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 500);
});

// ─────────────────────────────────────────────
// 10. 3D FLOATING ICONS PARALLAX CONTROLLER
// ─────────────────────────────────────────────
(function initFloatingIconsParallax() {
  const container = document.getElementById('floating-icons-container');
  if (!container) return;
  const icons = container.querySelectorAll('.float-icon');
  if (!icons.length) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 45;
    targetY = (e.clientY / window.innerHeight - 0.5) * 35;
  }, { passive: true });

  function updateParallax() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    icons.forEach(icon => {
      const depth = parseFloat(icon.dataset.depth || '0.5');
      const px = (currentX * depth).toFixed(2);
      const py = (currentY * depth).toFixed(2);
      icon.style.translate = `${px}px ${py}px`;
    });

    requestAnimationFrame(updateParallax);
  }
  updateParallax();
})();

// ─────────────────────────────────────────────
// 11. BLOG QUICK-READ MODAL CONTROLLER
// ─────────────────────────────────────────────
(function initBlogModal() {
  const BLOG_DATA = [
    {
      category: 'AI & Tech',
      title: 'The Future of AI in Digital Marketing',
      date: 'May 12, 2024',
      author: 'Alex Rivera · AI Strategist',
      readTime: '6 min read',
      cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
      url: 'future-of-ai-digital-marketing.html',
      paragraphs: [
        'Artificial Intelligence is no longer a speculative technology. In modern digital marketing, AI has shifted decisively from an optional luxury to an indispensable operational engine for ambitious brands.',
        'Today, high-performing enterprises leverage neural networks, real-time natural language processing, and deep predictive modeling to understand consumer intent at scales previously inconceivable.',
        'From personalized landing page copy to dynamic pricing adjustments and tailored creative variants, hyper-personalization reliably delivers a 35% to 50% increase in direct conversions.',
        'Integrating machine learning into your acquisition funnel, CRM workflows, and content ecosystem is the single most asymmetric growth lever available in 2026.'
      ]
    },
    {
      category: 'Social Media',
      title: '10 Tips for Effective Social Media Management',
      date: 'May 10, 2024',
      author: 'Sarah Chen · Omnichannel Lead',
      readTime: '7 min read',
      cover: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200',
      url: 'tips-social-media-management.html',
      paragraphs: [
        'Scaling social media in today’s noisy algorithmic environment requires meticulous systems, high-conviction creative output, and data-backed experimentation.',
        '1. Establish High-Intent Business KPIs: Map every initiative to tangible metrics — brand consideration, direct inquiries, or conversion rates.',
        '2. Operate on a Rolling 30-Day Content Architecture: Establish modular pillars scheduled systematically across a calendar.',
        '3. Favor Depth and Utility Over Volume: Three deeply researched, visually compelling assets outperform daily generic posts every time.',
        '4. Prioritize Short-Form Vertical Storytelling: Vertical video formats remain the most potent mechanism for organic discovery across Meta, TikTok, and YouTube Shorts.'
      ]
    },
    {
      category: 'Development',
      title: 'Building High-Performance Web Applications',
      date: 'May 08, 2024',
      author: 'Michael Smit · Lead Architect',
      readTime: '5 min read',
      cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
      url: 'high-performance-web-apps.html',
      paragraphs: [
        'Consumer patience is near zero. A latency delay of just 1,000 milliseconds cuts conversion rates by over 7% and increases bounce rates dramatically.',
        'Performance is not an optimization ticket at the end of a sprint — it is a fundamental business architecture that drives organic rankings and customer trust.',
        'Asset Compaction: Enforce modern WebP/AVIF compression and lazy-loading across all below-the-fold media to preserve bandwidth for critical render-path executions.',
        'Edge Distribution & Selective Hydration: Decouple client JavaScript bundles with dynamic imports and edge CDN routing to keep Interaction to Next Paint (INP) below 200ms.'
      ]
    }
  ];

  const backdrop = document.getElementById('blog-modal-backdrop');
  const closeBtn = document.getElementById('blog-modal-close');
  const bottomCloseBtn = document.getElementById('bm-close-btn');
  const fullLink = document.getElementById('bm-full-link');
  const catEl = document.getElementById('bm-category');
  const titleEl = document.getElementById('bm-title');
  const dateEl = document.getElementById('bm-date');
  const authorEl = document.getElementById('bm-author');
  const timeEl = document.getElementById('bm-time');
  const coverEl = document.getElementById('bm-cover');
  const contentEl = document.getElementById('bm-content');

  function openModal(idx) {
    const post = BLOG_DATA[idx];
    if (!post || !backdrop) return;

    if (catEl) catEl.textContent = post.category;
    if (titleEl) titleEl.textContent = post.title;
    if (dateEl) dateEl.textContent = post.date;
    if (authorEl) authorEl.textContent = post.author;
    if (timeEl) timeEl.textContent = post.readTime;
    if (coverEl) {
      coverEl.src = post.cover;
      coverEl.alt = post.title;
    }
    if (fullLink) fullLink.href = post.url;
    if (contentEl) {
      contentEl.innerHTML = post.paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    backdrop.classList.add('active');
  }

  function closeModal() {
    backdrop?.classList.remove('active');
  }

  document.querySelectorAll('.bsc-quick-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.article || '0');
      openModal(idx);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  bottomCloseBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();

