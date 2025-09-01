### Job Portal Backend

- This is the backend for a Job Portal application built with Node.js, Express, Sequelize (MySQL).

### Environment Variables

Create a .env file in the root of your backend project and add the following:

- PORT=4000

# Database
SQL_URL=mysql://USER:PASSWORD@HOST:3306/DATABASE

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_public_key    
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

### Getting Started

# Install dependencies
- npm install

# Start the server
- npm run start

### API Endpoints

# Jobs
- POST /api/jobs/createJob → Create a job
- GET /api/jobs/getJob → Get all jobs

# Applications
- POST /api/applications/:jobId → Apply to a job
- GET /api/applications?jobId=1 → Get applications (optionally filter by jobId)

# Upload
- POST /api/upload/resume → Upload resume (returns ImageKit URL)
