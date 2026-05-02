# Notification System Design

## 1. Overview

This project implements a frontend-based notification system using **Next.js (App Router)**.
The application fetches notifications from an external API and displays them with filtering and priority-based sorting.

**Tech Stack:**

* Next.js (App Router)
* React
* TypeScript
* Material UI (MUI)

**Goal:**

* Display all notifications
* Provide filtering by type
* Show top priority notifications
* Handle loading and error states
* Maintain responsive UI

---

## 2. System Architecture

The system follows a **client–server proxy architecture**:

* **Frontend (Client):**

  * Renders UI
  * Fetches data from internal API (`/api/notifications`)

* **Server Proxy (Next.js API Route):**

  * Handles CORS
  * Injects authentication token
  * Fetches data from external API

* **External API:**

  * Provides notification data

---

## 3. Folder Structure Mapping

```
src/
 ├── app/
 │   ├── page.tsx                → All Notifications Page
 │   ├── priority/page.tsx       → Priority Page
 │   ├── api/notifications/route.ts → Proxy API
 │
 ├── components/
 │   ├── NotificationCard.tsx
 │   └── FilterBar.tsx
 │
 ├── utils/
 │   ├── api.ts
 │   └── sort.ts
```

---

## 4. Data Flow

1. User opens application
2. Frontend calls `/api/notifications`
3. Proxy API sends request to external API
4. External API returns notification data
5. Proxy formats response
6. Frontend receives and displays notifications
7. User applies filter or views priority page

---

## 5. API Design

### External API

```
http://20.207.122.201/evaluation-service/notifications
```

Response:

```json
{
  "notifications": [ ... ]
}
```

---

### Proxy API (Next.js)

Path:

```
src/app/api/notifications/route.ts
```

**Responsibilities:**

* Handle CORS issues
* Add Authorization token
* Forward request to external API
* Return normalized response

**Benefits:**

* Avoids CORS errors
* Keeps token secure
* Centralized API handling

---

## 6. Data Processing

### Notification Model

```ts
{
  id: string
  type: 'Event' | 'Result' | 'Placement'
  message: string
  timestamp: string
  seen: boolean
}
```

### Data Normalization

Handles variations in API response:

* `ID / id`
* `Type / type`
* `Message / message`
* `Timestamp / timestamp`

---

## 7. Features

### 7.1 All Notifications Page

* Displays all notifications
* Filter by type:

  * Event
  * Result
  * Placement
* Shows loading indicator
* Displays error messages
* Tracks seen/unseen state

---

### 7.2 Priority Page

* Displays **Top 10 notifications**
* Sorting logic:

  * Placement > Result > Event
  * Latest timestamp first
* Uses same UI components
* Supports filtering

---

## 8. Sorting Logic

Priority order:

1. Placement
2. Result
3. Event

Sorting steps:

1. Sort by priority
2. Sort by timestamp (descending)
3. Select top 10 results

---

## 9. UI Components

### NotificationCard

* Displays:

  * Type (Chip)
  * Message
  * Timestamp
* Shows seen/unseen visually

### FilterBar

* Dropdown filter:

  * All
  * Event
  * Result
  * Placement

---

## 10. Security & Authorization

* Token stored in:

```
.env.local
```

* Used in proxy API:

```
NEXT_PUBLIC_EVAL_API_TOKEN
```

* Token is **not exposed to client**

---

## 11. CORS Handling

* Managed by Next.js API route
* Adds headers:

  * `Access-Control-Allow-Origin`
  * `Access-Control-Allow-Methods`
  * `Access-Control-Allow-Headers`

---

## 12. Error Handling

* Loading: CircularProgress (MUI)
* Errors: Alert component (MUI)
* Safe parsing of API responses

---

## 13. Implementation Highlights

* Proxy API prevents CORS issues
* Centralized API logic
* Reusable components
* Clean separation of concerns
* Fully frontend-based system

---

## 14. How to Run

1. Create `.env.local`

```
NEXT_PUBLIC_EVAL_API_TOKEN=your_token_here
```

2. Install dependencies

```
npm install
```

3. Run app

```
npm run dev
```

4. Open:

* http://localhost:3000
* http://localhost:3000/priority


## Screenshots

### 1. All Notifications Page
![All Notifications](./screenshots/1_all_notifications.png)

### 2. Filter Functionality
![Filter](./screenshots/2_filter_dropdown.png)

### 3. Priority Page
![Priority](./screenshots/3_priority_page.png)

### 4. API Integration
![API](./screenshots/7_api_network.png)

## 15. Conclusion

This system provides a scalable and efficient way to display and manage notifications using modern frontend technologies, with proper handling of API integration, filtering, and prioritization.
