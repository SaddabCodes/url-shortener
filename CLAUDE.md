# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**URL Shortener** is a full-stack application with:
- **Backend**: Spring Boot 4.1.0 REST API (Java 25) with JWT authentication and MySQL persistence
- **Frontend**: Planned as a separate component (not yet implemented)

The backend handles user authentication, URL shortening logic, and REST endpoints. The frontend will be added as a separate component in the future.

## Project Structure

```
url-shortener/                           # Root (git repo)
├── README.md                            # Project overview
├── CLAUDE.md                            # This file
├── url-shortener-backend/               # Backend services
│   └── url-shortener/                   # Spring Boot application
│       ├── pom.xml                      # Maven configuration
│       ├── src/
│       │   ├── main/java/com/sadcodes/urlshortener/
│       │   │   ├── UrlShortenerApplication.java     # Entry point
│       │   │   ├── controller/          # REST endpoints
│       │   │   ├── services/            # Business logic & UserDetailsServiceImpl
│       │   │   ├── repository/          # Database access (JPA)
│       │   │   ├── model/               # JPA entities
│       │   │   ├── dto/                 # Data transfer objects (LoginRequest, RegisterRequest)
│       │   │   ├── security/            # Security configuration & JWT
│       │   │   │   ├── WebSecurityConfig.java       # Spring Security setup with AuthenticationManager bean
│       │   │   │   ├── jwt/             # JWT utilities and filters
│       │   │   │   └── UserDetailsImpl.java          # Custom UserDetails implementation
│       │   │   └── ...
│       │   ├── main/resources/application.yaml      # DB, JWT, Spring config
│       │   └── test/java/com/sadcodes/urlshortener/ # Tests
│       └── target/                      # Build output
```

**Note**: When adding a frontend in the future, create it in a sibling directory (e.g., `url-shortener-frontend/`) at the same level as `url-shortener-backend/`.

## Build & Development Commands

All commands are run from `url-shortener-backend/url-shortener/` directory.

### Maven Wrapper (No local Maven required)
- **Build**: `./mvnw clean package`
- **Run**: `./mvnw spring-boot:run`
- **Test**: `./mvnw test`
- **Single test**: `./mvnw test -Dtest=TestClassName`
- **Single test method**: `./mvnw test -Dtest=TestClassName#methodName`
- **Compile check**: `./mvnw clean compile`

### Project Setup
- First-time setup: Clone, then run `./mvnw spring-boot:run` — Maven wrapper handles all dependencies
- Server runs on `http://localhost:8080` by default
- **Database requirement**: MySQL running at `localhost:3306` with database named `url_shortener`

## Architecture Notes

### Spring Boot Configuration
- **Main class**: `com.sadcodes.urlshortener.UrlShortenerApplication` — entry point with `@SpringBootApplication`
- **Config**: `application.yaml` — MySQL datasource, JPA/Hibernate settings, JWT secret and expiration
- **Build tool**: Maven with Spring Boot parent POM (v4.1.0)

### Authentication & Security
- **JWT tokens**: Generated on login, validated on each request via `JwtAuthenticationFilter`
- **Password encoding**: BCrypt via `PasswordEncoder` bean
- **User details**: Loaded by `UserDetailsServiceImpl` implementing Spring's `UserDetailsService`
- **Security configuration**: `WebSecurityConfig` defines:
  - CSRF disabled for API endpoints
  - Public auth endpoints: `/api/auth/**`
  - Protected endpoints: `/api/urls`, `/{shortUrl}` (some require auth, some public)
  - JWT filter added before standard authentication filter
  - `AuthenticationManager` bean required for `UserService.authenticationUser()`

### Key Dependencies
- **Spring Security**: User authentication and authorization with JWT
- **Spring Data JPA**: Database access with Hibernate ORM
- **MySQL Connector**: JDBC driver for MySQL
- **JJWT**: JWT token generation and validation (io.jsonwebtoken)
- **Lombok**: Reduces boilerplate with `@Data`, `@RequiredArgsConstructor`, etc.

### Code Package Structure
- **com.sadcodes.urlshortener.controller**: REST endpoints
- **com.sadcodes.urlshortener.services**: Business logic (user auth, URL operations)
- **com.sadcodes.urlshortener.repository**: Spring Data JPA repositories (data access)
- **com.sadcodes.urlshortener.model**: JPA entities (User, Url, etc.)
- **com.sadcodes.urlshortener.dto**: Request/response DTOs
- **com.sadcodes.urlshortener.security**: Spring Security config, JWT utilities, custom UserDetails

## Dependency Injection Pattern

Use constructor injection with `@RequiredArgsConstructor` (Lombok):
```java
@Service
@RequiredArgsConstructor
public class MyService {
    private final SomeDependency dependency;
}
```

Avoid field injection (`@Autowired`) — it's less testable and harder to reason about.

## API Endpoints

### Authentication
- `POST /api/auth/public/login` — Login with username/password, returns JWT token in response
- `POST /api/auth/public/register` — Register new user

### Protected (Requires JWT)
- URLs starting with `/api/urls` — Protected by JWT filter

### Public
- `GET /{shortUrl}` — Redirect to original URL (no auth required)

## Commit Message Style

**Format**: `<type>(<scope>): <description>`

Examples:
- `feat(backend): implement user login endpoint with JWT authentication`
- `fix(backend): correct redirect logic`
- `docs: update README with frontend setup instructions`
- `chore: add gitignore entries`

When frontend is added in the future, use `(frontend)` scope for UI-related changes.

## Common Development Scenarios

### Adding a new REST endpoint
1. Create controller class in `src/main/java/com/sadcodes/urlshortener/controller/`
2. Use `@RestController` and `@RequestMapping` annotations
3. Add business logic to `services/` if needed
4. For protected endpoints, users must include JWT in `Authorization: Bearer <token>` header
5. Add tests in `src/test/java/com/sadcodes/urlshortener/`
6. Run `./mvnw test` to verify

### Adding dependencies
- Edit `pom.xml` in the `<dependencies>` section
- Maven wrapper will download them automatically on next build

### Debugging authentication issues
- Check `WebSecurityConfig` for endpoint permissions
- Verify `AuthenticationManager` bean is properly configured (required for login)
- Ensure `JwtAuthenticationFilter` is registered in the filter chain
- Check `application.yaml` for JWT secret and expiration values