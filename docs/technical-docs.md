# Technical Documentation

## Technical Features

### Dark/Light Theme Toggle
- Uses CSS custom properties (variables) for colors
- JavaScript toggles `data-theme` attribute on html element
- Theme preference saved in localStorage
- Button icon changes (🌙/☀️) based on current theme

### Responsive Design
- Mobile-first approach with CSS media queries
- Breakpoints: 768px (tablet), 480px (mobile)
- CSS Grid for projects layout
- Flexbox for navigation and buttons

### Navigation System
- Fixed navigation bar at top
- Smooth scrolling to sections using JavaScript
- Mobile hamburger menu that slides in from left
- Active section highlighting while scrolling

### Form Validation
- Real-time validation on input blur
- Email format checking with regex
- Error messages displayed below fields
- Form submission simulation with loading state

### Animations
- Typing effect for tagline text using setTimeout
- CSS keyframe animations for page load
- Hover effects on cards and buttons
- Smooth transitions (0.3s ease) throughout site

## File Structure

### HTML (index.html)
- Semantic HTML5 elements (nav, section, footer)
- Proper heading hierarchy (h1, h2, h3)
- Form with required attributes
- Alt text for images

### CSS (css/styles.css)
- CSS custom properties for theming
- CSS Grid for project cards layout
- Flexbox for navigation and form layout
- Media queries for responsive design

### JavaScript (js/script.js)
- DOM element selection and manipulation
- Event listeners for user interactions
- Form validation functions
- Theme toggle functionality
