// Toggle mobile menu
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
  document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    
    if (!navbar.contains(event.target) && !burger.contains(event.target)) {
      mobileMenu.classList.remove('active');
    }
  });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar height
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    // If image is already loaded
    if (img.complete) {
      img.style.opacity = '1';
    }
  });
});

// Add intersection observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  const animateElements = document.querySelectorAll('.product-card, .about-text, .services-content');
  animateElements.forEach(el => {
    observer.observe(el);
  });
});