// Navigation Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Tab Functionality
function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                company: document.getElementById('company').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            if (!isValidEmail(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            submitContactForm(formData);
        });
    }
    
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get login data
            const loginData = {
                email: document.getElementById('loginEmail').value.trim(),
                password: document.getElementById('loginPassword').value
            };
            
            // Validate required fields
            if (!loginData.email || !loginData.password) {
                showNotification('Please enter both email and password.', 'error');
                return;
            }
            
            // Validate email format
            if (!isValidEmail(loginData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate login
            submitLogin(loginData);
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Contact form submission simulation
function submitContactForm(formData) {
    const submitBtn = document.querySelector('#contactForm .submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // In a real application, you would send the data to your server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        
    }, 2000);
}

// Login submission simulation
function submitLogin(loginData) {
    const submitBtn = document.querySelector('#loginForm .submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Simulate login response
        if (loginData.email === 'demo@almanamahgifts.com' && loginData.password === 'demo123') {
            showNotification('Login successful! Redirecting to dashboard...', 'success');
            
            // In a real application, redirect to dashboard
            setTimeout(() => {
                // window.location.href = '/dashboard';
                showNotification('Demo mode: Dashboard redirect disabled', 'info');
            }, 1500);
        } else {
            showNotification('Invalid email or password. Please try again.', 'error');
        }
        
        // In a real application, you would authenticate with your server:
        // fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(loginData)
        // })
        
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 400px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                animation: slideIn 0.3s ease;
            }
            
            .notification-success {
                background: linear-gradient(135deg, #28a745, #20c997);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #dc3545, #e74c3c);
            }
            
            .notification-info {
                background: linear-gradient(135deg, #17a2b8, #20c997);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Form field animations
document.addEventListener('DOMContentLoaded', function() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on page load
        if (control.value.trim()) {
            control.parentElement.classList.add('focused');
        }
    });
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-button[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');
    
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    }
});

// Add loading animation to buttons
function addButtonLoadingState(button, loadingText = 'Loading...') {
    const originalText = button.textContent;
    const originalDisabled = button.disabled;
    
    button.textContent = loadingText;
    button.disabled = true;
    button.classList.add('loading');
    
    return function resetButton() {
        button.textContent = originalText;
        button.disabled = originalDisabled;
        button.classList.remove('loading');
    };
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Al Manamah Gifts Contact Page Loaded');
    
    // Set default tab if none is active
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) {
        openTab('contact');
    }
});