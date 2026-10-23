# PathFinder 2.0

PathFinder is a full-stack career exploration platform that helps users discover career fields aligned with their interests through a structured assessment based on the **RIASEC career-interest framework**.

Version 2.0 is a rebuild of the original static HTML, CSS, and JavaScript application. It introduces a React-based client, a TypeScript and Express API, MongoDB-backed career data, multidimensional assessment scoring, and career matching.

**Live application:** [PathFinder 2.0](https://path-finder-three-virid.vercel.app/)

## Overview

PathFinder 2.0 allows users to:

- Complete a 20-question career-interest assessment.
- Answer each question using five available options.
- Receive normalized scores across the six RIASEC dimensions.
- Explore their strongest career-interest dimensions.
- View ranked career matches based on their assessment profile.
- Browse available career fields.
- View detailed career profiles, including descriptions, skills, responsibilities, and illustrations.
- Discover related careers.
- Share assessment results through a generated result URL.
- Retake the assessment.

The application does not require user authentication. Assessment results are stored and retrieved through the backend rather than being encoded directly into the shareable URL.

PathFinder is an exploratory career-interest tool, not a definitive career-placement system or a substitute for professional career counseling.

## RIASEC Assessment

PathFinder uses the six dimensions of the RIASEC career-interest framework.

| Code | Dimension     | Description                                             |
| ---- | ------------- | ------------------------------------------------------- |
| R    | Realistic     | Practical, hands-on, technical, and physical activities |
| I    | Investigative | Research, analysis, problem-solving, and discovery      |
| A    | Artistic      | Creativity, expression, originality, and design         |
| S    | Social        | Helping, teaching, supporting, and working with people  |
| E    | Enterprising  | Leadership, persuasion, business, and achievement       |
| C    | Conventional  | Organization, structure, accuracy, and systematic work  |

### Assessment Structure

- **20 questions**
- **5 options per question**
- Options can contribute to multiple RIASEC dimensions.
- Primary contributions receive stronger scores than secondary contributions.
- RIASEC dimensions are not displayed to users while they take the assessment.
- Each dimension receives a normalized score from 0 to 100.

The score normalization is conceptually represented as:

```text
Dimension Score =
(User points for dimension / Maximum possible points for dimension) × 100
```

The backend handles score calculation and career matching, keeping the assessment logic separate from the client interface.

## Career Matching

Each supported career has a RIASEC profile describing its expected interest pattern across the six dimensions.

PathFinder compares a user's normalized assessment scores with career profiles to produce a ranked list of potential matches.

The matching process considers:

- The user's normalized RIASEC scores.
- The target range for each career dimension.
- The relative importance of each dimension to a career.
- The distance between the user's scores and a career's preferred ranges.

The results present multiple possible career matches rather than assigning one definitive career to a user.

## Career Exploration

Users can browse the available career dataset and open dedicated career profile pages.

Career profiles include relevant information such as:

- Career name and category.
- Description.
- RIASEC profile and career dimensions.
- Relevant skills and responsibilities.
- Career illustration.
- Related careers.

The backend provides career data through the API, while the client displays the information and handles navigation between career profiles.

## Assessment Results and Sharing

After completing the assessment, users can view their interest profile and ranked career matches.

Results can be shared through a generated URL that identifies the stored assessment result. The RIASEC scores are not placed directly in the URL as query parameters.

The application does not require an account to access the assessment. Result storage and retrieval are handled by the backend; results are not permanently associated with a user account.

## Illustrations

Career illustrations are stored as static assets in the client application.

The career dataset references each illustration through its public path or URL instead of storing the image itself in MongoDB. This separates career information from the client-side visual assets.

## Architecture

PathFinder 2.0 separates the client interface from the backend API.

```text
PathFinder 2.0
├── Client
│   ├── Assessment interface
│   ├── Results and career matching display
│   ├── Career explorer
│   ├── Career profile pages
│   └── Static illustrations
│
└── Server
    ├── Career and question data
    ├── Assessment scoring
    ├── Career matching
    ├── Result storage and retrieval
    ├── API validation
    └── Database access
```

### Client Responsibilities

- Rendering the user interface.
- Managing the assessment experience and client-side state.
- Displaying assessment results and career matches.
- Browsing careers and viewing career details.
- Displaying related careers.
- Providing the result-sharing interface.
- Serving career illustrations.

### Server Responsibilities

- Managing career and question data.
- Validating API requests.
- Calculating assessment scores.
- Matching assessment profiles with careers.
- Storing and retrieving assessment results.
- Interacting with MongoDB.

## Technology Stack

### Client

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- TanStack Query
- Axios
- Lucide React

### Server

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod

## Deployment

- **Client:** [Vercel](https://path-finder-three-virid.vercel.app/)
- **Server:** Render
- **Database:** MongoDB

The client communicates with the backend through an API base URL configured using the `VITE_BASE_URL` environment variable. The client appends `/api` to this base URL, so the environment variable should contain the server's base URL without the `/api` suffix.

Environment variables should be configured separately for each application and deployment environment.

## Development

Clone the repository:

```bash
git clone https://github.com/devTetra/PathFinder.git
cd PathFinder
```

Install dependencies and run the client and server from their respective project directories.

### Client

```bash
cd client
npm install
npm run dev
```

Configure the client environment with the backend's base URL:

```env
VITE_BASE_URL=<your-server-base-url>
```

Do not append `/api` to this value when using the Axios configuration:

```ts
baseURL: `${import.meta.env.VITE_BASE_URL}/api`;
```

### Server

```bash
cd server
npm install
npm run dev
```

Configure the required server environment variables for the database connection and other server settings before starting the API.

> The commands above assume the client and server directories exist in the same repository. If they are maintained in separate repositories, clone and configure each repository independently.

## Version History

### v1.0 — Original Version

The original implementation used:

- HTML
- CSS
- Vanilla JavaScript

It presented a static questionnaire and returned a career category based on the selected answers.

### v2.0 — Full-Stack Rebuild

Version 2.0 introduces:

- A React and TypeScript client.
- An Express and TypeScript backend.
- MongoDB-backed career and question data.
- A 20-question RIASEC assessment.
- Multidimensional question scoring.
- Normalized scores across six RIASEC dimensions.
- Career matching and ranked results.
- Shareable assessment results.
- Career browsing and detailed career profiles.
- Related-career discovery.
- Career illustrations served as client-side static assets.
- API validation and separation of client and server responsibilities.
- A responsive interface and dedicated loading and error states.

## Project Status

PathFinder 2.0 has been deployed, with the client hosted on Vercel and the backend hosted on Render. The project may continue to receive improvements to its interface, assessment experience, career dataset, and matching functionality.

## License

This is a personal portfolio project. No open-source license is specified at this time.
