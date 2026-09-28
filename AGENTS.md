# Repository Guidelines

## Project Structure

This is a full-stack URL shortener repository:

- `url-shortener-backend/url-shortener/` contains the Spring Boot API, Maven build, MySQL configuration, and Java tests.
- Backend packages under `src/main/java/com/sadcodes/urlshortener/` are organized into `controller`, `services`, `repository`, `model`, `dto`, and `security` (including JWT support).
- `url-shortener-frontend/url-shortener/` contains the React/Vite UI. Source lives in `src/`, static assets in `public/`, and reusable UI pieces in `src/components/`.
- HTTP examples are in `url-shortener-backend/url-shortener/http-request/`.

## Build, Test, and Development Commands

Run backend commands from `url-shortener-backend/url-shortener/`:

```text
./mvnw spring-boot:run   # start the API on port 8080
./mvnw test              # run backend tests
./mvnw clean package     # create a production build
```

Run frontend commands from `url-shortener-frontend/url-shortener/`:

```text
npm run dev              # start the Vite development server
npm run build            # create the production bundle
npm run lint             # run ESLint
```

The backend expects MySQL and the settings in `src/main/resources/application.yaml`; never commit real credentials or JWT secrets.

## Coding Style & Naming

Use four-space indentation for Java and the existing two-space style for JSX/CSS. Keep Java classes in the package matching their directory and use PascalCase for classes, camelCase for methods and variables, and descriptive DTO names such as `LoginRequest`. Prefer constructor injection with Lombok `@RequiredArgsConstructor`; avoid field injection. React components use PascalCase filenames and exports. Run `npm run lint` before frontend changes are submitted.

## Testing Guidelines

Backend tests use Spring Boot’s test support and JUnit conventions under `src/test/java/`. Name test classes with the `Tests` suffix and run a focused test with `./mvnw test -Dtest=ClassName`. Add coverage for new endpoints, authentication behavior, redirects, and persistence changes. The frontend currently has no test suite; at minimum run lint and a production build.

## Commit & Pull Requests

Use Conventional Commit-style messages with an optional scope, for example `feat(backend): add click analytics` or `fix(frontend): correct font loading`. Keep commits focused. Pull requests should describe behavior changes, list validation commands, link related issues, and include screenshots or a short recording for UI changes. Call out database, configuration, or API contract changes explicitly.
