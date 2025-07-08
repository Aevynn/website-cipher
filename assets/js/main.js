document.addEventListener('DOMContentLoaded', function () {
  // ======== MOBILE MENU TOGGLE ========
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuBtn.classList.add('mobile-menu-btn');
  document.querySelector('nav .container').prepend(mobileMenuBtn);

  const navLinks = document.querySelector('.nav-links');
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // ======== SMOOTH SCROLLING ========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ======== SCROLLSPY ========
  const sections = document.querySelectorAll('section');
  const navMenuLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navMenuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ======== SCROLL REVEAL SECTION (.reveal-section) ========
  const revealSections = document.querySelectorAll('.reveal-section');

  const revealOnScroll = () => {
    revealSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      if (isVisible) {
        section.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ======== ANIMATED FEATURE SECTION (.feature-section) ========
  const animatedSections = document.querySelectorAll('.feature-section');

  function animateOnScroll() {
  animatedSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (!section.classList.contains('animate-fade-up') && rect.top < window.innerHeight - 100) {
      const type = section.dataset.animate || "fade-up";
      section.classList.add(`animate-${type}`);
    }
  });
}

  window.addEventListener('scroll', () => {
  hasScrolled = true;
  animateOnScroll();
});

  // ======== LAUNCH POPUP ========
  const popup = document.getElementById('launch-popup');
  const btnClose = document.getElementById('close-popup');
  let popupShown = false;

  function showPopupOnScroll() {
    if (!popupShown && window.scrollY > 100) {
      popup.classList.add('show');
      popupShown = true;
      window.removeEventListener('scroll', showPopupOnScroll);
    }
  }

  if (popup && btnClose) {
    window.addEventListener('scroll', showPopupOnScroll);
    btnClose.addEventListener('click', () => {
      popup.classList.remove('show');
    });
  }

  // ======== LOAD FOOTER FROM footer.html ========
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
      }
    });

  // ======== SEAT DISPLAY (for facilities page) ========
  if (document.getElementById('gaming-seats')) {
    updateSeatDisplay();
  }

  // ======== POINTS CALCULATOR (for pricing page) ========
  const hoursInput = document.getElementById('hours-input');
  if (hoursInput) {
    hoursInput.addEventListener('input', function (e) {
      const hours = e.target.value;
      const points = hours * 10;
      document.getElementById('points-output').textContent = points;

      const progress = Math.min((points / 100) * 100, 100);
      document.getElementById('points-progress').style.width = `${progress}%`;
    });
  }

  // ======== CONTACT FORM VALIDATION ========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      if (!email.includes('@')) {
        showAlert('Email tidak valid!', 'error');
        return;
      }
      showAlert('Pesan terkirim! Kami akan segera menghubungi Anda.', 'success');
      this.reset();
    });
  }
});

// ======== SEAT BOOKING SYSTEM ========
const seats = {
  gaming: [true, false, true, false, false, false, true, false],
  normal: [false, true, false, false, true, false, false, true]
};

function updateSeatDisplay() {
  const gamingSeatsContainer = document.getElementById('gaming-seats');
  const normalSeatsContainer = document.getElementById('normal-seats');

  gamingSeatsContainer.innerHTML = '';
  normalSeatsContainer.innerHTML = '';

  seats.gaming.forEach((seat, index) => {
    const seatElement = document.createElement('div');
    seatElement.className = seat ? 'seat occupied' : 'seat available';
    seatElement.innerHTML = seat
      ? `G${index + 1} <span>TERISI</span>`
      : `G${index + 1} <button onclick="bookSeat(${index}, 'gaming')">BOOK</button>`;
    gamingSeatsContainer.appendChild(seatElement);
  });

  seats.normal.forEach((seat, index) => {
    const seatElement = document.createElement('div');
    seatElement.className = seat ? 'seat occupied' : 'seat available';
    seatElement.innerHTML = seat
      ? `N${index + 1} <span>TERISI</span>`
      : `N${index + 1} <button onclick="bookSeat(${index}, 'normal')">BOOK</button>`;
    normalSeatsContainer.appendChild(seatElement);
  });
}

function bookSeat(index, type) {
  if (confirm(`Booking ${type.toUpperCase()} seat ${index + 1}?`)) {
    seats[type][index] = true;
    updateSeatDisplay();
  }
}

// ======== ALERT SYSTEM ========
function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert ${type}`;
  alertDiv.textContent = message;
  document.body.prepend(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
}

// ======== PAGE LOADER ========
window.addEventListener('load', function () {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
});
