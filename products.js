// Mobile Navigation Toggle with enhanced animation
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const burger = document.querySelector('.burger');
  
  navLinks.classList.toggle('active');
  burger.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (navLinks.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close mobile menu when clicking on a nav link
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const navLinksContainer = document.getElementById('navLinks');
  const burger = document.querySelector('.burger');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
});

// Performance optimization: Preload critical images
document.addEventListener('DOMContentLoaded', function() {
  const criticalImages = [
    'Explore more gifts.jpg',
    'products3.jpg',
    'products2.jpg',
    'products4.jpg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
});

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', function() {
  // Add loading animation on page load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  window.addEventListener('load', function() {
    document.body.style.opacity = '1';
  });
  
  // Add transition for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"], a[href^="./"], a[href^="/"]');
  
  internalLinks.forEach(link => {
    if (link.getAttribute('href').startsWith('#')) return; // Skip anchor links
    
    link.addEventListener('click', function(e) {
      if (this.hostname === window.location.hostname) {
        document.body.style.opacity = '0.7';
        setTimeout(() => {
          window.location.href = this.href;
        }, 200);
      }
    });
  });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Adjust based on your navbar height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Enhanced product card animations and effects
document.addEventListener('DOMContentLoaded', function() {
  const productCards = document.querySelectorAll('.product-card');
  
  // Enhanced intersection observer for staggered animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for sequential animation
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 150);
      }
    });
  }, observerOptions);
  
  productCards.forEach((card, index) => {
    observer.observe(card);
    
    // Enhanced hover effects with multiple event listeners
    card.addEventListener('mouseenter', function() {
      this.classList.add('hovered');
      // Add subtle parallax effect to image
      const img = this.querySelector('.product-image');
      if (img && img.tagName === 'IMG') {
        img.style.transform = 'scale(1.05) translateY(-5px)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hovered');
      const img = this.querySelector('.product-image');
      if (img && img.tagName === 'IMG') {
        img.style.transform = '';
      }
    });
    
    // Add click animation effect
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
    
    // Add keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});

// Enhanced video management with performance optimization
document.addEventListener('DOMContentLoaded', function() {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    // Set initial video properties
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    
    // Enhanced video observer with performance optimization
    const videoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add small delay to prevent multiple rapid plays
          setTimeout(() => {
            if (video.paused) {
              video.play().catch(e => {
                console.warn('Video autoplay failed:', e);
              });
            }
          }, 100);
        } else {
          video.pause();
          // Reset video to beginning when not visible for better UX
          video.currentTime = 0;
        }
      });
    }, { 
      threshold: 0.3,
      rootMargin: '50px'
    });
    
    videoObserver.observe(video);
    
    // Add loading state
    video.addEventListener('loadstart', function() {
      this.classList.add('loading');
    });
    
    video.addEventListener('canplay', function() {
      this.classList.remove('loading');
      this.classList.add('loaded');
    });
    
    // Error handling for videos
    video.addEventListener('error', function() {
      this.classList.add('error');
      console.warn('Video failed to load:', this.src);
    });
    
    // Pause video when tab is not visible (performance optimization)
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        video.pause();
      }
    });
  });
});

// Enhanced image loading with lazy loading and error handling
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.product-image');
  
  images.forEach(img => {
    if (img.tagName === 'IMG') {
      // Add loading placeholder
      img.style.backgroundColor = 'rgba(120, 183, 255, 0.1)';
      
      // Create intersection observer for lazy loading optimization
      const imgObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            
            // Load image
            if (image.dataset.src) {
              image.src = image.dataset.src;
            }
            
            image.addEventListener('load', function() {
              this.classList.add('loaded');
              this.style.backgroundColor = '';
              // Add subtle fade-in effect
              this.style.opacity = '0';
              setTimeout(() => {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
              }, 50);
            });
            
            // Enhanced error handling with retry mechanism
            image.addEventListener('error', function() {
              this.classList.add('error');
              this.style.backgroundColor = 'rgba(120, 183, 255, 0.1)';
              
              // Create error placeholder
              const errorDiv = document.createElement('div');
              errorDiv.innerHTML = '🖼️ Image unavailable';
              errorDiv.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #78b7ff;
                font-size: 0.9rem;
                text-align: center;
              `;
              
              if (this.parentNode.style.position !== 'relative') {
                this.parentNode.style.position = 'relative';
              }
              this.parentNode.appendChild(errorDiv);
              
              console.warn('Failed to load image:', this.src);
            });
            
            imgObserver.unobserve(image);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '100px'
      });
      
      imgObserver.observe(img);
    }
  });
});

// Enhanced navbar scroll effect with throttling
let scrollTimeout;
window.addEventListener('scroll', function() {
  // Throttle scroll events for better performance
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(function() {
      const navbar = document.querySelector('.navbar');
      
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      scrollTimeout = null;
    }, 16); // ~60fps
  }
});

// Add scroll-to-top functionality
function addScrollToTop() {
  const scrollButton = document.createElement('button');
  scrollButton.innerHTML = '↑';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(45deg, #78b7ff, #4f88d6);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(120, 183, 255, 0.3);
  `;
  
  scrollButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Show/hide scroll button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollButton.style.opacity = '1';
      scrollButton.style.visibility = 'visible';
    } else {
      scrollButton.style.opacity = '0';
      scrollButton.style.visibility = 'hidden';
    }
  });
  
  document.body.appendChild(scrollButton);
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Enhanced click outside and keyboard navigation
document.addEventListener('click', function(e) {
  const navLinks = document.getElementById('navLinks');
  const burger = document.querySelector('.burger');
  const navbar = document.querySelector('.navbar');
  
  if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Enhanced keyboard navigation with better accessibility
document.addEventListener('keydown', function(e) {
  const navLinks = document.getElementById('navLinks');
  const burger = document.querySelector('.burger');
  
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    burger.classList.remove('active');
    document.body.style.overflow = '';
    burger.focus(); // Return focus to burger for accessibility
  }
  
  // Add keyboard shortcut for quick navigation
  if (e.altKey && e.key === 'm') {
    e.preventDefault();
    toggleMenu();
  }
});

// Add focus management for better keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const burger = document.querySelector('.burger');
  
  // Trap focus within mobile menu when open
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('navLinks').classList.contains('active')) return;
    
    if (e.key === 'Tab') {
      const focusableElements = [burger, ...navLinks];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
});