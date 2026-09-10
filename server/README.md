# PathFinder Server

The backend API for **PathFinder**, a career assessment application that helps users discover suitable career paths based on their RIASEC assessment results.

The server handles assessment scoring, career matching, result creation, and public result retrieval.

## Features

- RIASEC-based career assessment
- Server-side assessment scoring
- Score normalization across all six RIASEC dimensions
- Weighted career matching
- Ranked career recommendations
- Public result sharing through a unique result ID
- Automatic result expiration after 30 days
- MongoDB data persistence with Mongoose
- Request validation with Zod
- Centralized error handling

## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **Zod**

## RIASEC Assessment

PathFinder evaluates users across six RIASEC dimensions:

- **R** — Realistic
- **I** — Investigative
- **A** — Artistic
- **S** — Social
- **E** — Enterprising
- **C** — Conventional

The assessment consists of 20 questions with five options per question.

The client submits the selected answers, while the server calculates the resulting RIASEC scores. Question scoring data is not exposed through the public questions endpoint.

The resulting scores are normalized to a 0–100 scale and compared against the configured requirements of each career. Career matches are calculated using dimension ranges and weights, then ranked by their final fit score.

## API Endpoints

### Questions

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| GET    | `/api/questions/` | Get all assessment questions |

Question scoring configuration is excluded from the response.

### Careers

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/api/careers/`      | Get all careers      |
| GET    | `/api/careers/:slug` | Get a career by slug |

### Assessments

| Method | Endpoint                 | Description                              |
| ------ | ------------------------ | ---------------------------------------- |
| POST   | `/api/assessment/submit` | Submit an assessment and create a result |

An assessment submission must contain exactly 20 answers with unique question IDs.

### Results

| Method | Endpoint                 | Description                         |
| ------ | ------------------------ | ----------------------------------- |
| GET    | `/api/results/:resultId` | Retrieve a public assessment result |

Results are available for 30 days.

## Project Structure

```text
server/
 ┣ data
 ┃ ┣ careers.json
 ┃ ┗ questions.json
 ┣ src
 ┃ ┣ config
 ┃ ┃ ┗ db.config.ts
 ┃ ┣ constants
 ┃ ┃ ┗ dimensions.ts
 ┃ ┣ controllers
 ┃ ┃ ┣ assessment.controller.ts
 ┃ ┃ ┣ career.controller.ts
 ┃ ┃ ┣ question.controller.ts
 ┃ ┃ ┗ result.controller.ts
 ┃ ┣ middleware
 ┃ ┃ ┣ error.middleware.ts
 ┃ ┃ ┗ validate.middleware.ts
 ┃ ┣ models
 ┃ ┃ ┣ Career.ts
 ┃ ┃ ┣ Question.ts
 ┃ ┃ ┗ Result.ts
 ┃ ┣ routes
 ┃ ┃ ┣ assessment.route.ts
 ┃ ┃ ┣ career.route.ts
 ┃ ┃ ┣ question.route.ts
 ┃ ┃ ┗ result.route.ts
 ┃ ┣ service
 ┃ ┃ ┣ assessment.service.ts
 ┃ ┃ ┣ career.service.ts
 ┃ ┃ ┣ question.service.ts
 ┃ ┃ ┗ result.service.ts
 ┃ ┣ types
 ┃ ┃ ┣ ApiError.ts
 ┃ ┃ ┗ index.ts
 ┃ ┣ utils
 ┃ ┃ ┗ assessment.helper.ts
 ┃ ┣ validators
 ┃ ┃ ┣ assessment.validator.ts
 ┃ ┃ ┣ career.validator.ts
 ┃ ┃ ┣ question.validator.ts
 ┃ ┃ ┗ result.validator.ts
 ┃ ┗ server.ts
 ┣ .env.example
 ┣ package.json
 ┗ tsconfig.json
```

## Database Seeding

The JSON files in the `data` directory contain the career and question datasets used to populate the MongoDB database.

They are seed data and are not used as the application's runtime data source.

The database should be populated from these datasets before using the assessment endpoints.

## Getting Started

### Prerequisites

- Node.js
- MongoDB database
- npm

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file based on the provided `.env.example`:

```bash
cp .env.example .env
```

Then configure the required environment variables in `.env`.

For example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Environment variables containing secrets should never be committed to the repository.

### Development

Start the development server:

```bash
npm run dev
```

### Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Result Expiration

Assessment results expire after 30 days.

Results use MongoDB's TTL index for automatic cleanup. The application also checks the result age when retrieving a result, ensuring that an expired result is not returned while waiting for MongoDB's TTL cleanup process.

## Architecture

The server follows a layered architecture:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
```

Utility functions provide reusable assessment-specific operations, while middleware handles request validation and errors.

The assessment workflow is:

```text
Submit answers
      ↓
Validate assessment
      ↓
Calculate normalized RIASEC scores
      ↓
Match scores against careers
      ↓
Rank career matches
      ↓
Create result
      ↓
Return result ID
```

## API Response

Assessment submission returns a public result ID along with the calculated scores and career matches.

The result ID can then be used to retrieve the complete result through the results endpoint.

## License

This project is currently intended as a portfolio project.
