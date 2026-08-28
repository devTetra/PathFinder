# PathFinder 2.0 — Server

The PathFinder server is the backend API for PathFinder 2.0.

It provides the assessment data, processes completed assessments, calculates RIASEC scores, matches users against career profiles, and manages temporary assessment results.

## Responsibilities

The server is responsible for:

- Providing assessment questions
- Validating assessment submissions
- Calculating RIASEC dimension scores
- Normalizing scores to 0–100
- Loading career profiles
- Matching users with careers
- Ranking career matches
- Creating temporary result records
- Retrieving result records
- Expiring old results
- Providing career information
- Validating API input
- Managing MongoDB communication

The server is the authoritative source for assessment scoring and career matching.

## Technology Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod

## Architecture

The backend follows a layered architecture:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Models
  ↓
MongoDB
```

Validation is performed before business logic.

```text
Request
  ↓
Route
  ↓
Validation
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

## Project Structure

```text
server/
│
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── server.ts
│
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

The structure may evolve as the application develops.

## API Responsibilities

The API is expected to provide endpoints for:

### Assessment

```text
GET /api/assessment/questions
POST /api/assessment/submit
```

The questions endpoint provides the assessment questions without exposing scoring semantics that should remain hidden from the user.

The submission endpoint receives the user's selected answers and performs the authoritative scoring.

### Results

```text
GET /api/results/:resultId
```

This retrieves a previously generated assessment result.

Results are temporary and should not be considered permanent user records.

### Careers

```text
GET /api/careers
GET /api/careers/:slug
```

These endpoints provide the supported career dataset.

## Assessment Scoring

Each question contains five possible answers.

An answer can contribute to one or more RIASEC dimensions.

For example:

```text
Option B
I: 5
R: 1
```

If selected, the answer contributes:

```text
Investigative += 5
Realistic += 1
```

The server processes all 20 responses and calculates a raw score for each dimension.

## Score Normalization

Each RIASEC dimension has its own maximum possible score because the question bank does not provide identical scoring opportunities for every dimension.

Therefore, each dimension is normalized independently.

```text
normalized score =
(raw dimension score / dimension maximum) × 100
```

The resulting score is constrained to:

```text
0–100
```

For example:

```text
Investigative raw score = 64
Investigative maximum = 85

64 / 85 × 100 = 75.29
```

The user's Investigative score would therefore be approximately:

```text
75
```

## Career Matching

Each career contains a RIASEC target profile.

A career profile defines:

- Preferred score range for each dimension
- Dimension weight
- Career metadata

Example conceptually:

```text
Software Developer

R: 35–65
I: 70–100
A: 25–60
S: 20–50
E: 30–60
C: 55–85
```

The matching service compares the user's six normalized scores against the career's target ranges.

The final career-match score is weighted so that dimensions that matter more to a career have greater influence.

The exact matching formula is defined by the assessment model and should remain centralized in the matching service.

## Result Records

A result record contains enough information to reproduce the user's result without requiring authentication.

Conceptually:

```text
Result
├── resultId
├── scores
├── matches
├── createdAt
└── expiresAt
```

A result should have an expiration time.

After expiration, the API should no longer return the result as an active assessment result.

## No Authentication

PathFinder 2.0 does not require user authentication.

The assessment is designed to be anonymous.

There is no need for:

- User accounts
- Passwords
- Login
- Registration
- JWT authentication
- User profiles

The result identifier is used to retrieve a temporary assessment result.

## Database

MongoDB is used for persistent application data.

The database is responsible for storing structured information such as:

- Assessment questions
- Career profiles
- Assessment results

Career illustrations themselves are not stored in MongoDB.

The database stores the public client path for each illustration.

Example:

```text
illustration:
  "/images/careers/doctor.svg"
```

## Career Dataset

Career information is treated as application data rather than hard-coded throughout the application.

A career record may contain:

```text
Career
├── name
├── slug
├── category
├── description
├── illustration
├── riasecProfile
│   ├── R
│   ├── I
│   ├── A
│   ├── S
│   ├── E
│   └── C
└── ...
```

The final schema should be determined after the career dataset and matching model have been finalized.

## Assessment Questions

Questions should also be represented as structured data.

Conceptually:

```text
Question
├── question
├── category
├── order
└── options
    ├── text
    └── scoring
```

The scoring information should not be exposed through the public questions API if it is not required by the client.

## Validation

Zod should be used to validate API input.

Assessment submissions should validate:

- Number of responses
- Valid question identifiers
- Valid option identifiers
- Required responses
- No unexpected answers

The server should never trust the structure of a request simply because it originated from the PathFinder client.

## Error Handling

The API should return consistent error responses.

Errors should distinguish between:

- Invalid input
- Missing resources
- Expired results
- Server errors
- Database errors

The client should be able to determine the appropriate response from the HTTP status and response structure.

## Environment Variables

The server uses environment variables for configuration.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pathfinder
CLIENT_URL=http://localhost:5173
```

Secrets and database credentials must not be committed to Git.

`.env.example` documents the required variables without containing real credentials.

## TypeScript Configuration

The server uses TypeScript to provide:

- Static type checking
- Safer data structures
- Better editor support
- Consistent interfaces between application layers

`tsconfig.json` defines how TypeScript compiles the server source code.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the server:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Server Development Principles

- Keep business logic inside services
- Keep controllers thin
- Validate external input
- Keep database access inside models/services
- Centralize scoring logic
- Centralize career matching logic
- Do not duplicate scoring calculations between client and server
- Do not expose unnecessary scoring metadata through public endpoints
- Do not store secrets in source control
- Keep the API independent of the client implementation
