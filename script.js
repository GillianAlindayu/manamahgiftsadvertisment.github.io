// Mobile Navigation Toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileMenu = document.getElementById('navLinks');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    
    if (!navbar.contains(e.target) && !burger.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
});

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.product-card, .about-text, .services-content');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });
    }
  });
});

// Video fallback handling
document.addEventListener('DOMContentLoaded', function() {
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo) {
    heroVideo.addEventListener('error', function() {
      // If video fails to load, show a fallback background
      const hero = document.querySelector('.hero');
      hero.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      heroVideo.style.display = 'none';
    });
  }
});

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    button.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-3px) scale(1.02)';
    });
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroVideo = document.querySelector('.hero-video');
  const heroContent = document.querySelector('.hero-content');
  
  if (heroVideo && window.innerWidth > 768) {
    heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  
  if (heroContent && window.innerWidth > 768) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Product card hover effects
document.addEventListener('DOMContentLoaded', function() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) rotateX(5deg)';
      this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0deg)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
  });
});

// Form validation (if forms are added later)
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#e74c3c';
      isValid = false;
    } else {
      input.style.borderColor = '#ddd';
    }
  });
  
  return isValid;
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
  // Additional scroll-based animations can be added here
  const scrolled = window.pageYOffset;
  const aboutSection = document.querySelector('.about');
  
  if (aboutSection && window.innerWidth > 768) {
    const aboutOffset = aboutSection.getBoundingClientRect().top + window.pageYOffset;
    const parallaxSpeed = (scrolled - aboutOffset + window.innerHeight) * 0.1;
    
    if (scrolled > aboutOffset - window.innerHeight) {
      aboutSection.style.backgroundPosition = `center ${parallaxSpeed}px`;
    }
  }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preloader (optional - can be added to HTML)
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Copy to clipboard functionality (for contact info)
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Copied to clipboard!');
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('Copied to clipboard!');
  }
}

// Simple notification system
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add click handlers to contact info for copying
document.addEventListener('DOMContentLoaded', function() {
  const contactElements = document.querySelectorAll('.contact-info p');
  
  contactElements.forEach(element => {
    if (element.textContent.includes('@') || element.textContent.includes('+')) {
      element.style.cursor = 'pointer';
      element.title = 'Click to copy';
      
      element.addEventListener('click', function() {
        const text = this.textContent.replace(/📧|📞|📍/g, '').trim();
        copyToClipboard(text);
      });
    }
  });
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// Error handling for missing elements
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn(`Element with selector "${selector}" not found:`, error);
    return null;
  }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Al Manamah website loaded successfully!');
  
  // Add any initialization code here
  const hero = safeQuerySelector('.hero');
  if (hero) {
    hero.style.minHeight = '100vh';
  }
  
  // Initialize smooth transitions
  document.body.style.transition = 'opacity 0.3s ease';
  document.body.style.opacity = '1';
});