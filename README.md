# Turki Alslamnah - Portfolio Website

A responsive personal portfolio website showcasing my Software Engineering projects and skills.



## Features

- ✅ Responsive design for all devices
- ✅ Dark/Light theme toggle with localStorage
- ✅ Smooth scrolling navigation
- ✅ Typing animation effect
- ✅ Contact form with real-time validation
- ✅ Mobile hamburger menu
- ✅ **NEW:** GitHub API integration with live repository display
- ✅ **NEW:** Error handling with loading states and retry mechanism
- ✅ **NEW:** Dynamic content loading from external API
## Technologies

- HTML5
- CSS3 (Grid, Flexbox, Variables)
- Vanilla JavaScript (ES6+)
- GitHub REST API
- LocalStorage API
- No external frameworks or libraries

## Project Structure

```
assignment-1/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── project1.jpg
│       └── project2.jpg
└── docs/
    ├── ai-usage-report.md
    └── technical-docs.md
```

## Local Setup

1. Clone repository
```bash
git clone https://github.com/turkialslamah/assignment-2
```

2. Navigate to folder
```bash
cd assignment-2
```

3. Open in browser
```bash
# Option 1: Double-click index.html

## Sections

## API Integration (NEW)

### GitHub Repository Display
- Fetches 6 most recent repositories from GitHub API
- Real-time data loading with async/await
- Comprehensive error handling:
  - Loading states during fetch
  - Network error detection
  - API rate limit handling
  - Empty state display
  - Retry mechanism for failed requests

**Endpoint:** `https://api.github.com/users/TurkiAlslamah/repos`

**Features:**
- Automatic repository sorting by last update
- Dynamic HTML generation
- Graceful error recovery
- User-friendly error messages
### About
- Personal introduction
- KFUPM student information
- Technical skills showcase

### Projects
- **Facility Reservation System** - Java-based booking system
- **University Tournament System** - SQL database application

### Contact
- Contact information
- Working contact form
- Form validation

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## AI Tools Used

- **Claude AI**: Project structure, problem-solving, coding, helping with understanding
- **ChatGPT**:  Create the prompt


See `docs/ai-usage-report.md` for detailed usage.

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Assignment Context

- **Course**: Web Development Fundamentals
- **Assignment**: Assignment 2 - Interactive Features
- **Weight**: 2% of final grade
- **Institution**: KFUPM
- **Due**: Week 9

## Author

**Turki Alslamah**  
Software Engineering Student  
King Fahd University of Petroleum & Minerals

- Email: turki.busnow@gmail.com
- GitHub: [turkialslamnah](https://github.com/turkialslamah)
- Location: Dammam, Saudi Arabia

## License

Educational project for KFUPM coursework.
