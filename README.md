## Full Stack MERN Survey App

MongoDB, Express.js, React, Node.js, Redis,
AWS JavaScript SDK, Stripe API, SendGrid Mailer API,
Webhook, Google OAuth2, Materialize

## Features

- Users can post surveys
- Users can vote for surveys
- Each survey has several fields
- Sending emails with SendGrid Mailer API
- Handling payments with Stripe API
- Tracking mechanism with Webhook of users who vote for surveys
- Google OAuth2 authentication based on session cookie (passport library)
- Access control based on Google OAuth2 authentication
- Express based security features
- NoSQL database (MongoDB)
- Caching mechanism (Redis)
- Server side implemented in Node.js
- Client side implemented in React
- Monolith architecture
- Materialize CSS framework
- AWS S3 scalable file/image upload
- Client Proxy
- Tests with jest and puppeteer

## Usage

### `npm install`

This script installs all the modules listed in the package.json before running the app.

### `Development api keys`

Add the required development api keys in /config/dev.js and /config/ci.js.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the production mode.

### `npm run server`

Runs only the server.

### `npm run client`

Runs only the client.

### `npm run dev`

Runs the server and client concurrently.

## Resources

- Stripe API (https://stripe.com/en-it).
- SendGrid API (https://www.sendgrid.com).
- Webhook ngrok (https://ngrok.com/).
- AWS JavaScript SDK (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html).
- Passport Google OAuth2.0 (https://github.com/jaredhanson/passport-google-oauth2).
