/* ============================================
   RMH Hospital - JavaScript
   Interactions, Animations, Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
    updateBackToTop();
  }, { passive: true });


  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });


  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinkEls.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }


  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so it stays visible
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  // ===== COUNTER ANIMATION =====
  const statNums = document.querySelectorAll('.stat-num[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }


  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('back-to-top');

  function updateBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ===== DEPT CARD STAGGER =====
  const deptCards = document.querySelectorAll('.dept-card');
  deptCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
  });


  // ===== DOCTOR CARD HOVER TILT =====
  document.querySelectorAll('.doctor-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ===== DOCTOR MODAL =====
  const doctorData = {
    nishkarsh: {
      img: 'doctor/dr_nishkarsh.webp',
      name: 'Dr. Nishkarsh Mehta',
      qual: 'MCh Urology · 10+ Years Experience',
      title: 'Consultant Urologist & Kidney Transplant Surgeon',
      dept: 'Urology',
      deptColor: '#0ea5e9',
      timing: 'Mon–Sat: 4:00 PM – 8:00 PM',
      emergency: true,
      specs: ['Kidney Transplant', 'Ureteral Disorders', 'Bladder Conditions', 'Prostate Treatment', 'Minimally Invasive Urology'],
      bio: 'Dr. Mehta specializes in diagnosing and surgically treating diseases related to the kidneys, ureters, bladder, prostate, and male reproductive organs. He is particularly known for performing advanced minimally invasive urological procedures, which allow faster recovery and less postoperative pain for patients.'
    },
    rajesh: {
      img: 'doctor/dr_rajesh.webp',
      name: 'Dr. Rajesh Bochaliya',
      qual: 'MD (General Medicine) · 12+ Years Experience',
      title: 'Head of General Medicine & ICU Department',
      dept: 'General Medicine',
      deptColor: '#16a34a',
      timing: 'Mon–Sat: 10:00 AM – 6:00 PM',
      emergency: true,
      specs: ['Critical Care', 'ICU Management', 'Diabetes', 'Hypertension', 'Snake Bite', 'Respiratory Emergencies'],
      bio: 'Dr. Rajesh heads the General Medicine & ICU department at RMH. With a decade of experience in internal medicine and critical care, he manages patients with fever, infections, diabetes, hypertension, and severe ICU cases including ventilator-dependent patients.'
    },
    samota: {
      img: 'doctor/dr_r_p_samota.webp',
      name: 'Dr. R P Samota',
      qual: 'MS (Orthopaedics) · 12+ Years Experience',
      title: 'Senior Orthopaedic Surgeon & Trauma Specialist',
      dept: 'Orthopaedics',
      deptColor: '#d97706',
      timing: 'Mon–Sat: 4:00 PM – 8:00 PM',
      emergency: true,
      specs: ['Fracture Fixation', 'Joint Disorders', 'Trauma Surgery', 'Sports Injuries', 'ACL/PCL Repair'],
      bio: 'Dr. R P Samota is a senior orthopaedic surgeon with over 12 years of experience managing complex fractures, polytrauma, and joint diseases. He leads the Orthopaedics & Trauma department at RMH, providing city-level specialist care to patients of Kishangarh Renwal and surrounding areas.'
    },
    didel: {
      img: 'doctor/dr_ml_didel.webp',
      name: 'Dr. M L Didel',
      qual: 'MS (General Surgery) · 8+ Years Experience',
      title: 'General & Laparoscopic Surgeon',
      dept: 'Surgery',
      deptColor: '#e11d48',
      timing: 'Mon–Sat: 10:00 AM – 1:00 PM',
      emergency: true,
      specs: ['Laparoscopic Surgery', 'Hernia', 'Appendix', 'Gallbladder', 'Piles', 'Fissure & Fistula', 'Abdominal Trauma'],
      bio: 'Dr. Didel is an experienced general and laparoscopic surgeon skilled in both planned and emergency abdominal surgeries. He handles appendix, hernia, gallbladder, piles, fissure and fistula cases with a focus on minimal-access techniques and fast patient recovery.'
    },
    pankaj: {
      img: 'doctor/dr_pankaj.webp',
      name: 'Dr. Pankaj Saini',
      qual: 'DNB Anaesthesia — 5+ Years Experience',
      title: 'Consultant Anaesthetist & Critical Care',
      dept: 'Anaesthesia & Pain Management',
      deptColor: '#8b5cf6',
      timing: 'Daily OPD',
      emergency: true,
      specs: ['General & Regional Anaesthesia', 'Pain Management', 'Critical Care & ICU', 'Trauma Resuscitation'],
      bio: 'Dr. Pankaj Saini is a highly skilled anaesthesiologist and critical care specialist. He ensures patient safety during complex surgeries and manages the Intensive Care Unit (ICU), providing life-saving interventions for critically ill patients.'
    }
  };

  const modal = document.getElementById('doctor-modal');
  const modalClose = document.getElementById('modal-close');

  function openDoctorModal(doctorKey) {
    const d = doctorData[doctorKey];
    if (!d) return;

    // Fill modal content
    document.getElementById('modal-img').src = d.img;
    document.getElementById('modal-img').alt = d.name;
    document.getElementById('modal-name').textContent = d.name;
    document.getElementById('modal-qual').textContent = d.qual;
    document.getElementById('modal-title').textContent = d.title;
    document.getElementById('modal-timing').innerHTML = `
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      ${d.timing}
    `;

    // Badges
    const badges = document.getElementById('modal-badges');
    badges.innerHTML = `
      <div style="background:#f8fafc;border:1px solid ${d.deptColor};color:${d.deptColor};padding:4px 12px;border-radius:9999px;font-size:0.75rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">${d.dept}</div>
      ${d.emergency
        ? `<div style="display:flex;align-items:center;gap:6px;background:#fef2f2;border:1px solid #fecaca;color:#ef4444;padding:4px 10px;border-radius:9999px;font-size:0.7rem;font-weight:600;">
            <span style="width:6px;height:6px;background:#ef4444;border-radius:50%;flex-shrink:0;animation:pulse-ring 1.5s ease-out infinite;display:inline-block;"></span>
            Emergency 24×7
           </div>`
        : `<div style="display:flex;align-items:center;gap:6px;background:#f0f9ff;border:1px solid #bae6fd;color:#0284c7;padding:4px 10px;border-radius:9999px;font-size:0.7rem;font-weight:600;">Daily OPD</div>`
      }
    `;

    // Specializations
    const specTags = d.specs.map(s => `<span class="spec-tag">${s}</span>`).join('');
    document.getElementById('modal-specs').innerHTML = `
      <span class="spec-label">Specializations:</span>
      <div class="spec-tags">${specTags}</div>
    `;

    document.getElementById('modal-bio').textContent = d.bio;

    // Open modal
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
    modal.querySelector('.doctor-modal-box').scrollTop = 0;
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click on doctor card
  document.querySelectorAll('.doctor-card[data-doctor]').forEach(card => {
    card.addEventListener('click', () => {
      openDoctorModal(card.dataset.doctor);
    });
    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDoctorModal(card.dataset.doctor);
      }
    });
  });

  // Close button
  modalClose.addEventListener('click', closeModal);

  // Click outside modal box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });


  // ===== FACILITY CARD PULSE ON HOVER =====
  document.querySelectorAll('.facility-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.fac-icon');
      if (icon) {
        icon.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.2)' },
          { transform: 'scale(1.15)' }
        ], { duration: 300, easing: 'ease-out', fill: 'forwards' });
      }
    });
  });


  // ===== MAP LAZY LOAD =====
  const mapIframe = document.getElementById('hospital-map');
  if (mapIframe) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Map already has src; this ensures it loads when in view
          mapObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    mapObserver.observe(mapIframe);
  }


  // ===== PAGE LOAD ANIMATION =====
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
  // Fallback
  setTimeout(() => { document.body.style.opacity = '1'; }, 800);


  // ===== TYPING EFFECT FOR HERO TAGLINE (optional subtle) =====
  // Already handled by CSS animation


  // ===== DEPT CARDS REVEAL WITH DELAY =====
  const deptCardReveal = document.querySelectorAll('.dept-card.reveal');
  deptCardReveal.forEach((card, i) => {
    const delay = (parseInt(card.dataset.delay || 0)) * 0.1;
    card.style.transitionDelay = `${delay}s`;
  });


  // ===== DOCTOR CARDS REVEAL WITH DELAY =====
  document.querySelectorAll('.doctor-card.reveal').forEach((card) => {
    const delay = (parseInt(card.dataset.delay || 0)) * 0.1;
    card.style.transitionDelay = `${delay}s`;
  });


  // ===== PILLAR HOVER =====
  document.querySelectorAll('.pillar').forEach(pillar => {
    pillar.addEventListener('mouseenter', () => {
      pillar.querySelector('.pillar-icon').animate([
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(1.2) rotate(-8deg)' },
        { transform: 'scale(1.1) rotate(0deg)' }
      ], { duration: 400, easing: 'ease-out' });
    });
  });


  // ===== CONTACT CARD RIPPLE =====
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => { card.style.transform = ''; }, 120);
    });
  });


  // ===== GALLERY LIGHTBOX =====
  const lightboxOverlay = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCloseBtn = document.getElementById('lightbox-close');

  if (lightboxOverlay && lightboxImg && lightboxCloseBtn) {
    document.querySelectorAll('.gallery-marquee-card').forEach(card => {
      card.addEventListener('click', () => {
        const src = card.getAttribute('data-src');
        if (src) {
          lightboxImg.src = src;
          lightboxOverlay.classList.add('active');
        }
      });
    });

    const closeLightbox = () => {
      lightboxOverlay.classList.remove('active');
      setTimeout(() => { lightboxImg.src = ''; }, 400); // clear source after transition
    };

    lightboxCloseBtn.addEventListener('click', closeLightbox);
    
    // Close on clicking the dark overlay background
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) {
        closeLightbox();
      }
    });
  }

  console.log('%c🏥 RMH Website Loaded', 'color: #0ea5e9; font-size: 18px; font-weight: bold;');
  console.log('%cRenwal Multi-Speciality Hospital | Compassion. Expertise. Trust.', 'color: #64748b;');

});


// ===== DOCTOR SELECTION MODAL =====
const doctorModal = document.getElementById('doctor-selection-modal');
const doctorModalClose = document.getElementById('doctor-select-close');

window.openDoctorModal = function() {
  if (doctorModal) {
    doctorModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
};

window.closeDoctorModal = function() {
  if (doctorModal) {
    doctorModal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

if (doctorModalClose) {
  doctorModalClose.addEventListener('click', closeDoctorModal);
}

if (doctorModal) {
  doctorModal.addEventListener('click', (e) => {
    if (e.target === doctorModal) {
      closeDoctorModal();
    }
  });
}

// ===== SMART MARQUEE AUTO-SCROLLER =====
function setupAutoScrollers() {
  const marquees = document.querySelectorAll('.marquee-row');
  
  marquees.forEach(marquee => {
    const track = marquee.querySelector('.marquee-track') || marquee.querySelector('.track-reviews');
    if (!track) return;

    let isHoveredOrTouched = false;
    let resumeTimeout;
    
    // Speed of scroll (pixels per frame)
    let scrollAmount = 0.5; 
    
    // Determine direction based on class
    let isScrollingRight = track.classList.contains('track-right');
    
    // Duplicate content once more if it's very small, but html already has 2 sets
    
    // Remove the initial timeout jump. We handle it in the step loop seamlessly.

    function step() {
      if (!isHoveredOrTouched) {
        const items = track.children;
        const resetPoint = items.length > 1 ? (items[Math.floor(items.length / 2)].offsetLeft - track.offsetLeft) : (track.scrollWidth / 2);

        // Move the scroll
        if (isScrollingRight) {
          marquee.scrollLeft -= scrollAmount;
        } else {
          marquee.scrollLeft += scrollAmount;
        }

        // Seamless infinite loop bounds check (handles both manual swipe and auto scroll)
        if (marquee.scrollLeft >= resetPoint) {
          marquee.scrollLeft -= resetPoint;
        } else if (marquee.scrollLeft <= 0) {
          marquee.scrollLeft += resetPoint;
        }
      }
      requestAnimationFrame(step);
    }
    
    // Start animation loop
    requestAnimationFrame(step);
    
    // Interaction Handlers
    function pauseScroll() {
      isHoveredOrTouched = true;
      clearTimeout(resumeTimeout);
    }
    
    function resumeScroll() {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isHoveredOrTouched = false;
      }, 1500); // Resume 1.5 seconds after touch ends
    }
    
    // Mouse events (Desktop)
    marquee.addEventListener('mouseenter', pauseScroll);
    marquee.addEventListener('mouseleave', resumeScroll);
    marquee.addEventListener('mousedown', pauseScroll);
    marquee.addEventListener('mouseup', resumeScroll);
    
    // Touch events (Mobile)
    marquee.addEventListener('touchstart', pauseScroll, {passive: true});
    marquee.addEventListener('touchend', resumeScroll);
    
    // Trackpad/Mouse wheel events
    marquee.addEventListener('wheel', () => {
      pauseScroll();
      resumeScroll(); 
    }, {passive: true});
  });
}

// Call on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupAutoScrollers);
} else {
  setupAutoScrollers();
}


// --- QUICK BAR MOBILE MODAL LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
  const qmCallBtn = document.getElementById('qm-call-btn');
  const qmModal = document.getElementById('qm-call-modal');
  const qmCloseBtn = document.getElementById('qm-close-btn');

  if (qmCallBtn && qmModal && qmCloseBtn) {
    qmCallBtn.addEventListener('click', () => {
      qmModal.classList.add('active');
    });

    qmCloseBtn.addEventListener('click', () => {
      qmModal.classList.remove('active');
    });

    // Close on overlay click
    qmModal.addEventListener('click', (e) => {
      if (e.target === qmModal) {
        qmModal.classList.remove('active');
      }
    });
  }
});

// Doctor Carousel Pagination
document.addEventListener("DOMContentLoaded", () => {
  const doctorCards = document.querySelectorAll('.doctor-card');
  const indicators = document.querySelectorAll('#doctor-indicators .indicator');
  
  if (doctorCards.length > 0 && indicators.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(doctorCards).indexOf(entry.target);
          if (index !== -1 && indicators[index]) {
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[index].classList.add('active');
          }
        }
      });
    }, {
      root: document.querySelector('.doctors-grid'),
      threshold: 0.5
    });

    doctorCards.forEach(card => observer.observe(card));
  }
});
