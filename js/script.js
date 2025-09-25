// Get DOM elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const greeting = document.getElementById('greeting');
const tagline = document.getElementById('tagline');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupTheme();
    setupGreeting();
    setupTypingEffect();
    setupMobileMenu();
    setupSmoothScroll();
    setupContactForm();
});

// Theme Toggle
function setupTheme() {
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Dynamic Greeting
function setupGreeting() {
    const hour = new Date().getHours();
    let greetingText;

    if (hour < 12) {
        greetingText = "Good morning!";
    } else if (hour < 17) {
        greetingText = "Good afternoon!";
    } else {
        greetingText = "Good evening!";
    }

    greeting.textContent = greetingText;
}

// Typing Effect
function setupTypingEffect() {
    const texts = [
        "Software Engineering Student",
        "Full-Stack Developer", 
        "Problem Solver",
        "Database Enthusiast"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            tagline.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            tagline.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, speed);
    }

    type();
}

// Mobile Menu
function setupMobileMenu() {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form
function setupContactForm() {
    contactForm.addEventListener('submit', handleSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => clearError(input));
    });
}

function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Validate all fields
    let isValid = true;
    isValid = validateInput(name) && isValid;
    isValid = validateInput(email) && isValid;
    isValid = validateInput(message) && isValid;
    
    if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showStatus('success', `Thank you, ${name.value}! Your message has been received.`);
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Clear any remaining error styling
            inputs.forEach(input => clearError(input));
        }, 2000);
    }
}

function validateInput(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById(input.name + '-error');
    let errorMessage = '';
    
    if (!value) {
        errorMessage = `${capitalize(input.name)} is required.`;
    } else if (input.type === 'email' && !isValidEmail(value)) {
        errorMessage = 'Please enter a valid email address.';
    } else if (input.name === 'message' && value.length < 10) {
        errorMessage = 'Message must be at least 10 characters long.';
    } else if (input.name === 'name' && value.length < 2) {
        errorMessage = 'Name must be at least 2 characters long.';
    }
    
    if (errorMessage) {
        showError(input, errorMessage);
        return false;
    } else {
        clearError(input);
        return true;
    }
}

function showError(input, message) {
    const errorElement = document.getElementById(input.name + '-error');
    errorElement.textContent = message;
    input.style.borderColor = '#ef4444';
}

function clearError(input) {
    const errorElement = document.getElementById(input.name + '-error');
    errorElement.textContent = '';
    input.style.borderColor = 'var(--border-color)';
}

function showStatus(type, message) {
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
    formStatus.style.display = 'block';
    
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

console.log('Portfolio loaded successfully! 👋');