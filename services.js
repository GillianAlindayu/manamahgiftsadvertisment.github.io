// Mobile Navigation Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');
    
    navLinks.classList.toggle('active');
    
    // Animate burger icon
    if (navLinks.classList.contains('active')) {
        burger.innerHTML = '✕';
        burger.style.transform = 'rotate(90deg)';
    } else {
        burger.innerHTML = '☰';
        burger.style.transform = 'rotate(0deg)';
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mobileMenu.classList.remove('active');
                burger.innerHTML = '☰';
                burger.style.transform = 'rotate(0deg)';
            }
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');
    const navbar = document.querySelector('.navbar');
    
    if (!navbar.contains(event.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.innerHTML = '☰';
        burger.style.transform = 'rotate(0deg)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(4, 13, 86, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(4, 13, 86, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Service card animation on scroll
function animateOnScroll() {
    const serviceCards = document.querySelectorAll('.service-card');
    const windowHeight = window.innerHeight;
    
    serviceCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < windowHeight - 100) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Initialize cards as hidden for scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Trigger animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Contact information click to copy functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactValues = document.querySelectorAll('.contact-value');
    
    contactValues.forEach(contactValue => {
        contactValue.style.cursor = 'pointer';
        contactValue.title = 'Click to copy';
        
        contactValue.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            // Try to use the modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopyFeedback(this);
                }).catch(() => {
                    fallbackCopy(text, this);
                });
            } else {
                fallbackCopy(text, this);
            }
        });
    });
});

// Fallback copy function for older browsers
function fallbackCopy(text, element) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(element);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy feedback
function showCopyFeedback(element) {
    const originalText = element.textContent;
    element.textContent = 'Copied!';
    element.style.color = '#27ae60';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = '';
    }, 1500);
}

// Add hover effects to service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Resize handler for mobile menu
window.addEventListener('resize', function() {
    const navLinks = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');
    
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        burger.innerHTML = '☰';
        burger.style.transform = 'rotate(0deg)';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger service cards animation after page load
    setTimeout(() => {
        animateOnScroll();
    }, 300);
});

// Preload important images
function preloadImages() {
    const images = ['logo.jpg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add scroll-to-top functionality (optional)
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top
document.addEventListener('DOMContentLoaded', addScrollToTop);