# softuni-project-btfitf
SoftUni React Course Project



1. Overview

This is a React.js web application designed for publishing information such as articles, news, events, training materials, etc. An online store for offering sports accessories, equipment, books with terminology/history/, sportswear, etc.
The project includes an админ menu for managing the content. There are user profiles for competitors, clubs.

2. Technologies Used

    - React.js
    - React Router DOM
    - Context API
    - REST API Communication
    - Tailwind CSS
    - Custom Hooks

3. Installation & Running

    - npm install
    - npm run dev

4. Project Structure

/src
┣   /components
┃   ┣ about-us (Folder)
┃   ┃   ┗ /AboutUs.jsx
┃   ┣ admin (Folder)
┃   ┃   ┣ /admin-clubs
┃   ┃   ┃   ┣ /AdminClubs.jsx
┃   ┃   ┃   ┣ /AdminClubsAddNew.jsx
┃   ┃   ┃   ┗ /AdminClubsEdit.jsx
┃   ┃   ┣ /admin-menu
┃   ┃   ┃   ┗ /AdminMenu.jsx
┃   ┃   ┣ /admin-news
┃   ┃   ┃   ┣ /AdminNews.jsx
┃   ┃   ┃   ┣ /AdminNewsAddNew.jsx
┃   ┃   ┃   ┗ /AdminNewsEdit.jsx
┃   ┃   ┗ /admin-profile
┃   ┃       ┣ /AdminProfile.jsx
┃   ┃       ┗ /AdminProfileEdit.jsx
┃   ┣ clubs (Folder)
┃   ┃   ┣ /ClubDetails.jsx
┃   ┃   ┗ /Clubs.jsx
┃   ┣ contacts (Folder)
┃   ┃   ┗ /Contact.jsx
┃   ┣ education (Folder)
┃   ┃   ┣ /History.jsx
┃   ┃   ┣ /Terminology.jsx
┃   ┃   ┗ /Theory.jsx
┃   ┣ footer (Folder)
┃   ┃   ┗ /Footer.jsx
┃   ┣ guards (Folder)
┃   ┃   ┗ /AuthGuard.jsx
┃   ┣ header (Folder)
┃   ┃   ┗ /Header.jsx
┃   ┣ home (Folder)
┃   ┃   ┗ /Home.jsx
┃   ┣ login (Folder)
┃   ┃   ┗ /Login.jsx
┃   ┣ logout (Folder)
┃   ┃   ┗ /Logout.jsx
┃   ┣ news (Folder)
┃   ┃   ┣ /News.jsx
┃   ┃   ┗ /NewsDetails.jsx
┃   ┣ notFound (Folder)
┃   ┃   ┗ /NotFound.jsx
┃   ┗ register (Folder)
┃       ┗ /Register.jsx
┣   /contexts
┃   ┗ UserContext.jsx - Authentication state management
┣   /hooks
┃   ┃ useAuth.js - Custom hook for authentication access
┃   ┗ usePersistedState.js - Hook for localStorage - isLogged 
┣   /api
┃   ┃ adminApi.js - Functions for CRUD operations + fetching latest data
┃   ┗ authApi.js - Auth for Login, Logout & Register
┣   /utils
┃   ┗ request.js - A centralized HTTP request utility that simplifies making GET, POST, PUT, and DELETE requests using fetch. Handles JSON data, request headers, and error handling in one place.
┣   App.js - Main app component containing routes
┣   main.jsx
┗   App.css - Main CSS file
<!-- TOD DO more -->

5. Routing

    Implemented using React Router DOM with client-side routing for the following pages:

    / - Home
    /contact - Contact
    /news - News list
    /news/:newsId/details - News details (with parameter)
    /clubs - Clubs list
    /club/:clubId/details - Club details (with parameter)
    /about-us - About Us
    /education/theory - Theory page
    /education/history - History page
    /education/terminology - Terminology page
    /login - Login
    /register - Register
    /logout - Logout
    /admin/... - Admin pages (Profile, News Management, Clubs Management)

6. Key Features

    User Authentication: Login, logout, registration.
    Admin Panel: Create, edit, delete news and clubs.
    Client-Side Routing: Implemented with React Router.
    Context API: Handles user authentication state.
    Dynamic Routes: Using route parameters for news and club details.
    Responsive UI: Styled with Tailwind CSS.

7. Communication

The frontend communicates with a backend REST API using fetch or custom request wrappers. All CRUD operations for users, news, and clubs are handled via RESTful endpoints.

8. State Management

Authentication state and user info are managed globally using React Context API, persisted using a custom usePersistedState hook.

