# QuickAI

QuickAI is a full-stack AI content-creation application. Authenticated users can generate articles, blog titles, and images; remove image backgrounds or objects; review PDF resumes; view their creations; and share generated images with the community.

## Features

- Clerk sign-up, sign-in, user profile, and protected application area
- AI article generation with selectable length ranges
- AI blog-title generation by keyword and category
- AI image generation with a public/private option
- Image background removal
- Image object removal using a single-object description
- PDF resume review with AI-generated feedback
- Dashboard with a user's recent creations and total creation count
- Community gallery for public creations, including likes
- Clerk pricing table and a displayed free-plan status

## Tech stack

### Client

- React 19, Vite, and React Router
- Tailwind CSS
- Clerk React SDK
- Axios, React Markdown, React Hot Toast, and Lucide React

### Server

- Node.js and Express
- Clerk Express SDK
- Neon serverless Postgres client
- Google GenAI, Hugging Face Inference, and Cloudinary
- Multer and pdf-parse

## Architecture

The React client obtains a Clerk token and sends it as a Bearer token to the Express API. The API applies Clerk authentication to `/api/ai` routes, uses the authenticated user ID when recording creations, and stores creation records in the Neon Postgres database. Text and resume-review requests use Google GenAI; image generation uses Hugging Face Inference and stores results in Cloudinary. Cloudinary also processes uploaded images for background and object removal.

## Folder structure

```text
QuickAI/
|-- Client/
|   |-- src/
|   |   |-- components/     # Landing-page and application UI components
|   |   |-- pages/          # Routes for AI tools, dashboard, and community
|   |   |   `-- assets/     # Static assets and UI data
|   |-- package.json
|   `-- vite.config.js
|-- Server/
|   |-- configs/            # Database, Cloudinary, and Multer setup
|   |-- controllers/        # AI and creation controllers
|   |-- middlewares/        # Clerk-based middleware
|   |-- routes/             # API route definitions
|   |-- package.json
|   |-- server.js
|   `-- vercel.json
`-- .gitignore
```

## Installation and setup

Install dependencies separately for the client and server:

```bash
cd Client
npm install

cd ../Server
npm install
```

Create `Client/.env.local` and `Server/.env` using the variable names below. Then run the applications in separate terminals:

```bash
cd Client
npm run dev
```

```bash
cd Server
npm run server
```

## Environment variables

### Client (`Client/.env.local`)

```env
VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
VITE_BASE_URL=<your_server_base_url>
```

### Server (`Server/.env`)

```env
PORT=<server_port>
NODE_ENV=<environment_name>
DATABASE_URL=<neon_database_url>
CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>
GEMINI_API_KEY=<gemini_api_key>
HUGGING_FACE_API_KEY=<hugging_face_api_key>
```

## Available scripts

### Client

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build. |
| `npm run lint` | Run ESLint. |
| `npm run preview` | Preview the production build. |

### Server

| Command | Description |
| --- | --- |
| `npm run server` | Start the server with Nodemon. |
| `npm start` | Start the server with Node.js. |

## Authentication

Clerk provides the client-side authentication UI and the server-side route protection. The client sends a Clerk Bearer token with API requests, and the server requires authentication for all `/api/ai` routes. The `/ai` application layout renders the Clerk sign-in experience when no user is available.

## AI features

- Article and blog-title generation use Google GenAI.
- Image generation uses Hugging Face Inference with the `black-forest-labs/FLUX.1-schnell` model through the `nscale` provider, then uploads the result to Cloudinary.
- Background removal and object removal use Cloudinary transformations.
- Resume review extracts text from an uploaded PDF with `pdf-parse` before submitting it to Google GenAI.

## Database

The server connects to Neon using `DATABASE_URL`. The implemented queries use a `creations` table to store a creation's user ID, prompt, content, type, publication state, likes, and timestamps. It supports user creation history, public-creation retrieval, and likes toggling.

## API endpoints

All endpoints below are mounted under `/api/ai` and require Clerk authentication.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/generate-article` | Generate and save an article. |
| `POST` | `/generate-blog-title` | Generate and save blog-title content. |
| `POST` | `/generate-image` | Generate an image, upload it to Cloudinary, and save it. |
| `POST` | `/remove-image-background` | Process an uploaded `image` file to remove its background. |
| `POST` | `/remove-image-object` | Process an uploaded `image` file and remove the supplied `object`. |
| `POST` | `/resume-review` | Review an uploaded PDF in the `resume` field. |
| `GET` | `/get-user-creations` | Retrieve the authenticated user's creations. |
| `GET` | `/get-published-creations` | Retrieve public creations. |
| `POST` | `/toggle-like-creation` | Toggle the authenticated user's like for a creation. |

## Deployment

The server includes a Vercel configuration in `Server/vercel.json`. It deploys `server.js` with `@vercel/node` and routes incoming requests to that entry point.


