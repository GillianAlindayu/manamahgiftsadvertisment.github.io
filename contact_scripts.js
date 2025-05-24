// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupEventListeners();
    setupFormValidation();
    setActiveTab('contact'); // Set default tab
}

// Setup Event Listeners
function setupEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.textContent.toLowerCase().includes('contact') ? 'contact' : 'login';
            openTab(tabName);
        });
    });

    // Form submissions
    const contactForm = document.getElementById('contactForm');
    const loginForm = document.getElementById('loginForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Mobile menu toggle
    setupMobileMenu();
    
    // Form input enhancements
    setupFormInputs();
}

// Tab Management
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
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const activeButton = document.querySelector(`[onclick="openTab('${tabName}')"]`) || 
                        Array.from(tabButtons).find(btn => 
                            btn.textContent.toLowerCase().includes(tabName)
                        );
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function setActiveTab(tabName) {
    openTab(tabName);
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

function setupMobileMenu() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.getElementById('navLinks');
        const burger = document.querySelector('.burger');
        
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navbar.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Close mobile menu when clicking on nav links
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const navLinks = document.getElementById('navLinks');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
}

// Form Validation and Enhancement
function setupFormValidation() {
    // Real-time validation for email fields
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', validateEmail);
        input.addEventListener('input', clearValidationMessage);
    });
    
    // Real-time validation for required fields
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', validateRequired);
        input.addEventListener('input', clearValidationMessage);
    });
}

function setupFormInputs() {
    // Add floating label effect
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(input => {
        // Focus and blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Initialize focused state for pre-filled inputs
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Form Submission Handlers
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    setButtonLoading(submitBtn, true);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form and show success message
        form.reset();
        showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        setButtonLoading(submitBtn, false, originalText);
        
        // In a real application, you would make an API call here:
        // submitContactForm(data).then(response => { ... }).catch(error => { ... });
    }, 2000);
}

function handleLoginSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateLoginForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    setButtonLoading(submitBtn, true);
    
    // Simulate login attempt (replace with actual authentication)
    setTimeout(() => {
        // For demo purposes, show error message
        showMessage('Invalid credentials. Please check your email and password.', 'error');
        setButtonLoading(submitBtn, false, originalText);
        
        // In a real application, you would make an API call here:
        // authenticateUser(data).then(response => { ... }).catch(error => { ... });
    }, 2000);
}

// Form Validation Functions
function validateContactForm(data) {
    let isValid = true;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, `${capitalizeFirst(field)} is required`);
            isValid = false;
        }
    });
    
    // Validate email format
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function validateLoginForm(data) {
    let isValid = true;
    
    // Validate required fields
    if (!data.loginEmail || data.loginEmail.trim() === '') {
        showFieldError('loginEmail', 'Email is required');
        isValid = false;
    }
    
    if (!data.loginPassword || data.loginPassword.trim() === '') {
        showFieldError('loginPassword', 'Password is required');
        isValid = false;
    }
    
    // Validate email format
    if (data.loginEmail && !isValidEmail(data.loginEmail)) {
        showFieldError('loginEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function validateEmail(event) {
    const email = event.target.value;
    if (email && !isValidEmail(email)) {
        showFieldError(event.target.id, 'Please enter a valid email address');
    }
}

function validateRequired(event) {
    const value = event.target.value.trim();
    if (!value) {
        const fieldName = event.target.placeholder || 'This field';
        showFieldError(event.target.id, `${fieldName} is required`);
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    
    // Insert message at the top of active form
    const activeTab = document.querySelector('.tab-content.active');
    const formSection = activeTab.querySelector('.form-section');
    formSection.insertBefore(messageEl, formSection.firstChild);
    
    // Show message with animation
    setTimeout(() => {
        messageEl.classList.add('show');
    }, 100);
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

function showFieldError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Remove existing error styling and messages
    clearFieldError(fieldId);
    
    // Add error styling
    field.classList.add('error');
    field.style.borderColor = '#dc3545';
    field.style.backgroundColor = '#fff5f5';
    
    // Create and show error message
    const errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    errorEl.style.cssText = `
        color: #dc3545;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        margin-bottom: 0.5rem;
    `;
    errorEl.textContent = errorMessage;
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorEl, field.nextSibling);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Remove error styling
    field.classList.remove('error');
    field.style.borderColor = '';
    field.style.backgroundColor = '';
    
    // Remove error message
    const errorEl = field.parentNode.querySelector('.field-error');
    if (errorEl) {
        errorEl.remove();
    }
}

function clearValidationMessage(event) {
    clearFieldError(event.target.id);
}

function setButtonLoading(button, loading, originalText = 'Submit') {
    if (loading) {
        button.disabled = true;
        button.innerHTML = `
            <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <span style="width: 16px; height: 16px; border: 2px solid #ffffff40; border-top: 2px solid #ffffff; border-radius: 50%; animation: spin 1s linear infinite;"></span>
                Sending...
            </span>
        `;
        
        // Add spinner animation if not already added
        if (!document.querySelector('#spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-styles';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    } else {
        button.disabled = false;
        button.textContent = originalText;
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(event) {
    if (event.target.matches('a[href^="#"]')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle window resize for mobile menu
window.addEventListener('resize', function() {
    const navLinks = document.getElementById('navLinks');
    if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove('active');
    }
});

// Export functions for global access (if needed)
window.openTab = openTab;
window.toggleMenu = toggleMenu;