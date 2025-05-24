// Toggle mobile navigation menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// Safe element querying
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (err) {
    console.warn(`Element "${selector}" not found:`, err);
    return null;
  }
}

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Copy text to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showNotification('Copied to clipboard!'));
  } else {
    const temp = document.createElement('textarea');
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    showNotification('Copied to clipboard!');
  }
}

// Show floating notification
function showNotification(message, type = 'success') {
  const note = document.createElement('div');
  note.className = `notification-${type}`;
  note.textContent = message;
  Object.assign(note.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? '#27ae60' : '#e74c3c',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    zIndex: 10000,
    transform: 'translateX(400px)',
    transition: 'transform 0.3s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  });

  document.body.appendChild(note);
  setTimeout(() => (note.style.transform = 'translateX(0)'), 100);
  setTimeout(() => {
    note.style.transform = 'translateX(400px)';
    setTimeout(() => document.body.removeChild(note), 300);
  }, 3000);
}

// IntersectionObserver for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      Object.assign(entry.target.style, {
        opacity: '1',
        transform: 'translateY(0)'
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

// Init on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav: Close on link click
  document.querySelectorAll('.nav-links a').forEach(link =>
    link.addEventListener('click', () =>
      document.getElementById('navLinks').classList.remove('active')
    )
  );

  // Mobile nav: Close on outside click
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('navLinks');
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link =>
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute('href').substring(1));
      if (target) {
        const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    })
  );

  // Animate elements into view
  document.querySelectorAll('.product-card, .about-text, .services-content').forEach(el => {
    Object.assign(el.style, {
      opacity: '0',
      transform: 'translateY(30px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease'
    });
    observer.observe(el);
  });

  // Lazy load images with data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          obs.unobserve(img);
        }
      });
    }).observe(img);
  });

  // Fade in fully loaded images
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => (img.style.opacity = '1'));
    }
  });

  // Contact copy-to-clipboard
  document.querySelectorAll('.contact-info p').forEach(p => {
    if (p.textContent.includes('@') || p.textContent.includes('+')) {
      p.style.cursor = 'pointer';
      p.title = 'Click to copy';
      p.addEventListener('click', () => {
        copyToClipboard(p.textContent.replace(/📧|📞|📍/g, '').trim());
      });
    }
  });

  // Hero video fallback
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      const hero = document.querySelector('.hero');
      hero.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      heroVideo.style.display = 'none';
    });
  }

  // Button interaction effects
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-3px) scale(1.02)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0) scale(1)');
    btn.addEventListener('mousedown', () => btn.style.transform = 'translateY(-1px) scale(0.98)');
    btn.addEventListener('mouseup', () => btn.style.transform = 'translateY(-3px) scale(1.02)');
  });

  // Product card hover animation
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px) rotateX(5deg)';
      card.style.boxShadow = '0 25px 60px rgba(0,0,0,0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0deg)';
      card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
  });

  // Optional preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => (preloader.style.display = 'none'), 500);
  }

  // Init info
  console.log('Al Manamah website initialized.');
  document.body.style.transition = 'opacity 0.3s ease';
  document.body.style.opacity = '1';
});

// Scroll-based effects
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const heroContent = document.querySelector('.hero-content');
  const heroVideo = document.querySelector('.hero-video');
  const scrollY = window.scrollY;

  if (navbar) {
    navbar.style.background = scrollY > 100 ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
    navbar.style.boxShadow = scrollY > 100 ? '0 2px 25px rgba(0,0,0,0.15)' : '0 2px 20px rgba(0,0,0,0.1)';
  }

  if (window.innerWidth > 768) {
    if (heroVideo) heroVideo.style.transform = `translateY(${scrollY * 0.5}px)`;
    if (heroContent) heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});

// Debounced scroll handler (e.g., parallax for About)
window.addEventListener('scroll', debounce(() => {
  const about = document.querySelector('.about');
  if (about && window.innerWidth > 768) {
    const offset = about.getBoundingClientRect().top + window.pageYOffset;
    const speed = (window.pageYOffset - offset + window.innerHeight) * 0.1;
    if (window.pageYOffset > offset - window.innerHeight) {
      about.style.backgroundPosition = `center ${speed}px`;
    }
  }
}, 10));
