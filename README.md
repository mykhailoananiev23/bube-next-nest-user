
# Project Name: Job-Posting-Theme

## Prerequisites

Before you begin, ensure you have the following:

- A Google Account (if not, create one at https://accounts.google.com/signup)
- Access to the Google Developers Console (https://console.developers.google.com/)

## Steps to Obtain Google Client ID and Secret

1. Go to the Google Developers Console (https://console.developers.google.com/).

2. Click on "Select a project" in the top-left corner and then click "New Project."

3. In the "New Project" dialog, enter a name for your project and click "Create."

4. Once the project is created, ensure it is selected from the project drop-down in the top-left corner.

5. In the left sidebar, click on "Credentials."

6. Click on "Create Credentials" and select "OAuth client ID."

7. On the "Create OAuth client ID" page, choose "Web application" as the application type.

8. In the "Authorized JavaScript origins" field, enter the URLs of your application where you'll be using the Google Client ID. For example, if you are running your application locally, you can use "http://localhost:3000" as the origin.

9. In the "Authorized redirect URIs" field, enter the redirect URL where Google will send the user after authentication. For example, if your application handles authentication at "http://localhost:3000/login/google/callback," enter that URL here.

10. Click "Create" to generate the Client ID and Secret.

11. After creating the credentials, you will see the "OAuth 2.0 Client ID" section with your newly generated credentials. Copy the "Client ID" and "Client Secret" values.

(Reference URL: https://analytify.io/get-google-client-id-and-client-secret/)

## Configuring Your Application



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/jobs.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed
on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited
in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated
as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
