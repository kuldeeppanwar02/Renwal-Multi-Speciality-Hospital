const fs = require('fs');

const jsCode = `
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
    
    // For right-scrolling tracks, start at the middle to allow scrolling left
    if (isScrollingRight) {
      marquee.scrollLeft = track.scrollWidth / 2;
    }

    function step() {
      if (!isHoveredOrTouched) {
        if (isScrollingRight) {
          marquee.scrollLeft -= scrollAmount;
          // If we reach the start, jump back to middle
          if (marquee.scrollLeft <= 0) {
            marquee.scrollLeft = track.scrollWidth / 2;
          }
        } else {
          marquee.scrollLeft += scrollAmount;
          // If we scrolled past half, reset to 0
          if (marquee.scrollLeft >= track.scrollWidth / 2) {
            marquee.scrollLeft = 0;
          }
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
`;

fs.appendFileSync('script.js', jsCode, 'utf8');
