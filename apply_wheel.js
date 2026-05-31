const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const oldPillarsHTML = `<div class="about-pillars reveal delay-3">
        <div class="pillar">
          <div class="pillar-icon" style="color: #ef4444; background: rgba(239, 68, 68, 0.1);">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <div class="pillar-text">
            <strong>Compassion</strong>
            <p>Every patient is family</p>
          </div>
        </div>
        <div class="pillar">
          <div class="pillar-icon" style="color: #f59e0b; background: rgba(245, 158, 11, 0.1);">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
          </div>
          <div class="pillar-text">
            <strong>Expertise</strong>
            <p>Specialist doctors, modern tech</p>
          </div>
        </div>
        <div class="pillar">
          <div class="pillar-icon" style="color: #10b981; background: rgba(16, 185, 129, 0.1);">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div class="pillar-text">
            <strong>Trust</strong>
            <p>Transparent, affordable care</p>
          </div>
        </div>
      </div>`;

const singleGroup = `
          <div class="pillar">
            <div class="pillar-icon" style="color: #ef4444; background: rgba(239, 68, 68, 0.1);">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <div class="pillar-text">
              <strong>Compassion</strong>
              <p>Every patient is family</p>
            </div>
          </div>
          <div class="pillar">
            <div class="pillar-icon" style="color: #f59e0b; background: rgba(245, 158, 11, 0.1);">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </div>
            <div class="pillar-text">
              <strong>Expertise</strong>
              <p>Specialist doctors, modern tech</p>
            </div>
          </div>
          <div class="pillar">
            <div class="pillar-icon" style="color: #10b981; background: rgba(16, 185, 129, 0.1);">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="pillar-text">
              <strong>Trust</strong>
              <p>Transparent, affordable care</p>
            </div>
          </div>`;

const newPillarsHTML = `<div class="about-pillars reveal delay-3">
        <div class="about-pillars-track">
          <div class="pillars-group">
${singleGroup}
          </div>
          <div class="pillars-group mobile-duplicate">
${singleGroup}
          </div>
        </div>
      </div>`;

if (html.includes(oldPillarsHTML)) {
  html = html.replace(oldPillarsHTML, newPillarsHTML);
  fs.writeFileSync('index.html', html);
  console.log('HTML updated.');
} else {
  console.log('Could not find old pillars HTML.');
}

// 2. Update style.css
let css = fs.readFileSync('style.css', 'utf8');

// Replace .about-pillars in Desktop CSS
const oldAboutPillarsCSS = `.about-pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}`;

const newAboutPillarsCSS = `.about-pillars {
  margin-top: 48px;
}
.about-pillars-track {
  display: flex;
  flex-direction: column;
}
.pillars-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.mobile-duplicate {
  display: none !important;
}`;

if (css.includes(oldAboutPillarsCSS)) {
  css = css.replace(oldAboutPillarsCSS, newAboutPillarsCSS);
} else {
  console.log('Could not find .about-pillars in CSS.');
}

// Replace in Mobile CSS
const oldMobileCSS = `.about-pillars { grid-template-columns: 1fr; }`;
const newMobileCSS = `/* Vertical Rolling 3D Wheel Effect for Pillars */
  .about-pillars { 
    height: 130px; 
    overflow: hidden; 
    position: relative;
    mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
    margin-top: 32px;
  }
  .about-pillars-track {
    display: flex;
    flex-direction: column;
    animation: scroll-vertical 10s linear infinite;
  }
  .about-pillars-track:hover {
    animation-play-state: paused;
  }
  .pillars-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 12px; /* same as gap for seamless loop */
  }
  .mobile-duplicate {
    display: flex !important;
  }
  .pillar {
    margin: 0;
    padding: 16px;
  }`;

if (css.includes(oldMobileCSS)) {
  css = css.replace(oldMobileCSS, newMobileCSS);
} else {
  console.log('Could not find .about-pillars in Mobile CSS.');
}

// Add keyframes at the end of the file
const keyframesCSS = `
@keyframes scroll-vertical {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
`;
if (!css.includes('scroll-vertical')) {
  css += keyframesCSS;
}

fs.writeFileSync('style.css', css);
console.log('CSS updated.');
