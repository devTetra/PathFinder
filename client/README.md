# PathFinder 2.0 — Client

PathFinder is a career exploration application that helps users discover potential career paths through a RIASEC-based career interest assessment. Users can explore their career profiles, review personalized career matches, and browse available careers independently of taking the assessment.

The application is built with React and TypeScript, with a separate backend responsible for assessment scoring and career matching.

## Features

- **Career Assessment:** Complete a 20-question assessment with five answer options per question and track progress throughout the process.
- **RIASEC Profile:** View assessment scores across the six Holland personality dimensions: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional.
- **Personalized Career Matches:** Explore ranked career recommendations based on assessment results, including career fit information.
- **Shareable Results:** Share results through a unique result URL without exposing assessment scores in URL query parameters.
- **Career Explorer:** Browse the supported career dataset without completing the assessment.
- **Career Details:** View individual career profiles, including illustrations, descriptions, relevant skills, responsibilities, and related careers.
- **Responsive Interface:** Access the application across desktop, tablet, and mobile screen sizes.
- **Loading and Error States:** Handle loading, empty, invalid, and unavailable data states throughout the application.

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- Lucide React

## Getting Started

### Prerequisites

- Node.js
- npm
- Access to the PathFinder backend API

### Installation

1. Clone the client repository.

   ```bash
   git clone <client-repository-url>
   cd <client-directory>
   ```

2. Install the dependencies.

   ```bash
   npm install
   ```

3. Configure the API base URL in the Axios client to point to your local backend or deployed API.

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open the local URL provided by Vite in your browser.

### Production Build

Build the application for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Application Architecture

PathFinder is divided into a client and a server.

The client is responsible for presenting the interface, collecting assessment answers, communicating with the API, and displaying results and career information.

The server is responsible for managing assessment and career data, validating submissions, calculating RIASEC scores, ranking career matches, and managing result persistence and expiration.

This separation keeps assessment scoring and career-matching logic on the server rather than duplicating the calculations in the client.

Career illustrations are stored in the client repository and mapped to illustration keys returned by the API.

## Assessment Model

The assessment uses six RIASEC dimensions:

| Dimension | Description   |
| --------- | ------------- |
| R         | Realistic     |
| I         | Investigative |
| A         | Artistic      |
| S         | Social        |
| E         | Enterprising  |
| C         | Conventional  |

Users answer the assessment questions without being shown the underlying scoring dimensions. Once the assessment is submitted, the server calculates the scores and returns the resulting career matches.

PathFinder is intended for career exploration and educational guidance. Its recommendations are intended to help users explore possibilities, not to provide a definitive career-placement decision or psychological diagnosis.

## Deployment

The client can be deployed to Vercel or another platform that supports static frontend applications.

For production deployment:

- Configure the API base URL to use the deployed backend.
- Ensure the backend allows requests from the deployed client origin.
- Configure the hosting platform to serve the single-page application correctly for direct navigation to routes such as career details and shared results.

## Related Repository

- **Backend:** [PathFinder](https://github.com/devTetra/PathFinder)

The backend source is maintained in the `v2-development` branch.

## License

No license has been specified for this project.
