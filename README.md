# PathFinder 2.0

PathFinder is a career exploration and assessment platform that helps users discover career fields that align with their interests, preferences, and personality.

PathFinder 2.0 is a complete rebuild of the original PathFinder project. It replaces the original static HTML/CSS/JavaScript implementation with a structured full-stack application and introduces a more robust career assessment model based on the **RIASEC career-interest framework**.

## Overview

PathFinder 2.0 allows a user to:

- Take a 20-question career assessment
- Answer five options per question
- Receive scores across the six RIASEC dimensions
- See their strongest career-interest dimensions
- Receive career matches based on their assessment profile
- Explore detailed career profiles
- View career illustrations
- Share their assessment results
- Retake the assessment
- Browse all supported career fields

The application does **not require user authentication**. Assessment results are intended to be temporary rather than permanently associated with an account.

## RIASEC Assessment

PathFinder 2.0 uses the six RIASEC dimensions:

| Code | Dimension     | Description                                             |
| ---- | ------------- | ------------------------------------------------------- |
| R    | Realistic     | Hands-on, practical, technical, and physical activities |
| I    | Investigative | Research, analysis, problem-solving, and discovery      |
| A    | Artistic      | Creativity, expression, originality, and design         |
| S    | Social        | Helping, teaching, supporting, and working with people  |
| E    | Enterprising  | Leadership, persuasion, business, and achievement       |
| C    | Conventional  | Organization, structure, accuracy, and systematic work  |

### Assessment Structure

- **20 questions**
- **5 options per question**
- Options can contribute to multiple RIASEC dimensions
- Primary contributions use stronger scores
- Secondary contributions represent weaker associations
- RIASEC dimensions are not exposed to the user while taking the assessment

The assessment produces a normalized score from **0–100** for each dimension.

Conceptually:

```text
Dimension Score =
(User points for dimension / Maximum possible points for dimension) × 100
```

Career matching then compares the user's dimension scores against the expected RIASEC profile of each career.

## Career Matching

Each supported career contains a RIASEC profile describing the expected score range for each dimension.

PathFinder compares a user's assessment profile with these career profiles to determine how well the career fits the user's interests.

The matching system considers:

- The user's normalized RIASEC scores
- The target range for each career dimension
- The relative importance of each RIASEC dimension to the career
- The distance between the user's score and the career's preferred range

The result is a ranked list of career matches rather than a single deterministic career recommendation.

> PathFinder is an exploratory career-interest tool and is not intended to provide professional psychological, educational, or career counseling.

## Results

After completing the assessment, users receive:

### Primary Result

The user's strongest career-interest profile and the career fields that best match it.

### Career Matches

Multiple careers are ranked according to their compatibility with the user's RIASEC profile.

### Career Profile

Each career has a dedicated profile containing relevant information such as:

- Career name
- Career category
- Description
- RIASEC profile
- Career dimensions
- Illustration
- Relevant information about the field

### Sharing

Assessment results can be shared through a generated shareable result URL.

The URL does **not contain the user's RIASEC scores as query parameters**.

Results are temporary and are not permanently tied to a user account.

## Illustrations

Career illustrations are stored as static assets in the client application.

The career dataset stores the **public path/URL to the illustration**, rather than storing the image itself inside MongoDB.

This keeps the database responsible for career data while the client repository remains responsible for static visual assets.

## Architecture

PathFinder 2.0 is divided into two applications:

```text
PathFinder 2.0
├── client
└── server
```

### Client

The client is responsible for:

- User interface
- Assessment experience
- Client-side state
- Results presentation
- Career browsing
- Career profile pages
- Sharing interface
- Static illustrations

### Server

The server is responsible for:

- Assessment data
- Career data
- Score calculation
- Career matching
- Result persistence
- Result retrieval
- API validation
- Database access

## Technology Stack

### Client

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- TanStack Query
- Zod
- React Hook Form
- Lucide React

### Server

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod

## Project Structure

```text
PathFinder/
│
├── client/
│   ├── public/
│   └── src/
│
├── server/
│   └── src/
│
└── README.md
```

## Development

Clone the repository and install dependencies separately for the client and server.

```bash
git clone <repository-url>
cd PathFinder
```

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

Environment variables are configured separately for the client and server.

## Version History

### v1.0

The original PathFinder implementation.

The first version was built using:

- HTML
- CSS
- Vanilla JavaScript

The assessment consisted of a static questionnaire and returned a single career category based on the selected options.

### v2.0

PathFinder 2.0 is a complete architectural and functional rebuild.

Major changes include:

- React-based client
- TypeScript
- Express backend
- MongoDB
- RIASEC assessment model
- Multidimensional question scoring
- Normalized 0–100 dimension scores
- Career matching
- Career profiles
- Shareable results
- Persistent static career data
- Career illustrations
- Improved responsive UI
- Separation between client and server responsibilities

## Status

PathFinder 2.0 is currently under development.

The assessment model, career dataset, UI, API architecture, and matching algorithm are being developed before the final production implementation.

## License

This project is currently a personal portfolio project.
