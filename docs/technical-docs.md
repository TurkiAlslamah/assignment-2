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
- **NEW:** Loading spinner animation for API data fetching
- **NEW:** Card hover transform with translateY(-5px)
- **NEW:** Smooth fade-in for dynamically loaded content
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
- **NEW:** Async/await for API requests
- **NEW:** Try-catch error handling
- **NEW:** Dynamic content rendering with template literals
- **NEW:** Retry mechanism for failed API calls
- **NEW:** Loading state management

### GitHub API Integration
- Fetches live repository data from GitHub API
- Displays 6 most recently updated repositories
- Asynchronous data loading with async/await
- Dynamic HTML generation using template literals

#### Error Handling Implementation
- **Loading State:** Shows spinner with "Loading..." message during fetch
- **Try-Catch Block:** Captures network errors, API failures, and rate limits
- **Response Validation:** Checks HTTP status code before parsing JSON
- **Empty State:** Displays "No projects found" when API returns empty array
- **Error Display:** User-friendly error messages explaining what went wrong
- **Retry Mechanism:** Button allows users to retry failed requests without page refresh
- **Console Logging:** Errors logged to console for developer debugging

#### API Error Scenarios Handled
1. Network failure (no internet connection)
2. GitHub API rate limit exceeded (60 requests/hour)
3. Invalid username or API endpoint
4. Server errors (5xx responses)
5. Empty repository list
6. Malformed JSON responses

## API Integration Details

### Endpoint Used
```
GET https://api.github.com/users/{username}/repos
```

### Query Parameters
- `sort=updated` - Sorts repositories by last update date
- `per_page=6` - Limits results to 6 repositories

### Response Handling
1. **Before Request:** Display loading indicator
2. **Success (200):** Parse JSON and render project cards
3. **Client Error (4xx):** Show error message (invalid username, not found)
4. **Server Error (5xx):** Show error message (GitHub API down)
5. **Network Error:** Show error message (no internet connection)

### Data Displayed Per Repository
- Repository name
- Description (or "No description available")
- Link to GitHub repository
- Auto-generated from live API data

## Performance Considerations

### Optimization Techniques
- Limit API requests to 6 repos to reduce payload size
- Use async/await to prevent UI blocking
- Cache theme preference in localStorage (no repeated calculations)
- CSS transitions use GPU-accelerated properties (transform, opacity)
- Debouncing not needed for single API call on page load

### Error Recovery
- Retry button prevents need for full page refresh
- Failed API calls don't break rest of the site
- Graceful degradation if API is unavailable
- Console errors for developer debugging