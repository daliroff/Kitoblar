# CodePath — Learn to Code for Free

A complete, fully client-side coding learning platform built with plain HTML, CSS, and JavaScript. No backend, no build tools — just open `index.html` and it works.

## Pages

| File | Description |
|---|---|
| `index.html` | Landing page — hero, features, course grid, roadmap |
| `register.html` | Registration form — saves visitor records to localStorage |
| `login.html` | Login form — validates against saved records |
| `course.html?id=<id>` | Course player — YouTube embed + lesson checklist |
| `dashboard.html` | User dashboard — progress, badges, profile |

## Courses (all free YouTube videos)

| ID | Title | Level | Duration | Source |
|---|---|---|---|---|
| `html-css` | HTML & CSS Fundamentals | Beginner | 12 hrs | freeCodeCamp |
| `python` | Python for Beginners | Beginner | 4.5 hrs | freeCodeCamp |
| `javascript` | JavaScript Essentials | Beginner | 7 hrs | freeCodeCamp |
| `git` | Git & GitHub | Beginner | 1 hr | freeCodeCamp |
| `react` | React.js | Intermediate | 11 hrs | freeCodeCamp |
| `nodejs` | Node.js & Express | Intermediate | 8 hrs | freeCodeCamp |

## Features

- **Introduction page** with animated typewriter code demo, feature highlights, and learning roadmap
- **Registration** — collects name, email, password, skill level, and goal; stored in `localStorage`
- **Login** — validates credentials, tracks daily login streak
- **Course player** — YouTube video embed with a clickable lesson curriculum sidebar
- **Progress tracking** — per-lesson checkboxes saved per user; progress bar updates live
- **Badges** — earned automatically when all lessons in a course are ticked off
- **Dashboard** — shows completed courses, total lessons done, badges earned, and streak
- **Responsive** — works on mobile, tablet, and desktop
- **Dark theme** — purple/cyan gradient design

## How to run

No server needed — just open the files directly:

```bash
# Option 1: open directly in browser
open index.html

# Option 2: serve locally (avoids any iframe restrictions)
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Data storage

All user data lives in the browser's `localStorage` under two keys:

- `codepath_users` — array of all registered user objects
- `codepath_user` — the currently logged-in user

Each user record looks like:

```json
{
  "id": "1718000000000",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "<base64-encoded>",
  "level": "Beginner",
  "goal": "Get a job",
  "joinedAt": "2024-06-01T10:00:00.000Z",
  "progress": {
    "html-css": [0, 1, 2, 5],
    "python": [0]
  },
  "badges": ["html-css"],
  "streak": 3,
  "lastVisit": "Sat Jun 01 2024"
}
```

## File structure

```
├── index.html          # Landing / introduction page
├── register.html       # Visitor registration
├── login.html          # Login
├── course.html         # Course player (URL param: ?id=<course-id>)
├── dashboard.html      # User dashboard
├── css/
│   └── style.css       # All styles (dark theme, responsive)
└── js/
    ├── app.js          # Shared: navbar, typewriter, counters, scroll reveal
    ├── auth.js         # Registration & login form logic
    ├── courses-data.js # COURSES constant — all course metadata & lessons
    ├── course.js       # Course player: video load, curriculum, progress
    └── dashboard.js    # Dashboard: stats, course cards, badges
```

## Learning path

1. HTML & CSS → 2. JavaScript → 3. Git & GitHub → 4. React.js → 5. Node.js → **Job ready**

Video content courtesy of [freeCodeCamp.org](https://www.youtube.com/@freecodecamp).
