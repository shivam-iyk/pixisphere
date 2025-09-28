
# Project Title

Pixisphere is a full-stack AI-powered photography service marketplace that connects
clients with verified photographers and studios across India. It's engineered to handle
end-to-end workflows: from discovery and shortlisting, through intelligent lead distribution,
to post-booking lifecycle management.

#### The platform supports:
- Dynamic service discovery based on categories and geo-location
- Client inquiries with smart suggestions and reference image uploads
- Vendor dashboards with lead, booking, and portfolio tools
- Admin backend with moderation, verification, and CMS control

Pixisphere is not a typical marketplace. It operates with complex, role-based user flows,
multi-model data structures, AI-aided matching, and moderated interactions — all while
being scale-ready for high-traffic content management and real-time services.


## Environment Variables

To run this project, you will need to add following environment variables to your .env file

`NEXT_PUBLIC_API_URL` - Json-server URL (default: http://localhost:3001)


## Run Locally

Clone the project

```bash
  git clone https://github.com/sethshivam11/pixisphere
```

Go to the project directory

```bash
  cd pixisphere
```

Install dependencies & build

```bash
  npm run build
```

Open another terminal to run the server

```bash
npm run json-server
```

Start the server

```bash
  npm start
```


## Tech Stack

Next.js, Zustand, TailwindCSS, ShadCN/UI, Axios

