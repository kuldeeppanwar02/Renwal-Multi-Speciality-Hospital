const fs = require('fs');
const js = `

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
`;
fs.appendFileSync('script.js', js, 'utf8');
