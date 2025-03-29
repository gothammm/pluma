# PLUMA

> A dead straight finance app for day-to-day purpose.

## Overview

PLUMA is a modern finance application built with a Python FastAPI backend and a TypeScript/React frontend.

## Project Structure

- `apps/api` - FastAPI backend server
- `apps/web` - React/TypeScript frontend application

## Getting Started

### Prerequisites

- [mise](https://mise.jdx.dev/) for runtime management
- [pnpm](https://pnpm.io/) for package management
- SQLite (for database)

### Installation

- Ensure environment variables are set:
  
    **Frontend:**
    ```sh
    touch apps/web/.env.local
    ```
    Then, edit `apps/web/.env.local` to set the API url:
    ```
    VITE_API_BASE_URL=http://localhost:8000 
    ```

- Install dependencies:
  ```sh
  make setup
  ```

- Setup database tables:
  ```sh
  make migrate
  ```

### Development

Start both the API and the web application:
```sh
make start
```