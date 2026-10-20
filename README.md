# Linklytics URL Shortener

Linklytics is a full-stack URL shortener that helps users create, manage, share, and monitor short links from a simple web interface. The project combines a React frontend with a Spring Boot backend and a persistent relational database.

## About the Project

The application allows registered users to turn long URLs into compact links that are easier to share. Each user has a private dashboard for managing their links and reviewing engagement over time. When a short link is opened, the backend redirects the visitor to the original URL and records the click for analytics.

## Features

- User registration and login
- JWT-based authentication for protected features
- Secure password handling with Spring Security
- Create unique eight-character short URLs
- View and manage links created by the signed-in user
- Copy and share shortened URLs from the frontend
- Redirect short URLs to their original destinations
- Track total clicks for each shortened URL
- Record click events with timestamps
- View click activity for selected date ranges
- Dashboard charts for overall link engagement
- Automatic dashboard refresh when the application regains focus
- Responsive React interface with landing, about, login, registration, dashboard, and error pages
- Dedicated short-link routing for direct redirect access

## Technology

### Frontend

- React
- Vite
- React Router
- Axios
- Material UI and Tailwind CSS
- Chart.js with React Chart.js 2
- React Hook Form
- Framer Motion

### Backend

- Java 25
- Spring Boot
- Spring Web MVC
- Spring Data JPA and Hibernate
- Spring Security
- JSON Web Tokens with JJWT
- Lombok
- PostgreSQL runtime support

## Project Structure

- `url-shortener-frontend/url-shortener/` — React and Vite web application
- `url-shortener-backend/url-shortener/` — Spring Boot REST API, authentication, persistence, redirect handling, and analytics

## Application Flow

1. A user creates an account or signs in.
2. The authenticated user creates a short link from the dashboard.
3. The backend stores the original URL, generated short code, owner, and creation time.
4. Visitors opening the short code are redirected to the original URL.
5. Each redirect increments the link counter and stores a click event.
6. The dashboard presents the user’s links and aggregated click activity.
