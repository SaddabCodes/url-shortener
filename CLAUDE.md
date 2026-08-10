# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**URL Shortener** is a full-stack application with:
- **Backend**: Spring Boot 4.1.0 REST API (Java 25)
- **Frontend**: Planned as a separate component (not yet implemented)

The backend handles URL shortening logic and API endpoints. The frontend will be added as a separate component in the future.

## Project Structure

```
url-shortener/                           # Root (git repo)
├── README.md                            # Project overview
├── url-shortener-backend/               # Backend services
│   └── url-shortener/                   # Spring Boot application
│       ├── pom.xml                      # Maven configuration
│       ├── src/
│       │   ├── main/java/com/sadcodes/urlshortener/  # Application code
│       │   └── main/resources/application.yaml       # Configuration
│       └── src/test/java/com/sadcodes/urlshortener/  # Tests
```

**Note**: When adding a frontend in the future, create it in a sibling directory (e.g., `url-shortener-frontend/`) at the same level as `url-shortener-backend/`.

## Build & Development Commands

All commands are run from `url-shortener-backend/url-shortener/` directory.

### Maven Wrapper (No local Maven required)
- **Build**: `./mvnw clean package`
- **Run**: `./mvnw spring-boot:run`
- **Test**: `./mvnw test`
- **Single test**: `./mvnw test -Dtest=TestClassName`
- **Lint/Compile check**: `./mvnw clean compile`

### Project Setup
- First-time setup: Just clone and run `./mvnw spring-boot:run` — Maven wrapper handles dependencies
- Server runs on `http://localhost:8080` by default

## Architecture Notes

### Spring Boot Configuration
- **Main class**: `com.sadcodes.urlshortener.UrlShortenerApplication` — entry point with `@SpringBootApplication`
- **Config**: `application.yaml` — application name and Spring properties
- **Build tool**: Maven with Spring Boot parent POM (v4.1.0)

### Dependencies
- **Spring Web MVC**: REST endpoint support
- **Lombok**: Boilerplate reduction (`@Getter`, `@Setter`, etc.)
- **Testing**: Spring Boot test starter

### Code Package Structure
- Package: `com.sadcodes.urlshortener` — root namespace for all application code

## Commit Message Style

For a full-stack project, commit messages should clarify which component is affected:

**Format**: `<type>(<scope>): <description>`

Examples:
- `feat(backend): add URL shortening endpoint`
- `fix(backend): correct redirect logic`
- `docs: update README with frontend setup instructions`
- `chore: add gitignore entries`

When frontend is added in the future, use `(frontend)` scope for UI-related changes.

## Common Development Scenarios

### Adding a new REST endpoint
1. Create controller class in `src/main/java/com/sadcodes/urlshortener/`
2. Use `@RestController` and `@RequestMapping` annotations
3. Add corresponding tests in `src/test/java/com/sadcodes/urlshortener/`
4. Run `./mvnw test` to verify

### Adding dependencies
- Edit `pom.xml` in the `<dependencies>` section
- Maven wrapper will download them automatically on next build

### Running specific tests
- By class: `./mvnw test -Dtest=MyTestClass`
- By method: `./mvnw test -Dtest=MyTestClass#myMethod`