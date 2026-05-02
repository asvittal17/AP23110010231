# Notification App (Frontend)

## Overview

This is a frontend application built using Next.js that displays notifications fetched from an external API.


## Features

* Fetch notifications from API
* Display notifications in card layout
* Filter notifications by type:

  * Event
  * Result
  * Placement
* Priority Page:

  * Displays top 10 notifications
  * Sorted by priority and timestamp



## Tech Stack

* Next.js
* React
* TypeScript
* Material UI



## Project Structure

* `app/` → Pages (Home & Priority)
* `components/` → UI components
* `utils/` → API and sorting logic
* `api/notifications/route.ts` → Proxy API (CORS fix)



## Setup Instructions

1. Install dependencies

npm install


2. Add environment variable


NEXT_PUBLIC_EVAL_API_TOKEN=your_token_here


3. Run the project

npm run dev


4. Open browser


http://localhost:3000


## Notes

* CORS issue is handled using Next.js API route
* No backend implementation required (frontend-focused project)


## Author

Name: A S Vittal
Roll Number: AP23110010231
