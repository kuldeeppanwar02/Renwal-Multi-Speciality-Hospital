const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.contact-cards \{/g, '.contact-cards-desktop {');

const mobileCSS = `
/* --- MOBILE CONTACT LIST (NATIVE APP STYLE) --- */
.mobile-contact-list {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}
.mcl-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.mcl-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 8px;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  transition: background 0.2s ease;
  border-radius: 8px;
}
.mcl-item:last-child {
  border-bottom: none;
  padding-bottom: 8px;
}
.mcl-item:hover {
  background: #f8fafc;
}
.mcl-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.icon-blue {
  background: rgba(43, 107, 243, 0.1);
  color: var(--accent);
}
.icon-red {
  background: rgba(239, 68, 68, 0.1);
  color: var(--red-emg);
}
.icon-green {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}
.mcl-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mcl-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.mcl-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--navy);
}
.text-red { color: var(--red-emg) !important; }
.text-green { color: #16a34a !important; }

@media (min-width: 769px) {
  .contact-cards-mobile { display: none !important; }
}

@media (max-width: 768px) {
  .contact-cards-desktop { display: none !important; }
  .hide-on-mobile { display: none !important; }
}
`;

fs.writeFileSync('style.css', css + '\n' + mobileCSS);
console.log('CSS updated');
