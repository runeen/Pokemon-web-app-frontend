# Pokémon Web App Frontend

A front-end application for a Pokédex-style web platform featuring user authentication, team creation, and Pokémon browsing. Built with **React** and **Tailwind CSS**.

Live demo: [pokemon.alexbotez.dev](https://pokemon.alexbotez.dev)

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Backend API Integration](#backend-api-integration)
* [Project Structure](#project-structure)
* [License](#license)

---

## Features

* User authentication (login / register)
* View other user's profiles
* Create, edit, delete Pokémon teams
* Manage favorite Pokémon
* Responsive, modern UI
* Integration with a backend API for data persistence

---

## Tech Stack

| Layer                | Technology                |
| -------------------- | ------------------------- |
| Framework / UI       | React                     |
| Styling              | Tailwind CSS              |
| Bundler / Dev Server | Vite                      |
| Routing              | React Router (HashRouter) |

---

## Backend API Integration

This app communicates with a backend service for user authentication and team management, and retrieves Pokémon data from [PokeAPI](https://pokeapi.co) using [pokeapi-js-wrapper](https://github.com/PokeAPI/pokeapi-js-wrapper).

### API Usage Overview

* **Authentication:**
  Handles user login and registration through endpoints such as:

  ```
  POST /auth/login
  POST /auth/register
  ```

  On success, a token is stored locally to authenticate subsequent requests.

* **Liked Pokémon:**
  Manages the user’s list of liked Pokémon.
  Example endpoints:

  ```
  GET /pokemon
  GET /pokemon/:id
  DELETE /pokemon/:id
  ```

* **Teams Management:**
  Allows users to create and manage their Pokémon teams.

  ```
  GET /team                     # Fetch user teams
  POST /team                    # Create a new team
  POST /team/:id/pokemon/:id    # Add Pokémon to a team
  PUT /team/:id                 # Edit a team
  DELETE /team/:id              # Delete a team
  DELETE /team/:id/pokemon/:id  # Remove Pokémon from a team
  ```

All API calls are centralized in `/src/scripts/REST_api_calls.js`, using `fetch` or a similar HTTP client for requests.

---

## Project Structure

```
public/
  vite.svg
src/
  Ability/               # Components or pages related to Pokémon abilities
  Moves/                 # Components handling Pokémon moves
  Pages/                 # Main pages 
  Pokemon/               # Components or pages related to Pokémon
  Teams/                 # Components handling Pokémon teams
  assets/                # Static assets (images, icons)
  authComponents/        # Authentication-related UI (login/register forms)
  scripts/               # API communication scripts
  App.css                
  App.jsx                # Main app component
  LinkToResourcePage.jsx # Utility component for linking resources
  index.css              
  main.jsx               # App entry point (React DOM render)
LICENSE                  # MIT license
eslint.config.js
index.html
package-lock.json
package.json
vite.config.js
```

---

## License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for details.
