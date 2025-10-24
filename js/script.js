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
    loadGitHubProjects();
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

// GitHub API with Error Handling
async function loadGitHubProjects() {
    const username = "TurkiAlslamah";
    const container = document.getElementById("github-projects");
    
    // Show loading state
    container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
            <p style="font-size: 1.2rem; color: var(--text-light);">⏳ Loading projects from GitHub...</p>
        </div>
    `;
    
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        // Check if response is ok
        if (!res.ok) {
            throw new Error(`GitHub API returned status ${res.status}`);
        }
        
        const repos = await res.json();
        
        // Check for empty state
        if (!repos || repos.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                    <p style="font-size: 1.2rem; color: var(--text-light);">📭 No projects found.</p>
                </div>
            `;
            return;
        }
        
        // Success - Display projects
        container.innerHTML = repos.map(repo => `
            <div class="project-card">
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : "No description available."}</p>
                <div style="margin-top: 1rem;">
                    <a href="${repo.html_url}" target="_blank" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">
                        🔗 View on GitHub
                    </a>
                </div>
            </div>
        `).join("");
        
    } catch (error) {
        // Error handling
        console.error('GitHub API Error:', error);
        
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p style="font-size: 1.2rem; color: #ef4444; margin-bottom: 1rem;">
                    ❌ Oops! Couldn't load GitHub projects.
                </p>
                <p style="color: var(--text-light); margin-bottom: 1.5rem;">
                    This might be due to network issues or API rate limits.
                </p>
                <button onclick="loadGitHubProjects()" class="btn primary">
                    🔄 Try Again
                </button>
            </div>
        `;
    }
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

// Contact Form - ALREADY HAS GOOD ERROR HANDLING ✅
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
        // Simulate form submission with loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showStatus('success', `Thank you, ${name.value}! Your message has been received.`);
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Clear any remaining error styling
            const inputs = contactForm.querySelectorAll('input, textarea');
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