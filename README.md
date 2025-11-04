# Social Feed + Comment Moderation Dashboard

## Project Overview

This project is a mini social media platform built with React and TypeScript. It features posts browsing with infinite scroll, debounced search, and robust comment moderation using local mock state. It also includes authentication with protected routes, optimistic UI updates, persistence of moderation state across reloads.

The backend API is simulated by [JSONPlaceholder](https://jsonplaceholder.typicode.com), with local mock state managing moderation fields.

***

## Features

- **User Authentication**  
  Simple login with hardcoded credentials and token stored in `localStorage`. All app pages require authentication.

- **Posts Feed**  
  - Infinite scroll with pagination via react-query  
  - Search posts by title (debounced, client-side filtering)  
  - Sorting options: latest, most commented, alphabetical  
  - Optimistic UI for adding, editing, deleting posts

- **Comments**  
  - Lazy loaded only when needed (on post click)  
  - Add/Edit/Delete comments with optimistic updates  
  - Comments have moderation states (pending, approved, rejected) stored locally  
  - Only approved comments count towards feed and are persisted in `localStorage`  
  - Rejected comments hidden from feed  
  - Retry option shown for failed updates

- **State Management**  
  - Global state handled via React Context API (auth and moderation state)  
  - Data fetching and caching are managed by react-query for performance and consistency

- **Routing**  
  - React Router used for navigation  
  - PrivateRoute component guards authenticated pages  
  - Login page redirect if unauthenticated

- **UI Library**  
  - Ant Design for reusable components, layouts

***

## Architecture

- **React Query for API Caching and Fetching**  
  Handles efficient fetching with infinite pagination, caching posts and comments data.

- **Context API for Global State**  
  Used for Authentication state (`AuthContext`) and Comment Moderation state (`ModStateContext`), including persistence in `localStorage`.

- **LocalStorage**  
  Stores authentication token and approved comments count per post for persistence across browser reloads.

- **Debounced Search**  
  Search applied locally with lodash debounce for performance.

- **Folder structure**  
  Organized by feature and type (api/, components/, contexts/, hooks/, pages/, utils/).

***

## Trade-offs

- **No backend moderation state**: Moderation is simulated purely in front-end via local mock state in Context and localStorage. This limits scalability but meets the task requirements and exam constraints.

- **Search only client-side**: Due to limitations of JSONPlaceholder API, search filtering is done in client memory, which is not scalable for very large data sets.

- **Authentication mocking**: The login system does not perform real API validation but mocks login state with hardcoded credentials and token storage.

***

## Improvements with More Time

- Shift moderation states to backend API to allow persistence across devices  
- User profiles, roles, and real authentication flow  
- Implement server-side search and sorting for scalability  
- Add UI feedback for all API errors and loading states, including skeleton loaders  
- Add end-to-end testing and integration tests for API mutation flows  
- Use typesafe API clients (e.g., with GraphQL or OpenAPI)  
- Apply more advanced state management patterns for complex nested UI states

***

## Setup & Run

1. Clone the repo  
   ```
   git clone https://github.com/idhavaltank/socialize-dashboard.git
   cd socialize-dashboard
   ```

2. Install dependencies  
   ```
   npm install
   ```

3. create .env.development file 
   ```
   VITE_APP_API_URL="https://jsonplaceholder.typicode.com"
   VITE_USER_NAME="testuser@logicwind.com"
   VITE_PASS_WORD="Test123!"
   VITE_NODE_ENV="development"
   ```
4. Run the development server  
   ```
   npm run dev
   ```


5. Open the app in your browser at `http://localhost:5137`

***

## Login Credentials

- **Username:** testuser@logicwind.com  
- **Password:** Test123!

***

## Folder Structure

```
src/
├─ api/             # Fetch helpers for posts/comments
├─ components/      # Reusable UI components (PostsFeed, CommentList, etc)
├─ contexts/        # AuthContext, ModerationState Context
├─ hooks/           # Custom React hooks for fetching and state
├─ pages/           # Route components: LoginPage, FeedPage, PostDetailPage
├─ utils/           # Helpers like debounce, localStorage utils
├─ App.tsx          # Root component with routing
├─ main.tsx         # Entry point
```

***