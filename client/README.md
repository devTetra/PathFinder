# PathFinder 2.0 — Client

The PathFinder client is the frontend application for PathFinder 2.0.

It provides the user-facing interface for taking the career assessment, viewing results, exploring career profiles, and sharing assessment results.

## Responsibilities

The client is responsible for:

- Rendering the user interface
- Displaying assessment questions
- Managing assessment interaction
- Validating user selections
- Submitting assessment responses
- Displaying assessment progress
- Displaying assessment results
- Presenting career matches
- Displaying career profiles
- Rendering career illustrations
- Providing result-sharing functionality
- Handling client-side routing
- Managing loading and error states
- Providing responsive layouts

The client should not contain the authoritative career-matching algorithm. Score calculation and career matching are handled by the server.

## Technology Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Lucide React

## Application Structure

The client is organized around application responsibilities rather than a large number of unnecessary abstractions.

A high-level structure is:

```text
client/
│
├── public/
│   └── images/
│       └── careers/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── .env
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

The exact structure may evolve during development.

## Main Pages

The application is expected to contain the following major pages:

### Home

Introduces PathFinder and allows the user to begin the assessment.

### Assessment

Contains the 20-question RIASEC assessment.

The assessment should:

- Display one question at a time
- Display exactly five options
- Track progress
- Prevent invalid submissions
- Allow navigation where appropriate
- Submit the completed responses to the server

### Results

Displays the user's assessment profile and career matches.

The results page may contain:

- Overall assessment summary
- RIASEC dimension scores
- Strongest dimensions
- Top career matches
- Career profile
- Share functionality
- Retake assessment action

### Careers

Displays all supported career fields.

Users can browse the available career profiles without taking the assessment.

### Career Profile

Displays detailed information about a specific career.

A profile can contain:

- Career name
- Description
- Illustration
- RIASEC profile
- Career dimensions
- Additional career information

## Assessment State

Assessment answers should be maintained on the client while the user progresses through the questionnaire.

The client should submit the completed answers to the server rather than calculating the authoritative result itself.

This prevents the frontend from becoming the source of truth for the assessment algorithm.

## API Communication

API requests should be isolated from UI components through service functions.

For example:

```text
pages
  ↓
hooks
  ↓
services
  ↓
API
```

Components should not contain large blocks of direct HTTP logic.

## Server State

TanStack Query can be used for server state such as:

- Questions
- Careers
- Assessment submission
- Results
- Career profiles

Local UI state should remain local when it does not need server synchronization.

## Routing

The client should use application routes such as:

```text
/
 /assessment
 /results/:resultId
 /careers
 /careers/:careerSlug
```

The exact result-sharing route may be adjusted during implementation.

## Result Persistence

Assessment results are intended to remain available for a limited period.

The client should not rely solely on React state because refreshing the page would otherwise lose the result.

The result identifier can be stored locally so that the application can restore the result after a refresh.

The server remains responsible for determining whether the result is still valid.

Once a result expires, the client should direct the user toward taking the assessment again.

## Result Sharing

Results should be shareable through a dedicated result URL.

The URL should identify the result without exposing the user's scores in query parameters.

For example:

```text
/results/64f8c...
```

rather than:

```text
/results?realistic=72&investigative=85...
```

The server retrieves the result associated with the identifier.

## Illustrations

Career illustrations are static client assets.

Example:

```text
public/
└── images/
    └── careers/
        ├── doctor.svg
        ├── software-developer.svg
        ├── lawyer.svg
        └── ...
```

The career dataset stores the corresponding public path.

For example:

```text
/images/careers/doctor.svg
```

The client is therefore responsible for serving the visual asset while the server stores only the reference to it.

## Environment Variables

Client environment variables should contain only values that are safe to expose to the browser.

For example:

```env
VITE_API_URL=http://localhost:5000/api
```

Secrets must never be stored in client-side environment variables.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Client Development Principles

- Keep components focused
- Avoid unnecessary abstraction
- Keep API calls outside presentation components
- Use TypeScript types consistently
- Keep assessment scoring logic authoritative on the server
- Keep static assets in the client
- Provide useful loading and error states
- Design mobile-first and responsive layouts
- Keep accessibility in consideration
