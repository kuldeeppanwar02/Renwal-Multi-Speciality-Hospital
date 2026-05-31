const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Mobile Contact Cards
let contactCardsMatch = html.match(/<div class="contact-cards reveal">([\s\S]*?)<\/div>\s*<div class="map-wrap/);
if (contactCardsMatch) {
  let desktopHTML = `<div class="contact-cards-desktop reveal">` + contactCardsMatch[1] + `</div>`;
  
  // Apple-inspired single list card for mobile
  let mobileHTML = `
        <div class="contact-cards-mobile reveal">
          <div class="mobile-contact-list">
            <h3 class="mcl-title">Get in Touch</h3>
            
            <a href="tel:0142429454" class="mcl-item">
              <div class="mcl-icon icon-blue">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.41 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006.18 6.18l1.27-.76a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <div class="mcl-text">
                <span class="mcl-label">OPD Helpline</span>
                <span class="mcl-value">01424-294545</span>
              </div>
            </a>
            
            <a href="tel:9928221653" class="mcl-item item-emergency">
              <div class="mcl-icon icon-red">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              </div>
              <div class="mcl-text">
                <span class="mcl-label text-red">Emergency</span>
                <span class="mcl-value text-red font-bold">99282 21653</span>
              </div>
            </a>
            
            <a href="https://wa.me/917375003128" target="_blank" class="mcl-item">
              <div class="mcl-icon icon-green">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </div>
              <div class="mcl-text">
                <span class="mcl-label text-green">WhatsApp</span>
                <span class="mcl-value">73750 03128</span>
              </div>
            </a>

          </div>
        </div>
`;

  html = html.replace(contactCardsMatch[0], desktopHTML + '\n' + mobileHTML + '        <div class="map-wrap');
} else {
  console.log('REGEX FAILED! contact-cards reveal not found!');
}

// 2. Hide FAB on mobile
html = html.replace(/class="fab-emergency"/, 'class="fab-emergency hide-on-mobile"');

// 3. Hide footer contact col on mobile
html = html.replace(/<div class="footer-col">\s*<h4 class="footer-col-title">Contact Info<\/h4>/, '<div class="footer-col hide-on-mobile">\n          <h4 class="footer-col-title">Contact Info</h4>');

// 4. Remove duplicate address from footer
html = html.replace(/<p>Chomu Road, Kishangarh Renwal, Jaipur, Rajasthan[^<]+303603<\/p>/, '');

fs.writeFileSync('index.html', html);
console.log('HTML updated');
