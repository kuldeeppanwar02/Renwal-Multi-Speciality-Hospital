const fs = require('fs');
const css = `
/* ===== DOCTOR SELECTION MODAL ===== */
.modal-overlay#doctor-selection-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(19, 49, 58, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.modal-overlay#doctor-selection-modal.active {
  opacity: 1;
  pointer-events: auto;
}

.modal-content.doctor-select-content {
  background: var(--surface);
  border-radius: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(20px) scale(0.95);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-overlay#doctor-selection-modal.active .modal-content.doctor-select-content {
  transform: translateY(0) scale(1);
}

.modal-header-centered {
  text-align: center;
  margin-bottom: 24px;
}

.modal-header-centered h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent-strong);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.modal-header-centered p {
  color: rgba(19, 49, 58, 0.7);
  font-size: 0.95rem;
}

.doctor-select-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.doc-select-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(12, 86, 81, 0.1);
  text-decoration: none;
  transition: all 0.2s ease;
}

.doc-select-card:hover {
  background: rgba(15, 107, 99, 0.04);
  border-color: rgba(15, 107, 99, 0.2);
  transform: translateY(-2px);
}

.doc-select-card img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  background: #f0f4f4;
}

.doc-select-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-strong);
  margin-bottom: 2px;
}

.doc-select-info span {
  font-size: 0.85rem;
  color: rgba(19, 49, 58, 0.6);
  font-weight: 500;
}

@media (max-width: 768px) {
  .modal-content.doctor-select-content {
    padding: 24px;
    width: 95%;
  }
}
`;
fs.appendFileSync('style.css', css, 'utf8');
