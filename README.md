# Share Your Resume
Share your resume is a platform where you can share your resume with others and also see other's resume. This project is made using Next.js, Shadcn-ui, Tailwindcss. Used NextAuth for authentication and PostgreSql for database. For Storage used AWS S3.

## Features
- Create your resume
- Share your resume with others
- See other's resume

## Tech Stack
- Next.js
- Shadcn-ui
- Tailwindcss
- NextAuth
- PostgreSql
- AWS S3

## Installation
1. Clone the repository
```bash
git clone 
```
2. Install dependencies
```bash
npm install
```
3. Create a .env.local file in the root directory and add the following
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
DATABASE_URL=postgres://username:password@localhost:5432/dbname
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_aws_bucket_name
```
4. Run the development server
```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
